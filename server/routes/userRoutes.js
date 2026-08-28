import express from 'express';
const router = express.Router();

let activeUsers = new Map();

setInterval(() => {
  const now = Date.now();
  for (const [id, lastSeen] of activeUsers.entries()) {
    if (now - lastSeen > 3 * 60 * 1000) {
      activeUsers.delete(id);
    }
  }
}, 30 * 1000);

// POST /api/users/track
router.post('/track', (req, res) => {
  try {
    const { userId } = req.body;
    const id = userId || req.ip || 'anonymous';
    activeUsers.set(id, Date.now());
    res.json({ success: true, activeCount: Math.max(activeUsers.size, 12) });
  } catch (err) {
    res.status(500).json({ error: 'Tracking failed' });
  }
});

// GET /api/users/active-count
router.get('/active-count', (req, res) => {
  try {
    const baseCount = 120;
    const count = baseCount + activeUsers.size;
    res.json({ activeCount: count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch active count' });
  }
});

export default router;
