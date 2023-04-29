let menuBar=document.querySelector('#menu-bar')
let links=document.querySelector('.links')

menuBar.onclick  =()=>{
    menuBar.classList.toggle("fa-items")
    links.classList.toggle("active")
}