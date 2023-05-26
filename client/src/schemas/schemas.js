import * as yup from 'yup';
const phoneRegExp =
  /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/;

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email inválido.')
    .required('El campo email es obligatorio.'),
  password: yup.string().required('El campo contraseña es obligatorio.'),
});

const registerSchema = yup.object().shape({
  name: yup.string().required('El campo nombre es obligatorio.'),
  email: yup
    .string()
    .email('Email inválido.')
    .required('El campo email es obligatorio.'),
  password: yup
    .string()
    .min(8, 'El campo contraseña debe contener al menos 8 caracteres.')
    .max(15, 'El campo contraseña no debe ser mayor que 15 caracteres.')
    .required('El campo contraseña es obligatorio.'),
  passwordConfirmation: yup
    .string()
    .required('Por favor, vueve a escribir tu contraseña.')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden.'),
});

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email inválido.')
    .required('El campo email es obligatorio.'),
});

const newPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'El campo contraseña debe contener al menos 8 caracteres.')
    .max(15, 'El campo contraseña no debe ser mayor que 15 caracteres.')
    .required('El campo contraseña es obligatorio.'),
  passwordConfirmation: yup
    .string()
    .required('Por favor, vueve a escribir tu contraseña.')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden.'),
});

const patientSchema = yup.object().shape({
  name: yup.string().required('El campo nombre es obligatorio.'),
  owner: yup.string().required('El campo propietario es obligatorio.'),
  email: yup
    .string()
    .email('Email inválido.')
    .required('El campo email es obligatorio.'),
  dischargeDate: yup.date().required('El campo fecha de alta es obligatorio.'),
  symptoms: yup.string().required('El campo sintomas es obligatorio.'),
});

const profileSchema = yup.object().shape({
  name: yup.string().required('El campo nombre es obligatorio.'),
  email: yup
    .string()
    .email('Email inválido.')
    .required('El campo email es obligatorio.'),
  phoneNumber: yup.string().matches(phoneRegExp, 'Número de teléfono inválido'),
  webPage: yup.string(),
});

export {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  newPasswordSchema,
  patientSchema,
  profileSchema,
};
