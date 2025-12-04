# Somahorse Nexus - Frontend Application

A React-based platform connecting AI engineers with industry partners for project collaboration. Built with TypeScript, Vite, and Tailwind CSS.

## Project Overview

Somahorse Nexus is a multi-role application that facilitates:
- **AI Engineers**: Browse projects, manage profiles, submit project outcomes
- **Industry Partners (Clients)**: Create projects, browse talent, manage collaborations
- **Administrators**: Manage platform operations and analytics

## Technology Stack

- **Framework**: React 18.2+ with TypeScript
- **Build Tool**: Vite 5.1+
- **Styling**: Tailwind CSS (via utility classes)
- **Icons**: Lucide React
- **Charts**: Recharts
- **AI Integration**: Google Generative AI (Gemini)
- **State Management**: React Hooks (useState)

## Folder Structure

```
FrontendV1/
├── src/
│   ├── app/                    # Application-level configuration
│   │   ├── app.tsx            # Main app component with routing logic
│   │   └── navigation/
│   │       └── routes.ts      # Route definitions and route protection rules
│   │
│   ├── core/                   # Core/shared application logic
│   │   ├── components/        # Core UI components (Layout, Navbar, Footer, Breadcrumbs)
│   │   ├── models/            # TypeScript interfaces and types (User, Project, etc.)
│   │   ├── services/          # API services and external integrations
│   │   │   ├── api.ts         # Mock API service (to be replaced with FastAPI backend)
│   │   │   └── geminiService.ts  # Google Gemini AI integration
│   │   ├── constants.ts       # Application-wide constants
│   │   └── index.ts           # Core module exports
│   │
│   ├── features/              # Feature-based modules (domain-driven)
│   │   ├── admin/            # Admin dashboard feature
│   │   │   ├── pages/
│   │   │   │   └── AdminDashboard.tsx
│   │   │   └── index.ts
│   │   ├── auth/             # Authentication feature
│   │   │   ├── pages/
│   │   │   │   └── SignupPage.tsx
│   │   │   └── index.ts
│   │   ├── engineer/          # Engineer dashboard feature
│   │   │   ├── pages/
│   │   │   │   └── EngineerDashboard.tsx
│   │   │   └── index.ts
│   │   ├── industry/          # Industry partner portal feature
│   │   │   ├── pages/
│   │   │   │   └── IndustryPortal.tsx
│   │   │   └── index.ts
│   │   ├── landing/           # Landing page feature
│   │   │   ├── pages/
│   │   │   │   └── LandingPage.tsx
│   │   │   └── index.ts
│   │   ├── profile/           # User profile management feature
│   │   │   ├── pages/
│   │   │   │   └── ProfilePage.tsx
│   │   │   └── index.ts
│   │   ├── projects/          # Project management feature
│   │   │   ├── pages/
│   │   │   │   └── CreateProjectPage.tsx
│   │   │   └── index.ts
│   │   ├── sandbox/           # Code sandbox feature
│   │   │   ├── pages/
│   │   │   │   └── CodeSandbox.tsx
│   │   │   └── index.ts
│   │   └── index.ts           # Feature module exports
│   │
│   ├── shared/                # Shared components across features
│   │   └── components/
│   │       ├── Layout.tsx     # Shared layout wrapper
│   │       └── index.ts
│   │
│   └── ui/                    # Reusable UI components
│       ├── UI.tsx             # UI component library (Card, Button, Input, Toast, etc.)
│       └── index.ts
│
├── index.html                 # HTML entry point
├── index.tsx                  # React application entry point
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
└── metadata.json              # Application metadata
```

### Directory Explanations

#### `/src/app`
Contains the main application logic and routing configuration:
- **`app.tsx`**: Root component managing global state (user, notifications, navigation)
- **`navigation/routes.ts`**: Defines route IDs, protected routes, and role-based access control

#### `/src/core`
Core application infrastructure shared across all features:
- **`components/`**: Core layout components (Navbar, Footer, Breadcrumbs, Layout wrapper)
- **`models/`**: TypeScript type definitions (User, Project, ProjectRequirement, etc.)
- **`services/`**: External service integrations (API calls, Gemini AI)
- **`constants.ts`**: Application-wide constants and configuration

#### `/src/features`
Feature-based modules following domain-driven design principles. Each feature is self-contained with:
- **`pages/`**: Feature-specific page components
- **`index.ts`**: Feature exports for clean imports

**Features:**
- `admin`: Admin dashboard for platform management
- `auth`: User authentication and signup
- `engineer`: Engineer dashboard for project browsing and management
- `industry`: Industry partner portal for project creation and talent browsing
- `landing`: Public landing page
- `profile`: User profile management
- `projects`: Project creation and management
- `sandbox`: Code sandbox/testing environment

#### `/src/shared`
Components shared across multiple features but not core to the application structure.

#### `/src/ui`
Reusable UI component library (Card, Button, Input, Toast, etc.) used throughout the application.

## Architecture Patterns

### Feature-Based Architecture
The application follows a **feature-based** (domain-driven) structure where each feature is self-contained. This promotes:
- **Modularity**: Features can be developed independently
- **Scalability**: Easy to add new features without affecting existing ones
- **Maintainability**: Clear separation of concerns

### Route Protection
Routes are protected based on:
- **Authentication**: `PROTECTED_ROUTES` require user login
- **Role-based**: `ADMIN_ROUTES` and `CLIENT_ONLY_ROUTES` enforce role restrictions

### State Management
Currently uses React's built-in state management (useState hooks). Global state is managed in `app.tsx` and passed down as props.

## Run Locally

**Prerequisites:** Node.js (v16+ recommended)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set environment variables:**
   Create a `.env.local` file in the root directory:
   ```
   API_KEY=your_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## Development Notes

### Path Aliases
The project uses path aliases configured in `vite.config.ts`:
- `@/` resolves to `./src/`

Example: `import { User } from '@/core/models'`


Private project - All rights reserved
