import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

const jobsFilePath = path.join(__dirname, '../data/jobs.json');

const getJobsData = () => {
  const data = fs.readFileSync(jobsFilePath, 'utf-8');
  return JSON.parse(data).jobs || [];
};

// GET /api/jobs - List and filter jobs
router.get('/', (req, res) => {
  try {
    let jobs = getJobsData();
    const { qualification, sector, state, search, featured, page = 1, limit = 10 } = req.query;

    if (qualification) {
      jobs = jobs.filter(j => j.qualification.toLowerCase() === qualification.toLowerCase());
    }

    if (sector) {
      jobs = jobs.filter(j => j.sector.toLowerCase() === sector.toLowerCase());
    }

    if (state && state !== 'All States') {
      jobs = jobs.filter(j => j.state.toLowerCase() === state.toLowerCase() || j.state === 'All States');
    }

    if (featured === 'true') {
      jobs = jobs.filter(j => j.featured === true);
    }

    if (search) {
      const q = search.toLowerCase();
      jobs = jobs.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.organization.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q) ||
        (j.tags && j.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    const total = jobs.length;
    const p = parseInt(page, 10);
    const l = parseInt(limit, 10);
    const startIndex = (p - 1) * l;
    const paginatedJobs = jobs.slice(startIndex, startIndex + l);

    res.json({
      jobs: paginatedJobs,
      pagination: {
        total,
        page: p,
        limit: l,
        totalPages: Math.ceil(total / l) || 1
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// GET /api/jobs/featured
router.get('/featured', (req, res) => {
  try {
    const jobs = getJobsData().filter(j => j.featured === true);
    res.json({ jobs });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch featured jobs' });
  }
});

// GET /api/jobs/sectors
router.get('/sectors', (req, res) => {
  try {
    const jobs = getJobsData();
    const sectors = [...new Set(jobs.map(j => j.sector))].filter(Boolean);
    res.json({ sectors });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sectors' });
  }
});

// GET /api/jobs/qualifications
router.get('/qualifications', (req, res) => {
  try {
    const jobs = getJobsData();
    const qualifications = [...new Set(jobs.map(j => j.qualification))].filter(Boolean);
    res.json({ qualifications });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch qualifications' });
  }
});

// GET /api/jobs/states
router.get('/states', (req, res) => {
  try {
    const jobs = getJobsData();
    const states = [...new Set(jobs.map(j => j.state))].filter(Boolean);
    res.json({ states });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch states' });
  }
});

// GET /api/jobs/:id
router.get('/:id', (req, res) => {
  try {
    const jobs = getJobsData();
    const job = jobs.find(j => j.id === req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ job });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch job details' });
  }
});

export default router;
