import { createClient } from '@supabase/supabase-js'

const supabaseURL = 'https://ndcqpsskwkqwbpxawmor.supabase.co'
const supabaseApiKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kY3Fwc3Nrd2txd2JweGF3bW9yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNDEwMTg4NywiZXhwIjoyMDM5Njc3ODg3fQ.ypKN9jLLAY4xEC3Kc18wb1MkRbABwXNJYFjex18Axag'

export const supabase = createClient(supabaseURL, supabaseApiKey)
