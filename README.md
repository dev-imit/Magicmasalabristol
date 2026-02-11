# Magic Masala Catering Service

A modern, full-stack web application for Magic Masala catering service with separate frontend and backend architectures.

## Project Structure

```
magic-masala/
├── frontend/           # React frontend (current directory)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── backend/            # Express.js backend server
│   ├── vps-backend-server.js
│   ├── package.json
│   ├── magic_masala.db
│   ├── uploads/
│   ├── .env
│   └── README.md
└── README.md          # This file
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 1. Start the Backend Server

```bash
cd backend
npm install
npm start
```

The backend will run on `http://localhost:3001`

### 2. Start the Frontend (in a new terminal)

```bash
# From the root directory (magic-masala)
npm install
npm start
```

The frontend will run on `http://localhost:3000`

## Features

### Frontend (React)
- Modern React application with routing
- Responsive design for mobile and desktop
- Admin panel for content management
- Gallery, testimonials, offers, and certificates display
- Contact forms and service information

### Backend (Express.js + SQLite)
- RESTful API with JWT authentication
- SQLite database for data persistence
- File upload system for images and certificates
- User authentication and authorization
- CORS enabled for frontend integration

## Admin Access

**Default Admin Credentials:**
- Email: `admin@masalamagic.com`
- Password: `admin123`

Access the admin panel at: `http://localhost:3000/admin`

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Content Management
- `GET/POST/DELETE /gallery` - Gallery images
- `GET/POST/PUT/DELETE /testimonials` - Customer testimonials
- `GET/POST/PUT/DELETE /offers` - Promotional offers
- `GET/POST/DELETE /certificates` - Hygiene certificates

## Development

### Frontend Development
```bash
npm start          # Start development server
npm run build      # Build for production
npm test          # Run tests
```

### Backend Development
```bash
cd backend
npm start          # Start production server
npm run dev        # Start with nodemon (auto-restart)
```

## Environment Configuration

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3001
```

### Backend (.env)
```env
PORT=3001
JWT_SECRET=your-secret-key-change-this-in-production
```

## Database

The application uses SQLite database (`magic_masala.db`) which is automatically created and initialized when the backend server starts.

## File Uploads

Uploaded files are stored in `backend/uploads/` directory:
- Gallery images
- Offer images
- Certificate files (PDFs, images)

## Deployment

### Backend Deployment
1. Configure environment variables
2. Set up process manager (PM2 recommended)
3. Configure reverse proxy (nginx)
4. Set up SSL certificates
5. Ensure uploads directory has proper permissions

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Serve static files from `build/` directory
3. Configure web server to serve the React app

## Technologies Used

### Frontend
- React 18+
- React Router
- CSS Modules
- Axios for API calls

### Backend
- Node.js
- Express.js
- SQLite3
- JWT for authentication
- Multer for file uploads
- bcrypt for password hashing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

## License

This project is private and proprietary to Magic Masala Catering Service.

## Support

For technical support or questions, please contact the development team.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
