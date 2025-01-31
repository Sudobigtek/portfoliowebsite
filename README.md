# Portfolio Website

A modern, responsive portfolio website built with React and Material-UI.

## Features

- Modern UI with Material Design
- Responsive layout
- Image portfolio with drag-and-drop upload
- Booking calendar with time slot selection
- SEO optimization
- Performance optimized
- Automated testing
- Continuous deployment

## Development

### Prerequisites

- Node.js 18 or higher
- npm 8 or higher

### Setup

1. Clone the repository:
```bash
git clone https://github.com/sudobigtek/portfoliowebsite.git
cd portfoliowebsite
```

2. Install dependencies:
```bash
cd client
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run tests:
```bash
npm test
```

### Available Scripts

- `npm start` - Starts the development server
- `npm test` - Runs the test suite
- `npm run build` - Creates a production build
- `npm run format` - Formats code with Prettier
- `npm run lint` - Lints code with ESLint
- `npm run deploy` - Deploys to GitHub Pages
- `npm run analyze` - Analyzes bundle size
- `npm run test:ci` - Runs tests in CI mode

## Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment

To deploy manually:

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

### Environment Variables

Create a `.env` file in the client directory with these variables:

```env
REACT_APP_SITE_URL=https://sudobigtek.github.io/portfoliowebsite
REACT_APP_PINTEREST_VERIFICATION=your-pinterest-verification-code
```

## Testing

The project includes:

- Unit tests with Jest and React Testing Library
- Integration tests
- End-to-end tests with Playwright
- Coverage reporting
- CI/CD pipeline with GitHub Actions

## Performance

Performance optimizations include:

- Code splitting
- Lazy loading
- Image optimization
- Bundle size monitoring
- Web Vitals tracking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 