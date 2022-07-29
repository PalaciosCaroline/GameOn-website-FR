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

//Preparation of Error messsage (opacity = 0)
const placeMessage = (input,message) => input.parentNode.setAttribute('data-error',message);
placeMessage(firstName,'Entrer 2 lettres minimum pour le champ du prénom.')
placeMessage(lastName,'Entrer 2 lettres minimum pour le champ du nom.')
placeMessage(email,'Une adresse email valide est requise')
placeMessage(birthdate,'Entrer votre date de naissance, 12ans minimum sont requis')
placeMessage(quantity,'Une valeur numérique doit être saisie')
placeMessage(location1,'Veuillez choisir une option.')
placeMessage(checkbox1,'Veuillez vérifier que vous acceptez bien les termes et conditions.')

//writing white help message (color=white and opacity=1)
const errorWhite = (element) => {element.parentNode.classList = ("formData white");}

//Writing red error message (color=red and opacity=1)
const errorRed = (element) => {element.parentNode.classList = ("formData red")};
const redBorderLocation = () => checkBorder.forEach((i) => i.classList.add('colorred'));
const redBorderCgu = () => cguBorder.classList.add('colorred');
  
//Deletion of messages
const noError = (element) => element.parentNode.classList = ("formData");
const noBorderLocation = () => checkBorder.forEach((i) => i.classList.remove('colorred'));
const noBorderCgu = () => cguBorder.classList.remove('colorred');

//regex and test 
const nameRegex = /^[a-zA-Z-áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]{2,}$/;
const test = (name) => nameRegex.test(name.value.trim()); //test for first and last name
const testEmail = () => (email.value.trim()).match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
const testQuantity = () => quantity.value.match(/^[0-9]+$/);
const testBirthdate = () => { const date = new Date(birthdate.value);
          const now = Date.now();
          const oneYear = 365.25 * 24 * 60 * 60 * 1000; //one year of secondes
          const age = (now - date) / oneYear;
          if (!(date instanceof Date) || isNaN(date) || age < 12 || age > 130){ return false;
          } else {return true;}};

//variable result of input validation
let resultFirstName = () => verif(firstName,test(firstName));
let resultLastName = () => verif(lastName,test(lastName));
let resultEmail = () => verif(email,testEmail());
let resultBirthdate = () => verif(birthdate,testBirthdate());
let resultQuantity = () => verif(quantity,testQuantity());
let resultLocations;
let resultCgu;

//help and control on write
function textWhite(input,control){ errorWhite(input);
              (control)? noError(input) : ''};
firstName.addEventListener("keyup", () => textWhite(firstName,test(firstName)));
lastName.addEventListener("keyup", () => textWhite(lastName,test(lastName)));
email.addEventListener("keyup", () => textWhite(email,testEmail()));
birthdate.addEventListener("keyup", () => textWhite(birthdate,testBirthdate()));
quantity.addEventListener("keyup", () => textWhite(quantity,testQuantity()));
radios.forEach((input) => input.addEventListener("click", verifLocations));//if change
checkbox1.addEventListener("change", verifCgu);//warning if uncheck cgu

//control focusout
firstName.addEventListener("focusout", () => verif(firstName,test(firstName)));
lastName.addEventListener("focusout", () => verif(lastName,test(lastName)));
email.addEventListener("focusout", () => verif(email,testEmail()));
birthdate.addEventListener("focusout", () => verif(birthdate,testBirthdate()));
quantity.addEventListener("focusout", () => verif(quantity,testQuantity()));

//Control of input to Validate form
//Control firstName, lastName, email, quantity, and birthdate
function verif(name,control) {
  if (!control) { errorRed(name);
    return false;
  }  else { noError(name);
  return true;
}};

//Control of choice of tournement, validate if input checked 
function verifLocations() {
  const Locationchecked = document.querySelector("input[name='location']:checked");
  if (Locationchecked == null) {
        errorRed(location1); redBorderLocation();
        resultLocations = false;
  } else { noError(location1); noBorderLocation();
  resultLocations = true;
}};

//Control cgu checked
function verifCgu() {
if (!checkbox1.checked) {
    errorRed(checkbox1); redBorderCgu();
    resultCgu = false;
 } else{ noError(checkbox1); noBorderCgu();
    resultCgu = true;
}};

//form validation function
function validate() {
  //control of every inputs
  verif(firstName,test(firstName));
  verif(lastName,test(lastName));
  verif(email,testEmail());
  verif(quantity,testQuantity());
  verif(birthdate,testBirthdate());
  verifLocations();
  verifCgu();
  if (!resultFirstName() || !resultLastName() || !resultEmail() || !resultBirthdate() || !resultQuantity() || !resultLocations || !resultCgu) {
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