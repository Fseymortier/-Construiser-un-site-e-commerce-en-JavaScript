let params = new URLSearchParams(document.location.search);
let urlId = params.get("id");

fetch("http://localhost:3000/api/products/" + urlId)
.then(res => {
    if (res.ok) {
    return res.json();
    }
})
.then(data => {
    createCanapeSelected(data);
})
.catch(() => {
    alert("Une erreur est survenue");
}); 
function createCanapeSelected(canape) {
    document.title = canape.name;

    const imageContainer = document.getElementsByClassName("item__img")[0];
    const imageProduct = document.createElement('img');
    imageProduct.src = canape.imageUrl;
    imageProduct.alt = canape.altTxt;
    imageContainer.appendChild(imageProduct);

    document.getElementById("title").textContent = canape.name;
    document.getElementById("price").textContent = canape.price;
    document.getElementById("description").textContent = canape.description;
// Création de la liste déroulante du choix des couleurs        
    canape.colors.forEach((color)=>{
        const selectColor = document.getElementById("colors");
        var option = document.createElement('option');
        option.setAttribute("value", color);
        option.textContent = color;
        selectColor.appendChild(option);
    })        
    const button = document.getElementById("addToCart");
    button.addEventListener("click", () => {
        const colorCanape = document.getElementById("colors").value;
        canape.colorChoice = colorCanape;
        const canapeQuantity = document.getElementById("quantity").value;
        canape.quantity = canapeQuantity;        
// Vérification des entrées de l'utilisateur pour la couleur et la quantité
        let isCanapeFound = false;
        if(colorCanape == "" ){
            alert('Selectioner une couleur');
            isCanapeFound = true;
        }
        if(canapeQuantity < 1){
            alert('Vous pouvez ajouter un minimum de 1 canapé par type et par couleur');
            isCanapeFound = true;
        }
        if(canape.quantity > 100){
            alert('Vous pouvez ajouter un maximum de 100 canapés par type et par couleur');
            isCanapeFound = true;
        }
        var arrayStorage = [];                                    
        if (localStorage.getItem("cart")){
            arrayStorage = JSON.parse(localStorage.getItem("cart"));
        }
// Vérification de la présence du produit dans le panier       
        for (var i = 0; i < arrayStorage.length; i++){
            let quantityTotal = parseInt(arrayStorage[i].quantity) + parseInt(canape.quantity);
            if(canape._id == arrayStorage[i]._id && canape.colorChoice == arrayStorage[i].colorChoice){
                if (quantityTotal > 100){
                    alert('Vous avez déja ' + arrayStorage[i].quantity + ' canapés de cette couleur dans votre panier. Vous pouvez ajouter un maximum de 100 canapés par type et par couleur');
                    isCanapeFound = true;
                }else{
                    arrayStorage[i].quantity =  quantityTotal;
                    isCanapeFound = true;
                    alert("Vos articles on été ajoutés au panier");
                }
            }                                    
        }
// Si le produit n'est pas dans le panier, création de celui-ci
        if (!isCanapeFound){
            const canapeCart = {
                _id: canape._id,
                imageUrl: canape.imageUrl,
                altTxt: canape.altTxt,
                name: canape.name,
                colorChoice:  canape.colorChoice,
                quantity: canape.quantity
            };
            arrayStorage.push(canapeCart);
            alert("Vos articles on été ajoutés au panier");
        }
        localStorage.setItem("cart", JSON.stringify(arrayStorage));        
    });
}