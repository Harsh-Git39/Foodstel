// Properly import Supabase from the global window object
const supabase = window.supabase.createClient(
    "https://wqquipfnhiflabewoppk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxcXVpcGZuaGlmbGFiZXdvcHBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyODI2ODUsImV4cCI6MjA1Njg1ODY4NX0.fXWOE0o6kcs6eSxI8GdhF3s3JGH1ZFHHPaR5BxsAx2s" // Replace with your actual key
);


//signup function 
async function signUp() {
    event.preventDefault(); // Prevent page reload
    // here take the hold of the id for email and password .
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
    
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
    
        if (error) {
            console.error("Sign-up error:", error.message);
        } else {
            console.log("Sign-up successful:", data);
            window.location.href = "main_admin_page.html";
        }
    }

    

//login function
async function login(){
    event.preventDefault(); // Prevent page reload

    //get how of your id and pass it
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    
    if (error) {
        console.error("Login error:", error.message);
    }
    else{
        console.log("Login successful:", data);
        window.location.href = "main_admin_page.html";
    }
    }
    