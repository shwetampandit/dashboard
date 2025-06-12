# Cybersecurity Monitoring Dashboard

A React-based dashboard for monitoring cybersecurity metrics of Electronic Control Units (ECUs), their components, and associated vulnerabilities.

## Features

### Overview Dashboard
- Real-time monitoring of ECU security status
- Interactive pie chart showing security status distribution
- Summary cards displaying key metrics:
  - Total ECUs count
  - Total Components count
  - Total Vulnerabilities count

### ECU Management
- List of all ECUs with their details
- Security status indicators (Low, Medium, High)
- Vulnerability count per ECU
- Interactive ECU selection for detailed view

### Component Monitoring
- Detailed component information including:
  - Component name and version
  - Risk score visualization with color-coded progress bars
  - Mitigation status indicators
- Real-time updates based on selected ECU

### CVE Tracking
- Recently detected Common Vulnerabilities and Exposures (CVEs)
- Severity level indicators
- Detailed CVE descriptions
- Color-coded severity status

## Tech Stack

- **Frontend Framework**: React 18
- **State Management**: Redux Toolkit with RTK Query
- **UI Components**: Material-UI (MUI)
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Build Tool**: Vite

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
cd dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Build for production:
```bash
npm run build
# or
yarn build
```

## Project Structure

```
src/
├── app/
│   └── store.js           # Redux store configuration
├── components/
│   ├── ComponentTable.jsx # Components list and details
│   ├── CVETable.jsx      # CVE information display
│   └── ECUTable.jsx      # ECU list and selection
├── features/
│   └── api/
│       └── apiSlice.js    # RTK Query API configuration
├── pages/
│   └── Dashboard.jsx      # Main dashboard view
└── main.jsx              # Application entry point
```

## API Integration

The dashboard integrates with a REST API at `https://securethingsmockapi.onrender.com` with the following endpoints:

- `GET /api/ecus` - Fetch all ECUs
- `GET /api/ecus/:ecuId/components` - Fetch components for a specific ECU
- `GET /api/cves/:ecuId` - Fetch CVEs for a specific ECU
- `GET /api/cves/:id` - Fetch specific CVE details

## State Management

The application uses Redux Toolkit with RTK Query for:
- API state management
- Automatic caching
- Loading states
- Error handling
- Data revalidation

## Styling

- Material-UI components for consistent UI
- Tailwind CSS for custom styling
- Custom color schemes for:
  - Security status indicators
  - Risk score visualization
  - Mitigation status badges

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Style

- ESLint configuration for code quality
- Consistent component structure
- Comprehensive JSDoc comments

## Testing

This project uses [Jest](https://jestjs.io/) as the test runner with a `jsdom` environment for simulating the browser. Styles are mocked using `identity-obj-proxy` for CSS modules, and Babel is used for transforming JavaScript and TypeScript files.

### Running Tests

To run all test cases, use the following command:

```bash
npm test
# or
yarn test
```

Jest will automatically find and run all files with `.test.js`, `.test.jsx`, `.test.ts`, or `.test.tsx` extensions in your project.

Test setup is configured in `jest.config.js` and `jest.setup.js`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Reference Screenshots

