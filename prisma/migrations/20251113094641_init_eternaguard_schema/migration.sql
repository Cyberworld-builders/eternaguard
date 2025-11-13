-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "eternaguard";

-- CreateTable
CREATE TABLE "eternaguard"."user_profiles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "display_name" TEXT,
    "bio" TEXT,
    "avatar_url" TEXT,
    "company" TEXT,
    "website" TEXT,
    "location" TEXT,
    "preferences" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_user_id_key" ON "eternaguard"."user_profiles"("user_id");
CREATE INDEX "user_profiles_user_id_idx" ON "eternaguard"."user_profiles"("user_id");
CREATE INDEX "user_profiles_created_at_idx" ON "eternaguard"."user_profiles"("created_at");

-- AddForeignKey (only if auth.users exists - Supabase manages this)
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'auth' AND tablename = 'users') THEN
    ALTER TABLE "eternaguard"."user_profiles" ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE "eternaguard"."user_profiles" ENABLE ROW LEVEL SECURITY;

-- RLS Policies (only if auth.uid() function exists - Supabase provides this)
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_proc WHERE proname = 'uid' AND pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'auth')) THEN
    EXECUTE 'CREATE POLICY "Users can view own profile" ON "eternaguard"."user_profiles" FOR SELECT USING (auth.uid() = user_id)';
    EXECUTE 'CREATE POLICY "Users can insert own profile" ON "eternaguard"."user_profiles" FOR INSERT WITH CHECK (auth.uid() = user_id)';
    EXECUTE 'CREATE POLICY "Users can update own profile" ON "eternaguard"."user_profiles" FOR UPDATE USING (auth.uid() = user_id)';
    EXECUTE 'CREATE POLICY "Users can delete own profile" ON "eternaguard"."user_profiles" FOR DELETE USING (auth.uid() = user_id)';
  END IF;
END $$;

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION eternaguard.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on profile changes
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON "eternaguard"."user_profiles"
  FOR EACH ROW
  EXECUTE FUNCTION eternaguard.handle_updated_at();

-- Function to create a profile for new users
CREATE OR REPLACE FUNCTION eternaguard.create_profile_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO eternaguard.user_profiles (user_id, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create a profile when a user signs up (only if auth.users exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'auth' AND tablename = 'users') THEN
    EXECUTE 'CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION eternaguard.create_profile_for_user()';
  END IF;
END $$;

-- Grant permissions
GRANT USAGE ON SCHEMA eternaguard TO authenticated;
GRANT ALL ON eternaguard.user_profiles TO authenticated;
GRANT EXECUTE ON FUNCTION eternaguard.handle_updated_at TO authenticated;
GRANT EXECUTE ON FUNCTION eternaguard.create_profile_for_user TO authenticated;

