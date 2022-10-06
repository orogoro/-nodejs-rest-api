const { Contacts } = require('../db/contactsModel');

const listContacts = async (owner, page, limit, favorite) => {
  try {
    const skip = (page - 1) * limit;
    const data = await Contacts.find(
      favorite ? { owner, favorite } : { owner },
      '-createdAt -updatedAt',
      { skip, limit }
    ).populate('owner', 'email subscription');

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

const addContact = async (body, owner) => {
  const { name, email, phone } = body;
  try {
    const newContact = new Contacts({ name, email, phone, owner });
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
