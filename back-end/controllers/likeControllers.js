const db = require("../models");
const like = db.Like;
const post = db.Post;

const { likeService, unlikeService } = require("../services/likeService.js");

module.exports = {
  like: async (request, response) => {
    const [statusCode, message] = await likeService(request);
    return response.status(statusCode).send(message);
  },
  unlike: async (request, response) => {
    const [statusCode, message] = await unlikeService(request);
    return response.status(statusCode).send(message);
  },
};
