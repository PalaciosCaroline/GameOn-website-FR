hamburger.onclick = () => {
  hamburger.classList.toggle("open");
  nav_ul.classList.toggle("slide");
  bruitunlocked();
};

//function bruitage
function bruitunlocked(){
  const bruitunlocked = new Audio();
  bruitunlocked.src = "./bruit/unlocked.wav";
  bruitunlocked.play();
}
function bruitachievement(){
  const bruitachievement = new Audio();
  bruitachievement.src = "./bruit/achievement.wav";
  bruitachievement.play();
}
function bruitcongrats(){
  const bruitcongrats = new Audio();
  bruitcongrats.src = "./bruit/congrats.wav";
  bruitcongrats.play();
}

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
let pageFooter = document.getElementById('pageFooter');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal open form
function launchModal() {
  bruitcongrats();
  modalbg.style.display = "block";
  pageMain.style.display = "none";
  pageFooter.style.display = "none";
  //rajout de réutilisation du formulaire après confirmation et fermeture
  messageVisible.style.display = 'none';
  form.classList.remove('invisibleForm');
  //close menu nav when form open
    if (hamburger.classList.contains("open")){
      hamburger.classList.remove("open");
      nav_ul.classList.remove("slide");
    }
};

// close mmodal
const closeModal = () => {
  modalbg.style.display = "none";
  pageFooter.style.display = "block";
  pageMain.style.display = 'block';
};

// Close modal event
modalBtnClose.onclick = closeModal;
document.getElementById('close2').onclick = closeModal;

//Eviter propagation evenement
  form.addEventListener("submit", function(event){
  event.preventDefault();
});

//message d'erreur (en opacity = 0 avant ('data-error-visible',true))
firstName.parentNode.setAttribute('data-error','Entrer 2 lettres minimum pour le champ du prénom.');
lastName.parentNode.setAttribute('data-error','Entrer 2 lettres minimum pour le champ du nom.');
email.parentNode.setAttribute('data-error','Une adresse email valide est requise');
birthdate.parentNode.setAttribute('data-error','Entrer votre date de naissance, 12ans minimum sont requis');
quantity.parentNode.setAttribute('data-error','Une valeur numérique doit être saisie');
location1.parentNode.setAttribute('data-error','Vous devez choisir une option.');
checkbox1.parentNode.setAttribute('data-error','Veuillez vérifier que vous acceptez bien les termes et conditions.');

//regex of test
const nameRegex = /^[a-zA-Z-áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]+[a-zA-Z-áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]*[a-zA-Z-áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]$/;
const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const numberRegex = /^[0-9]+$/;

//Control firstName
const errorRedFirst =  () => {firstName.parentNode.setAttribute('data-error-visible',true);
                              firstName.parentNode.classList.remove("white");}
const noErrorFirst = () => firstName.parentNode.removeAttribute('data-error-visible');
const errorWhiteFirst = () => {firstName.parentNode.classList.add("white");
                      firstName.parentNode.setAttribute('data-error-visible',true);}
const test = (name) => nameRegex.test(name.value);
let resultFirstName;
//control on write
firstName.addEventListener("keyup", () => {
  errorWhiteFirst();
   if (test(firstName)) {noErrorFirst();}
});
//control focusout
firstName.addEventListener("focusout", () => {if (!test(firstName)) { errorRedFirst();}});
//last control of input
function verifFirstName() {
  if (!test(firstName)) {
    errorRedFirst();
    resultFirstName = false;
  }  else { resultFirstName = true;
}};
//Control lastName
const errorRedLast =  () => {lastName.parentNode.setAttribute('data-error-visible', true);
                 lastName.parentNode.classList.remove("white");}
const noErrorLast = () => lastName.parentNode.removeAttribute('data-error-visible');
const errorWhiteLast = () => {lastName.parentNode.classList.add("white");
                      lastName.parentNode.setAttribute('data-error-visible',true);}
let resultLastName
//control on write
lastName.addEventListener("keyup", () => {
  errorWhiteFirst();
   if (test(lastName)) {noErrorLast();}
});
//control focusout
lastName.addEventListener("focusout", () => {if (!test(lastName)) { errorRedLast();}});
//last control of input
function verifLastName() {
  if (!test(lastName)) {
  errorRedLast();
  resultLastName = false;
}  else { resultLastName = true;
}};

//Control email
const errorRedEmail =  () => {email.parentNode.setAttribute('data-error-visible',true);
                            email.parentNode.classList.remove("white");}
const noErrorEmail = () => email.parentNode.removeAttribute('data-error-visible');
const errorWhiteEmail = () => {email.parentNode.classList.add("white");
                          email.parentNode.setAttribute('data-error-visible',true);}
const testEmail = () => email.value.match(mailRegex);
//control on write
email.addEventListener("keyup", () => {
  errorWhiteEmail();
  if (testEmail()) {noErrorEmail();}
});
//control focusout
email.addEventListener("focusout", () => {if (!testEmail()) { errorRedEmail();}});
//last control of input
let resultEmail
function verifEmail() {
  if (!testEmail()) {
      errorRedEmail();
      resulEmailName = false;
  }  else { resultEmail = true;}
};

//Control Age
const errorRedAge =  () => {birthdate.parentNode.setAttribute('data-error-visible',true);
                            birthdate.parentNode.classList.remove("white");}
const noErrorAge = () => birthdate.parentNode.removeAttribute('data-error-visible');
const errorWhiteAge = () => {birthdate.parentNode.classList.add("white");
                              birthdate.parentNode.setAttribute('data-error-visible',true);}
let resultAge;
//Control if input ok
function verifAge() {
  const date = new Date(birthdate.value);
    if (!(date instanceof Date) || isNaN(date)) {
      errorRedAge();
      return resultAge = false;
    }
  const now = Date.now();
  const oneYear = 365.25 * 24 * 60 * 60 * 1000; //one year of secondes
  const age = (now - date) / oneYear;
    if (age < 12 || age > 130){  //the age to be verified
      errorRedAge();
      return resultAge = false;
    }
  noErrorAge();
  return resultAge = true;   
};
//control focus
birthdate.addEventListener("focus", errorWhiteAge);
//control focusout
birthdate.addEventListener("focusout", verifAge);
//

//verification quantity
const errorRedQuantity =  () => {quantity.parentNode.setAttribute('data-error-visible', true);
                  quantity.parentNode.classList.remove("white");}
const noErrorQuantity = () => quantity.parentNode.removeAttribute('data-error-visible');
const errorWhiteQuantity = () => {quantity.parentNode.classList.add("white");
                      quantity.parentNode.setAttribute('data-error-visible',true);}
const testQuantity = () => (quantity.value.match(numberRegex))


let resultQuantity
function verifQuantity() {
  if (!quantity.value || !testQuantity())  {
    errorRedQuantity();
      resultQuantity = false;
  }  else{ noErrorQuantity();
      resultQuantity = true;
}};
//control on write
quantity.addEventListener("keyup", () => {
  errorWhiteQuantity();
   if (testQuantity()) {noErrorQuantity();}
});
//control focusout
quantity.addEventListener("focusout", () => {if (!quantity.value || !test(lastName)) { errorRedQuantity();}});
//

//choix du tournois 
let checkBorder = document.querySelectorAll('span[class="checkbox-icon"]'); // border des inputs
//vérification si input checked 
function verifLocations() {
  const Locationchecked = document.querySelector(
    "input[name='location']:checked");
  if (Locationchecked == null) {
        location1.parentNode.setAttribute('data-error-visible',true);
        checkBorder.forEach((i) => i.classList.add('redBorder'));
          resultLocations = false;
        } else{ location1.parentNode.removeAttribute('data-error-visible');
        checkBorder.forEach((i) => i.classList.remove('redBorder'));
        resultLocations = true;
}};
//écoute si checked input sur un des tournois 
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
  //control of every inputs
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
    bruitachievement();
    return true;
  }
}
