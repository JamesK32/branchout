# BranchOut Supabase Setup

## Database Migration

This directory contains the Supabase database migrations for BranchOut.

### Migration Files

- `001_init.sql` - Initial schema setup with core tables

### Tables Created

1. **users** - User accounts and preferences
2. **pods** - Dinner groups/sessions  
3. **pod_members** - Many-to-many relationship between users and pods
4. **messages** - SMS message history for Twilio integration
5. **feedback** - Post-dinner feedback and ratings

### How to Apply

#### Option 1: Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `001_init.sql`
4. Click **Run** to execute the migration

#### Option 2: Supabase CLI
```bash
# Install Supabase CLI if you haven't already
npm install -g supabase

# Link your project (if not already linked)
supabase link --project-ref YOUR_PROJECT_REF

# Apply the migration
supabase db push
```

### Verification

After applying the migration, verify the tables were created:

```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('users', 'pods', 'pod_members', 'messages', 'feedback');

-- Check indexes
SELECT indexname, tablename FROM pg_indexes 
WHERE tablename IN ('users', 'pods', 'pod_members');
```

### Next Steps

1. Set up Row Level Security (RLS) policies
2. Create API routes for user management
3. Build admin dashboard
4. Integrate Twilio for SMS notifications

### Notes

- No RLS policies are included in this migration
- All tables use UUID primary keys for better security
- Indexes are created for common query patterns
- Foreign key constraints ensure data integrity
