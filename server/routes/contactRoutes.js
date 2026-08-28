import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

const contactsFilePath = path.join(__dirname, '../data/contacts.json');

const getContacts = () => {
  if (!fs.existsSync(contactsFilePath)) return [];
  const data = fs.readFileSync(contactsFilePath, 'utf-8');
  return JSON.parse(data).contacts || [];
};

const saveContacts = (contacts) => {
  fs.writeFileSync(contactsFilePath, JSON.stringify({ contacts }, null, 2));
};

// POST /api/contacts/submit
router.post('/submit', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const contacts = getContacts();
    const newEntry = {
      id: `CNT${Date.now()}`,
      name,
      email,
      subject: subject || 'General Query',
      message,
      createdAt: new Date().toISOString()
    };

    contacts.push(newEntry);
    saveContacts(contacts);

    res.json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

export default router;
