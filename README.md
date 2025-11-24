# PureMeds Admin Panel

A comprehensive admin dashboard for managing the PureMeds e-pharmacy platform, built with React and Vite. This application provides administrators with tools to manage medicines, orders, complaints, and monitor system alerts.

## Overview

PureMeds Admin Panel is the administrative interface that enables admins to:
- Add and manage medicine inventory
- View and update order statuses
- Review and resolve customer complaints
- Monitor alerts for counterfeit medicines
- Track dashboard analytics and statistics
- Export data in CSV format

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Clerk** - Authentication and user management
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running (see PureMeds_Backend README)
- Clerk account with publishable key
- Admin access credentials

## Installation

1. **Clone the repository** (if not already done)
```bash
cd PureMeds_Admin
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

4. **Start development server**
```bash
npm run dev
```

The application will run on **http://localhost:5174**

## Project Structure

```
src/
├── apis/              # API service functions
├── assets/            # Images and static assets
├── components/        # Reusable UI components
│   └── ui/           # UI components (buttons, modals, etc.)
├── config/           # Configuration files (routing, etc.)
├── hooks/            # Custom React hooks
├── views/            # Page components
│   ├── Dashboard/   # Main dashboard with tabs
│   ├── AddMedicine/ # Medicine addition form
│   ├── MedicineList/# Medicine management
│   ├── Orders/      # Order management
│   ├── Alerts/      # Alert monitoring
│   └── Login/       # Admin login
└── main.jsx          # Application entry point
```

## Key Features

### 1. Dashboard Overview
- Real-time statistics
- Quick access to all modules
- Tab-based navigation
- Visual analytics

### 2. Medicine Management
- Add new medicines with images
- View all medicines with filters
- Edit medicine details
- Delete medicines
- Stock management

### 3. Order Management
- View all orders
- Filter by status, date, customer
- Update order status
- Add admin remarks
- Export orders to CSV

### 4. Complaint Management
- View all complaints
- Filter by status
- Update complaint status
- Add admin remarks
- Verify QR codes from complaints
- Export complaints to CSV

### 5. Alert Monitoring
- View all alerts
- Verify medicines from alerts
- Track counterfeit cases
- Monitor batch complaint counts

## Admin State Flow

The admin interaction flow follows a clear state diagram showing how administrators navigate through the application. See `Admin_State_Diagram.md` for detailed state transitions and downloadable diagram.

### Main Admin Flows:
1. **Login → Dashboard → Add Medicine → Medicine List**
2. **Dashboard → Orders → Update Status → Export**
3. **Dashboard → Alerts → Verify QR → Update Status**
4. **Dashboard → Complaints → Review → Resolve**

## API Integration

The admin panel communicates with the backend API through service functions:
- `UploadMedicines/uploadMedicines.js` - Medicine operations
- `Orders/orders.js` - Order management
- `Complaints/complaints.js` - Complaint management
- `Dashboard/dashboard.js` - Dashboard data
- `Verification/verification.js` - Medicine verification

## Authentication

Authentication is handled by Clerk:
- Admin login required
- Protected routes enforce authentication
- JWT tokens automatically managed
- Session persistence

## Environment Variables

Required environment variables:
- `VITE_API_URL` - Backend API base URL
- `VITE_CLERK_PUBLISHABLE_KEY` - Clerk publishable key

## Available Scripts

- `npm run dev` - Start development server (port 5174)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Port Configuration

The admin panel runs on port **5174** by default. This is different from the frontend (5173) to allow both applications to run simultaneously.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the existing code structure
2. Use consistent component patterns
3. Maintain responsive design
4. Test all admin operations
5. Follow ESLint rules

## Notes

- The application runs on port **5174** by default
- Ensure the backend is running before starting the admin panel
- Admin credentials must be configured in Clerk
- All operations require proper authentication
- CSV exports are generated server-side
