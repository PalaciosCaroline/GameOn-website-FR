hamburger.onclick = () => {
  hamburger.classList.toggle("open");
  nav_ul.classList.toggle("slide");
};

//function bruitage
function bruitachievement(){
  const bruitachievement = new Audio();
  bruitachievement.src = "./bruit/achievement.wav";
  bruitachievement.play();
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalBtnClose = document.querySelector(".close");
const form = document.getElementById('entry')
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const quantity = document.getElementById('quantity');
const radios = document.querySelectorAll('input[name="location"]');
const checkBorder = document.querySelectorAll('span[class="checkbox-icon"]');// border inputs
const location1 = document.getElementById("location1");
const checkbox1 = document.getElementById('checkbox1');
const cguBorder = document.getElementById('span-cgu')
const pageMain =  document.getElementById('pageMain');
const pageFooter = document.getElementById('pageFooter');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal open form
function launchModal() {
  modalbg.style.display = "block";
  pageMain.style.display = "none";
  pageFooter.style.display = "none";
  //rajout de réutilisation du formulaire après confirmation et fermeture
  messageEnvoi.style.display = 'none';
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
  pageMain.style.display = 'block';
  pageFooter.style.display = "block";
};

// Close modal event
modalBtnClose.onclick = closeModal;
document.getElementById('close2').onclick = closeModal;

//retain data when the form is incorrectly completed
  form.addEventListener("submit", (event) => event.preventDefault());

//Error messsage (opacity = 0 when 'data-error-visible' = true)
firstName.parentNode.setAttribute('data-error','Entrer 2 lettres minimum pour le champ du prénom.');
lastName.parentNode.setAttribute('data-error','Entrer 2 lettres minimum pour le champ du nom.');
email.parentNode.setAttribute('data-error','Une adresse email valide est requise');
birthdate.parentNode.setAttribute('data-error','Entrer votre date de naissance, 12ans minimum sont requis');
quantity.parentNode.setAttribute('data-error','Une valeur numérique doit être saisie');
location1.parentNode.setAttribute('data-error','Vous devez choisir une option.');
checkbox1.parentNode.setAttribute('data-error','Veuillez vérifier que vous acceptez bien les termes et conditions.');

//Writing red error message
function errorRed(element){
  element.parentNode.setAttribute('data-error-visible',true);
  element.parentNode.classList.remove("white");
  }
  const redBorderLocation = () => checkBorder.forEach((i) => i.classList.add('colorred'));
  const redBorderCgu = () => cguBorder.classList.add('colorred');
  
  //writing white help message
  function errorWhite(element){
    element.parentNode.classList.add("white");
    element.parentNode.setAttribute('data-error-visible',true);
  }
  const errorWhiteAge = () => errorWhite(birthdate);
  const errorWhiteQuantity = () => errorWhite(quantity);
  
  //Deletion of messages
  const noError = (element) => element.parentNode.removeAttribute('data-error-visible');
  const noBorderLocation = () => checkBorder.forEach((i) => i.classList.remove('colorred'));
  const noBorderCgu = () => cguBorder.classList.remove('colorred');

//regex and test 
const nameRegex = /^[a-zA-Z-áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]{2,}$/;
const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const numberRegex = /^[0-9]+$/;
const test = (name) => nameRegex.test(name.value); //test for first and last name
const testEmail = () => email.value.match(mailRegex);

//Control firstName
let resultFirstName;
//control on write
firstName.addEventListener("keyup", () => { errorWhite(firstName);
  test(firstName) ? noError(firstName) : '' ;
});
//control focusout
firstName.addEventListener("focusout", () => !test(firstName) ? errorRed(firstName) : '');
//last control of input
function verifFirstName() {
  if (!test(firstName)) {
    errorRed(firstName);
    resultFirstName = false;
  }  
  resultFirstName = true;
};

//Control lastName
let resultLastName
//control on write
lastName.addEventListener("keyup", () => { errorWhite(lastName);
   test(lastName) ? noError(lastName) : '' });
//control focusout
lastName.addEventListener("focusout", () => !test(lastName)? errorRed(lastName) : '');
//last control of input
function verifLastName() {
  if (!test(lastName)) {
  errorRed(lastName);
  resultLastName = false;
  }  
  resultLastName = true;
};

//Control email
let resultEmail
//control on write
email.addEventListener("keyup", () => { errorWhite(email);
  (testEmail())? noError(email) : ''});
//control focusout
email.addEventListener("focusout", () => !testEmail() ? errorRed(email) : '');
//last control of input
function verifEmail() {
  if (!testEmail()) {
      errorRed(email);
      resulEmailName = false;
  }  
  resultEmail = true;
};

//Control Age
let resultAge;
//Control if input ok
function verifAge() {
  const date = new Date(birthdate.value);
    if (!(date instanceof Date) || isNaN(date)) {
      errorRed(birthdate);
      return resultAge = false;
    }
  const now = Date.now();
  const oneYear = 365.25 * 24 * 60 * 60 * 1000; //one year of secondes
  const age = (now - date) / oneYear;
    if (age < 12 || age > 130){  //the age to be verified
      errorRed(birthdate);
      return resultAge = false;
    }
  noError(birthdate);
  return resultAge = true;   
};
//control focus
birthdate.addEventListener("focus", errorWhiteAge);
//control focusout
birthdate.addEventListener("focusout", verifAge);

//verification quantity
let resultQuantity
//Control if this input is ok
function verifQuantity() {
  if (!quantity.value.match(numberRegex))  {
    errorRed(quantity);
    resultQuantity = false;
  }  else { noError(quantity);
    resultQuantity = true;
}};
//control on write
quantity.addEventListener("keyup", errorWhiteQuantity);
//control focusout
quantity.addEventListener("focusout", verifQuantity);
//

//choix du tournois 
let resultLocations 
//vérification si input checked 
function verifLocations() {
  const Locationchecked = document.querySelector(
    "input[name='location']:checked");
  if (Locationchecked == null) {
        errorRed(location1); redBorderLocation();
        resultLocations = false;
  } else { noError(location1); noBorderLocation();
  resultLocations = true;
}};
//listen if a tournament is checked
radios.forEach((input) => input.addEventListener("click", verifLocations));

//Control cgu
let resultCgu
function verifCgu() {
if (!checkbox1.checked) {
    checkbox1.parentNode.setAttribute('data-error-visible',true);
    // cgu.classList.add('colorred');
    redBorderCgu();
    resultCgu = false;
 } 
 else{ checkbox1.parentNode.removeAttribute('data-error-visible');
    // cgu.classList.remove('colorred');
    noBorderCgu();
    resultCgu = true;
}};
//warning if uncheck cgu
checkbox1.addEventListener("change", verifCgu);

//function of validation
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
    messageEnvoi.style.display = 'flex';
    form.classList.add('invisibleForm');
    bruitachievement();
    return true;
  }
}
