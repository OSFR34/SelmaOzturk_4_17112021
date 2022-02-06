function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

document.querySelector("#burger-menu").addEventListener("click", editNav);
  
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
    // document.querySelector('form').reset(); // le formulaire se referme à la fermeture du modal.
  }
  
// FORM VALIDATION

  //DOM elements
const form = document.getElementById('form');

const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const tournamentQuantity = document.getElementById('quantity');
const locationSelector = document.getElementsByName("location");
const errorCityText = document.getElementById('errorCity');
const checkboxConditions = document.getElementById('checkbox1');
const errorConditions = document.getElementById('errorConditionsText');

//REGEX
let nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]{2,}/;
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; 

// quand l'input est invalide : Affiche message d'erreur et encadre l'input concerné.
function showError(input) {
    input.style.border = 'solid 2px #ff4e60';
    input.nextElementSibling.style.display = "block";
}
//quand l'input est valide: annule le message d'erreur avec l'encadré rouge.
function showSuccess(input) {
	input.style.border = 'none';
    input.nextElementSibling.style.display = "none";
}
// VALIDATIONS INPUTS


// champs prénom
function verifFirstName() {
    // Si la valeur du champ prénom est vide ou ne correspond pas au REGEX, on affiche l'erreur.
    if (firstName.value === '' || !firstName.value.match(nameRegex)) {
        showError(firstName);
        return false;
    }else {
        showSuccess(firstName);
        return true;
    }
}

//champs nom de famille
function verifLastName() {
    // Si la valeur du champ nom est vide ou ne correspond pas au REGEX, on affiche l'erreur.
    if (lastName.value === '' || !lastName.value.match(nameRegex)) {
        showError(lastName);
        return false;
    }else {
        showSuccess(lastName);
        return true;
    }
}

//champs email
function verifEmail() {
    // Si la valeur du champ email correspond au REGEX, le champ est valide. Sinon on affiche le message d'erreur.
    if (email.value.match(emailRegex)) { 
        showSuccess(email);
        return true;
    }else {
        showError(email);
        return false;
    }
}

//champs date de naissance
function verifBirthdate() {
    // Si la date de naissance entrée ne se situe pas entre le min et le max défit dans HTML, on affiche l'erreur.
    if (birthdate.value< birthdate.min || birthdate.value > birthdate.max) { //si la date de naissance ne se trouve pas entre le min et le max définit dans le HTML
        showError(birthdate);
        return false;
    }else {
        showSuccess(birthdate);
        return true;
    }
}


// champs tournois
function verifTournements() {
    // Si le nombre saisi n'est pas pas dans l'intervale entre 0 et 99 alors on affiche le message d'erreur.
    if (tournamentQuantity.value === "" || tournamentQuantity.value < 0 || tournamentQuantity.value >99) {
        showError(tournamentQuantity);
        return false;
    } else {
        showSuccess(tournamentQuantity);
        return true;
    }
}
// champs villes
function verifCity() {
    let check1 = false;
    // On observe les inputs pour savoir s'il y en a un de checked
    for(i=0; i<locationSelector.length; i++) {
        if (locationSelector[i].checked) {
           check1 = true; // si vrai c'est qu'une des villes a été sélectionné.
        }
    }
    if (check1 == false) { // si faux c'est qu'aucune checkbox n'est selectionné) alors le message d'erreur s'affiche.
         errorCityText.style.display = "block";
         return false;
    }else {
         errorCityText.style.display = "none";
         return true;
        }
}
// champs conditions générales
function verifConditions() {
    // si la checkbox des conditions n'est pas checked, alors le message d'erreur s'affiche.
    if (!checkboxConditions.checked) {
        errorConditionsText.style.display = 'block';
        return false;
    } else {
        errorConditionsText.style.display = 'none';
        return true;
    }
}

// Ecouteur d'évèvement 'SUBMIT'
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêche la soumission du formulaire.

    //si les inputs sont valides, le message de validation s'affiche
    if(verifFirstName() === true && verifLastName() === true 
        && verifEmail() === true && verifBirthdate() === true 
        && verifTournements() === true && verifCity() === true && verifConditions() === true) {

        const modalBody = document.querySelector('.modal-body');
        const successMessage  = document.createElement('button');
        modalBody.innerHTML = '<h2>Merci pour<br> votre inscription</h2>';
        modalBody.style.minHeight = '850px';
        modalBody.style.textAlign = 'center';
        modalBody.style.display = 'flex';
        modalBody.style.flexDirection = 'column';
        modalBody.style.justifyContent = "center";
        modalBody.style.alignItems = "center";
        modalBody.style.padding = "5%";
        

        successMessage.textContent = "Fermer";
        successMessage.classList.add('btn-submit');
        successMessage.classList.add('button');
        successMessage.style.position = 'absolute';
        successMessage.style.bottom = '135px';
        modalBody.appendChild(successMessage); //sucessMessage est enfant de modalBody.

        successMessage.addEventListener("click", closeModal); // Au click du button 'Fermer', la modal se ferme grâce à la fonction closeModal.
    } else {
        //Sinon, appeler les fonctions suivantes qui afficheront les messages d'erreurs associés aux inputs invalides.
        verifFirstName();
        verifLastName();
        verifEmail();
        verifBirthdate();
        verifTournements();
        verifCity();
        verifConditions();
    }
})


  
