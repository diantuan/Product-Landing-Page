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



