import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Your Supabase API URL provided in the prompt
const supabaseUrl = 'https://ktjhyrpxvfejbfdwyuzl.supabase.co'

// IMPORTANT: You must replace this with your project's "anon public" key!
// You can find this in your Supabase Dashboard -> Settings -> API
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0amh5cnB4dmZlamJmZHd5dXpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MTIwMjMsImV4cCI6MjA5MDE4ODAyM30.kmDJ1q6RJsJD7eom8jwzmRkMHIAootvraptUGxbl6w4'

export const supabase = createClient(supabaseUrl, supabaseKey)
