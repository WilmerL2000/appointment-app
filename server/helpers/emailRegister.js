import nodemailer from 'nodemailer';

const emailRegister = async ({ email, name, token }) => {
  const transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const info = await transport.sendMail({
    from: '"Administrador de Pacientes de Veterinaria" - <apv@gmail.com>',
    to: email,
    subject: 'Comprueba tu cuenta en APV',
    text: 'Comprueba tu cuenta en APV',
    html: `
        <p>Hola, ${name}, comprueba tu cuenta en APV.</p>
        <p>Tu cuenta ya está lista, solo debes comprobarla en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/confirm-account/${token}">Comprobar cuenta</a>
        </p>
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
     
    `,
  });
};

export { emailRegister };
