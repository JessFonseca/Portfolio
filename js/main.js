//Select DOM Elements

const btn = document.querySelector(".btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const menuContent = document.querySelector(".menu-content");
const navItems = document.querySelectorAll(".nav-item");

//Set state of the menu
let showMenu = false;

btn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    btn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");
    menuContent.classList.add("show");
    navItems.forEach(item => item.classList.add("show"));
    showMenu = true;
  } else {
    btn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");
    menuContent.classList.remove("show");
    navItems.forEach(item => item.classList.remove("show"));
    showMenu = false;
  }
}
