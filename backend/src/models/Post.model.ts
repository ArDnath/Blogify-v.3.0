import {model, Schema, Types, models} from "mongoose";

interface IBlogs {
    _id:Types.ObjectId;
    title: string;
    description: string;
    content: string; 
    author: Types.ObjectId;
    imageUrl: string;
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
      required: [true, "Blog content required"],
    },
    slug: {
      type: String,
      required:true,
      unique:true,
    },
    imageUrl: { 
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

const Blog =models?.Blog|| model<IBlogs>("Blog", blogSchema);

export default Blog;