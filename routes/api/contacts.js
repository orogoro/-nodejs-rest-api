const e = require('express');
const express = require('express');
const Joi = require('joi');

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
    const id = req.params.contactId;
    const contact = await getContactById(id);
    console.log(contact);

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;

    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .required(),
      phone: Joi.string().alphanum().min(7).max(10).required(),
    });

    const validationResult = schema.validate(body);

    if (validationResult.error) {
      return res.status(400).json({ message: 'missing required name field' });
    }

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

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const body = req.body;

    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).optional(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .optional(),
      phone: Joi.string().alphanum().min(7).max(10).optional(),
    }).min(1);

    const validationResult = schema.validate(body);

    if (validationResult.error) {
      return res.status(400).json({ message: 'missing fields' });
    }

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
