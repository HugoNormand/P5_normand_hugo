//Ajout des produits sur la page d'acceuil

api()
    .then(function(sofas) {
        console.log(sofas)
        const item = document.querySelector('.items');
        for (let i = 0; i < sofas.length; i++) {
            let a = document.createElement('a');
            let article = document.createElement('article');
            let img = document.createElement('img');
            let h3 = document.createElement('h3');
            let p = document.createElement('p');
            
            a.href = `./product.html?id=${sofas[i]._id}`;
            img.src = sofas[i].imageUrl;
            img.alt = sofas[i].altTxt;
            h3.className = "productName";
            h3.innerHTML = sofas[i].name;
            p.className = "productDescription";
            p.innerHTML = sofas[i].description;
            
            article.append(img, h3, p);
            a.appendChild(article);
            
            item.appendChild(a);
       }   
    });

    




 

 



