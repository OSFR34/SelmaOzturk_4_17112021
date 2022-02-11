function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelector(".close")

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//close modal event
closeModalBtn.addEventListener("click", closeModal)

//close modal form
function closeModal() {
  modalbg.style.display = "none";
  // document.querySelector('form').reset(); //permet la fermeture de la modal.
}

//DOM elements
const form = document.getElementById('form');

const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const tournamentQuantity = document.getElementById('quantity');
const locationSelector = document.getElementsByName("location");
const errorCityMessage = document.getElementById('errorCity');
const checkboxConditions = document.getElementById('checkboxCondition1');
const errorConditions = document.getElementById('errorConditionsText');

//REGEX
// permets l'acceptation des caractères spéciaux même autre que celle de l'aphabet français et vérifie si il y a bien 2 caractères minimum.
let nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]{2,}/;

// permets de vérifier une syntaxe est bien de type exemple@email.com
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; 

//si la valeur de l'input est invalide: affiche le message d'erreur  et l'encadré rouge ds l'input concerné
function displayError(input) {
    input.style.border = "solid 2px red";
    input.nextElementSibling.style.display = "block";   
}
// si la valeur de l'input est valide:  Rien ne s'affiche car annulation des dispositifs d'erreurs.
function displaySuccess(input) {
	input.style.border = 'none';
    input.nextElementSibling.style.display = "none";    
}
// VALIDATIONS INPUTS


// check prénom
function verifFirstName() {
    // Si la valeur du champ prénom est vide ou ne correspond pas au REGEX, on affiche l'erreur.
    if (firstName.value === '' || !firstName.value.match(nameRegex)) {
        displayError(firstName);
        return false;
    }else {
        displaySuccess(firstName);
        return true;
    }
}

//check nom de famille
function verifLastName() {
    // Si la valeur du champ nom est vide ou ne correspond pas au REGEX, on affiche l'erreur.
    if (lastName.value === '' || !lastName.value.match(nameRegex)) {
        displayError(lastName);
        return false;
    }else {
        displaySuccess(lastName);
        return true;
    }
}

//check email
function verifEmail() {
    // Si la valeur du champ email correspond au REGEX, le champ est valide. Sinon on affiche l'affichage d'erreur.
    if (email.value.match(emailRegex)) { // si l'email est valide, match le Regex, 
        displaySuccess(email);
        return true;
    }else {
        displayError(email);
        return false;
    }
}

//check date de naissance
function verifBirthdate() {
    // Si la date de naissance entrée ne se situe pas entre le min et le max défit dans HTML, on affiche l'erreur.
    if (birthdate.value< birthdate.min || birthdate.value > birthdate.max) { //si la date de naissance ne se trouve pas entre le min et le max définit dans le HTML
        displayError(birthdate);
        return false;
    }else {
        displaySuccess(birthdate);
        return true;
    }
}

function verifTournements() {
    // Si la valeur est nul ou si la valeur ne se situe pas entre le min (0) et le max (99), on affiche l'erreur.
    if (tournamentQuantity.value === "" || tournamentQuantity.value < 0 || tournamentQuantity.value >99) {
        displayError(tournamentQuantity);
        return false;
    } else {
        displaySuccess(tournamentQuantity);
        return true;
    }
}

function verifCity() {
    let checkCity = false;
    // Mise en place d'une boucle .
    for(i=0; i<locationSelector.length; i++) {
        if (locationSelector[i].checked) {
           checkCity = true; // si l'une est coché alors checkCity = true
        }
    }
    if (checkCity == false) { // si checkCity est = faux (cad aucune checkbox n'est selectionné) alors le message d'erreur s'affiche.
         errorCityMessage.style.display = "block";
         return false;
    }else {
         errorCityMessage.style.display = "none";
         return true;
        }
}

function verifConditions() {
    // si la checkbox des conditions n'est pas coché, alors le paramètrage d'erreur s'affiche.
    if (!checkboxConditions.checked) {
        errorConditionsText.style.display = 'block';
        return false;
    } else {
        errorConditionsText.style.display = 'none';
        return true;
    }
}

// Ecouteur d'évèvement 'SUBMIT' du formulaire
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêche la soumission du formulaire tant que toutes les conditions ne sont pas réunies.

    //si les inputs sont valides, le message de validation s'affiche
    if(verifFirstName() === true && verifLastName() === true 
        && verifEmail() === true && verifBirthdate() === true 
        && verifTournements() === true && verifCity() === true && verifConditions() === true) {

        const modalBody = document.querySelector('.modal-body');
        const successMessage  = document.createElement('button');
        modalBody.innerHTML = '<h1>Merci pour <br> votre inscription</h1>';
        modalBody.style.minHeight = '850px';
        modalBody.style.textAlign = 'center';
        modalBody.style.display = 'flex';
        modalBody.style.flexDirection = 'column';
        modalBody.style.justifyContent = "center";
        modalBody.style.alignItems = "center";

        successMessage.textContent = "Fermer";
        successMessage.classList.add('btn-submit');
        successMessage.classList.add('button');
        successMessage.style.position = 'absolute';
        successMessage.style.bottom = '25px';
        modalBody.appendChild(successMessage); //sucessMessage est enfant de modalBody.

        successMessage.addEventListener("click", closeModal); // Au click du button 'Fermer', la modal se ferme grâce à la fonction closeModal.
    } else {
        //Sinon, les fonctions suivantes sont appelées, affichant les erreurs associés aux inputs invalides.
        verifFirstName();
        verifLastName();
        verifEmail();
        verifBirthdate();
        verifTournements();
        verifCity();
        verifConditions();
    }
})

