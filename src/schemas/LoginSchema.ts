import Joi from "joi";

const LoginSchema  = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string()
});

export default LoginSchema;