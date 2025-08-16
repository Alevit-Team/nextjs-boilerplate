# Email Verification & Password Reset Implementation

This document describes the secure email verification and password reset flows implemented for the Next.js boilerplate application.

## 🚀 Features Implemented

### ✅ Email Verification Flow

- Secure Token Generation: 64-byte cryptographically secure tokens
- Database Integration: Tokens stored hashed with SHA-256
- Expiration Handling: 24-hour expiration
- Rate Limiting: 3 verification emails per hour per user
- Email Templates: HTML and text
- UX: Clear instructions and resend functionality

### ✅ Password Reset Flow

- Short-lived Tokens: 15-minute expiration
- One-time Use: Tokens invalidated after use
- Rate Limiting: 5 reset attempts per hour per user
- Session Invalidation: All sessions cleared on reset

### ✅ Security Features

- Constant-time comparison
- Token hashing
- Automatic cleanup of expired tokens
- Email verification required before sign-in

## 📁 File Structure

```
src/
├── lib/
│   ├── email-service.ts
│   ├── token-service.ts
│   └── get-form-error-message.ts
├── auth/nextjs/
│   ├── actions.ts
│   ├── schemas.ts
│   ├── types.ts
│   └── components/
│       ├── email-verification-instructions.tsx
│       ├── reset-password-form.tsx
│       ├── forgot-password-form.tsx
│       └── signin-form.tsx
├── app/(front-end)/(auth)/
│   ├── verify-email/
│   │   ├── page.tsx
│   │   └── [token]/page.tsx
│   └── reset-password/
│       └── [token]/page.tsx
└── db/
    └── schema.ts
```

## 🔐 Security Implementation

### Token Generation

```typescript
const token = randomBytes(64).toString('hex');
const hashedToken = createHash('sha256').update(token).digest('hex');
```

### Constant-time Comparison

```typescript
const providedHash = createHash('sha256').update(providedToken).digest('hex');
const storedBuffer = Buffer.from(storedHash, 'hex');
const providedBuffer = Buffer.from(providedHash, 'hex');
return (
  storedBuffer.length === providedBuffer.length &&
  timingSafeEqual(storedBuffer, providedBuffer)
);
```

## 🔄 User Flows

Summaries for sign-up, sign-in, password reset, and verification flows.

## 🧪 Testing

```bash
npx tsx src/test-email-service.ts
```

## ⚙️ Configuration

```env
NEXT_PUBLIC_APP_URL=https://yourdomain.com
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@yourdomain.com
```
