# MAFI — Production Engineering Tracker

**ARIA LR 340 · Serial: 0005 · P&G Palletizing System**

A production engineering master tracker for the ARIA LR 340 linear robot assembly project.

## Features

- **Dashboard** — Live KPI snapshot, axis breakdown, weekly trend charts
- **BOM Master** — Multi-level bill of materials with axis & category filters
- **Action Plan** — Material action tracking (material requests, MO issues, machining, etc.)
- **Gap Analysis** — Real-time stock vs requirement calculation with configurable JO quantity
- **Assembly Control** — Step-by-step assembly work instructions from the assembly manual
- **KPI Dashboard** — Performance metrics with target vs actual tracking

## Tech Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS 4
- Recharts (data visualization)
- IBM Plex Sans + IBM Plex Mono (typography)

## Getting Started

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

## Deploy to Vercel

```bash
npx vercel --prod
```

## Project Info

- **Product:** ARIA-LR-340-V1-R1
- **Project:** P&G Palletizing System
- **Sales Order:** S00060
- **Axes:** X · Y · Z-Outer · Z-Inner
- **Issued by:** Eng. Ahmad Essameldin
- **Approved by:** Eng. Alaa Saad

© ARIA Technologies — Industrial Zone, Plot 813, Third Settlement, Cairo, Egypt
