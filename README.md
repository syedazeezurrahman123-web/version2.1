# Government Jobs Hub

A comprehensive platform for tracking government job notifications, exam schedules, admit cards, and results. Features real-time job alerts, exam preparation resources, and a user-friendly dashboard.

## Features

- 📋 **Latest Job Notifications** - Real-time updates on government job postings
- 📅 **Exam Calendar** - Upcoming exams with dates and details
- 🎫 **Admit Cards** - Download hall tickets
- 📊 **Results** - Check exam results
- 📚 **Resources** - Exam preparation materials
- 💬 **Contact Support** - Direct communication with support team
- 👥 **Active User Tracking** - Real-time active users count
- 🔔 **Email Notifications** - Subscribe for updates

## Tech Stack

- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: Express.js, Node.js
- **Build**: Vite
- **Styling**: Tailwind CSS, PostCSS

## Project Structure

```
project/
├── src/
│   ├── components/     - React components
│   ├── pages/          - Page components
│   ├── context/        - React context
│   ├── hooks/          - Custom hooks
│   ├── services/       - API services
│   ├── utils/          - Utility functions
│   └── App.jsx         - Main app component
├── server/
│   ├── routes/         - API routes
│   ├── data/           - Data files
│   └── index.js        - Express server
├── public/             - Static assets
└── package.json        - Dependencies
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The application will be available at `http://localhost:5173`

## API Endpoints

- `GET /api/jobs` - Fetch jobs
- `GET /api/resources` - Fetch resources
- `POST /api/contacts/submit` - Submit contact form
- `POST /api/users/track` - Track active users
- `GET /api/users/active-count` - Get active users count

## Contact

For support, reach out at: support@govtjobshub.in

## License

MIT License
