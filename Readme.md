# Frontend Projects by Sabin Pandey

## 1. Honest Value (Figma Implementation)

### Deployment Link

[Honest Value](https://honest-value-sabin.vercel.app)

### Overview

This project is a pixel-perfect implementation of a Figma design using **TypeScript** and **Tailwind CSS**, featuring animations and mobile responsiveness.

### Core Features

- **Responsive Design**:
  - Fully responsive for screens as small as 350px and as large as 1920px.
- **Semantic HTML**:
  - Leveraged semantic HTML tags and ARIA roles for better accessibility.
- **Animations**:
  - Smooth animations powered by **Framer Motion**.
- **Mobile-Friendly**:
  - Ensures usability across devices of varying sizes.

---

## 2. Database Diagrammer Tool

### Overview

An tool for creating database diagrams using **Next.js**, **Tailwind CSS**, **React Flow**, and **ShadCN UI**.

[Diagrammer Pro](https://diagrammer-pro-sabin.vercel.app)

### Core Features

- **Diagram Creation**:
  - Add, edit, and delete tables.
  - Manage columns with data types and constraints.
  - Create, edit, and delete relationships.
- **Data Persistence**:
  - Automatically saves progress to `localStorage`, ensuring no data is lost on refresh.
- **Undo/Redo Functionality**:
  - Easily revert or redo changes during diagramming.
- **Tab Switching**:
  - Switch between List View and Diagram View with a button.
- **Dark/Light Mode**:
  - Toggle between themes for better usability.

### Other Features

- Validation to prevent duplicate table and column names.
- Error, alert, and success message handling.
- Export diagrams as JSON and import existing JSON files.
- Optimized for performance with `useCallback` and `useMemo`.
- Fully mobile-responsive design with a clean UI.

---

## **Setup Instructions**

### Clone Repository

```bash
git clone https://github.com/sabeen2/startercode.git
cd startercode
git checkout sabin_pandey_frontend
```

### For React Flow

```bash
cd react-flow
npm install
npm run dev
```

### For Honest Value

```bash
cd honest-value
npm install
npm run dev
```
