//Récuperation de l'ID du produit

let params = new URLSearchParams(document.location.search);
let id = params.get("id");

console.log(id);

api(URL+id)
    .then(function(sofa) { 

        //Apparition de l'article sur la page grâce à l'ID

        console.log(sofa)
        let classImg = document.querySelector('.item__img')
        let imgProduct = document.createElement('img')

        let titleProduct = document.getElementById('title')
        let priceProduct = document.getElementById('price')
        let description = document.getElementById('description')

        let colorsProduct = document.getElementById('colors')

        imgProduct.src = sofa.imageUrl
        imgProduct.alt = "Photographie d'un canapé"
        classImg.appendChild(imgProduct)
        titleProduct.innerHTML = sofa.name
        priceProduct.innerHTML = sofa.price
        description.innerHTML = sofa.description

        for (i= 0; i < sofa.colors.length; i++) {
            let colors = document.createElement('option')
            colors.value = sofa.colors[i]
            colors.innerHTML = sofa.colors[i]

            colorsProduct.append(colors)
        }

        //Creation du panier dans le local storage

        function savePanier (basket) {
            localStorage.setItem('basket', JSON.stringify(basket));
        }
        
        function getBasket () {
            let basket = localStorage.getItem('basket');
            if (basket == null) {
                return []
            } else {
                return JSON.parse(basket); 
            }
        }
         
        let quantityProduct = document.getElementById('quantity');
            
        function addBasket (product) {
            let basket = getBasket();
            let found = basket.find(stuff => stuff.id == product.id && stuff.couleur == product.couleur);
            if(found == undefined) {
                basket.push(product);  
                savePanier(basket);
            } else {
                found.quantité += product.quantité;
                savePanier(basket);
            }
        }
          
        document.querySelector("#addToCart")
        
        addToCart.addEventListener('click', function () {
            const produit = {
                id: id,
                couleur: colorsProduct.value,
                quantité: Number(quantityProduct.value)
            }; 
            if (colorsProduct.value == '') {
                window.alert("Veuillez choisir une couleur")
            } else if (quantityProduct.value == 0){
                window.alert("Veuillez choisir un quantité")
            } else {
                addBasket(produit);
                if (window.confirm('Allez vers votre panier ?')) {
                    window.open('./cart.html')
                }
            }
            
        })
    })
