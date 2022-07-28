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
const checkBorder = document.querySelectorAll('span[class="checkbox-icon"]');
const location1 = document.getElementById("location1");
const checkbox1 = document.getElementById('checkbox1');
const cguBorder = document.getElementById('span-cgu')
const pageMain =  document.getElementById('pageMain');
const pageFooter = document.getElementById('pageFooter');
//variable result of input validation
let resultFirstName;
let resultLastName;
let resultEmail;
let resultBirthdate;
let resultQuantity;
let resultLocations;
let resultCgu;

hamburger.onclick = () => {
  hamburger.classList.toggle("open");
  nav_ul.classList.toggle("slide");
};

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

//Preparation of Error messsage (opacity = 0 when 'data-error-visible' = true)
firstName.parentNode.setAttribute('data-error','Entrer 2 lettres minimum pour le champ du prénom.');
lastName.parentNode.setAttribute('data-error','Entrer 2 lettres minimum pour le champ du nom.');
email.parentNode.setAttribute('data-error','Une adresse email valide est requise');
birthdate.parentNode.setAttribute('data-error','Entrer votre date de naissance, 12ans minimum sont requis');
quantity.parentNode.setAttribute('data-error','Une valeur numérique doit être saisie');
location1.parentNode.setAttribute('data-error','Vous devez choisir une option.');
checkbox1.parentNode.setAttribute('data-error','Veuillez vérifier que vous acceptez bien les termes et conditions.');

//writing white help message
function errorWhite(element){
  element.parentNode.classList.add("white");
  element.parentNode.setAttribute('data-error-visible',true);
}
const errorWhiteAge = () => errorWhite(birthdate); //retardment of message on focus
const errorWhiteQuantity = () => errorWhite(quantity); //retardment of message on focus

//Writing red error message
function errorRed(element){
  element.parentNode.setAttribute('data-error-visible',true);
  element.parentNode.classList.remove("white");
}
const redBorderLocation = () => checkBorder.forEach((i) => i.classList.add('colorred'));
const redBorderCgu = () => cguBorder.classList.add('colorred');
  
//Deletion of messages
const noError = (element) => element.parentNode.removeAttribute('data-error-visible');
const noBorderLocation = () => checkBorder.forEach((i) => i.classList.remove('colorred'));
const noBorderCgu = () => cguBorder.classList.remove('colorred');

//regex and test 
const nameRegex = /^[a-zA-Z-áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]{2,}$/;
const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const test = (name) => nameRegex.test(name.value); //test for first and last name
const testEmail = () => email.value.match(mailRegex);

//help and control on write
function testWrite(element){
element.addEventListener("keyup", () => { errorWhite(element);
  test(element) ? noError(element) : '' })};
testWrite(firstName);
testWrite(lastName);
email.addEventListener("keyup", () => { errorWhite(email);
         (testEmail())? noError(email) : ''});
birthdate.addEventListener("focus", errorWhiteAge);
quantity.addEventListener("keyup", errorWhiteQuantity);
radios.forEach((input) => input.addEventListener("click", verifLocations));//if change
checkbox1.addEventListener("change", verifCgu);//warning if uncheck cgu

//control focusout
firstName.addEventListener("focusout", () => !test(firstName) ? errorRed(firstName) : '');
lastName.addEventListener("focusout", () => !test(lastName)? errorRed(lastName) : '');
email.addEventListener("focusout", () => !testEmail() ? errorRed(email) : '');
birthdate.addEventListener("focusout", verifAge);
quantity.addEventListener("focusout", verifQuantity);

//Control of input to Validate form
//Control firstName
function verifFirstName() {
  if (!test(firstName)) {
    errorRed(firstName);
    resultFirstName = false;
  }  else {
  resultFirstName = true;
}};

//Control lastName
function verifLastName() {
  if (!test(lastName)) {
  errorRed(lastName);
  resultLastName = false;
  }  else{
  resultLastName = true;
}};

//Control email
function verifEmail() {
  if (!testEmail()) {
      errorRed(email);
      resultEmail = false;
  }  else{
  resultEmail = true;
}};

//Control Age
function verifAge() {
  const date = new Date(birthdate.value);
    if (!(date instanceof Date) || isNaN(date)) {
      errorRed(birthdate);
      return resultBirthdate = false;
    }
  const now = Date.now();
  const oneYear = 365.25 * 24 * 60 * 60 * 1000; //one year of secondes
  const age = (now - date) / oneYear;
    if (age < 12 || age > 130){  //the age to be verified
      errorRed(birthdate);
      return resultBirthdate = false;
    }
  noError(birthdate);
  return resultBirthdate = true;   
};

//verification quantity
function verifQuantity() {
  if (!quantity.value.match(/^[0-9]+$/))  {
    errorRed(quantity);
    resultQuantity = false;
  }  else { noError(quantity);
    resultQuantity = true;
}};

//choix du tournois validate if input checked 
function verifLocations() {
  const Locationchecked = document.querySelector(
    "input[name='location']:checked");
  if (Locationchecked == null) {
        errorRed(location1); redBorderLocation();
        resultLocations = false;
  } else { noError(location1); noBorderLocation();
  resultLocations = true;
}};

//Control cgu
function verifCgu() {
if (!checkbox1.checked) {
    errorRed(checkbox1); redBorderCgu();
    resultCgu = false;
 } 
 else{ noError(checkbox1); noBorderCgu();
    resultCgu = true;
}};


//form validation function
function validate() {
  //control of every inputs
  verifFirstName();
  verifLastName();
  verifEmail();
  verifAge();
  verifQuantity();
  verifLocations();
  verifCgu();

  if (!resultFirstName || !resultLastName || !resultEmail || !resultBirthdate || !resultQuantity || !resultLocations || !resultCgu) {
    return false;
  } else{ 
    messageEnvoi.style.display = 'flex';
    form.classList.add('invisibleForm');
    bruitachievement();
    return true;
  }
}

//function bruitage
function bruitachievement(){
  const bruitachievement = new Audio();
  bruitachievement.src = "./bruit/achievement.wav";
  bruitachievement.play();
}