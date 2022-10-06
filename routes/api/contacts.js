const e = require('express');
const express = require('express');
const router = express.Router();

const { middlewaresContacts, auth } = require('../../middlewares');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../../models/contacts');

router.get('/', auth.auth, async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10, favorite } = req.query;
    const contacts = await listContacts(owner, page, limit, favorite);
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:contactId', auth.auth, async (req, res, next) => {
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

router.post(
  '/',
  auth.auth,
  middlewaresContacts.addPostValidation,
  async (req, res, next) => {
    try {
      const { _id: owner } = req.user;
      const body = req.body;

      const newContact = await addContact(body, owner);

      res.status(201).json(newContact);
    } catch (error) {
      res.status(500).json({ error: e.message });
    }
  }
);

router.delete('/:contactId', auth.auth, async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await removeContact(id);

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
});

router.put(
  '/:contactId',
  auth.auth,
  middlewaresContacts.addPutValidation,
  async (req, res, next) => {
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
  }
);

router.patch(
  '/:contactId/favorite',
  auth.auth,
  middlewaresContacts.putchValidationFavorite,
  async (req, res, next) => {
    try {
      const id = req.params.contactId;
      const body = req.body;

      const contact = await updateStatusContact(id, body);

      if (!contact) {
        return res.status(404).json({ message: 'Not found' });
      }

      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ error: e.message });
    }
  }
);

module.exports = router;
