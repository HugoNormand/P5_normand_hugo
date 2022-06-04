//Creation d'une fonction pour requêter l'api

const URL = "http://localhost:3000/api/products/";

async function api (endpoint=URL) {
    let res = await fetch(endpoint);
    if (res.ok) {
        console.log(res)
        return await res.json();  
    } else {
        return res.status(500).json({error: "Une erreur s'est produite"})
    }
}
