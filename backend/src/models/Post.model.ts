import {model, Schema, Document, Types} from "mongoose";

interface IBlogs extends Document{

    title: string;
    description: string;
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
    slug: {
      type: String,
      required:true,
      unique:true,
    },
    images: {
        type:String
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