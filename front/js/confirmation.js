let orderId = document.getElementById('orderId');
let params = new URLSearchParams(document.location.search);
let id = params.get("id");

orderId.innerHTML = id; 