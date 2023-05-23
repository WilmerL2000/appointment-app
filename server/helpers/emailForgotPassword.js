import nodemailer from 'nodemailer';

const emailForgotPassword = async ({ email, name, token }) => {
  const transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const info = await transport.sendMail({
    from: 'APV - Administrador de Pacientes de Veterinaria',
    to: email,
    subject: 'Restablece tu contraseña',
    text: 'Restablece tu contraseña',
    html: `
        <p>Hola, ${name}, has solicitado restablecer tu contraseña.</p>
        <p>Siguiente enlace para establecer la nueva contraseña:
            <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Restablecer contraseña</a>
        </p>
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
     
    `,
  });
};

export { emailForgotPassword };
