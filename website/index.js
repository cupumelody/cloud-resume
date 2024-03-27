const counter = document.querySelector('.counter-number');
async function updateCounter() {
    let response = await fetch('https://2s54yoecja6ipxodka35qlmw5m0gpzvs.lambda-url.us-east-1.on.aws/');
    let data = await response.json();
    counter.innerHTML = ` views : ${data} `;
}

updateCounter();