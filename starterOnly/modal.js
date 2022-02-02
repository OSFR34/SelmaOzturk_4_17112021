"use strict";

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === " topnav") {
    x.className += "responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

const closeButtons = document.querySelectorAll(".close");

closeButtons.forEach((closeButton)=>{

    closeButton.addEventListener("click", function(){

      document.querySelector(".bground").style.display = "none";

    });

});


document.querySelector(".btn-submit").addEventListener("click", function(){

      const nameValue = document.querySelector("#first").value;

      const lastNameValue = document.querySelector("#last").value;

      const emailValue = document.querySelector("#email").value;

      const dateValue = document.querySelector("#birthdate").value;

      const tournamentsNumberValue = document.querySelector("#quantity").value;

      const city = document.querySelectorAll(".checkbox-input-radio");

      const conditions = document.querySelector("#checkbox1").checked;

      const resultVerifLastName = verifLastName(lastNameValue);

      const resultVerifName = verifName(nameValue);

      const resultVerifEmail = verifEmail(emailValue);

      const resultVerifDate = verifDate(dateValue);

      const resultVerifTournamentsNumber = verifTournamentsNumber(tournamentsNumberValue);

      const resultVerifCity = verifCity(city);

      const resultVerifConditions = verifConditions(conditions);



      if(resultVerifLastName === true &&
         resultVerifName === true && 
         resultVerifEmail === true && 
         resultVerifDate === true && 
         resultVerifTournamentsNumber === true && 
         resultVerifCity === true && 
         resultVerifConditions === true){

          // J'affiche le message de validation de formulaire.

          const modalBody = document.querySelector(".modal-body");

          const form = document.querySelector("#contact-form");

          form.reset();

          const successMessage = `
              <div class="success-message">
                <div>Merci pour </div>
                <div>votre inscription </div>
              </div>

              <input readonly
                  id="close-success-message"
                  class="button btn-submit"
                  value="Fermer"
              />
                        
          `;

          // ModalConain contient le formulaire qu'il y'a dans la modale avant l'injection du message de reussite.
          const storeForm = modalBody.removeChild(form);

          modalBody.innerHTML = successMessage;

          document.querySelector("#close-success-message").addEventListener("click", function(){

              document.querySelector(".bground").style.display = "none";
              modalBody.innerHTML = "";
              modalBody.appendChild(storeForm);

          });

      }


  });

function verifName(value){

      const errorMessagePrenom = document.querySelector("#error-message-prenom");     

      if(value === "" || value.length < 2){

          errorMessagePrenom.innerHTML = "Veuillez entrer un  prénom qui a au moins de 2 caractères";

          return errorMessagePrenom.style.display = "block";

      }

      errorMessagePrenom.style.display = "none";

      return true;
}  

function verifLastName(value){

  const errorMessageNom = document.querySelector("#error-message-nom");     

  if(value === "" || value.length < 2){

      errorMessageNom.innerHTML = "Veuillez entrer un nom qui a au moins de 2 caractères";

      return errorMessageNom.style.display = "block";

    }

    errorMessageNom.style.display = "none";

  return true;
}

// contrôle validité e-mail

function  verifEmail(value){ 

  const errorMessageEmail = document.querySelector("#error-message-email");

  if(value === "" || (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(value) === false){

    errorMessageEmail.innerHTML = "Veuillez entrer un e-mail valide";

    return errorMessageEmail.style.display = "block";

  }

  errorMessageEmail.style.display = "none";


  return true;
}


function verifDate(value){

   const errorMessageDate = document.querySelector("#error-message-date");

   if(value === ""){

      errorMessageDate.innerHTML = "Veuillez entrer une date valide";

      return errorMessageDate.style.display = "block";

   }

   const date = new Date(value);

   const year = date.getFullYear();

   if(year < 1930 || year > 2022){

    errorMessageDate.innerHTML = "Veuillez entrer une date valide";

    return errorMessageDate.style.display = "block";

   }

    errorMessageDate.style.display = "none";

    return true;

}

function verifTournamentsNumber(value){

  const errorMessageTournament = document.querySelector("#error-message-tournament");

  if(value === ""){

    errorMessageTournament.innerHTML = "Veuillez entrer un nombre de tournois";

    return errorMessageTournament.style.display = "block";

 }
 
 errorMessageTournament.style.display = "none";

 return true;

}

function verifCity(citiesCollection){

   const errorMessageCities = document.querySelector("#error-message-cities");

   let isRadioChecked = false;

   const j = citiesCollection.length;

   for(let i=0; i<j; i++){

     if(citiesCollection[i].checked === true){

        isRadioChecked = true;
        break;

     }

   }

   if(isRadioChecked === false){

     errorMessageCities.innerHTML = "Veuillez choisir une ville";
     return errorMessageCities.style.display = "block";

   }

   errorMessageCities.style.display = "none";
   return true;


}

function verifConditions(isChecked){

  const errorMessageConditions = document.querySelector("#error-message-conditions");

  if(isChecked === false){

     errorMessageConditions.innerHTML = "Veuillez vérifier les conditions d'utilisation";

     return errorMessageConditions.style.display = "block";

  }

  errorMessageConditions.style.display = "none";

  return true;

}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


