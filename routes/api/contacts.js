const e = require('express');
const express = require('express');
const router = express.Router();

const {
  addPostValidation,
  addPutValidation,
} = require('../../middlewares/validationMiddlewares');

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
    const id = req.params.contactId;
    const contact = await getContactById(id);

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/', addPostValidation, async (req, res, next) => {
  try {
    const body = req.body;

    const newContact = await addContact(body);

    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await removeContact(id);
    console.log(contact);

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/:contactId', addPutValidation, async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const body = req.body;

    const contact = await updateContact(id, body);

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
