# Government Job Portal - Implementation Plan

## Tech Stack Overview
- **Frontend:** React 18 + Vite + Tailwind CSS + React Router v6
- **Backend:** Node.js + Express.js (serves React build + API)
- **Data:** Mock JSON files (no database)
- **Notifications:** Browser Notification API + Email subscription
- **Deployment:** Single server serving both frontend and backend

---

## 1. Complete File/Folder Structure

```
C:\Users\M.Abdul Rehman\Desktop\New folder\project\
├── package.json                    # Root package.json (scripts for both)
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
├── .gitignore
├── README.md
│
├── public/                         # Static assets
│   ├── favicon.ico
│   ├── logo.svg
│   └── notification-icon.png
│
├── src/                            # React Frontend
│   ├── main.jsx                    # React entry point
│   ├── App.jsx                     # Root component with routing
│   ├── index.css                   # Global styles + Tailwind imports
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── Layout/
│   │   │   ├── Header.jsx          # Navigation header
│   │   │   ├── Footer.jsx          # Footer with links
│   │   │   └── Layout.jsx          # Wrapper component
│   │   │
│   │   ├── common/
│   │   │   ├── JobCard.jsx         # Job listing card
│   │   │   ├── FilterBar.jsx       # Filter sidebar/dropdown
│   │   │   ├── SearchBar.jsx       # Search input component
│   │   │   ├── Pagination.jsx      # Pagination controls
│   │   │   ├── LoadingSpinner.jsx  # Loading indicator
│   │   │   └── ErrorMessage.jsx    # Error display component
│   │   │
│   │   ├── home/
│   │   │   ├── HeroSection.jsx     # Hero banner section
│   │   │   ├── RecentJobs.jsx      # Recently released jobs grid
│   │   │   ├── QuickLinks.jsx      # Quick navigation links
│   │   │   └── StatsSection.jsx    # Statistics display
│   │   │
│   │   ├── job/
│   │   │   ├── JobDetails.jsx      # Full job details display
│   │   │   ├── JobRequirements.jsx # Requirements section
│   │   │   ├── ImportantDates.jsx  # Deadline information
│   │   │   └── ApplyButton.jsx     # Application CTA
│   │   │
│   │   ├── resources/
│   │   │   ├── ResourceCard.jsx    # Resource item card
│   │   │   ├── ResourceFilter.jsx  # Resource category filter
│   │   │   └── DownloadButton.jsx  # PDF download button
│   │   │
│   │   └── notifications/
│   │       ├── NotificationPopup.jsx   # Push notification opt-in
│   │       ├── EmailSubscription.jsx   # Newsletter form
│   │       └── NotificationBell.jsx    # Notification icon
│   │
│   ├── pages/                      # Route pages
│   │   ├── HomePage.jsx            # Homepage
│   │   ├── JobDetailsPage.jsx      # Job details page
│   │   ├── ResourcesPage.jsx       # Resources/download page
│   │   ├── SearchPage.jsx          # Search results page
│   │   └── NotFoundPage.jsx        # 404 page
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useJobs.js              # Fetch and filter jobs
│   │   ├── useResources.js         # Fetch resources
│   │   ├── useNotifications.js     # Handle notifications
│   │   └── useFilters.js           # Filter state management
│   │
│   ├── context/                    # React Context
│   │   ├── FilterContext.jsx       # Filter state provider
│   │   └── NotificationContext.jsx # Notification state provider
│   │
│   ├── services/                   # API service layer
│   │   └── api.js                  # API client functions
│   │
│   ├── utils/                      # Utility functions
│   │   ├── constants.js            # App constants
│   │   ├── helpers.js              # Helper functions
│   │   └── dateUtils.js            # Date formatting
│   │
│   └── data/                       # Frontend mock data (backup)
│       └── sampleData.js           # Sample data for development
│
├── server/                         # Backend
│   ├── index.js                    # Express server entry point
│   ├── routes/                     # API route handlers
│   │   ├── jobRoutes.js            # /api/jobs endpoints
│   │   ├── resourceRoutes.js       # /api/resources endpoints
│   │   └── notificationRoutes.js   # /api/notifications endpoints
│   │
│   ├── data/                       # Mock JSON data
│   │   ├── jobs.json               # Job listings data
│   │   ├── resources.json          # Resources data
│   │   └── subscribers.json        # Email subscribers
│   │
│   └── middleware/                  # Express middleware
│       ├── errorHandler.js         # Global error handler
│       └── validateRequest.js      # Request validation
│
└── dist/                           # Vite build output (auto-generated)
    └── index.html
```

---

## 2. Mock Data Schema

### jobs.json Schema
```json
{
  "jobs": [
    {
      "id": "JOB001",
      "title": "SSC CGL 2024 - Group B & C Posts",
      "organization": "Staff Selection Commission",
      "shortName": "SSC",
      "sector": "SSC",
      "qualification": "Graduate",
      "location": "All India",
      "state": "All States",
      "vacancies": 7500,
      "salaryRange": {
        "min": 25500,
        "max": 81100,
        "payLevel": "Pay Level 4-7"
      },
      "ageLimit": {
        "min": 18,
        "max": 32,
        "relaxation": "As per government norms"
      },
      "education": [
        "Bachelor's Degree from a recognized university",
        "Computer proficiency required"
      ],
      "experience": "No experience required",
      "selectionProcess": [
        "Tier-I Computer Based Examination",
        "Tier-II Computer Based Examination",
        "Document Verification",
        "Medical Examination"
      ],
      "applicationFee": {
        "general": 100,
        "scSt": 0,
        "women": 0
      },
      "importantDates": {
        "notificationDate": "2024-06-15",
        "applicationStart": "2024-06-20",
        "applicationEnd": "2024-07-20",
        "examDate": "2024-09-15",
        "resultDate": "2024-12-01"
      },
      "howToApply": "Apply online through ssc.nic.in",
      "officialWebsite": "https://ssc.nic.in",
      "notificationPdf": "/resources/SSC_CGL_2024_Notification.pdf",
      "description": "Staff Selection Commission invites applications for Combined Graduate Level Examination 2024 for recruitment to various Group B and Group C posts.",
      "eligibility": [
        "Indian Citizenship",
        "Age between 18-32 years",
        "Graduate degree from recognized university"
      ],
      "tags": ["graduate", "government", "pan-india", "group-b", "group-c"],
      "featured": true,
      "postedDate": "2024-06-15",
      "status": "active"
    }
  ]
}
```

### resources.json Schema
```json
{
  "resources": [
    {
      "id": "RES001",
      "title": "SSC CGL 2024 Official Syllabus",
      "type": "syllabus",
      "category": "SSC",
      "description": "Complete syllabus for Tier-I and Tier-II examinations",
      "fileName": "SSC_CGL_2024_Syllabus.pdf",
      "filePath": "/downloads/SSC_CGL_2024_Syllabus.pdf",
      "fileSize": "2.5 MB",
      "uploadDate": "2024-06-15",
      "downloads": 15420,
      "relatedJobId": "JOB001",
      "tags": ["syllabus", "ssc", "cgl"]
    },
    {
      "id": "RES002",
      "title": "SSC CGL Previous Year Papers 2023",
      "type": "previous-paper",
      "category": "SSC",
      "description": "Previous year question papers with answer keys",
      "fileName": "SSC_CGL_2023_Papers.pdf",
      "filePath": "/downloads/SSC_CGL_2023_Papers.pdf",
      "fileSize": "8.3 MB",
      "uploadDate": "2024-01-10",
      "downloads": 28950,
      "relatedJobId": null,
      "tags": ["previous-papers", "ssc", "cgl", "2023"]
    }
  ]
}
```

### subscribers.json Schema
```json
{
  "subscribers": [
    {
      "id": "SUB001",
      "email": "user@example.com",
      "name": "John Doe",
      "sectors": ["SSC", "Banking"],
      "qualifications": ["Graduate"],
      "subscribedAt": "2024-06-20T10:30:00Z",
      "isActive": true,
      "notificationsEnabled": true
    }
  ]
}
```

---

## 3. API Routes

### Job Routes (`/api/jobs`)
```
GET    /api/jobs              # Get all jobs (with query params for filtering)
GET    /api/jobs/featured     # Get featured/recent jobs
GET    /api/jobs/:id          # Get single job details
GET    /api/jobs/sectors      # Get all sectors list
GET    /api/jobs/qualifications # Get all qualifications list
GET    /api/jobs/states       # Get all states list
```

**Query Parameters for GET /api/jobs:**
- `qualification` - Filter by qualification (10th, 12th, Graduate)
- `sector` - Filter by sector (Banking, Railway, SSC, Defense)
- `state` - Filter by state
- `search` - Search in title/description
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

### Resource Routes (`/api/resources`)
```
GET    /api/resources           # Get all resources
GET    /api/resources/:id       # Get single resource
GET    /api/resources/type/:type # Filter by type (syllabus, previous-paper)
GET    /api/resources/download/:id # Download resource file
```

### Notification Routes (`/api/notifications`)
```
POST   /api/notifications/subscribe    # Subscribe to email notifications
DELETE /api/notifications/unsubscribe  # Unsubscribe from emails
POST   /api/notifications/push/register # Register push notification token
GET    /api/notifications/preferences  # Get notification preferences
PUT    /api/notifications/preferences  # Update notification preferences
```

---

## 4. Implementation Order (Step-by-Step)

### Phase 1: Project Setup (Day 1)

**Step 1: Initialize Project**
```bash
cd "C:\Users\M.Abdul Rehman\Desktop\New folder\project"
npm create vite@latest . -- --template react
```

**Step 2: Install Dependencies**
```bash
# Frontend dependencies
npm install react-router-dom axios

# Dev dependencies
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Step 3: Configure Tailwind**
Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'govt-blue': {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#bae0ff',
          300: '#7cc8ff',
          400: '#36aeff',
          500: '#0c93f0',
          600: '#0074cd',
          700: '#005ba6',
          800: '#044d89',
          900: '#0a4171',
          950: '#06294b',
        },
        'govt-navy': '#1e3a5f',
        'govt-gold': '#c9a227',
        'govt-saffron': '#ff9933',
        'govt-green': '#138808',
        'govt-gray': '#f8fafc',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

**Step 4: Update vite.config.js**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
```

**Step 5: Setup Backend**
```bash
mkdir server
cd server
npm init -y
npm install express cors
```

### Phase 2: Backend Development (Day 2)

**Step 6: Create Mock Data Files**
- Create `server/data/jobs.json` with 15-20 sample jobs
- Create `server/data/resources.json` with 10-15 resources
- Create `server/data/subscribers.json` (empty initially)

**Step 7: Build Express Server**
Create `server/index.js`:
```javascript
const express = require('express');
const cors = require('cors');
const path = require('path');

const jobRoutes = require('./routes/jobRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/notifications', notificationRoutes);

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**Step 8: Create Route Handlers**
- `server/routes/jobRoutes.js` - Implement all job endpoints
- `server/routes/resourceRoutes.js` - Implement resource endpoints
- `server/routes/notificationRoutes.js` - Implement notification endpoints

### Phase 3: Frontend Structure (Day 3)

**Step 9: Setup React Router**
Update `src/App.jsx`:
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import JobDetailsPage from './pages/JobDetailsPage';
import ResourcesPage from './pages/ResourcesPage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/job/:id" element={<JobDetailsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
```

**Step 10: Create Layout Components**
- Header with navigation
- Footer with important links
- Layout wrapper component

### Phase 4: Homepage Development (Day 4-5)

**Step 11: Build Homepage Components**
1. HeroSection - Banner with search
2. FilterBar - Qualification, Sector, State filters
3. RecentJobs - Grid of job cards
4. JobCard - Individual job display
5. StatsSection - Key statistics

**Step 12: Implement Filtering Logic**
- Create FilterContext for state management
- Implement useJobs hook for API calls
- Add real-time filtering

### Phase 5: Job Details Page (Day 6)

**Step 13: Build Job Details Page**
- Full job information display
- Important dates timeline
- Requirements checklist
- How to apply section
- Related jobs sidebar

### Phase 6: Resources Page (Day 7)

**Step 14: Build Resources Page**
- Resource listing with type filters
- Download functionality
- Search within resources
- Category-wise organization

### Phase 7: Notifications (Day 8)

**Step 15: Implement Notification System**
1. Browser Notification API integration:
```javascript
// In useNotifications.js
const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

const sendNotification = (title, options) => {
  if (Notification.permission === 'granted') {
    new Notification(title, options);
  }
};
```

2. Email subscription form
3. NotificationPopup component
4. Subscription management

### Phase 8: Polish & Optimization (Day 9-10)

**Step 16: Responsive Design**
- Mobile-first approach
- Breakpoint optimization
- Touch-friendly interactions

**Step 17: Performance Optimization**
- Code splitting with React.lazy
- Image optimization
- Caching strategies

**Step 18: Accessibility**
- ARIA labels
- Keyboard navigation
- Screen reader support

---

## 5. Tailwind Government Theme Configuration

### Color Palette
```javascript
// tailwind.config.js additions
colors: {
  'primary': {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  'accent': {
    saffron: '#FF9933',
    white: '#FFFFFF',
    green: '#138808',
  },
  'navy': '#000080',
  'gold': '#D4AF37',
}
```

### Typography Scale
```javascript
fontSize: {
  'display': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
  'heading': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
  'subheading': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
  'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
  'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
}
```

### Government-Style Components
```javascript
// Custom utilities for government style
boxShadow: {
  'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  'elevated': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
}
```

---

## 6. Serving React Build from Express

### Production Setup
```javascript
// server/index.js
const express = require('express');
const path = require('path');

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../dist')));

// Handle React routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});
```

### NPM Scripts (package.json)
```json
{
  "scripts": {
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "client": "vite",
    "server": "nodemon server/index.js",
    "build": "vite build",
    "start": "NODE_ENV=production node server/index.js",
    "preview": "vite preview"
  }
}
```

---

## 7. Key Components Implementation Details

### JobCard Component
```jsx
// src/components/common/JobCard.jsx
const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-primary-600">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
            {job.sector}
          </span>
          <h3 className="mt-2 text-lg font-semibold text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{job.organization}</p>
        </div>
        {job.featured && (
          <span className="bg-govt-saffron text-white text-xs px-2 py-1 rounded">
            Featured
          </span>
        )}
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center text-gray-600">
          <AcademicCapIcon className="w-4 h-4 mr-2" />
          {job.qualification}
        </div>
        <div className="flex items-center text-gray-600">
          <CurrencyRupeeIcon className="w-4 h-4 mr-2" />
          ₹{job.salaryRange.min.toLocaleString()} - ₹{job.salaryRange.max.toLocaleString()}
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Last Date: {formatDate(job.importantDates.applicationEnd)}
        </span>
        <Link
          to={`/job/${job.id}`}
          className="text-primary-600 font-medium hover:text-primary-700"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};
```

### FilterBar Component
```jsx
// src/components/common/FilterBar.jsx
const FilterBar = ({ filters, onFilterChange }) => {
  const qualifications = ['10th', '12th', 'Graduate', 'Post Graduate'];
  const sectors = ['Banking', 'Railway', 'SSC', 'Defense', 'State PSC', 'UPSC'];
  const states = ['All States', 'Maharashtra', 'Delhi', 'Karnataka', ...];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-semibold text-gray-900 mb-4">Filter Jobs</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Qualification
          </label>
          <select
            value={filters.qualification}
            onChange={(e) => onFilterChange('qualification', e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500"
          >
            <option value="">All Qualifications</option>
            {qualifications.map(q => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
        </div>
        
        {/* Similar for sector and state */}
      </div>
    </div>
  );
};
```

---

## 8. Custom Hooks

### useJobs Hook
```javascript
// src/hooks/useJobs.js
import { useState, useEffect } from 'react';
import api from '../services/api';

export const useJobs = (filters = {}) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await api.get('/jobs', { params: filters });
      setJobs(response.data.jobs);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { jobs, loading, error, pagination, refetch: fetchJobs };
};
```

---

## 9. Global CSS (index.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap');

@layer base {
  body {
    @apply bg-gray-50 text-gray-900 antialiased;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary-600 text-white px-6 py-2 rounded-lg font-medium 
           hover:bg-primary-700 transition-colors focus:ring-2 
           focus:ring-primary-500 focus:ring-offset-2;
  }
  
  .btn-secondary {
    @apply bg-white text-primary-600 border border-primary-600 px-6 py-2 
           rounded-lg font-medium hover:bg-primary-50 transition-colors;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6 border border-gray-100;
  }
  
  .input-field {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg 
           focus:ring-2 focus:ring-primary-500 focus:border-primary-500;
  }
}
```

---

## 10. Testing Checklist

- [ ] Homepage loads with job listings
- [ ] Filters work correctly (Qualification, Sector, State)
- [ ] Job details page displays all information
- [ ] Resources page shows downloadable files
- [ ] Search functionality works
- [ ] Mobile responsive on all pages
- [ ] Browser notification permission request works
- [ ] Email subscription form submits
- [ ] 404 page shows for invalid routes
- [ ] Loading states display correctly
- [ ] Error handling works for API failures

---

## Quick Start Commands

```bash
# 1. Navigate to project
cd "C:\Users\M.Abdul Rehman\Desktop\New folder\project"

# 2. Install all dependencies
npm install
cd server && npm install && cd ..

# 3. Start development (runs both frontend and backend)
npm run dev

# 4. Build for production
npm run build

# 5. Start production server
npm start
```

---

## Browser Notification Implementation

```javascript
// src/hooks/useNotifications.js
export const useNotifications = () => {
  const [permission, setPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      console.log('Browser does not support notifications');
      return false;
    }

    const result = await Notification.requestPermission();
    setPermission(result);
    return result === 'granted';
  };

  const sendNotification = (title, body, icon = '/notification-icon.png') => {
    if (permission === 'granted') {
      new Notification(title, { body, icon });
    }
  };

  return { permission, requestPermission, sendNotification };
};
```

---

## Summary

This implementation plan provides:
- **14 frontend components** organized by feature
- **3 backend route files** with RESTful endpoints
- **3 mock JSON data files** with complete schemas
- **4 custom hooks** for state management
- **5 page routes** with React Router
- **10-day implementation timeline**

Follow this plan step by step to build a complete Government Job Portal with modern UI, filtering capabilities, and notification system.
