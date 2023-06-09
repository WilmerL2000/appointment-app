import { emailForgotPassword } from '../helpers/emailForgotPassword.js';
import { emailRegister } from '../helpers/emailRegister.js';
import generateJWT from '../helpers/generateJWT.js';
import Vet from '../mongodb/models/Vet.js';
import { uid } from 'uid';

/**
 * This is an asynchronous function that registers a new vet by saving their name, email, and password
 * to a database and returns the saved vet's information.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc. It is
 * passed as the first parameter to the register function.
 * @param res - The `res` parameter is the response object that will be sent back to the client after
 * the request has been processed. It contains methods and properties that allow the server to send
 * data back to the client, such as `status()` to set the HTTP status code, `send()` to send a response
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await Vet.findOne({ email });
    if (existUser) {
      const error = new Error('Usuario ya registrado');
      return res.status(400).json({ msg: error.message });
    }

    const vet = new Vet({
      name,
      email,
      password,
    });

    const savedVet = await vet.save();

    /* Likely a function that sends an email to the newly registered veterinarian to confirm their
    email address. However, the implementation of the `emailRegister()` function is not shown in
    this code snippet, so it is impossible to know for sure what it does without further context. */
    emailRegister({ email, name, token: vet.token });

    res.status(201).send(savedVet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * This function returns the profile of a veterinarian in JSON format.
 * @param req - req is an object that represents the HTTP request made by the client to the server. It
 * contains information such as the request method, headers, URL, and any data sent in the request
 * body. In this code snippet, it is being used to access the "vet" property, which is presumably a
 * @param res - `res` is the response object that is used to send a response back to the client who
 * made the request. It is an instance of the `http.ServerResponse` class in Node.js. The `res.json()`
 * method is used to send a JSON response back to the client. The `res
 */
const profile = (req, res) => {
  try {
    const { veterinary } = req;
    res.json(veterinary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * This function confirms a user's account by setting their token to null and their confirmed status to
 * true.
 * @param req - The request object, which contains information about the incoming HTTP request such as
 * headers, parameters, and body.
 * @param res - The "res" parameter is the response object that is used to send a response back to the
 * client making the request. It contains methods and properties that allow the server to send data,
 * set headers, and control the HTTP status code of the response.
 */
const confirm = async (req, res) => {
  try {
    const { token } = req.params;

    const confirmedUser = await Vet.findOne({ token });

    if (!confirmedUser) {
      const error = new Error('Token inválido');
      return res.status(404).json({ msg: error.message });
    }

    confirmedUser.token = null;
    confirmedUser.confirmed = true;
    await confirmedUser.save();

    res.status(200).json({ msg: 'Usuario confirmado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * This is an authentication function that checks if a user exists, if their email is confirmed, and if
 * their password is correct before generating a JSON web token.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc.
 * @param res - The "res" parameter is the response object that will be sent back to the client with
 * the result of the authentication process. It contains methods to set the HTTP status code, headers,
 * and body of the response.
 */
const authenticate = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Vet.findOne({ email });

    if (!user) {
      const error = new Error('El usuario no existe');
      return res.status(403).json({ msg: error.message });
    }

    if (!user.confirmed) {
      const error = new Error('Su correo no ha sido confirmado');
      return res.status(403).json({ msg: error.message });
    }

    if (await user.checkPassword(password)) {
      const token = generateJWT(user._id);
      res.status(200).json({ token, user });
    } else {
      const error = new Error('Contraseña incorrecta');
      return res.status(403).json({ msg: error.message });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * This function handles a forgot password request for a veterinary platform by generating a token and
 * sending an email with instructions.
 * @param req - The request object, which contains information about the incoming HTTP request such as
 * headers, parameters, and body.
 * @param res - The "res" parameter is the response object that will be sent back to the client with
 * the result of the request. It contains methods to set the HTTP status code, headers, and body of the
 * response.
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const existVet = await Vet.findOne({ email });

    if (!existVet) {
      const error = new Error('El usuario no existe');
      return res.status(400).json({ msg: error.message });
    }

    existVet.token = uid(25);
    await existVet.save();

    emailForgotPassword({
      email,
      name: existVet.name,
      token: existVet.token,
    });

    res.json({ msg: 'Hemos enviado un email con las instrucciones' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * This function checks if a given token is valid and returns a message accordingly.
 * @param req - The request object, which contains information about the incoming HTTP request such as
 * headers, parameters, and body.
 * @param res - The "res" parameter is the response object that is used to send a response back to the
 * client who made the request. It contains methods such as "json" and "status" that are used to set
 * the response status code and send a JSON response back to the client.
 */
const findOutToken = async (req, res) => {
  try {
    const { token } = req.params;

    const validToken = await Vet.findOne({ token });

    if (validToken) {
      res.json({ msg: 'Token válido' });
    } else {
      const error = new Error('Token inválido');
      return res.status(400).json({ msg: error.message });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * This function updates the password of a veterinarian user based on a token and a new password
 * provided in the request body.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request parameters, headers, and body. It is passed as the first
 * parameter to the newPassword function.
 * @param res - The "res" parameter is the response object that is sent back to the client after the
 * server has processed the request. It contains information such as the status code, headers, and data
 * that will be sent back to the client.
 */
const newPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const vet = await Vet.findOne({ token });

    if (!vet) {
      const error = new Error('Hubo un error');
      return res.status(400).json({ msg: error.message });
    }

    vet.token = null;
    vet.password = password;
    await vet.save();

    res.status(201).send({ msg: 'Contraseña modificada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * This function edits a veterinary profile and returns the updated profile.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc.
 * @param res - The `res` parameter is the response object that will be sent back to the client with
 * the updated data or an error message. It contains methods to set the HTTP status code, headers, and
 * body of the response.
 * @returns a JSON response with the updated veterinary object if the update was successful, or an
 * error message if there was an error.
 */
const editProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, webPage, phoneNumber } = req.body;

    const veterinary = await Vet.findById(id);

    if (veterinary.email !== email) {
      const emailExist = await Vet.findOne({ email });
      if (emailExist) {
        const error = new Error('Este correo ya existe');
        return res.status(400).json({ msg: error.message });
      }
    }

    if (!veterinary) {
      const error = new Error('Hubo un error');
      return res.status(400).json({ msg: error.message });
    }

    veterinary.name = name;
    veterinary.email = email;
    veterinary.webPage = webPage;
    veterinary.phoneNumber = phoneNumber;

    const updated = await veterinary.save();

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * This function updates the password of a veterinary user and returns a success message if the actual
 * password provided is correct.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc.
 * @param res - The "res" parameter in the function "updatePassword" is the response object that will
 * be sent back to the client with the updated password or an error message. It is used to set the HTTP
 * status code and send the response data.
 * @returns The function is not returning anything explicitly, but it is sending a response to the
 * client using the `res` object. The response will be a JSON object with a `msg` property, which will
 * either be "Contraseña modificada correctamente" (if the password was successfully updated) or an
 * error message (if there was an error or the actual password was incorrect).
 */
const updatePassword = async (req, res) => {
  try {
    const { actualPassword, newPassword } = req.body;
    const { _id } = req.veterinary;

    const veterinary = await Vet.findById(_id);

    if (!veterinary) {
      const error = new Error('Hubo un error');
      return res.status(400).json({ msg: error.message });
    }

    if (await veterinary.checkPassword(actualPassword)) {
      veterinary.password = newPassword;
      await veterinary.save();
      res.status(200).json({ msg: 'Contraseña modificada correctamente' });
    } else {
      const error = new Error('La contraseña actual es incorrecta');
      return res.status(400).json({ msg: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

export {
  register,
  profile,
  confirm,
  authenticate,
  forgotPassword,
  findOutToken,
  newPassword,
  editProfile,
  updatePassword,
};
