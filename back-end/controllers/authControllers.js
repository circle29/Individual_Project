const { register, login, verification } = require("../services/authService.js");

const registerAuth = async (request, response) => {
  const [statusCode, message] = await register(request);

  return response.status(statusCode).send(message);
};

const loginAuth = async (request, response) => {
  const [statusCode, message] = await login(request);

  return response.status(statusCode).send(message);
};

const verificationAuth = async (request, response) => {
  let token = request.headers.authorization;
  token = token.split(" ")[1];
  const [statusCode, message] = await verification(token);

  return response.status(statusCode).send(message);
};

module.exports = { registerAuth, verificationAuth, loginAuth };
