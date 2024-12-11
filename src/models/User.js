import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  integrations: {
    googleMeet: {
      type: Boolean,
      default: false,
    },
    zoom: {
      type: Boolean,
      default: false,
    },
  },
  preferences: {
    notification: {
      type: Boolean,
      default: true,
    },
    timeZone: {
      type: String,
      default: "UTC",
    },
  },
  meetings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
    },
  ],
  oauthProviders: {
    google: {
      id: { type: String },
      token: { type: String },
    },
    github: {
      id: { type: String },
      token: { type: String },
    },
  },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
