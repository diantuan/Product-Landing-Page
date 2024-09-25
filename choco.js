
//funcitoning sidebar

const bars = document.querySelector(".fa-bars");
const sideNav = document.querySelector("#side-nav");
const navList = document.querySelector("#nav-list");
const main = document.querySelector("main");
const ex = document.querySelector(".fa-circle-xmark");

let isSideNavOn = false;

function showSideNav(){

  if(!isSideNavOn){
    sideNav.style.marginLeft = "0";
    main.style.marginLeft = "25%";
    bars.style.display = "none";
    isSideNavOn = true;
  }
  else{
    sideNav.style.marginLeft = "-25%";
    main.style.marginLeft = "0";
    isSideNavOn = false;
  }
  

}

function close(){
  sideNav.style.marginLeft = "-25%";
  main.style.marginLeft = "0";
  bars.style.display = "inline-block";
  isSideNavOn = false;
}

bars.addEventListener("click", showSideNav);

ex.addEventListener("click", close);








//products and ordering


const products = [
  {
    id:1000,
    name: "Strawbry Chocolate Snack",
    src: "images/product1.png",
    price: 7,
    orderQuantity: 0
  },
  {
    id:2000,
    name: "Strawbry Chocolate Pudding",
    src: "images/product2.png",
    price: 8,
    orderQuantity: 0
  },
  {
    id:3000,
    name: "Strawbry Chocolate Medium Bar",
    src: "images/product3.png",
    price: 11,
    orderQuantity: 0
  },
  {
    id:4000,
    name: "Strawbry Chocolate Large Bar",
    src: "images/product4.png",
    price: 13,
    orderQuantity: 0
  },
  {
    id:5000,
    name: "Strawbry Chocolate XL Bar",
    src: "images/product5.png",
    price: 15,
    orderQuantity: 0
  },
  {
    id:6000,
    name: "Strawbry Chocolate Pudding Cake",
    src: "images/product6.png",
    price: 21,
    orderQuantity: 0
  },
  {
    id:7000,
    name: "Strawbry Almond Chocolate",
    src: "images/product7.png",
    price: 10,
    orderQuantity: 0
  },
  {
    id:8000,
    name: "Strawbry Chocolate Mini Bars Package",
    src: "images/product8.png",
    price: 22,
    orderQuantity: 0
  },
  {
    id:9000,
    name: "Strawbry Chocolate Drink 12oz",
    src: "images/product9.png",
    price: 3,
    orderQuantity: 0
  },
  
  {
    id:10000,
    name: "Strawbry Chocolate Drink 16oz",
    src: "images/product10.png",
    price: 6,
    orderQuantity: 0
  },
  {
    id:11000,
    name: "Strawbry Chocolate Ice Cream 12oz",
    src: "images/product11.png",
    price: 7,
    orderQuantity: 0
  },
  {
    id:12000,
    name: "Strawbry Chocolate Ice Cream 18oz",
    src: "images/product12.png",
    price: 13,
    orderQuantity: 0
  },
  {
    id:13000,
    name: "Strawbry Chocolate Fizz 11oz",
    src: "images/product13.png",
    price: 2,
    orderQuantity: 0
  },
  {
    id:14000,
    name: "Strawbry Chocolate Very Berry Drink 12oz",
    src: "images/product14.png",
    price: 3,
    orderQuantity: 0
  },
  {
    id:15000,
    name: "Strawbry Chocolate Cereal",
    src: "images/product15.png",
    price: 9,
    orderQuantity: 0
  },
  {
    id:16000,
    name: "Strawbry Chocolate Cookies",
    src: "images/product16.png",
    price: 13,
    orderQuantity: 0
  },
]



const productShow = document.getElementById("product-show");

const productContainer = document.getElementById("product-container");

const displayProducts = () =>{
  
  productContainer.innerHTML = products.map(product=>`<img src="${product.src}" onclick="selectProduct(this)" id="${product.id}">`).join("")
}

displayProducts();


function selectProduct(select){

  select.style.opacity="100%";

  const productIndex =  products.findIndex(product => {
    return Number(select.id) === product.id
    
  });
  
  productShow.innerHTML = `<img src="${products[productIndex].src}">
  <p>${products[productIndex].name}
  
  <span>$ ${products[productIndex].price}.00</span>
  <button onclick="addToCart(this)" id="${productIndex}" class="add-to-cart-btn">Add to Cart</button>
  </p> 
  
  `
}






// adding to cart

let currentItems = [];

const cartItems = document.getElementById("cart-items");

// get data from local storage

const getSavedData = ()=>{

  const savedCart = localStorage.getItem("cart-items");

  if(savedCart){
  const savedCartArray = JSON.parse(savedCart);

  currentItems = savedCartArray;

    if(savedCartArray.length > 0){
      displayCart(currentItems);
      
    }
  }
}

getSavedData();






function addToCart(element){

  const currentItemsIndex = currentItems.findIndex(item=>item.id===products[element.id].id);

  if(currentItems.some(item=>item.id === products[element.id].id)){
    
    currentItems[currentItemsIndex].orderQuantity++;
    
    
    
  }
  else{
    
    currentItems.push(products[element.id]);
    currentItems[currentItems.length-1].orderQuantity++
   
  }

   
  localStorage.setItem("cart-items", JSON.stringify(currentItems));
  displayCart(currentItems);
  
}


function displayCart(itemsArray){
  const itemHTML = itemsArray.map(item=>{
    return ` <div id="current-cart">
    <i class="fa-solid fa-minus" id="${item.id}"></i>
    <div><strong>${item.orderQuantity}</strong></div> 
    <div>${item.name}</div> 
    <div id="item-prices"><strong>$ ${item.price}</strong></div>
    <div>~ $${item.price*item.orderQuantity}</div>
    </div>`
  }).join("");
  cartItems.innerHTML= itemHTML;
}


// const subtractArray = [...document.getElementsByClassName("fa-minus")];

// subtractArray.forEach(element=>{

//   element.addEventListener("click", ()=>{
//     console.log("hello")
//     const itemIndex = currentItems.findIndex(item=>item.id===Number(element.id));
    
//     currentItems[itemIndex].orderQuantity--;
//     displayCart(currentItems);
    
//     })

// })



cartItems.addEventListener("click", e => {
  const itemIndex = currentItems.findIndex(item=> item.id === parseInt(e.target.id));
  if(e.target.tagName === "I"){
    currentItems[itemIndex].orderQuantity--;
    displayCart(currentItems);

    if(currentItems[itemIndex].orderQuantity <= 0){
      currentItems.splice(itemIndex, 1);
      displayCart(currentItems);
    }
   

    localStorage.setItem("cart-items", JSON.stringify(currentItems));
    if(currentItems.length < 1){
      cartItems.textContent = "No items added";
      localStorage.removeItem("cart-items");
    }
  }
})










//configuring arrows 


const arrowLeft = document.querySelector(".fa-arrow-left");
const arrowRight = document.querySelector(".fa-arrow-right");



arrowRight.addEventListener("click", ()=>{
  productContainer.scrollLeft += 100;
  
})

arrowLeft.addEventListener("click", ()=>{
  productContainer.scrollLeft -= 100;
  
})



let isOnTheProduct = false;

productContainer.addEventListener("wheel", e=>{
  e.preventDefault();
  productContainer.scrollLeft += e.deltaY;
  isOnTheProduct = true;
})





//configuring about scroll behavior

const about =document.getElementById("about");

let leftValue = 60;
main.addEventListener("wheel", e=>{
  
  if(!isOnTheProduct){
    leftValue -= e.deltaY/10;

    if(leftValue <= 15){
      about.style.setProperty("left", `15%`);
      leftValue = 15;
    }
    else if(leftValue >= 40){
      about.style.left = "40%";
      leftValue = 40;
    }
    else{ 
    about.style.setProperty("left", `${leftValue}%`)
    }
  }
  else{
    isOnTheProduct = false;
    
  }
})
