const e = require('express');
const express = require('express');

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.id;
    const contact = await getContactById(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact was not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    await addContact(body);

    res.status(200).json({ message: 'Add new contact' });
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.id;
    await removeContact(id);

    res.status(200).json({ message: 'Successful delete contact' });
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    await updateContact(id, body);

    res.status(200).json({ message: 'Successful update contact' });
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
