<div align="center">
  <h1 style="color: #14b8a6; font-size: 4em; margin: 0; padding: 20px 0;">
    ✈️ Flight Inspirations
  </h1>
  <p style="color: #14b8a6; font-size: 1.2em; margin-top: -10px;">
    Discover Your Next Adventure
  </p>
</div>

## Live Demo

🚀 [Flight Inspirations App Demo](https://flight-inspirations-dashboard.vercel.app/)

## Performance Metrics

<div align="center">

![Lighthouse Performance](https://img.shields.io/badge/Performance-98-brightgreen?style=for-the-badge&logo=lighthouse)
![Lighthouse Accessibility](https://img.shields.io/badge/Accessibility-100-brightgreen?style=for-the-badge&logo=lighthouse)
![Lighthouse Best Practices](https://img.shields.io/badge/Best%20Practices-100-brightgreen?style=for-the-badge&logo=lighthouse)
![Lighthouse SEO](https://img.shields.io/badge/SEO-100-brightgreen?style=for-the-badge&logo=lighthouse)

</div>

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [Design Patterns & Best Practices](#design-patterns--best-practices)
- [Known Issues & Limitations](#known-issues--limitations)

---

## Overview

**Flight Inspirations Dashboard** is a modern, production-ready React application for searching and managing flight inspiration data via the Amadeus API. Built with enterprise-grade patterns, the application demonstrates advanced frontend development practices including state management, client-side caching, lazy loading, and comprehensive testing.

### Purpose

- 🔍 Search flight destinations by origin city and departure date
- ✏️ Inline editing with real-time data validation
- 💾 Smart client-side caching for optimal performance
- 📊 Interactive data table with filtering, sorting, and pagination
- 🎨 Beautiful, accessible, and responsive UI

---

## Tech Stack

### Core Technologies

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with full type coverage
- **Redux Toolkit** - Predictable state management with RTK Query
- **Material UI (MUI) v6** - Comprehensive component library and theming system

### UI & Interactions

- **@tanstack/react-table** - Powerful table functionality
- **@hello-pangea/dnd** - Drag-and-drop for column reordering
- **@mui/x-date-pickers** - Accessible date selection
- **react-hook-form** + **Yup** - Form management and validation
- **Emotion** - CSS-in-JS styling solution

### Data & API

- **Axios** - HTTP client with request/response interceptors
- **Day.js** - Lightweight date manipulation
- **Lodash** - Utility functions for data processing

### Testing

- **Jest** - Unit and integration testing
- **React Testing Library** - Component testing utilities
- **Cypress** - End-to-end testing framework

### Development Tools

- **react-scripts** - Zero-config build tooling
- **TypeScript ESLint** - Code quality and consistency

---

## Project Architecture

### Application Structure

The application follows a **layered architecture** pattern with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│           App Shell (App.tsx)           │
│  Providers: Redux, Theme, Localization  │
│     ErrorBoundary, Lazy Loading         │
└─────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌───────────────┐      ┌────────────────┐
│  Pages Layer  │      │ Components     │
│  - Home.tsx   │──────│ - Header       │
└───────────────┘      │ - Forms        │
                       │ - Table        │
                       │ - UI Elements  │
                       └────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  State Mgmt  │    │  Services    │    │   Utilities  │
│  - Store     │    │  - API       │    │  - Cache     │
│  - Slices    │    │  - Axios     │    │  - Table     │
│  - Hooks     │    │  - Auth      │    │  - Format    │
└──────────────┘    └──────────────┘    └──────────────┘
```

### Component Architecture

#### App Shell (`App.tsx`)

- **Provider Composition**: Redux store, MUI theme, date localization
- **Error Boundaries**: Graceful error handling at the root level
- **Lazy Loading**: Code-splitting for optimal performance
- **Suspense Fallbacks**: Loading states for async component loading

#### Page Layer (`pages/Home.tsx`)

- **Container Component**: Orchestrates search, data fetching, and table rendering
- **State Coordination**: Manages search parameters and local UI state
- **Loading States**: Handles loading, error, and success states
- **Lazy Component Loading**: Dynamic imports for FlightSearchForm and FlightTable

#### Component Layer

**Smart Components:**

- `FlightSearchForm`: Form state management with validation
- `FlightTable`: Complex table logic with TanStack Table
- `TableFooter`: Pagination state and controls

**Presentational Components:**

- `Header`: Static branding and navigation
- `Loading`: Animated loading indicator
- `DateCell`: Reusable date picker cell
- `StyledComponents`: Shared styled UI elements
- `ErrorBoundary`: Error catching and display

### State Management

**Redux Toolkit Implementation:**

- **`flightsSlice.ts`**:

  - Async thunks for API calls (`fetchFlightInspirations`)
  - Flight data normalization and transformation
  - Loading and error state management
  - Currency and metadata handling

- **Custom Hooks** (`useTableData.ts`):
  - Table data management with local state
  - Cell editing tracking
  - Column filtering with debouncing
  - Cache integration and persistence
  - Memoized derived state for performance

### Data Flow

1. **User Input** → Search form submission
2. **Cache Check** → Local storage validation
3. **API Call** (if needed) → Amadeus authentication + search
4. **Data Transformation** → Normalize API response
5. **Redux Store** → Centralized state update
6. **Local State** → Component-level table state
7. **UI Update** → Re-render with new data

### Caching Strategy

**Multi-layered Caching:**

- **Cache Key Structure**: Combines search parameters for unique identification
- **TTL Management**: Configurable time-to-live for cache entries
- **Automatic Invalidation**: Cache clearing on parameter changes
- **Manual Persistence**: Save edited data to cache explicitly
- **Type-safe Cache**: Generic caching utilities with TypeScript

### API Integration

**Amadeus API Service** (`flightsApi.ts`):

- OAuth2 token authentication flow
- Automatic token management
- Request/response caching
- Error handling and retry logic
- Type-safe API responses

---

## Key Features

### ✈️ Flight Search

- **Origin Search**: IATA code-based city search
- **Departure Date**: Optional date filtering with date picker
- **Real-time Validation**: Form validation with Yup schemas
- **Auto-focus**: Enhanced UX with input management

### 📝 Editable Table

- **Inline Editing**: Click-to-edit any cell
- **Cell Tracking**: Visual indicators for edited cells
- **Date Pickers**: MUI date picker integration for date fields
- **Validation**: Real-time data validation
- **Persistence**: Save changes to local cache

### 🔍 Advanced Filtering

- **Column Filters**: Per-column filter inputs
- **Debounced Search**: 300ms debounce for performance
- **Case-insensitive**: Flexible matching
- **Real-time Results**: Instant filter application
- **Multi-column**: Filter across multiple columns simultaneously

### 💾 Smart Caching

- **Automatic**: Cache API responses transparently
- **Parameterized**: Unique cache per search criteria
- **TTL Support**: Configurable cache expiration
- **Manual Save**: Explicit save for edited data
- **Type-safe**: Full TypeScript support

### 📊 Table Features

- **Pagination**: Customizable rows per page (10/25/50/100)
- **Drag-and-Drop**: Reorder columns dynamically
- **Responsive**: Mobile-optimized table layout
- **Empty States**: User-friendly empty and error states
- **Currency Display**: Formatted price display with currency

### 🎨 UI/UX Excellence

- **Material Design 3**: Modern MUI components
- **Custom Theme**: Branded color palette and typography
- **Dark Mode Ready**: Theme architecture supports dark mode
- **Responsive Layout**: Mobile-first design
- **Loading States**: Skeleton screens and spinners
- **Error Boundaries**: Graceful error recovery
- **Accessibility**: WCAG 2.1 compliant

### ⚡ Performance Optimizations

- **Code Splitting**: Lazy loading with React.lazy()
- **Memoization**: useMemo and useCallback throughout
- **Debouncing**: Lodash debounce for expensive operations
- **Virtual Rendering**: Efficient table rendering
- **Bundle Optimization**: Tree-shaking and minification

---

## Project Structure

```
Flight-Inspirations-Dashboard/
├── public/                        # Static assets
│   ├── favicon.ico
│   ├── flight-inspirations-logo.svg
│   ├── index.html
│   └── manifest.json
│
├── src/
│   ├── components/               # React components
│   │   ├── DateCell/            # Custom date picker cell
│   │   ├── ErrorBoundary/       # Error boundary wrapper
│   │   ├── FlightSearchForm/    # Search form component
│   │   ├── FlightTable/         # Main table component
│   │   ├── Header/              # App header
│   │   ├── Loading/             # Loading spinner
│   │   ├── StyledComponents/    # Styled UI elements
│   │   └── TableFooter/         # Pagination footer
│   │
│   ├── config/                   # Configuration files
│   │   └── axiosConfig.ts       # Axios setup and API config
│   │
│   ├── constants/                # App constants
│   │   └── index.ts             # API endpoints, cache settings
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useTableData.ts      # Table state management
│   │   └── useTableData.test.tsx
│   │
│   ├── pages/                    # Page components
│   │   ├── Home.tsx             # Main page
│   │   └── Home.style.css
│   │
│   ├── services/                 # API services
│   │   └── flightsApi.ts        # Amadeus API integration
│   │
│   ├── store/                    # Redux store
│   │   ├── index.ts             # Store configuration
│   │   ├── flightsSlice.ts      # Flights reducer & thunks
│   │   ├── hooks.ts             # Typed Redux hooks
│   │   └── types.ts             # Store types
│   │
│   ├── styles/                   # Global styles
│   │   ├── global.css           # Global CSS
│   │   └── variables.css        # CSS variables
│   │
│   ├── theme/                    # MUI theme
│   │   └── index.tsx            # Theme configuration
│   │
│   ├── types/                    # TypeScript types
│   │   ├── cacheTypes.ts        # Cache-related types
│   │   ├── flightsTypes.ts      # Flight data types
│   │   └── tableTypes.ts        # Table types
│   │
│   ├── utils/                    # Utility functions
│   │   ├── cacheUtils.ts        # Cache management
│   │   ├── cacheUtils.test.ts
│   │   ├── tableUtils.ts        # Table helpers
│   │   └── tableUtils.test.ts
│   │
│   ├── App.tsx                   # Root component
│   ├── index.tsx                # Entry point
│   └── setupTests.ts            # Jest setup
│
├── cypress/                      # E2E tests
│   ├── e2e/
│   ├── fixtures/
│   └── support/
│
├── cypress.config.ts            # Cypress configuration
├── jest.config.js               # Jest configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

---

## Getting Started

### Prerequisites

- **Node.js**: v14.0.0 or later (v18+ recommended)
- **npm**: 6+ or **yarn**: 1.22+

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/1pyke/Flight-Inspirations-Dashboard.git
cd Flight-Inspirations-Dashboard
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup** (Optional)

Create a `.env` file in the root directory if you want to customize API settings:

```env
REACT_APP_API_BASE_URL=https://test.api.amadeus.com
REACT_APP_API_KEY=your_api_key
REACT_APP_API_SECRET=your_api_secret
```

4. **Start the development server**

```bash
npm start
```

The app will open automatically at [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command                | Description                         |
| ---------------------- | ----------------------------------- |
| `npm start`            | Runs the app in development mode    |
| `npm build`            | Builds the app for production       |
| `npm test`             | Runs Jest unit tests                |
| `npm run cypress:open` | Opens Cypress test runner           |
| `npm run cypress:run`  | Runs Cypress tests in headless mode |

---

## Testing

### Unit & Integration Tests (Jest + React Testing Library)

The project includes comprehensive unit and integration tests for:

- Custom hooks (`useTableData`)
- Utility functions (`cacheUtils`, `tableUtils`)
- React components (all major components)

**Run all tests:**

```bash
npm test
```

**Run tests in watch mode:**

```bash
npm test -- --watch
```

**Generate coverage report:**

```bash
npm test -- --coverage
```

**Test Files:**

- `src/components/**/*.test.tsx` - Component tests
- `src/hooks/**/*.test.tsx` - Hook tests
- `src/utils/**/*.test.ts` - Utility function tests

### End-to-End Tests (Cypress)

E2E tests cover critical user flows and interactions.

**Open Cypress Test Runner (Interactive):**

```bash
npm run cypress:open
```

**Run Cypress Tests (Headless):**

```bash
npm run cypress:run
```

**Test Coverage:**

- Flight search flow
- Table interactions
- Form validation
- Error handling

---

## Design Patterns & Best Practices

### 🏗️ Architecture Patterns

**1. Layered Architecture**

- Clear separation between presentation, business logic, and data layers
- Unidirectional data flow
- Dependency injection for services

**2. Container/Presentational Pattern**

- Smart containers handle logic and state
- Presentational components focus on UI
- Clear component responsibilities

**3. Custom Hooks Pattern**

- Reusable business logic extraction
- Separation of concerns
- Testable logic units

### 🎯 React Best Practices

**1. Performance Optimization**

```typescript
// Memoization for expensive computations
const filteredData = useMemo(() => {
  return data.filter(/* ... */);
}, [data, filters]);

// Callback memoization to prevent re-renders
const handleUpdate = useCallback(
  (id, value) => {
    updateData(id, value);
  },
  [updateData]
);
```

**2. Lazy Loading**

```typescript
// Code splitting for better initial load time
const FlightTable = lazy(() => import("./components/FlightTable"));
```

**3. Error Boundaries**

```typescript
// Graceful error handling at component boundaries
<ErrorBoundary fallback={<ErrorMessage />}>
  <App />
</ErrorBoundary>
```

### 📦 State Management Strategy

**Redux Toolkit for Global State:**

- API data caching
- Loading/error states
- Shared application state

**Local State for UI:**

- Form inputs
- Table filters
- UI toggles

**Custom Hooks for Business Logic:**

- Data transformations
- Complex state logic
- Side effect management

### 🔒 Type Safety

- **100% TypeScript coverage**
- **Strict mode enabled**
- **No implicit any**
- **Interface-based contracts**

```typescript
// Example: Type-safe cache utilities
export function getCachedData<T>(
  key: string,
  ttl: number,
  params: Record<string, any>
): T | null {
  // Implementation
}
```

### 🧪 Testing Strategy

**Test Pyramid:**

- **Unit Tests (70%)**: Functions, hooks, utilities
- **Integration Tests (20%)**: Component interactions
- **E2E Tests (10%)**: Critical user flows

**Testing Principles:**

- Test behavior, not implementation
- Maintain high coverage (>80%)
- Mock external dependencies
- Test edge cases and error states

### 🎨 Styling Approach

**Multi-layered Styling:**

1. **MUI Theme**: Global design tokens
2. **CSS Variables**: Reusable values
3. **CSS Modules**: Component-scoped styles
4. **Emotion**: Dynamic styles

---

## Known Issues & Limitations

### API Limitations

⚠️ **Amadeus API Restrictions:**

- The `/search` endpoint returns 404 for most cities except **MAD (Madrid)**
- This is a backend/API sandbox limitation, not a frontend bug
- Production API would support all IATA codes

### Feature Limitations

📝 **Current Limitations:**

- **Client-side only**: Changes are cached locally, not persisted to a backend
- **No multi-city search**: Single origin per query
- **Limited sorting**: Basic column sorting only
- **No authentication**: Open access (suitable for demo purposes)

### Browser Support

✅ **Supported Browsers:**

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

❌ **Not Supported:**

- Internet Explorer 11 and below
- Opera Mini

---

## Future Enhancements

### Planned Features

- [ ] **Backend Integration**: REST API for data persistence
- [ ] **Authentication**: User login and authorization
- [ ] **Advanced Filters**: Price range, date range, stops
- [ ] **Sorting**: Multi-column sorting
- [ ] **Export**: CSV/PDF export functionality
- [ ] **Dark Mode**: Complete dark theme support
- [ ] **Internationalization**: Multi-language support
- [ ] **Real-time Updates**: WebSocket integration
- [ ] **Analytics**: User behavior tracking
- [ ] **Advanced Caching**: Service Worker for offline support

---

## Acknowledgments

- **Amadeus API** for flight data
- **Material UI** for the component library
- **TanStack Table** for table functionality
- **React community** for amazing tools and libraries

---

<div align="center">
  <p>Made with ❤️ by the Flight Inspirations Team</p>
  <p>
    <a href="https://flight-inspirations-dashboard.vercel.app/">Live Demo</a> •
    <a href="https://github.com/1pyke/Flight-Inspirations-Dashboard/issues">Report Bug</a> •
    <a href="https://github.com/1pyke/Flight-Inspirations-Dashboard/issues">Request Feature</a>
  </p>
</div>
