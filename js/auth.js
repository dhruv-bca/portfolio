import { supabase } from './supabase.js?v=1774674070';

// This function can be attached to a hidden login form or keyboard shortcut on the Contact Page
export async function secureLogin(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        console.error("Login Error:", error.message);
        alert("Login Error: " + error.message);
        return false;
    }

    console.log("Logged in successfully!");
    // Redirect to the Connect page after login
    window.location.href = '/contact';
    return true;
}

// Optional: A function to check if the user is already logged in securely
export async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}
