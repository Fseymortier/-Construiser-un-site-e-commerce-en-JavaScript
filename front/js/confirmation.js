let params = new URLSearchParams(document.location.search);
let urlId = params.get("orderId");
let commandNumber = document.getElementById("orderId");
commandNumber.textContent = urlId;
localStorage.removeItem("cart");