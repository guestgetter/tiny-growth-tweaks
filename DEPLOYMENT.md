# Deployment Guide - Restaurant Growth Tweaks

## Branch: `database-signup-flow`

This branch contains the complete user signup and authentication flow with Supabase integration.

## Features Included

✅ **Complete User Authentication**
- Sign up with email, password, name, phone, restaurant name, and city
- Email confirmation required (configurable in Supabase)
- Sign in with redirect to appropriate page
- User session management

✅ **Professional Welcome Page**
- Clean, business-focused language
- No fake credibility numbers
- Clear value proposition
- Smooth onboarding experience

✅ **Database Integration**
- User profiles with complete data
- User progress tracking
- Secure authentication with Supabase

## Environment Variables Required

Create these environment variables in your deployment platform:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Getting Your Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and sign in
2. Select your project
3. Go to **Settings** → **API**
4. Copy the **Project URL** and **anon/public key**

## Database Schema

Make sure your Supabase database has these tables:

```sql
-- User profiles table
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  phone TEXT,
  restaurant TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- User progress tracking
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  week_number INTEGER NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## Deployment Platforms

### Vercel (Recommended)

1. Connect your GitHub repository
2. Select the `database-signup-flow` branch
3. Add environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables
5. Deploy

### Other Platforms

Make sure your platform supports:
- Node.js 18+
- Next.js 14
- Environment variables
- Static file serving

## Supabase Configuration

### Email Authentication Settings

1. Go to **Authentication** → **Settings**
2. Configure **Site URL** to your domain (e.g., `https://yourdomain.com`)
3. Add your domain to **Redirect URLs**
4. Configure email templates if desired

### Row Level Security

Make sure RLS is enabled and policies are set up as shown in the database schema above.

## Testing Deployment

1. **Test Signup Flow**:
   - Visit your deployed site
   - Click "Get Started" 
   - Fill out signup form
   - Check email for confirmation
   - Confirm email and ensure redirect to welcome page

2. **Test Sign In**:
   - Sign in with confirmed account
   - Ensure redirect to checklist page
   - Verify user data loads correctly

3. **Test Authentication State**:
   - Ensure protected pages redirect unauthenticated users
   - Verify user session persists across page reloads

## Post-Deployment Checklist

- [ ] Signup flow works end-to-end
- [ ] Email confirmation works
- [ ] Welcome page displays correctly
- [ ] User data saves to database
- [ ] Authentication redirects work properly
- [ ] All environment variables are set
- [ ] HTTPS is enabled
- [ ] Domain is configured in Supabase

## Troubleshooting

### Common Issues

1. **"supabaseUrl is required" error**
   - Check environment variables are set correctly
   - Ensure variable names match exactly: `NEXT_PUBLIC_SUPABASE_URL`

2. **Authentication not working**
   - Verify Site URL and Redirect URLs in Supabase
   - Check email confirmation settings
   - Ensure RLS policies are set up

3. **Database errors**
   - Run the schema.sql file in Supabase SQL editor
   - Check table permissions and RLS policies

## Support

If you encounter issues:
1. Check browser console for errors
2. Check Supabase logs in dashboard
3. Verify all environment variables
4. Ensure database schema is correct 