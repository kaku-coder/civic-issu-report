// Authentication and navigation functions
function checkAuthAndReport() {
    // Check if user is logged in
    if (localStorage.getItem("loggedIn") === "true") {
        // User is logged in, redirect to report page
        window.location.href = "report.html";
    } else {
        // User is not logged in, redirect to login page
        // Store the intended destination for after login
        localStorage.setItem("redirectAfterLogin", "report.html");
        window.location.href = "login.html";
    }
}

function checkAuthAndDashboard() {
    // Check if user is logged in
    if (localStorage.getItem("loggedIn") === "true") {
        // User is logged in, redirect to dashboard
        window.location.href = "dashboard.html";
    } else {
        // User is not logged in, redirect to login page
        localStorage.setItem("redirectAfterLogin", "dashboard.html");
        window.location.href = "login.html";
    }
}

function checkAuthAndUser() {
    // Check if user is logged in
    if (localStorage.getItem("loggedIn") === "true") {
        // User is logged in, show user profile or redirect to profile page
        alert("User profile functionality coming soon!");
    } else {
        // User is not logged in, redirect to login page
        localStorage.setItem("redirectAfterLogin", "index.html");
        window.location.href = "login.html";
    }
}

function checkAuthAndProfile() {
    // Check if user is logged in
    if (localStorage.getItem("loggedIn") === "true") {
        // User is logged in, redirect to profile page
        window.location.href = "profile.html";
    } else {
        // User is not logged in, redirect to login page
        localStorage.setItem("redirectAfterLogin", "profile.html");
        window.location.href = "login.html";
    }
}

// Logout function
function logout() {
    // Clear all user data from localStorage
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    
    // Redirect to main page
    window.location.href = "index.html";
}

// Toggle profile dropdown
function toggleProfileDropdown() {
    const dropdown = document.getElementById("profileDropdown");
    dropdown.classList.toggle("show");
}

// Show profile information
function showProfile() {
    window.location.href = "profile.html";
}

// Check login status and update UI
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    const userProfile = document.getElementById("userProfile");
    const loginPrompt = document.getElementById("loginPrompt");
    
    if (isLoggedIn) {
        // User is logged in, show profile dropdown
        userProfile.style.display = "inline-block";
        loginPrompt.style.display = "none";
        
        // Update profile information
        const userName = localStorage.getItem("userName") || "User";
        const userEmail = localStorage.getItem("userEmail") || "user@example.com";
        
        document.getElementById("profileUserName").textContent = userName;
        document.getElementById("profileUserEmail").textContent = userEmail;
    } else {
        // User is not logged in, show login prompt
        userProfile.style.display = "none";
        loginPrompt.style.display = "inline-block";
    }
}

// Add click handlers for navigation buttons
document.addEventListener('DOMContentLoaded', function() {
    // Check login status and update UI
    checkLoginStatus();
    
    // Handle the "Report an Issue" button in the main content
    const reportBtn = document.querySelector('.primary-btn');
    if (reportBtn) {
        reportBtn.addEventListener('click', checkAuthAndReport);
    }
    
    // Handle the "View Dashboard" button
    const dashboardBtn = document.querySelector('.outline-btn');
    if (dashboardBtn) {
        dashboardBtn.addEventListener('click', checkAuthAndDashboard);
    }
    
    // Handle the "Report issus" button in navbar
    const navbarReportBtn = document.querySelector('.rightnav .btn');
    if (navbarReportBtn) {
        navbarReportBtn.addEventListener('click', checkAuthAndReport);
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const profileDropdown = document.getElementById("profileDropdown");
        const userProfile = document.getElementById("userProfile");
        
        if (profileDropdown && userProfile && !userProfile.contains(event.target)) {
            profileDropdown.classList.remove("show");
        }
    });
});
