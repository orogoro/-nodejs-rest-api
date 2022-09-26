// const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

const contactsSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Post = model('contacts', contactsSchema);

module.exports = {
  Post,
};
