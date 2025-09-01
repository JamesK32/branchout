# BranchOut

A campus social platform that matches students into small groups for in-person meetups, starting with a pilot at Boston College.

## Features

- Beautiful landing page with rotating taglines
- Waitlist signup with Supabase integration
- Admin dashboard for pod management
- Twilio SMS integration for notifications

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Deployment**: Vercel
- **SMS**: Twilio

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run the development server: `npm run dev`

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Twilio Configuration
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_MESSAGING_SERVICE_SID=your_messaging_service_id

# Admin Security
ADMIN_SECRET=your_admin_password
```

## Database Setup

Run the Supabase migration in `supabase/migrations/001_init.sql` to set up the database schema.

## Deployment

The project is configured for deployment on Vercel with automatic builds from the main branch.
