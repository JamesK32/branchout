# BranchOut Landing Page

A modern, responsive landing page for BranchOut - a campus social platform that matches students into small groups for in-person meetups, starting with a pilot at Boston College.

## Features

- 🎨 **Beautiful Design**: Clean, modern UI with smooth animations and spotlight effects
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- 🔄 **Rotating Taglines**: Dynamic "Meet a ___" taglines that cycle through different options
- 📝 **Form Integration**: Collects signups with name, email, phone, and year of study
- 🗄️ **Database Integration**: Stores signups in Supabase with real-time count updates
- 🚀 **Vercel Ready**: Optimized for deployment on Vercel
- ⚡ **Fast Performance**: Built with Next.js 14 and optimized for speed

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Database**: Supabase
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd branchout
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase Database**

   Create a new table called `waitlist` with the following schema:
   ```sql
   CREATE TABLE waitlist (
     id SERIAL PRIMARY KEY,
     first_name TEXT NOT NULL,
     last_name TEXT NOT NULL,
     email TEXT NOT NULL,
     phone TEXT,
     year_of_study TEXT NOT NULL,
     school TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts          # API endpoint for form submissions
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main landing page component
├── lib/
│   └── supabase.ts              # Supabase client configuration
```

## Pages & Components

### Landing Page
- Hero section with rotating taglines
- Call-to-action buttons
- Footer with contact information

### Connect Page
- Waitlist counter with real-time updates
- "How it Works" section
- Mission statement
- Social sharing options

### About Page
- Team information
- Student testimonials
- Company story

### Support Page
- FAQ section
- Contact information
- Help resources

### Onboarding Page
- Signup form with validation
- Real-time form submission to Supabase
- Success/error handling

## Customization

### Colors
The primary brand color is `#167a5f` (green). You can customize this in the components by updating the color values.

### Content
- Update text content in the respective page components
- Modify rotating taglines in the `LandingPage` component
- Update contact information and social links

### Styling
- All styling is done with Tailwind CSS classes
- Custom styles can be added to `globals.css`

## Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Add environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically detect Next.js and deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## API Endpoints

### POST /api/waitlist
Submits a new waitlist entry.

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@bc.edu",
  "phone": "(617) 555-0123",
  "year_of_study": "Junior",
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

- [ ] Twilio SMS integration for notifications
- [ ] Email marketing integration (Mailchimp, ConvertKit)
- [ ] Analytics tracking
- [ ] A/B testing capabilities
- [ ] Multi-campus support
- [ ] Admin dashboard for managing signups

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email bcbranchout@gmail.com or create an issue in this repository.
