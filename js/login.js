var username = document.getElementById("username");
var password = document.getElementById("password");
var login = document.getElementById("login");

login.addEventListener("click", function goToHomePage() {
  if (
    username.value &&
    username.value.trim() == localStorage.getItem("username") &&
    password.value == localStorage.getItem("password")
  ) {
    window.location = "index.html"
  } else {
    if (username.value == "" || password.value == "") {
        alert("Fill Up All Your Data")
    } else {
        alert("Your Data Is Wrong")
    }
  } 
});
