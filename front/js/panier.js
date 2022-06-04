



let getLocal = JSON.parse(localStorage.getItem('basket'));
let cartItem = document.getElementById('cart__items');



for(let i= 0; i < getLocal.length; i++) {

    //Article

    let article = document.createElement('article');
    article.className = "cart__item";
    article.dataset.id = getLocal[i].id
    article.dataset.color = getLocal[i].couleur

    //Première div

    let divOne = document.createElement('div');
    divOne.className = "cart__item__img";

    let imgDivOne = document.createElement('img');
    api(URL+getLocal[i].id).then(function(sofa) {
        imgDivOne.src = sofa.imageUrl
});

    divOne.append(imgDivOne)

    //Deuxième div

    //Description

    let divTwo = document.createElement('div');
    divTwo.className = "cart__item__content";

    let divTwoDescription = document.createElement('div');
    divTwoDescription.className = "cart__item__content__description";

    let title = document.createElement('h2');
    api(URL+getLocal[i].id).then(function(sofa) {
        title.innerHTML = sofa.name
});

    let color = document.createElement('p');
    color.innerHTML = getLocal[i].couleur


    let price = document.createElement('p');
    api(URL+getLocal[i].id).then(function(sofa) {
        price.innerHTML = sofa.price + '€'
});

    divTwoDescription.append(title, color, price)

    //Settings

    let divTwoSettings = document.createElement('div');
    divTwoSettings.className = "cart__item__content__settings";

    let divTwoSettingsQuantity = document.createElement('div');
    divTwoSettingsQuantity.className = "cart__item__content__settings__quantity";

    let quantity = document.createElement('p');
    let inputQuantity = document.createElement('input');

    quantity.innerHTML= 'Qté : '
    inputQuantity.type = "number"
    inputQuantity.className = "itemQuantity"
    inputQuantity.name = "itemQuantity"
    inputQuantity.min = 1
    inputQuantity.max = 100
    inputQuantity.value = getLocal[i].quantité
    
    divTwoSettingsQuantity.append(quantity, inputQuantity)

    let divTwoSettingsDelete = document.createElement('div');
    
    let divTwoDeleteParagraph = document.createElement('p');
    divTwoDeleteParagraph.className = "deleteItem"
    divTwoDeleteParagraph.innerHTML = "Supprimer"

    divTwoSettingsDelete.append(divTwoDeleteParagraph);

    divTwoSettings.append(divTwoSettingsQuantity, divTwoSettingsDelete)

    divTwo.append(divTwoDescription, divTwoSettings)

    //Append HTML

    article.append(divOne, divTwo)
    
    cartItem.append(article)
        
}

//Affichage du nombres d'articles

let totalQuantity = document.getElementById('totalQuantity');
let arrayQuantity = []
for(let i= 0; i < getLocal.length; i++) {
    arrayQuantity.push(getLocal[i].quantité)
}

let sum = 0
for(let i = 0; i < arrayQuantity.length; i++) {
        sum += arrayQuantity[i];
        totalQuantity.innerHTML = sum
    }

//Affichage du prix total 

let totalPrice = document.getElementById('totalPrice');
let arrayPrice = []
for(let i= 0; i < getLocal.length; i++) {
    api(URL+getLocal[i].id).then(function(sofa) {
        arrayPrice.push(sofa.price * getLocal[i].quantité)
        let sumPrice = 0

    for(let i = 0; i < arrayPrice.length; i++) {
    sumPrice += arrayPrice[i];  
    totalPrice.innerHTML = sumPrice;
}
});

}

//Supprimer un élément du panier

let deleteButton = document.querySelectorAll('.deleteItem')


deleteButton.forEach((btn, i) => {
    btn.addEventListener('click', b => {
        deleteItemSelect(i)
        location.reload()
    })
})


function deleteItemSelect(index) {
    getLocal.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(getLocal));
}

//Ajouter ou enlever quantité

let itemQuantity = document.querySelectorAll('.itemQuantity')

itemQuantity.forEach((value, i) => {
    value.addEventListener('change', c => {
        changeQuantity(i, value)     
        location.reload()
    })
})

function changeQuantity(index, value) {
    getLocal[index].quantité = Number(value.value)
    localStorage.setItem('basket', JSON.stringify(getLocal))
}

//Formulaire 

//PRENOM

let prenom = document.querySelector('#firstName')
prenom.addEventListener('change', function() {
    validFirstName(this)
})

const validFirstName = function(inputFirstName) {
    let firstNameRegExp = new RegExp('[a-zA-Z-\s]', 'g')
    let testFirstName = firstNameRegExp.test(inputFirstName.value)

    if (testFirstName == false) {
        let msgErrorFirstName = document.querySelector('#firstNameErrorMsg')
        msgErrorFirstName.innerHTML = 'Veuillez entrer un prénom valide'
    } else {
        return true
    }

}  

//NOM

let nom = document.querySelector('#lastName')
nom.addEventListener('change', function() {
    validLastName(this)
})

const validLastName = function(inputLastName) {
    let lastNameRegExp = new RegExp('[a-zA-Z-\s]', 'g')
    let testLastName = lastNameRegExp.test(inputLastName.value)

    if (testLastName == false) {
        let msgErrorLastName = document.querySelector('#lastNameErrorMsg')
        msgErrorLastName.innerHTML = 'Veuillez entrer un nom valide'
    } else {
        return true
    }

}  


//ADRESSE

let address = document.querySelector('#address')
address.addEventListener('change', function() {
    validAddress(this)
})

const validAddress = function(inputAdress) {
    let AddressRegExp = /[0-9a-zA-Z-]+\s+[a-zA-Z0-9\s-]{2,30}\s+[a-zA-Z0-9\s-]+/i
    let testAdress = AddressRegExp.test(inputAdress.value)

    if (testAdress == false) {
        let msgErrorAdress = document.querySelector('#addressErrorMsg')
        msgErrorAdress.innerHTML = 'Veuillez entrer une adresse valide'
    } else {
        return true
    }

}   

//VILLES

let city = document.querySelector('#city')
city.addEventListener('change', function() {
    validCity(this)
})

const validCity = function(inputCity) {
    let cityRegExp = new RegExp('[a-zA-Z-]', 'g')
    let testCity = cityRegExp.test(inputCity.value)

    if (testCity == false) {
        let msgErrorCity = document.querySelector('#cityErrorMsg')
        msgErrorCity.innerHTML = 'Veuillez entrer une ville valide'
    } else {
        return true
    }

}  


//EMAIL

let email = document.querySelector('#email')
email.addEventListener('change', function () {
    validEmail(this)
})
 
const validEmail = function(inputEmail) {
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g')
    let testEmail = emailRegExp.test(inputEmail.value)

    if (testEmail == false) {
        let msgErrorMail = document.querySelector('#emailErrorMsg')
        msgErrorMail.innerHTML = 'Veuillez entrer un mail valide'
    } else {
        return true
    }
}

let form = document.querySelector('.cart__order__form');
form.addEventListener('submit', function (e) {
    e.preventDefault();  
    if (validFirstName(prenom) && validLastName(nom) && validAddress(address) && validCity(city) && validEmail(email)) {
        //form.submit()
        let prenom = document.getElementById('firstName');
        let nom = document.getElementById('lastName');
        let address = document.getElementById('address');
        let city = document.getElementById('city');
        let email = document.getElementById('email');
        let product = getLocal.map(produit => produit.id);
        let order =   {
            contact : {
            firstName: prenom.value,
            lastName: nom.value,
            address: address.value,
            city: city.value,
            email: email.value
        }, 
            products : product,
    };
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(function(res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then (function(value) {
                localStorage.clear();
                document.location.href = `confirmation.html?id=${value.orderId}`
            })
            .catch(error => console.error(error))
    } else {
        console.log("condition non valide")
    }
})


