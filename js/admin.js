import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    
    // 1. Session Verification (Guarding the Admin Panel)
    const { data: { session } } = await supabase.auth.getSession();
    
    const loadingScreen = document.getElementById('loading');
    const adminPanel = document.getElementById('admin-panel');
    const errorScreen = document.getElementById('error-screen');

    loadingScreen.classList.add('hidden');

    if (!session) {
        // Not logged in! Show an error and stop execution.
        errorScreen.classList.remove('hidden');
        return; 
    }

    // Un-hide the Admin Panel if session exists!
    adminPanel.classList.remove('hidden');

    // 2. Add New Skill Logic
    document.getElementById('skill-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const skillName = document.getElementById('skillName').value;
        const skillCategory = document.getElementById('skillCategory').value;

        // Insert row securely (Supabase RLS protects this)
        const { error } = await supabase
            .from('skills')
            .insert([{ name: skillName, category: skillCategory }]);

        if (error) alert("Error adding skill: " + error.message);
        else {
            alert("Skill added successfully!");
            e.target.reset();
        }
    });

    // 3. Upload Certificate Logic
    document.getElementById('cert-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const certTitle = document.getElementById('certTitle').value;
        const certImageFile = document.getElementById('certImage').files[0];

        if (!certImageFile) return;

        // Generate a unique path for the file (timestamp + name)
        const filePath = `${Date.now()}_${certImageFile.name}`;

        // Step A: Upload Image to Storage Bucket (portfolio_images)
        const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from('portfolio_images')
            .upload(filePath, certImageFile);

        if (uploadError) {
            alert("Upload failed: " + uploadError.message);
            return;
        }

        // Step B: Get the public URL to render in your UI
        const { data: publicUrlData } = supabase
            .storage
            .from('portfolio_images')
            .getPublicUrl(filePath);

        const imageUrl = publicUrlData.publicUrl;

        // Step C: Save title and URL to Certificates table
        const { error: insertError } = await supabase
            .from('certificates')
            .insert([{ title: certTitle, image_url: imageUrl }]);

        if (insertError) alert("Error saving certificate data: " + insertError.message);
        else {
            alert("Certificate uploaded successfully!");
            e.target.reset();
        }
    });

    // 4. Logout Logic
    document.getElementById('logoutBtn').addEventListener('click', async () => {
        await supabase.auth.signOut();
        window.location.reload(); // Will show "Access Denied" after reloading
    });
});
