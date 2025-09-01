# BranchOut - Campus Social Platform

> **Latest Update**: Clean landing page with rotating tagline and waitlist form

BranchOut is a campus social platform that matches students into small groups for in-person meetups, starting with a pilot at Boston College.

## Features

- **Clean Landing Page**: Simple, modern design with rotating tagline
- **Waitlist Capture**: Collect student signups with name, email, phone, and year
- **Supabase Integration**: Database backend for storing waitlist entries
- **Responsive Design**: Works on desktop and mobile
- **Fast Performance**: Optimized with Next.js and Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15.5.2, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Form Handling**: React hooks with fetch API

## Installation

1. Clone the repository:
```bash
git clone https://github.com/JamesK32/branchout.git
cd branchout
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Add your Supabase credentials to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Run the development server:
```bash
npm run dev
```

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SUPABASE_URL`: Your Supabase project URL (for server-side)
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (for admin operations)
- `TWILIO_ACCOUNT_SID`: Twilio account SID (for SMS integration)
- `TWILIO_AUTH_TOKEN`: Twilio auth token
- `TWILIO_MESSAGING_SERVICE_SID`: Twilio messaging service SID
- `ADMIN_SECRET`: Secret key for admin operations

## Supabase Schema

The project uses the following database tables:

- `users`: Student information and status
- `pods`: Group meetup sessions
- `pod_members`: User-group relationships
- `messages`: SMS communication logs
- `feedback`: User feedback and ratings

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main landing page
│   ├── globals.css           # Global styles
│   └── api/
│       └── waitlist/
│           └── route.ts      # Waitlist API endpoint
├── lib/
│   ├── supabase.ts           # Client-side Supabase client
│   └── supabase-admin.ts     # Server-side admin client
└── components/               # React components
```

## Pages

- **Landing Page**: Hero section with rotating tagline and waitlist form
- **API Routes**: `/api/waitlist` for form submissions

## Customization

### Rotating Tagline
Edit the `rotatingWords` array in `src/app/page.tsx` to change the rotating phrases.

### Colors
The primary brand color is `#167a5f` (BranchOut green). Update the color values in the CSS classes to match your brand.

### Logo
Replace `/Logo Full.png` in the `public/` directory with your logo file.

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables in Vercel

Add these in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## API Endpoints

### POST /api/waitlist
Adds a new waitlist entry.

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@bc.edu",
  "phone": "(617) 555-0123",
  "year_of_study": "Freshman",
  "school": "Boston College"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully joined waitlist!",
  "count": 74
}
```

### GET /api/waitlist
Returns the current waitlist count.

**Response:**
```json
{
  "count": 74
}
```

## Future Enhancements

- [ ] Admin dashboard for pod management
- [ ] Twilio SMS integration for notifications
- [ ] User authentication and profiles
- [ ] Pod scheduling and matching algorithm
- [ ] Feedback collection system
- [ ] Multi-campus expansion

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software for BranchOut.

## Support

For questions or support, contact: bcbranchout@gmail.com

---

**BranchOut** - Connecting strangers, expanding perspectives at Boston College.
