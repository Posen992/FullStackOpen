const commentRouter = require("express").Router();
const Comment = require("../models/comment_model");
const Blog = require("../models/blog_model");
const User = require("../models/user_model");
const { response } = require("../App");

commentRouter.get("/:id", async (request, response) => {
  const comments = await Comment.find(
    { blog: request.params.id }
  );

  console.log(comments);
  response.json(comments);
});

commentRouter.post("/:id", async (request, response) => {
  const { content, author } = request.body;
  const user = await User.findById(request.user.id);
  const blog = await Blog.findById(request.params.id);

  const comment = new Comment({
    content,
    author,
    user: user.id,
    blog: blog.id,
  });

  const savedComment = await comment.save();
  console.log(savedComment);
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();

  response.status(201).json(savedComment);
});

module.exports = commentRouter;
