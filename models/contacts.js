const { Contacts } = require('../db/postModel');

const listContacts = async () => {
  try {
    const data = await Contacts.find({});
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const findById = await Contacts.findById(contactId);

    return findById;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const removeContactById = await Contacts.findByIdAndRemove(contactId);
    return removeContactById;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  try {
    const newContact = new Contacts({ name, email, phone });
    await newContact.save();

    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  // const { name, email, phone } = body;
  try {
    const updatePost = await Contacts.findByIdAndUpdate(contactId, body, {
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
    const updatePost = await Contacts.findByIdAndUpdate(
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
