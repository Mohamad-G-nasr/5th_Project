var Name = document.getElementById("Name");
var logout = document.getElementById("logout");
var allProducts = JSON.parse(localStorage.getItem("AllProd"));
var FavProducts = JSON.parse(localStorage.getItem("FavProd"));
var container = document.querySelector("#cartItems");
var favContainer = document.querySelector("#favItems");
var Price = document.getElementById("Price");
var favsec = document.querySelector(".favsec");


if (localStorage.getItem("username") && localStorage.getItem("password")) {
    logout.style.display = "block";
    Name.innerHTML = "Hi " + localStorage.getItem("username");
}
  
logout.addEventListener("click", function Logout() {
    localStorage.clear();
});

injectInContainer()

function injectInContainer() {
    let total_price = 0;
    container.innerHTML = ""
    allProducts.forEach((item) => {
        total_price = total_price + item.quantity*item.price;
        container.innerHTML += `
        <div class="product">
          <img src="${item.img}">
          <h2>${item.title}</h2>
          <b>Category:</b> <span>${item.category}</span>
          <p><b>Quantity: </b> <span>${item.quantity}</span> <b> Price: </b> <span>${item.quantity*item.price}</span></p>
          <button onClick = "removeFromCart(${item.id})">Remove From Cart</button>
        </div>
        `;
    });
    Price.innerHTML = total_price
};

if (FavProducts.length == 0) {
    favsec.style.display = "none"
} else {
    injectInFavContainer()
};

function injectInFavContainer() {
    favContainer.innerHTML = ""
    FavProducts.forEach((item) => {
        favContainer.innerHTML += `
        <div class="product">
          <img src="${item.img}">
          <h2>${item.title}</h2>
          <b>Category:</b> <span>${item.category}</span>
          <p><b> Price: </b> <span>${item.price}</span></p>
          <button onClick = "removeFromFav(${item.id})">Remove From Favorits</button>
        </div>
        `;
    });
};

function removeFromFav(id) {
    let Exist = FavProducts.findIndex((value) => value.id == id);
    FavProducts.splice(Exist, 1);
    localStorage.setItem("FavProd" , JSON.stringify(FavProducts));
    if (FavProducts.length == 0) {
        favsec.style.display = "none"
    } else {
        injectInFavContainer()
    };
};


function removeFromCart(id) {
    let Exist = allProducts.findIndex((value) => value.id == id)
  
    if(allProducts[Exist].quantity  === 1){
    allProducts.splice(Exist, 1)
  
    } else {
      allProducts[Exist].quantity--
    }
  
    localStorage.setItem("AllProd" , JSON.stringify(allProducts))
    
    if (allProducts.length == 0) {
        window.location = "index.html"
    } else {
        injectInContainer()
    };
};
