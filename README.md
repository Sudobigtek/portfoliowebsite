# Portfolio Website

A modern, responsive portfolio website built with React and Material-UI.

## Features

- Clean, minimalist design
- Dark/Light mode
- Responsive layout
- Portfolio showcase
- Contact form
- Admin dashboard
- SEO optimized

## Tech Stack

- Frontend:
  - React
  - Material-UI
  - React Router
  - React Helmet (SEO)
  - Context API for state management

- Backend:
  - Node.js
  - Express
  - MongoDB (database)
  - JWT for authentication

## Getting Started

1. Clone the repository
```bash
git clone [your-repo-url]
```

2. Install dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Environment Setup
- Create `.env` file in the root directory
- Add your environment variables (see `.env.example`)

4. Run the development server
```bash
# Run client (from client directory)
npm start

# Run server (from server directory)
npm run dev
```

## Project Structure

```
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   └── src/               # Source files
│       ├── components/    # Reusable components
│       ├── pages/         # Page components
│       ├── contexts/      # React contexts
│       ├── hooks/         # Custom hooks
│       ├── utils/         # Utility functions
│       └── services/      # API services
├── server/                # Backend Node.js application
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   ├── models/           # Database models
│   └── services/         # Business logic
└── package.json          # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 