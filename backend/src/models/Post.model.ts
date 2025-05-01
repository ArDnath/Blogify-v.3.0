import {model, Schema, Document, Types} from "mongoose";

interface IBlogs extends Document{

    title: string;
    description: string;
    content: string; // New field
    author: Types.ObjectId;
    images: string;
}

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Blog description required"],
    },
    content: {
      type: String,
      required: [true, "Blog content required"], // New field
    },
    slug: {
      type: String,
      required:true,
      unique:true,
    },
    image: { 
      type: String, 
      required: true 
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = model<IBlogs>("Blog", blogSchema);

export default Blog;