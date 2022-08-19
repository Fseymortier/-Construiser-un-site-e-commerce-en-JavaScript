const section = document.getElementById("cart__items");
var cartStorage = JSON.parse(localStorage.getItem("cart"));
var arrayCartId = [];
if(localStorage.getItem("cart")){               
for (let i = 0; i < cartStorage.length; i++){
    const article = document.createElement('article');
    article.setAttribute("class", "cart__item");
    article.setAttribute("data-id", "{product-ID}");
    article.setAttribute("data-color", "{product-color}");
    section.appendChild(article);

//-----------------------------Image du produit-----------------------------------
    const divImage = document.createElement('div');
    divImage.setAttribute("class", "cart__item__img");
    article.appendChild(divImage);
//-------------------------------------
    const imgCanape = document.createElement('img');
    imgCanape.src = cartStorage[i].imageUrl;
    imgCanape.alt = cartStorage[i].altTxt;
    divImage.appendChild(imgCanape);

//---------------------------------Content----------------------------------------
    const divContent = document.createElement('div');
    divContent.setAttribute("class", "cart__item__content");
    article.appendChild(divContent);
//----------------Description-------------------
    const divDescription = document.createElement('div');
    divDescription.setAttribute("class", "cart__item__content__description");
    divContent.appendChild(divDescription);
//--------------Nom du produit------------------
    const titleDescription = document.createElement('h2');
    titleDescription.textContent = cartStorage[i].name;
    divDescription.appendChild(titleDescription);
//------------couleur du produit----------------
    const colorDescription = document.createElement('p');
    colorDescription.textContent = "Couleur : " + cartStorage[i].colorChoice; 
    divDescription.appendChild(colorDescription);
//-------------------Prix------------------------            
    const canapeId = cartStorage[i]._id;
    const canapeCartQuantity = parseInt(cartStorage[i].quantity);
    var spanQuantity = document.getElementById("totalQuantity");
    var totalCartPrice = 0;
    fetch("http://localhost:3000/api/products/" + canapeId)
        .then(res =>{
            if (res.ok) {
                return res.json();
            }
        })
        .then(canape => {
            // Calcul du prix total par article
            let price = canape.price;
            let priceTT = price * canapeCartQuantity;
            const priceTotal = document.createElement('p');
            priceTotal.textContent = "Prix total : " + priceTT + " €"; 
            divDescription.appendChild(priceTotal);
            // Calcul du prix total du panier
            totalCartPrice = totalCartPrice + priceTT;
            spanQuantity.textContent = totalCartPrice;
        })
        .catch(() => {
            alert("Une erreur est sruvenue");
        }); 
//---------------------------Options du produit-----------------------------------
    const divSettings = document.createElement('div');
    divSettings.setAttribute("class", "cart__item__content__settings");
    divContent.appendChild(divSettings);
//-----------------Quantité---------------------
    const divQuantity = document.createElement('div');
    divQuantity.setAttribute("class", "cart__item__content__settings__quantity");
    divSettings.appendChild(divQuantity);

    const quantity = document.createElement('p');
    quantity.textContent = "Qté : "; 
    divQuantity.appendChild(quantity);

    let input = document.createElement('input');
    input.setAttribute("type", "number");
    input.setAttribute("class", "itemQuantity");
    input.setAttribute("name", "itemQuantity");
    input.setAttribute("min", "1");
    input.setAttribute("max", "100");
    input.setAttribute("value", cartStorage[i].quantity);
    divQuantity.appendChild(input);

//Vérification de la modification de la quantité
    input.addEventListener("change", () => {
        if (input.value > 100){
            alert("Vous pouvez ajouter un maximum de 100 canapés par type et par couleur");
        }
        else if(input.value < 1){
            alert("Vous pouvez ajouter un minium de 1 canapé par type et par couleur");
        }
        else{   
            cartStorage[i].quantity = input.value;
            localStorage.setItem("cart", JSON.stringify(cartStorage));
            window.location.href = "../html/cart.html";
        }        
    });
//----------------------------------------------
    const divDelete = document.createElement('div');
    divDelete.setAttribute("class", "cart__item__content__settings__delete");
    divSettings.appendChild(divDelete);
//----------------------------------------------
    var textDelete = document.createElement('p');
    textDelete.setAttribute("class", "deleteItem");
    textDelete.textContent = "Supprimer"; 
    divDelete.appendChild(textDelete);
//------------Suppression du produit------------
    textDelete.addEventListener("click", () => {        
        cartStorage = cartStorage.filter( el => el.colorChoice !== cartStorage[i].colorChoice || el._id !== cartStorage[i]._id);
        localStorage.setItem("cart", JSON.stringify(cartStorage));
        window.location.href = "../html/cart.html";
    })
    arrayCartId.push(canapeId);    
}

//-----------------------Vérification du formulaire-------------------------------
//-------------------prénom---------------------
let nameForm = document.getElementById("firstName");
let nameError = document.getElementById("firstNameErrorMsg");
let nameRegExp = new RegExp('^[a-zA-Z-]{2,15}$');
nameForm.addEventListener("change", () => {
    let testName = nameRegExp.test(nameForm.value);
    if(testName){        
        nameError.textContent = "Prénom valide";
    }else{
        nameError.textContent = "Prénom non-valide";
    }
});
//---------------------nom----------------------
let lastNameForm =  document.getElementById("lastName");
let lastNameError = document.getElementById("lastNameErrorMsg");
lastNameForm.addEventListener("change", () => {
    let testLastName = nameRegExp.test(lastNameForm.value);
    if(testLastName){
        lastNameError.textContent = "Nom valide";
    }else{
        lastNameError.textContent = "Nom non-valide";
    }
});
//------------------adress----------------------
let addressForm = document.getElementById("address");
let addressError = document.getElementById("addressErrorMsg");
let addressRegExp = new RegExp('^[a-zA-Z0-9-]{2,20}');
addressForm.addEventListener("change", () => {
    let testAddress = addressRegExp.test(addressForm.value);
    if(testAddress){
        addressError.textContent = "Addresse valide";
    }else{
        addressError.textContent = "Addresse non-valide";
    }
});
//------------------ville-----------------------
let cityForm = document.getElementById("city");
let cityError = document.getElementById("cityErrorMsg");
let cityRegExp = new RegExp('^[a-zA-Z-]{2,20}');
cityForm.addEventListener("change", () => {
    let testCity = cityRegExp.test(cityForm.value);
    if(testCity){        
        cityError.textContent = "Ville valide";
    }else{
        cityError.textContent = "Ville non-valide";
    }
});
//------------------email-----------------------
let emailForm = document.getElementById("email");
let emailError = document.getElementById("emailErrorMsg");
let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-z]{2,8}[.]{1}', 'g');
emailForm.addEventListener("change", () => {
    let testEmail = emailRegExp.test(emailForm.value);
    if(testEmail){        
        emailError.textContent = "E-mail valide";
    }else{
        emailError.textContent = "E-mail non-valide";
    }
});
//----------------Bouton commander--------------
let butonOrder = document.getElementById("order");
let userForm = document.getElementsByClassName('cart__order__form')[0];
butonOrder.addEventListener("click", e => {
    e.preventDefault();

    // Verification de la validité du formulaire pour créer l'objet du client
    if(userForm.reportValidity() === true){               
        let clientOrder = {
            contact: {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value,
            },
            products: arrayCartId,
        };    
        const dataToSend = JSON.stringify(clientOrder);

        // Requête API POST
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "aplication/json",                
            },               
            body: dataToSend,
        })
        .then(responce => {
            return responce.json();
        })
        //Redirection vers la page de confirmation
        .then(responce => {
            window.location.assign("confirmation.html?orderId=" + responce.orderId);
        })
        .catch(err => {
            alert("Une erreur s'est produite lors de la validation de votre commande");
        });
        
    }else{
        alert("Veuillez ajouter des articles et renseigner le formulaire, avant de valider votre panier");
    }
});
}else{
    console.log("waiting product in cart");
}