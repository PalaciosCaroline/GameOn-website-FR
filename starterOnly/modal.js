hamburger.onclick = () => {
  hamburger.classList.toggle("open");
  nav_ul.classList.toggle("slide");
};

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalBtnClose = document.querySelector(".close");
const form = document.getElementById('entry')
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let email = document.getElementById('email');
let birthdate = document.getElementById('birthdate');
let quantity = document.getElementById('quantity');
let radios = document.querySelectorAll('input[name="location"]');
let location1 = document.getElementById("location1");
let checkbox1 = document.getElementById('checkbox1');
let cgu = document.getElementById('span-cgu')
const pageMain =  document.getElementById('pageMain');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  document.body.classList.add("noscroll");
  pageMain.style.display = "none";
  //rajout de réutilisation du formulaire après confirmation et fermeture
  messageVisible.style.display = 'none';
  document.getElementById('entry').classList.remove('invisibleForm');
  //fermeture du menu nav si ouvert
  hamburger.classList.remove("open");
  nav_ul.classList.remove("slide");
}

// Close modal event
modalBtnClose.onclick = () => {
  modalbg.style.display = "none";
  document.body.classList.remove("noscroll");
  pageMain.style.display = "block";

};
document.getElementById('close2').onclick = () => {
  document.body.classList.remove("noscroll");
  modalbg.style.display = "none";
  pageMain.style.display = "block";
};

//Eviter propagation evenement
document.getElementById("entry").addEventListener("submit", function(event){
  event.preventDefault();
});

//message d'erreur (en opacity = 0 avant ('data-error-visible',true))
firstName.parentNode.setAttribute('data-error','Entrer 2 caractères minimum pour le champ du prénom.');
lastName.parentNode.setAttribute('data-error','Entrer 2 caractères minimum pour le champ du nom.');
email.parentNode.setAttribute('data-error','Une adresse email valide est requise');
birthdate.parentNode.setAttribute('data-error','Veuillez entrer votre date de naissance');
quantity.parentNode.setAttribute('data-error','Une valeur numérique doit être saisie');
location1.parentNode.setAttribute('data-error','Vous devez choisir une option.');
checkbox1.parentNode.setAttribute('data-error','Veuillez vérifier que vous acceptez bien les termes et conditions.');

//regex à respecter pour validation
const nameRegex = new RegExp('^[a-z]{2,}', 'i');
const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const dateRegex = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
const numberRegex = /^[0-9]+$/;
const birthRegex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g;


//verification firstName
let resultFirstName
function verifFirstName() {
  if (!nameRegex.test(firstName.value)){
    firstName.parentNode.setAttribute('data-error-visible',true);
    resultFirstName = false;
  }  else{ firstName.parentNode.removeAttribute('data-error-visible');
    resultFirstName = true;
}};

firstName.addEventListener("keyup", () => {
  verifFirstName()
  firstName.parentNode.classList.add("white");
  firstName.parentNode.setAttribute('data-error-visible',true);
  if (!resultFirstName){
    firstName.classList.remove("white");
  } else { firstName.parentNode.removeAttribute('data-error-visible');}
});

firstName.addEventListener("focusout", () => {
  verifFirstName()
  if (!resultFirstName){
    firstName.parentNode.classList.remove("white");
  }  
  // else{ firstName.parentNode.removeAttribute('data-error-visible');}
});

//verification lastName
let resultLastName
function verifLastName() {
  if (!nameRegex.test(lastName.value)){
    lastName.parentNode.setAttribute('data-error-visible',true);
    resultLastName = false;
  }  else{ lastName.parentNode.removeAttribute('data-error-visible');
    resultLastName = true;
}};

lastName.addEventListener("keyup", () => {
  verifLastName()
  lastName.parentNode.classList.add("white");
  lastName.parentNode.setAttribute('data-error-visible',true);
  if (!resultLastName){
    lastName.classList.remove("white");
  } else { lastName.parentNode.removeAttribute('data-error-visible');}
});

lastName.addEventListener("focusout", () => {
  verifLastName()
  if (!resultLastName){
    lastName.parentNode.classList.remove("white");   
}});

//verification email
let resultEmail
function verifEmail() {
  if (!email.value.match(mailRegex)) {
      email.parentNode.setAttribute('data-error-visible',true);
      resulEmailName = false;
  }  else{ email.parentNode.removeAttribute('data-error-visible');
      resultEmail = true;}
  };

email.addEventListener("keyup", () => {
  verifEmail();
  email.parentNode.classList.add("white");
  email.parentNode.setAttribute('data-error-visible',true);
  if (!resultEmail){
    email.classList.remove("white");
  } else { email.parentNode.removeAttribute('data-error-visible');}
});
email.addEventListener("focusout", () => {
  verifEmail()
  if (!resultEmail){
    email.parentNode.classList.remove("white");
    email.parentNode.setAttribute('data-error-visible',true);
  }  
});
//

//vérification age (age minimun à revoir non pris en compte)
let age
function CalculAge() {  
  let today = new Date();
  let dtn=document.getElementById('birthdate').value; // on lit la date de naissance
  let an=dtn.substr(6,4); // l'année (les quatre premiers caractères de la chaîne à partir de 6)
  let mois=dtn.substr(3,2);// On selectionne le mois de la date de naissance
  let day= dtn.substr(0,2); // On selectionne la jour de la date de naissance
  let dateNaissance = new Date(an + "-" + mois + "-" + day);
  age = today.getFullYear() - dateNaissance.getFullYear();
  let m = today.getMonth() - dateNaissance.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dateNaissance.getDate())) {
      age = age - 1;
      return age;
  }
  return age;
}

let resultAge;
let isValidDate = Date.parse('birthdate');
function verifAge() {
  // CalculAge();
  // if (!birthdate.value || age.value < 12 || age.value > 130) {
  if (!birthdate.value || isNaN(isValidDate || !dateRegex.test(birthdate.value))) {
    birthdate.parentNode.setAttribute('data-error-visible',true);
      resultAge = false;
  }  else{ birthdate.parentNode.removeAttribute('data-error-visible');
      resultAge = true;
}};

birthdate.addEventListener("keyup", () => {
  verifAge();
    birthdate.parentNode.classList.add("white");
    birthdate.parentNode.setAttribute('data-error-visible',true);
  if (!resultAge){
    birthdate.classList.remove("white");
  } else { birthdate.parentNode.removeAttribute('data-error-visible');}
});
birthdate.addEventListener("focusout", () => {
  verifAge();
    if (!resultAge){
      birthdate.parentNode.classList.remove("white");
      birthdate.parentNode.setAttribute('data-error-visible',true);
}});
//

//verification quantity
let resultQuantity
function verifQuantity() {
  if (!quantity.value || !quantity.value.match(numberRegex))  {
    quantity.parentNode.setAttribute('data-error-visible',true);
      resultQuantity = false;
  }  else{ quantity.parentNode.removeAttribute('data-error-visible');
      resultQuantity = true;
}};

quantity.addEventListener("keyup", () => {
  verifQuantity()
  quantity.parentNode.classList.add("white");
  quantity.parentNode.setAttribute('data-error-visible',true);
  if (!resultQuantity) {
  }  else{ quantity.parentNode.removeAttribute('data-error-visible');
}});
quantity.addEventListener("focusout", () => {
  verifQuantity()
  if (!resultQuantity) {
    quantity.parentNode.classList.remove("white");
    quantity.parentNode.setAttribute('data-error-visible',true);
}});
//

//vérification si input checked du choix du tournois
let resultLocations
const checkred = document.querySelectorAll('span.checkbox-icon');
let checkr = document.querySelectorAll('span[class="checkbox-icon"]');

function verifLocations() {
if (!document.getElementById('location1').checked &&
        !document.getElementById('location2').checked &&
        !document.getElementById('location3').checked &&
        !document.getElementById('location4').checked &&
        !document.getElementById('location5').checked &&
        !document.getElementById('location6').checked) {
        location1.parentNode.setAttribute('data-error-visible',true);
        checkr.forEach((i) => i.classList.add('redBorder'));
          resultLocations = false;
        } else{ location1.parentNode.removeAttribute('data-error-visible');
        checkr.forEach((i) => i.classList.remove('redBorder'));
        resultLocations = true;
}};
//écoute des inputs des différents tournois 
radios.forEach((input) => input.addEventListener("click", verifLocations));


//verification cgu
let resultCgu
function verifCgu() {
if (!checkbox1.checked) {
    checkbox1.parentNode.setAttribute('data-error-visible',true);
    cgu.classList.add('colorred');
    resultCgu = false;
 } else{ checkbox1.parentNode.removeAttribute('data-error-visible');
    cgu.classList.remove('colorred');
    resultCgu = true;
}};
//avertissement si décochage cgu
checkbox1.addEventListener("change", () => {
  verifCgu()
  if (!checkbox1.checked) {
    checkbox1.parentNode.setAttribute('data-error-visible',true);
    cgu.classList.add('colorred');
}});

//function de validation
function validate() {
  //variable 
  verifFirstName();
  verifLastName();
  verifEmail();
  verifAge();
  verifQuantity();
  verifLocations();
  verifCgu();

  if (!resultFirstName || !resultLastName || !resultEmail || !resultAge || !resultQuantity || !resultLocations || !resultCgu) {
    return false;
  } else{ 
    messageVisible.style.display = 'flex';
    form.classList.add('invisibleForm');
    return true;
  }
}
