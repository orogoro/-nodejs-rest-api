const { Post } = require('../db/postModel');

const listContacts = async () => {
  try {
    const data = await Post.find({});
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const findById = await Post.findById(contactId);

    return findById;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const removeContactById = await Post.findByIdAndRemove(contactId);
    return removeContactById;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  try {
    const newContact = new Post({ name, email, phone });
    await newContact.save();

    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  // const { name, email, phone } = body;
  try {
    const updatePost = await Post.findByIdAndUpdate(contactId, body, {
      new: true,
    });

    return updatePost;
  } catch (error) {
    console.log(error);
  }
};

const updateStatusContact = async (contactId, body) => {
  const { favorite } = body;
  try {
    const updatePost = await Post.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    );

    return updatePost;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
