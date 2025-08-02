src/
├── app/ # Next.js 13+ App Router
│ ├── layout.tsx # Root layout component
│ ├── page.tsx # Home page
│ └── favicon.ico # App favicon
│
├── components/ # Reusable UI components
│ ├── ui/ # Basic UI components (buttons, inputs, cards)
│ ├── layout/ # Layout components (header, footer, nav)
│ └── index.ts # Barrel exports for UI/layout
│
├── features/ # Feature/domain-specific modules
│ ├── cart/
│ │ ├── components/ # Cart-related UI components
│ │ ├── hooks/ # Cart-specific hooks
│ │ ├── services/ # Cart-related business logic
│ │ └── types.ts # Cart-specific types
│ ├── product/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── services/
│ │ └── types.ts
│ └── user/
│ ├── components/
│ ├── hooks/
│ ├── services/
│ └── types.ts
│
├── lib/ # Shared libraries and helpers
│ ├── api/ # API clients or helpers
│ ├── auth/ # Authentication utilities
│ ├── prisma/ # Prisma client or DB utilities (if using)
│ └── utils.ts # General utility functions
│
├── services/ # Global business logic services
│ ├── product-service.ts
│ ├── cart-service.ts
│ └── user-service.ts
│
├── hooks/ # Global reusable hooks
│ └── index.ts
│
├── store/ # Global state (Zustand, Redux, etc.)
│ ├── cart-store.ts
│ ├── user-store.ts
│ └── ...
│
├── types/ # Global TypeScript types
│ └── index.ts
│
├── constants/ # App-wide constants
│ ├── api.ts
│ ├── routes.ts
│ ├── config.ts
│ └── index.ts # Barrel export if needed
│
├── styles/ # Global and module CSS
│ └── globals.css
│
├── assets/ # Static assets (images, icons, svgs)
│ ├── images/
│ ├── icons/
│ └── ...
│
└── middleware.ts # Next.js middleware (auth, redirects, etc.)
