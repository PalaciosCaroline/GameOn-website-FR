hamburger.onclick = () => {
  hamburger.classList.toggle("open");
  nav_ul.classList.toggle("slide");
};

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalBtnClose = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  //fermeture du menu nav
  hamburger.classList.remove("open");
  nav_ul.classList.remove("slide");
}

// Close modal event
modalBtnClose.onclick = () => {
  modalbg.style.display = "none";
};

//Eviter propagation evenement
document.getElementById("entry").addEventListener("submit", function(event){
  event.preventDefault();
});


//message d'erreur (en opacity = 0 avant ('data-error-visible',true))
firstName.parentNode.setAttribute('data-error','Veuillez entrer 2 caractères ou plus pour le champ du prénom.');
lastName.parentNode.setAttribute('data-error','"Veuillez entrer 2 caractères ou plus pour le champ du nom."');
email.parentNode.setAttribute('data-error','l\'adresse email doit être valide');
birthdate.parentNode.setAttribute('data-error','Vous devez entrer votre date de naissance et avoir au minimum 12ans.');
quantity.parentNode.setAttribute('data-error','Une valeur numérique doit être saisie');
location1.parentNode.setAttribute('data-error','Vous devez choisir une option.');
checkbox1.parentNode.setAttribute('data-error','Vous devez accepter les termes et conditions.');