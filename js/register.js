var username = document.getElementById("username")
var mail = document.getElementById("mail")
var password = document.getElementById("password")
var signup = document.getElementById("signup")

function create_account() {

    if (username.value && mail.value && password.value) {
        localStorage.setItem("username", username.value)
        localStorage.setItem("mail", mail.value)
        localStorage.setItem("password", password.value)

        window.location = "login.html"
        
    } else {
        alert("All Data Is Required")
    }
}

signup.addEventListener("click", create_account) 
