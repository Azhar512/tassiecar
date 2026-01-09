# TassieCars - Tasmania Car Rental

A modern, premium car rental website for exploring Tasmania.

## About

TassieCars provides affordable, reliable car rentals across Tasmania's most stunning destinations. Our fleet includes economy cars, SUVs, luxury vehicles, and electric cars to suit every traveler's needs.

## Features

- **Vehicle Fleet**: Browse and filter from our diverse selection of vehicles
- **Online Booking**: Easy-to-use booking system with flexible pickup/dropoff locations
- **Multiple Locations**: Service available in Hobart, Launceston, Devonport, and airports
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Modern UI**: Premium design with smooth animations and glassmorphism effects

## Tech Stack

This project is built with modern web technologies:

- **React** 18.3 with TypeScript
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **shadcn/ui** - Beautiful, accessible UI components built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Data synchronization and caching
- **React Hook Form** + Zod - Form handling and validation
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd tassie-drive-experience-main
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```sh
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

```sh
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── home/        # Homepage-specific components
│   ├── layout/      # Layout components (Header, Footer)
│   └── ui/          # shadcn/ui components
├── pages/           # Page components for each route
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── assets/          # Images and static assets
└── App.tsx          # Main app component with routing
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

All rights reserved.
