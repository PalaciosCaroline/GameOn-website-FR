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
let checkBorder = document.querySelectorAll('span[class="checkbox-icon"]');// border inputs
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
//Writing red error messages
const errorRedFirst =  () => {firstName.parentNode.setAttribute('data-error-visible',true);
                              firstName.parentNode.classList.remove("white")};
const errorRedLast =  () => {lastName.parentNode.setAttribute('data-error-visible', true);
                              lastName.parentNode.classList.remove("white");}
const errorRedEmail =  () => {email.parentNode.setAttribute('data-error-visible',true);
                              email.parentNode.classList.remove("white");}
const errorRedAge =  () => {birthdate.parentNode.setAttribute('data-error-visible',true);
                              birthdate.parentNode.classList.remove("white");}   
const errorRedQuantity =  () => {quantity.parentNode.setAttribute('data-error-visible', true);
                              quantity.parentNode.classList.remove("white");}
const errorRedLocation = () => {location1.parentNode.setAttribute('data-error-visible',true); 
                          checkBorder.forEach((i) => i.classList.add('redBorder'));}

//writing white help messages
const errorWhiteFirst = () => {firstName.parentNode.classList.add("white");
                      firstName.parentNode.setAttribute('data-error-visible',true);}
const errorWhiteLast = () => {lastName.parentNode.classList.add("white");
                      lastName.parentNode.setAttribute('data-error-visible',true);}
const errorWhiteEmail = () => {email.parentNode.classList.add("white");
                      email.parentNode.setAttribute('data-error-visible',true);}
const errorWhiteAge = () => {birthdate.parentNode.classList.add("white");
                      birthdate.parentNode.setAttribute('data-error-visible',true);}
const errorWhiteQuantity = () => {quantity.parentNode.classList.add("white");
                      quantity.parentNode.setAttribute('data-error-visible',true);}

//Deletion of messages
const noErrorFirst = () => firstName.parentNode.removeAttribute('data-error-visible');
const noErrorLast = () => lastName.parentNode.removeAttribute('data-error-visible');
const noErrorEmail = () => email.parentNode.removeAttribute('data-error-visible');
const noErrorAge = () => birthdate.parentNode.removeAttribute('data-error-visible');
const noErrorQuantity = () => quantity.parentNode.removeAttribute('data-error-visible');
const noErrorLocation = () => {location1.parentNode.removeAttribute('data-error-visible');
        checkBorder.forEach((i) => i.classList.remove('redBorder'));}

//regex and test 
const nameRegex = /^[a-zA-Z-áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]{2,}$/;
const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const numberRegex = /^[0-9]+$/;
const test = (name) => nameRegex.test(name.value); //test for first and last name
const testEmail = () => email.value.match(mailRegex);

//Control firstName
let resultFirstName;
//control on write
firstName.addEventListener("keyup", () => { errorWhiteFirst();
  test(firstName) ? noErrorFirst() : '' ;
});
//control focusout
firstName.addEventListener("focusout", () => !test(firstName) ? errorRedFirst() : '');
//last control of input
function verifFirstName() {
  if (!test(firstName)) {
    errorRedFirst();
    resultFirstName = false;
  }  
  resultFirstName = true;
};

//Control lastName
let resultLastName
//control on write
lastName.addEventListener("keyup", () => { errorWhiteLast();
   test(lastName) ? noErrorLast() : '' });
//control focusout
lastName.addEventListener("focusout", () => !test(lastName)? errorRedLast() : '');
//last control of input
function verifLastName() {
  if (!test(lastName)) {
  errorRedLast();
  resultLastName = false;
  }  
  resultLastName = true;
};

//Control email
let resultEmail
//control on write
email.addEventListener("keyup", () => { errorWhiteEmail();
  (testEmail())? noErrorEmail() : ''});
//control focusout
email.addEventListener("focusout", () => !testEmail() ? errorRedEmail() : '');
//last control of input
function verifEmail() {
  if (!testEmail()) {
      errorRedEmail();
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

//verification quantity
let resultQuantity
//Control if this input is ok
function verifQuantity() {
  if (!quantity.value || !quantity.value.match(numberRegex))  {
    errorRedQuantity();
    resultQuantity = false;
  }  else { noErrorQuantity();
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
        errorRedLocation();
        resultLocations = false;
  } else { noErrorLocation();
  resultLocations = true;
}};
//listen if a tournament is checked
radios.forEach((input) => input.addEventListener("click", verifLocations));

//Control cgu
let resultCgu
function verifCgu() {
if (!checkbox1.checked) {
    checkbox1.parentNode.setAttribute('data-error-visible',true);
    cgu.classList.add('colorred');
    resultCgu = false;
 } 
 else{ checkbox1.parentNode.removeAttribute('data-error-visible');
    cgu.classList.remove('colorred');
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
