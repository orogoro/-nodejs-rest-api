const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.resolve('./models/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const getContactFilterById = JSON.parse(data).filter(
      (item) => item.id === contactId
    );

    if (getContactFilterById.length === 0) {
      return;
    }

    return getContactFilterById;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const parseData = JSON.parse(data);

    const findById = parseData.some((item) => item.id === contactId);

    if (!findById) {
      return;
    }

    const removeContactFilterById = parseData.filter(
      (item) => item.id !== contactId
    );

    const stringifyContacts = JSON.stringify(removeContactFilterById);
    await fs.writeFile(contactsPath, stringifyContacts, 'utf8');

    return removeContactFilterById;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  try {
    const data = await fs.readFile(contactsPath, 'utf8');

    const parseData = JSON.parse(data);
    const lastId = parseData.slice(-1)[0].id;
    const newContact = {
      id: (Number(lastId) + 1).toString(),
      name,
      email,
      phone,
    };
    const newMass = [...parseData, newContact];

    const stringifyContacts = JSON.stringify(newMass);
    await fs.writeFile(contactsPath, stringifyContacts, 'utf8');

    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  // const { name, email, phone } = body;
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const parseData = JSON.parse(data);

    const contactById = parseData.find((item) => item.id === contactId);

    if (!contactById) {
      return;
    }

    const updeateContactInformation = { ...contactById, ...body };

    const newData = parseData.map((item) => {
      if (item.id === contactId) {
        return updeateContactInformation;
      }
      return item;
    });

    // const newData = parseData.map((item) => {
    //   if (item.id === contactId) {
    //     item.name = name;
    //     item.email = email;
    //     item.phone = phone;
    //   }

    //   if (item.id !== contactId) {
    //     return undefined
    //   }

    //   return item;
    // });
    // console.log(newData);

    const stringifyContact = JSON.stringify(newData);
    await fs.writeFile(contactsPath, stringifyContact, 'utf8');

    return updeateContactInformation;
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
};
