import Patient from '../mongodb/models/Patient.js';

/**
 * This function adds a new patient to the database and associates it with a veterinary.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc. It is
 * passed as a parameter to the addPatient function.
 * @param res - `res` is the response object that is sent back to the client after the server has
 * processed the request. It contains information such as the status code, headers, and the response
 * body. In this case, `res` is used to send a response with a status code of 201 and the
 */
const addPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    patient.veterinary = req.veterinary._id;
    await patient.save();

    res.status(201).send({ patient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * This function retrieves all patients associated with a specific veterinary and sends them as a
 * response.
 * @param req - req stands for "request" and it is an object that contains information about the HTTP
 * request that was made to the server. It includes information such as the request method (e.g. GET,
 * POST), the request headers, the request URL, and any data that was sent in the request body.
 * @param res - `res` is the response object that is used to send the response back to the client. It
 * is an instance of the `http.ServerResponse` class in Node.js. In this code snippet, `res` is used to
 * send a response with a status code of 200 and the list of
 */
const getPatients = async (req, res) => {
  const patients = await Patient.find({ veterinary: req.veterinary });
  res.status(200).send(patients);
};

/**
 * This is an asynchronous function that retrieves a patient by ID and checks if the requesting
 * veterinary has permission to access it.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request parameters, headers, and body. It is passed as the first
 * parameter to the getPatient function.
 * @param res - The "res" parameter is the response object that will be sent back to the client after
 * the function is executed. It contains methods to set the HTTP status code, headers, and body of the
 * response.
 * @returns The function `getPatient` is returning either a 404 status with a message "No encontrado"
 * if the patient is not found, a 403 status with a message "Acción no válida" if the veterinary ID of
 * the patient does not match the veterinary ID of the authenticated user, or a 200 status with the
 * patient object if the patient is found and the veterinary ID matches. If
 */
const getPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).send({ msg: 'No encontrado' });
    }

    if (patient.veterinary._id.toString() !== req.veterinary._id.toString()) {
      return res.status(403).send({ msg: 'Acción no válida' });
    }

    res.status(200).send(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * This is an asynchronous function that updates a patient's information and returns the updated
 * patient object, but only if the requesting veterinary has permission to do so.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request parameters, headers, and body. It is passed as the first
 * parameter to the updatePatient function.
 * @param res - `res` is the response object that is sent back to the client after the server has
 * processed the request. It contains information such as the status code, headers, and response body.
 * In this case, `res` is used to send the updated patient object back to the client with a status code
 * @returns the updated patient object with the new values for the specified fields (name, owner,
 * email, dischargeDate, symptoms). If the patient is not found, a 404 error message is returned. If
 * the veterinary ID of the user making the request does not match the veterinary ID of the patient, a
 * 403 error message is returned. If there is any other error, a
 */
const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, owner, email, dischargeDate, symptoms } = req.body;
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).send({ msg: 'No encontrado' });
    }

    if (patient.veterinary._id.toString() !== req.veterinary._id.toString()) {
      return res.status(403).send({ msg: 'Acción no válida' });
    }

    patient.name = name || patient.name;
    patient.owner = owner || patient.owner;
    patient.email = email || patient.email;
    patient.dischargeDate = dischargeDate || patient.dischargeDate;
    patient.symptoms = symptoms || patient.symptoms;

    const updatedPatient = await patient.save();

    res.status(200).send(updatedPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * This function deletes a patient from the database if the authenticated veterinary has permission to
 * do so.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request parameters, headers, body, etc. It is passed as a
 * parameter to the deletePatient function.
 * @param res - The "res" parameter in the function represents the HTTP response that will be sent back
 * to the client making the request. It is an object that contains information about the response, such
 * as the status code, headers, and data. The function uses the "res" parameter to send a response back
 * to
 * @returns The function `deletePatient` is not returning anything explicitly, but it is sending a
 * response to the client using the `res` object. If the patient is not found, it sends a 404 status
 * code with a message. If the logged-in veterinary does not have permission to delete the patient, it
 * sends a 403 status code with a message. If the patient is successfully deleted, it sends
 */
const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).send({ msg: 'No encontrado' });
    }

    if (patient.veterinary._id.toString() !== req.veterinary._id.toString()) {
      return res.status(403).send({ msg: 'Acción no válida' });
    }

    await patient.deleteOne();
    res.status(200).send({ msg: 'Paciente eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { addPatient, getPatients, getPatient, updatePatient, deletePatient };
