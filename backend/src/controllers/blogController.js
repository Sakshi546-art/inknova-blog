
import Blog from "../models/Blog.js";

const populate = (query) => query.populate("author", "name email bio");

// GET ALL BLOGS
export const getBlogs = async (req, res) => {
  try {
    const blogs = await populate(
      Blog.find().sort({ createdAt: -1 })
    );

    res.status(200).json({ blogs });
  } catch (error) {
    console.error("Get blogs error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET SINGLE BLOG
export const getBlog = async (req, res) => {
  try {
    const blog = await populate(
      Blog.findById(req.params.id)
    );

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
      });
    }

    res.status(200).json({ blog });
  } catch (error) {
    console.error("Get blog error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// CREATE BLOG
export const createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      category,
      coverImage,
      tags,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required.",
      });
    }

    const blog = await Blog.create({
      title,
      content,
      excerpt: excerpt || "",
      category: category || "General",
      coverImage: coverImage || "",
      tags: tags || [],
      author: req.user._id,
    });

    const populatedBlog = await blog.populate(
      "author",
      "name email bio"
    );

    res.status(201).json({
      message: "Blog created successfully.",
      blog: populatedBlog,
    });
  } catch (error) {
    console.error("Create blog error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// UPDATE BLOG
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
      });
    }

    if (
      blog.author.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You can edit only your own blogs.",
      });
    }

    const {
      title,
      content,
      excerpt,
      category,
      coverImage,
      tags,
    } = req.body;

    blog.title = title ?? blog.title;
    blog.content = content ?? blog.content;
    blog.excerpt = excerpt ?? blog.excerpt;
    blog.category = category ?? blog.category;
    blog.coverImage = coverImage ?? blog.coverImage;
    blog.tags = tags ?? blog.tags;

    await blog.save();

    const populatedBlog = await blog.populate(
      "author",
      "name email bio"
    );

    res.status(200).json({
      message: "Blog updated successfully.",
      blog: populatedBlog,
    });
  } catch (error) {
    console.error("Update blog error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// DELETE BLOG
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
      });
    }

    if (
      blog.author.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You can delete only your own blogs.",
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      message: "Blog deleted successfully.",
    });
  } catch (error) {
    console.error("Delete blog error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

