fetch('http://localhost:3000/api/products')
    .then((responce) => {
        if (responce.ok) {
            return responce.json();
        }
    })
    .then((canapes) => {
        const canapeContainer = document.getElementById('items');

        canapes.forEach((canape) => {
            const linkProduct = document.createElement('a');
            linkProduct.href = './html/product.html?id=' + canape._id;
            const article = document.createElement('article');
            linkProduct.appendChild(article);

            const imageProduct = document.createElement('img');
            imageProduct.src = canape.imageUrl;
            imageProduct.alt = canape.altTxt;
            imageProduct.height = 120;
            imageProduct.width = 120;
            article.appendChild(imageProduct);

            const productName = document.createElement('h3');
            productName.textContent = canape.name;
            article.appendChild(productName);

            const productDescription = document.createElement('p');
            productDescription.textContent = canape.name;
            article.appendChild(productDescription);

            canapeContainer.appendChild(linkProduct);
        });
    })
    .catch(() => {
        alert('Une erreur est sruvenue lors du chargement de la page');
    });
