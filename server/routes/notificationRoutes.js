import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

const subscribersFilePath = path.join(__dirname, '../data/subscribers.json');

const getSubscribers = () => {
  if (!fs.existsSync(subscribersFilePath)) return [];
  const data = fs.readFileSync(subscribersFilePath, 'utf-8');
  return JSON.parse(data).subscribers || [];
};

const saveSubscribers = (subscribers) => {
  fs.writeFileSync(subscribersFilePath, JSON.stringify({ subscribers }, null, 2));
};

// POST /api/notifications/subscribe
router.post('/subscribe', (req, res) => {
  try {
    const { email, name, sectors, qualifications } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const subscribers = getSubscribers();
    const existingIndex = subscribers.findIndex(s => s.email.toLowerCase() === email.toLowerCase());

    if (existingIndex >= 0) {
      subscribers[existingIndex] = {
        ...subscribers[existingIndex],
        name: name || subscribers[existingIndex].name,
        sectors: sectors || subscribers[existingIndex].sectors,
        qualifications: qualifications || subscribers[existingIndex].qualifications,
        isActive: true,
        updatedAt: new Date().toISOString()
      };
    } else {
      subscribers.push({
        id: `SUB${Date.now()}`,
        email,
        name: name || '',
        sectors: sectors || [],
        qualifications: qualifications || [],
        subscribedAt: new Date().toISOString(),
        isActive: true,
        notificationsEnabled: true
      });
    }

    saveSubscribers(subscribers);
    res.json({ success: true, message: 'Successfully subscribed to job alerts' });
  } catch (err) {
    res.status(500).json({ error: 'Subscription failed' });
  }
});

// DELETE /api/notifications/unsubscribe
router.delete('/unsubscribe', (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    let subscribers = getSubscribers();
    subscribers = subscribers.map(s => {
      if (s.email.toLowerCase() === email.toLowerCase()) {
        return { ...s, isActive: false };
      }
      return s;
    });

    saveSubscribers(subscribers);
    res.json({ success: true, message: 'Unsubscribed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to unsubscribe' });
  }
});

export default router;
