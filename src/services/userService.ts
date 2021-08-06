import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import LoginSchema from "../schemas/LoginSchema";
import {v4 as uuid} from "uuid"; 
import User from "../entities/User";
import SignUpInterface from "../interfaces/SignUpInterface";
import SignInInterface from "../interfaces/SignInInterface";
import Session from "../entities/Session";

export async function SignUp(user: SignUpInterface) {
  const userRepository = getRepository(User);

  const {error} = LoginSchema.validate(user);

  if(error) return false;

  const {email, password} = user; 

  const existingUser = await validateEmail(email);

  if(existingUser) return false

  const hashedPassword = bcrypt.hashSync(password, 10);

  await userRepository.insert({email, password: hashedPassword});

  return true
}

export async function validateEmail (email: string) {
  const user = await getRepository(User).findOne({
    where: {email}
  });
  
  return user;
}

export async function SignIn(user: SignInInterface) {
  const sessionRepository = getRepository(Session);

  const {error} = LoginSchema.validate(user);

  if(error) return false;

  const {email, password} = user; 

  const existingUser = await validateEmail(email);
  
  if(!existingUser) return null;

  if(!bcrypt.compareSync(existingUser.password, password)) {
    const token = uuid();
    await sessionRepository.insert({token, userId: existingUser.id});  
    return token;
  }
  return false;
}

export async function authenticate(token:string) {
  const sessionRepository = getRepository(Session);
  
  const session = await sessionRepository.findOne({
    where: {token},
    relations: ['user']
  })

  if(session) {
    return session.user
  } else {
    return null;
  }
}