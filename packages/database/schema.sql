-- CodeSync Database Schema (Phase 3.2 - Enterprise Onboarding)

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  avatar TEXT,
  bio TEXT,
  country TEXT,
  timezone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 2. Workspaces Table
CREATE TABLE IF NOT EXISTS public.workspaces (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  theme TEXT,
  type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 3. Workspace Members Table
CREATE TABLE IF NOT EXISTS public.workspace_members (
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL DEFAULT 'developer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  PRIMARY KEY (workspace_id, user_id)
);

-- 4. User Preferences Table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL PRIMARY KEY,
  theme TEXT DEFAULT 'system',
  editor_font TEXT DEFAULT 'JetBrains Mono',
  tab_size INTEGER DEFAULT 2,
  font_size INTEGER DEFAULT 14,
  auto_save BOOLEAN DEFAULT true,
  word_wrap BOOLEAN DEFAULT true,
  mini_map BOOLEAN DEFAULT true,
  languages TEXT[] DEFAULT '{}',
  frameworks TEXT[] DEFAULT '{}',
  ai_enabled BOOLEAN DEFAULT true,
  git_integration BOOLEAN DEFAULT true,
  telemetry BOOLEAN DEFAULT true,
  notifications BOOLEAN DEFAULT true,
  reduced_motion BOOLEAN DEFAULT false,
  high_contrast BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 5. Onboarding Progress Table
CREATE TABLE IF NOT EXISTS public.onboarding_progress (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL PRIMARY KEY,
  current_step TEXT NOT NULL DEFAULT 'WELCOME',
  completed_steps TEXT[] DEFAULT '{}',
  finished BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_progress ENABLE ROW LEVEL SECURITY;

-- Basic Policies (can be refined later)
CREATE POLICY "Users can view their own profile." ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile." ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view workspaces they are members of." ON public.workspaces FOR SELECT USING (
  auth.uid() IN (SELECT user_id FROM public.workspace_members WHERE workspace_id = id) OR owner_id = auth.uid()
);
CREATE POLICY "Users can insert workspaces." ON public.workspaces FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can view their own onboarding progress." ON public.onboarding_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own onboarding progress." ON public.onboarding_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own onboarding progress." ON public.onboarding_progress FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own preferences." ON public.user_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own preferences." ON public.user_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own preferences." ON public.user_preferences FOR UPDATE USING (auth.uid() = user_id);
