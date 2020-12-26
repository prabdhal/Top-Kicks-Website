const menuIcon = document.querySelector('.menu-container');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');
const btn = document.querySelector(".btn");

function preventDefault() {
  btn.preventDefault();
}

if (menuIcon) {
  // toggles menu open/close
  menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuIcon.classList.toggle("change");
    links.forEach(link => {
      link.classList.toggle("fade");
    });
  });

  // closes menu when a nav-link is clicked
  links.forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    })
  })
  
  function closeMenu() {
    navLinks.classList.remove("open");
    menuIcon.classList.remove("change");
    links.forEach(link => {
      link.classList.remove("fade");
    });
  }

}
