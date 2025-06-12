import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const signUp = async (email, password, profileData = {}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  
  // If signup successful and we have profile data, create user profile
  if (data.user && !error && Object.keys(profileData).length > 0) {
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        user_id: data.user.id,
        full_name: profileData.name || '',
        phone: profileData.phone || '',
        restaurant_name: profileData.restaurantName || '',
        city: profileData.city || ''
      })
    
    if (profileError) {
      console.error('Error creating user profile:', profileError)
    }
  }
  
  return { data, error }
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Progress helpers
export const saveProgress = async (userId, tweakId, isCompleted) => {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({ 
      user_id: userId, 
      tweak_id: tweakId, 
      completed: isCompleted,
      updated_at: new Date().toISOString()
    })
  return { data, error }
}

export const getUserProgress = async (userId) => {
  const { data, error } = await supabase
    .from('user_progress')
    .select('tweak_id, completed')
    .eq('user_id', userId)
  return { data, error }
}

// User profile helpers
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
  return { data, error }
} 