import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

const resourcesFilePath = path.join(__dirname, '../data/resources.json');

const getResourcesData = () => {
  const data = fs.readFileSync(resourcesFilePath, 'utf-8');
  return JSON.parse(data).resources || [];
};

// GET /api/resources
router.get('/', (req, res) => {
  try {
    let resources = getResourcesData();
    const { type, category, search } = req.query;

    if (type) {
      resources = resources.filter(r => r.type.toLowerCase() === type.toLowerCase());
    }

    if (category) {
      resources = resources.filter(r => r.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      resources = resources.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        (r.tags && r.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    res.json({ resources });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

// GET /api/resources/type/:type
router.get('/type/:type', (req, res) => {
  try {
    const resources = getResourcesData().filter(r => r.type.toLowerCase() === req.params.type.toLowerCase());
    res.json({ resources });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resources by type' });
  }
});

// GET /api/resources/:id
router.get('/:id', (req, res) => {
  try {
    const resources = getResourcesData();
    const resource = resources.find(r => r.id === req.params.id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json({ resource });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resource' });
  }
});

export default router;
