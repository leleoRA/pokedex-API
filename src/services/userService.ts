import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import User from "../entities/User";

export async function SignUp(user: any) {
  const userRepository = getRepository(User);

  const {email, password} = user

  const existingUser = await validateEmail(email);

  if(existingUser) return false

  const hashedPassword = bcrypt.hashSync(password, 10);

  await userRepository.insert({email, password: hashedPassword});

  return true
}


export async function validateEmail (email: string) {
  const user = await getRepository(User).findOne({
    select: ["email"],
    where: {email}
  });
  
  return user;
}

export async function getUsers () {
  const users = await getRepository(User).find({
    select: ["id", "email"]
  });
  
  return users;
}
