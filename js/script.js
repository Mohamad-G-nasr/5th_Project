var Name = document.getElementById("Name");
var login = document.getElementById("login");
var register = document.getElementById("register");
var ShoppingCart = document.querySelector(".ShoppingCart");
var logout = document.getElementById("logout");
var search = document.getElementById("search");
var dropdown = document.getElementById("DropDown");
var theCart = document.getElementById("theCart");
var container = document.querySelector(".container");
var Products = document.querySelector("#Products");
var DivProducts = document.querySelector(".Products");
var Prod_num = document.querySelector(".Prod_num");
var Price = document.getElementById("Price");


if (localStorage.getItem("username") && localStorage.getItem("password")) {
  login.remove(); /* or login.style.display="none"*/
  register.remove();
  ShoppingCart.style.display = "block";
  logout.style.display = "block";
  Name.innerHTML = "Hi " + localStorage.getItem("username");
}

logout.addEventListener("click", function Logout() {
  localStorage.clear();
});


let http = new XMLHttpRequest();
http.open('get', "json/data.json", true);
http.send();
http.onload = function(){
  if (this.readyState == 4 && this.status == 200) {
    let data = JSON.parse(this.responseText);
    localStorage.setItem("data", JSON.stringify(data));
  }
};

var data = JSON.parse(localStorage.getItem("data"));


data.forEach((item) => {
  container.innerHTML += `
  <div class="product">
    <img src="${item.img}">
    <h2 class="Title">${item.title}</h2>
    <b>Category:</b> <span class="Category">${item.category}</span><br>
    <p><b>Price:</b> <span>${item.price}</span></p>
    <button onClick = "addToCart(${item.id}), tempOpen()" >Add to Cart</button>
    <a class="favo" onClick="addToFav(${item.id})"><i class="fa-solid fa-heart"></i></a>
  </div>
  `;
});


if (localStorage.getItem("AllProd")) {
  var allItem = JSON.parse(localStorage.getItem("AllProd"));

  injectInCart();

} else {
  var allItem = [];
};

function addToCart(id) {
  if (!localStorage.getItem("username")) {
    window.location = "register.html";
  } else {
    var PressedItem = data.find((item) => item.id == id);

    let Exist = allItem.findIndex((value) => value.id == id)

    if (allItem.length <= 0){
      allItem = [{...PressedItem, quantity: 1}];
    } else if(Exist < 0){
      allItem.push({...PressedItem, quantity: 1});
    } else {
      allItem[Exist].quantity++
    }
    
    injectInCart();
    localStorage.setItem("AllProd", JSON.stringify(allItem));
}};

function injectInCart() {

  Products.innerHTML = "";
  let total_quantity = 0;
  let total_price = 0;

  allItem.forEach((item) => {
    total_quantity = total_quantity + item.quantity
    total_price = total_price + item.quantity*item.price;
    Products.innerHTML += `<div>
    <p>${item.title}</p>
    <h3>
      <a href="#" onclick="addToCart(${item.id})"><i class="fa-solid fa-plus"></i></a>
      <span>${item.quantity}</span>
      <a href="#" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-minus"></i></a>
    </h3>
    </div><hr>`
  })

  Price.innerHTML = total_price;

  if (total_quantity >= 1) {
    Prod_num.style.display = "block";
    Prod_num.innerHTML = total_quantity;
  } else {
    Prod_num.style.display = "none";
  }
};

function removeFromCart(id) {
  let Exist = allItem.findIndex((value) => value.id == id)

  if(allItem[Exist].quantity  === 1){
    
  allItem.splice(Exist, 1)

  } else {
    allItem[Exist].quantity--
  }

  localStorage.setItem("AllProd" , JSON.stringify(allItem))
  injectInCart()

  
  if (Products.innerHTML == ""){
    DivProducts.style.display = "none";
  }
}


theCart.addEventListener("click", function open() {
  if (Products.innerHTML != "" && DivProducts.style.display == "none") {
    DivProducts.style.display = "block";
  } else {
    DivProducts.style.display = "none";
  }
});

function tempOpen() {
  setTimeout(function () {
    DivProducts.style.display = "block";
  }, 1);

  setTimeout(function () {
    DivProducts.style.display = "none";
  }, 1000);
}


function Search(){
  let ITEM = document.querySelectorAll(".product");
  console.log(ITEM)
  let productName = document.getElementsByClassName("Title")
  let productCategory = document.getElementsByClassName("Category")
  
  if (dropdown.value == "title") {
    for (let i = 0 ; i < productName.length; i++){
      if (productName[i].innerHTML.toLowerCase().indexOf(search.value.toLowerCase()) >= 0){
        ITEM[i].style.display = "";
      } else {
        ITEM[i].style.display = "none";
      }
    }
  } else {
    for (let i = 0 ; i < productCategory.length; i++){
      if (productCategory[i].innerHTML.toLowerCase().indexOf(search.value.toLowerCase()) >= 0){
        ITEM[i].style.display = "";
      } else {
        ITEM[i].style.display = "none";
      }
    }
  }
};


if (localStorage.getItem("FavProd")) {
  var FavItem = JSON.parse(localStorage.getItem("FavProd"));
  colorHeart();
} else {
  var FavItem = [];
  localStorage.setItem("FavProd", JSON.stringify(FavItem));
};

function addToFav(id) {
  if (!localStorage.getItem("username")) {
    window.location = "register.html";
  } else {
    var PressedItem = data.find((item) => item.id == id);

    let Exist = FavItem.findIndex((value) => value.id == id)

    if(Exist < 0){
      FavItem.push({...PressedItem});
    } else {
      FavItem.splice(Exist, 1);
    }
    
    localStorage.setItem("FavProd", JSON.stringify(FavItem));
    colorHeart();
}};


function colorHeart() {
  var favo = document.querySelectorAll(".favo");
  favo.forEach(fav => {
    fav.style.color = "";
  });
  
  var colorThose = JSON.parse(localStorage.getItem("FavProd"));
  colorThose.map(element => {
    favo[--element.id].style.color = "red";
  });
};