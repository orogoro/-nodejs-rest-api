const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.resolve('./models/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    // console.table(JSON.parse(data));
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
    // console.log(getContactFilterById);
    return getContactFilterById;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');

    const removeContactFilterById = JSON.parse(data).filter(
      (item) => item.id !== contactId
    );

    const stringifyContacts = JSON.stringify(removeContactFilterById);

    await fs.writeFile(contactsPath, stringifyContacts, 'utf8');
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
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const parseData = JSON.parse(data);

    const contactById = parseData.find((item) => item.id === contactId);

    const updeateContactInformation = { ...contactById, ...body };

    const newData = parseData.map((item) => {
      if (item.id === contactId) {
        const newContact = { ...item, ...updeateContactInformation };
        return newContact;
      }

      return item;
    });

    const stringifyContact = JSON.stringify(newData);
    await fs.writeFile(contactsPath, stringifyContact, 'utf8');
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
