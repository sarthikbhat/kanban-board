import { IUser } from '@/app/addproject/page';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const SignUpFormSchema = Yup.object().shape({
  password: Yup.string().required('Required Field').min(6, 'Password length should be at least 6 characters'),
  confirmpassword: Yup.string()
    .required('Required Field')
    .min(6, 'Password length should be at least 6 characters')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
  userName: Yup.string().required('Required Field'),
  fullName: Yup.string().required('Required Field'),
  email: Yup.string().required('Required Field').email('Please provide a valid email')
});

export const SignUpFormSchemaResolver = yupResolver(SignUpFormSchema);

const LoginSchema = Yup.object().shape({
  password: Yup.string().required('Required Field'),
  email: Yup.string().required('Required Field').email('Please provide a valid email')
});

export const LoginSchemaResolver = yupResolver(LoginSchema);

const TaskSchema = Yup.object().shape({
  taskName: Yup.string().required('Required Field'),
  taskDesc: Yup.string().required('Required Field'),
  estimation: Yup.number().required('Required Field'),
  actual: Yup.number().transform((value) => (isNaN(value) || value === null || value === undefined ? 0 : value)),
  assignedTo: Yup.string().required('Required Field'),
  priority: Yup.string().required('Required Field'),
  project: Yup.string().required('Required Field'),
  column: Yup.string().required('Required Field')
});

export const TaskSchemaResolver = yupResolver(TaskSchema);
