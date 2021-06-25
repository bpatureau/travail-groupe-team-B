/* menu function that open and close menu*/
document.addEventListener('click', (e) =>{
  if(e.target.id === "menuBTN"){
    document.getElementById("header").classList.toggle('header--open') //open header
    document.getElementById("nav").classList.toggle('nav--open') //open nav
    e.target.classList.toggle('nav__menuBtn--open') //change text color of button
  }
})