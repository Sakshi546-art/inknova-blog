
import Comment from "../models/Comment.js";
import Blog from "../models/Blog.js";

// CREATE COMMENT
export const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { blogId } = req.params;

    if (!content) {
      return res.status(400).json({
        message: "Comment content is required.",
      });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
      });
    }

    const comment = await Comment.create({
      content,
      author: req.user._id,
      blog: blogId,
    });

    const populatedComment = await comment.populate(
      "author",
      "name email"
    );

    res.status(201).json({
      message: "Comment added successfully.",
      comment: populatedComment,
    });
  } catch (error) {
    console.error("Create comment error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET COMMENTS FOR A BLOG
export const getComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    const comments = await Comment.find({ blog: blogId })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      comments,
    });
  } catch (error) {
    console.error("Get comments error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// DELETE COMMENT
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found.",
      });
    }

    if (
      comment.author.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You can delete only your own comments.",
      });
    }

    await comment.deleteOne();

    res.status(200).json({
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    console.error("Delete comment error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

