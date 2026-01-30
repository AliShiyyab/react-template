# React App Template

A modern React application template with TypeScript, Vite, TailwindCSS, and shadcn/ui components.

## Features

- ⚡️ **Vite** - Lightning fast HMR
- ⚛️ **React 19** - Latest React version
- 🎨 **TailwindCSS** - Utility-first CSS framework
- 🌙 **Dark Theme** - Pre-configured dark mode
- 🎯 **TypeScript** - Type safety
- 🧩 **shadcn/ui** - Beautiful, accessible components
- 🔀 **React Router** - Client-side routing
- 📦 **Lucide Icons** - Beautiful icon library

## Pages

### Main
- **Dashboard** - Main dashboard overview (Coming Soon)

### Administration
- **Admin Users** - Manage administrative users (Coming Soon)
- **Admin Roles** - Manage user roles and permissions (Coming Soon)
- **Configurations** - System configurations and settings (Coming Soon)

### Users
- **Users** - User management system (Coming Soon)
- **User Documentations** - Access and manage user documents (Coming Soon, linked from Users page)
- **Notifications** - View and manage notifications (Coming Soon)

## Getting Started

### Installation

```bash
yarn install
```

### Development

```bash
yarn dev
```

The application will be available at `http://localhost:5173/`

### Build

```bash
yarn build
```

### Preview Production Build

```bash
yarn preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── Layout.tsx       # Main layout with sidebar
│   └── ComingSoonPage.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── Notifications.tsx
│   ├── admin/
│   │   ├── AdminUsers.tsx
│   │   ├── AdminRoles.tsx
│   │   └── Configurations.tsx
│   └── users/
│       ├── Users.tsx
│       └── UserDocumentations.tsx
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Main app with routing
├── main.tsx
└── index.css            # Global styles & Tailwind
```

## Technologies

- **React** 19.2.0
- **TypeScript** 5.9.3
- **Vite** 7.2.4
- **TailwindCSS** 4.1.18
- **React Router** 7.13.0
- **Lucide React** - Icons
- **shadcn/ui** - UI Components

## shadcn/ui

This project uses [shadcn/ui](https://ui.shadcn.com/) for components. To add more components:

```bash
npx shadcn@latest add [component-name]
```

## License

MIT
