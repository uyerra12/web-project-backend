function myFunction(){
    let menu = document.querySelector(".nav-links");
    console.log(menu.style.display);
    if(menu.style.display === ""){
        menu.style.display= "block";
    } else if (menu.style.display === "block") {
        menu.style.display= "";
    }
}