const { model, Schema } = require("mongoose");

const AccountSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Need a username"],
      default: null,
    },
    funds: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = model("Accounts", AccountSchema);
