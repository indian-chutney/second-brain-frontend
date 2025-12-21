# Second Brain

Second Brain is a modern web application that helps you capture, organize, and share your digital knowledge. Save links from Twitter, Notion, articles, videos, and more—all in one beautifully designed interface with automatic previews and smart organization.

## Features

- **Save Any Link** - Add articles, videos, tweets, and more with automatic previews
- **Smart Organization** - Tag and categorize your content for easy retrieval
- **Beautiful UI** - Clean, modern interface with smooth animations
- **Responsive Design** - Works seamlessly across desktop, tablet, and mobile devices
- **Secure Authentication** - JWT-based authentication with protected routes
- **Share Collections** - Generate shareable links for your curated content
- **Type Filtering** - Quick filtering by content type (tweets, articles, videos, etc.)

---

## Tech Stack

### Frontend is completely built on react and typescript.  It follows context based architecture, meaning it uses contexts instead of prop drilling.

**Core Technologies:**
- React 19.1.0
- TypeScript 5.8.3
- Vite 6.3.5

**Styling & UI:**
- TailwindCSS 4.1.7
- Framer Motion 12.19.2
- Iconoir React 7.11.0

**State & Data Management:**
- TanStack Query 5.81.5
- Axios 1.10.0
- React Router DOM 7.6.3

**Form Validation:**
- Zod 3.25.67

**Utilities:**
- React Responsive 10.0.1
- BSON 6.10.4

---

## UI/UX

used figma to design pages, components like buttons, modals, cards, etc.  referring to their dimensions, created react components later.  took lot of time. 

**Design Highlights:**
- Custom-designed component library (buttons, modals, cards, inputs)
- Consistent spacing and sizing based on Figma specifications
- Dark theme with brand primary color (#8b5cf6)
- Smooth hover effects and transitions
- Mouse parallax effect on landing page

---

## Pages

```jsx
landing - (mouse parallex effect)
signin/signup page - takes the input form component and sends api requests. 
(upon successful signin, received token is stored in localstorage)
dashboard - displays all content from contentConext in form of cards. 
content - this will display the information regarding content.  used linkpreview api to show thumbnails.
```

**Additional Pages:**
- **Share Page** - View publicly shared content collections via unique hash URLs
- **Home Layout** - Wrapper layout with conditional sidebar/navbar based on device
- **Content Detail Page** - Full content view with link preview, tags, and metadata

---

## Components

### UI: 
```jsx
-background
-button
-card
-dashboardContent
-form
-input
-modal
-navbar
-sidebar
-sidebarComponent
-welcome
```

**Component Details:**

| Component | Description |
|-----------|-------------|
| `Background` | Parallax animated icons on landing page |
| `Button` | Reusable button with multiple variants (primary/secondary) and sizes |
| `Card` | Content card with icon, title, link, tags, and actions (edit, delete, share) |
| `DashboardContent` | Grid layout displaying content cards with filtering |
| `Form` | Dynamic form component for signup, signin, content creation, and password change |
| `Input` | Custom input fields with variants (text, tags, dropdown options) |
| `Modal` | Animated modal for content creation, settings, and delete confirmation |
| `Navbar` | Mobile/tablet navigation bar with menu |
| `Sidebar` | Desktop sidebar navigation with content type filters |
| `SidebarComponent` | Individual sidebar menu items with icons and active states |
| `Welcome` | Onboarding modal for new users with feature overview |

---

## Contexts & Hooks

**Contexts:**

| Context | Purpose |
|---------|---------|
| `ModalContext` | Manages modal states (content modal, settings modal, delete modal, welcome screen) |
| `AuthContext` | Handles authentication state, token management, login/logout |
| `ContentContext` | Manages user's content data, filtering by type, and loading states |
| `ShareContext` | Handles shared content retrieval via hash links |

**Custom Hooks:**

```typescript
useModalContext()     // Access modal states and controls
useAuthContext()      // Access authentication state and methods
useContentContext()   // Access user content and filtering
useShareContext()     // Access shared content data
useCorrectSetType()   // Returns correct setType based on route (share vs dashboard)
```

**Architecture Benefits:**
- ✅ No prop drilling
- ✅ Centralized state management
- ✅ Easy access to global states across components
- ✅ Clean component hierarchy

---

## API Requests

**Backend Integration:**
- Base URL configured via environment variable (`VITE_BACKEND_URL`)
- Axios for HTTP requests with JWT Bearer token authentication
- TanStack Query for data fetching, caching, and synchronization

**API Endpoints:**

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/v1/signup` | User registration |
| POST | `/api/v1/signin` | User login |
| GET | `/api/v1/content` | Fetch user's content |
| POST | `/api/v1/content` | Create new content |
| PUT | `/api/v1/content/:id` | Update content |
| DELETE | `/api/v1/content/:id` | Delete content |
| POST | `/api/v1/share` | Generate share link |
| GET | `/api/v1/share/:hash` | Fetch shared content |
| POST | `/api/v1/password` | Change password |

**Features:**
- Automatic token attachment to authenticated requests
- Error handling with user-friendly messages
- Loading states during API calls
- Query invalidation on mutations for real-time updates

**External APIs:**
- LinkPreview. net API for generating link thumbnails and metadata

---

## React Forms

**Form Validation with Zod:**
- Schema-based validation for all form inputs
- Type-safe form data handling
- Custom error messages displayed inline

**Form Variants:**

1. **Signup Form**
   - Fields: Email, Username, Password, Confirm Password
   - Email format validation
   - Password strength requirements (min 6 characters)
   - Password match confirmation

2. **Signin Form**
   - Fields:  Email, Password
   - Credential validation

3. **Content Modal Form**
   - Fields: Title, Type (dropdown), Link, Tags (multi-input)
   - URL validation
   - Required field checks
   - Edit mode support

4. **Password Change Form**
   - Fields: Current Password, New Password, Confirm New Password
   - Password validation and matching

**Form Features:**
- Real-time validation feedback
- Loading states with spinner animations
- Success/error message display
- Form reset after successful submission
- Backend error integration

---

## Responsive Design

**Breakpoints:**
- Mobile: `< 460px`
- Tablet: `460px - 1224px`
- Desktop: `> 1224px`

**Responsive Features:**
- Mobile-first approach
- Hamburger menu navigation on mobile/tablet
- Sidebar navigation on desktop
- Flexible grid layouts (1 column on mobile → 2-3 columns on desktop)
- Touch-optimized interactions
- Conditional component rendering based on device
- Responsive typography and spacing

**Implementation:**
- Uses `react-responsive` library for media query hooks
- Dynamic component swapping (Navbar ↔ Sidebar)
- Adaptive button sizes and padding
- Optimized image loading

---

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Backend API running (see backend repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/indian-chutney/second-brain-frontend.git
   cd second-brain-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_BACKEND_URL=your_backend_api_url
   VITE_EMBED_KEY=your_linkpreview_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

---

## Project Structure

```
second-brain-frontend/
├── src/
│   ├── assets/          # Icons, images, and SVG components
│   ├── components/      # Reusable UI components
│   ├── contexts/        # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components and routes
│   ├── App.tsx          # Main app component with routing
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles and Tailwind imports
├── public/              # Static assets
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── tailwind.config.js   # Tailwind CSS configuration
```

---

## Key Features Implementation

### Content Type Filtering
- Sidebar navigation for quick type switching
- Real-time content filtering without page reload
- Active state indication
- Smooth transition animations

### Share Functionality
- Generate unique hash-based share links
- Public access to shared collections
- Same UI/UX for both private and shared views
- Copy-to-clipboard functionality

### Authentication Flow
- Protected routes with React Router
- Automatic token storage in localStorage
- Token expiration handling
- Redirect to signin on unauthorized access

### Link Preview
- Automatic thumbnail generation
- Metadata extraction (title, description, image)
- Loading states during preview generation
- Fallback UI for failed previews

---

<div align="center">
  <p>Built with ❤️ using React and TypeScript</p>
</div>
