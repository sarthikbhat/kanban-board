import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const SignUpFormSchema = Yup.object().shape({
  password: Yup.string()
    .required("Required Field")
    .min(6, "Password length should be at least 6 characters"),
  confirmpassword: Yup.string()
    .required("Required Field")
    .min(6, "Password length should be at least 6 characters")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
  userName: Yup.string().required("Required Field"),
  fullName: Yup.string().required("Required Field"),
  email: Yup.string()
    .required("Required Field")
    .email("Please provide a valid email"),
});

export const SignUpFormSchemaResolver = yupResolver(SignUpFormSchema)

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .required("Required Field"),
  email: Yup.string()
    .required("Required Field")
    .email("Please provide a valid email"),
});

export const LoginSchemaResolver = yupResolver(LoginSchema)