const {
  commentPost,
  fetchCommentsPost,
} = require("../services/commentService.js");

const comment = async (request, response) => {
  const [statusCode, message] = await commentPost(request);

  return response.status(statusCode).send(message);
};

const fetchComment = async (request, response) => {
  const [statusCode, message] = await fetchCommentsPost(request);

  return response.status(statusCode).send(message);
};

module.exports = { comment, fetchComment };
