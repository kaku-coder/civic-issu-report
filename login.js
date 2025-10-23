// Login functionality and authentication
function togglePassword(id, elem) {
    const input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
        elem.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
    } else {
        input.type = "password";
        elem.innerHTML = '<i class="fa-regular fa-eye"></i>';
    }
}

function getStoredUsers() {
    const users = localStorage.getItem('civicUsers');
    return users ? JSON.parse(users) : [];
}

function setStoredUsers(users) {
    localStorage.setItem('civicUsers', JSON.stringify(users));
}

// Check if user is already logged in and redirect accordingly
function checkExistingLogin() {
    if (localStorage.getItem("loggedIn") === "true") {
        const redirect = localStorage.getItem("redirectAfterLogin") || "index.html";
        localStorage.removeItem("redirectAfterLogin");
        window.location.href = redirect;
    }
}

// Initialize login form handlers
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    checkExistingLogin();
    
    // Login form handler
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.onsubmit = function(e) {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value.trim();
            const pass = document.getElementById("loginPassword").value;
            const err = document.getElementById("loginError");
            const users = getStoredUsers();
            const match = users.find(u => u.email === email && u.password === pass);
            
            if (!match) {
                err.textContent = "Invalid email or password.";
                err.style.display = "block";
            } else {
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("userName", match.name);
                localStorage.setItem("userEmail", match.email);
                const redirect = localStorage.getItem("redirectAfterLogin") || "index.html";
                localStorage.removeItem("redirectAfterLogin");
                window.location.href = redirect;
            }
        };
    }
    
    // Signup form handler
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.onsubmit = function(e) {
            e.preventDefault();
            const name = document.getElementById("signupName").value.trim();
            const phone = document.getElementById("signupPhone").value.trim();
            const email = document.getElementById("signupEmail").value.trim();
            const pass = document.getElementById("signupPassword").value;
            const confirm = document.getElementById("signupConfirm").value;
            const err = document.getElementById("signupError");
            const success = document.getElementById("signupSuccess");
            
            err.style.display = "none";
            success.style.display = "none";
            
            if (!/^\d{10}$/.test(phone)) {
                err.textContent = "Phone number must be exactly 10 digits.";
                err.style.display = "block";
                return;
            }
            if (pass !== confirm) {
                err.textContent = "Passwords do not match.";
                err.style.display = "block";
                return;
            }
            
            const users = getStoredUsers();
            if (users.find(u => u.email === email)) {
                err.textContent = "Email already registered.";
                err.style.display = "block";
                return;
            }
            
            users.push({ name, phone, email, password: pass });
            setStoredUsers(users);
            
            // Automatically log in the user after successful signup
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("userName", name);
            localStorage.setItem("userEmail", email);
            
            success.textContent = "Signup successful! Redirecting...";
            success.style.display = "block";
            
            // Redirect to the intended page or index.html
            setTimeout(function() {
                const redirect = localStorage.getItem("redirectAfterLogin") || "index.html";
                localStorage.removeItem("redirectAfterLogin");
                window.location.href = redirect;
            }, 1500);
        };
    }
});

function showSignup() {
    document.getElementById("signupCard").style.display = "flex";
    document.getElementById("loginCard").style.display = "none";
}

function showLogin() {
    document.getElementById("signupCard").style.display = "none";
    document.getElementById("loginCard").style.display = "flex";
}
