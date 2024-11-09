let countValue = localStorage.getItem("countValue") ? parseInt(localStorage.getItem("countValue")) : 0;
let autoCountValue = localStorage.getItem("autoCountValue") ? parseInt(localStorage.getItem("autoCountValue")) : 0;

function count() {
    countValue += 1;
    document.querySelector("#count-result").textContent = countValue;
    localStorage.setItem("countValue", countValue);
}

setInterval(function() {
    autoCountValue += 1;
    document.querySelector("#auto-counter").textContent = autoCountValue;
    localStorage.setItem("autoCountValue", autoCountValue);
}, 1000);

document.querySelector("#count-result").textContent = countValue;
document.querySelector("#auto-counter").textContent = autoCountValue;

function changeMessage() {
    document.querySelector("#hover-text").textContent = "Obrigado por passares!";
}

function resetMessage() {
    document.querySelector("#hover-text").textContent = "Passa por aqui!";
}

function changeColor(color) {
    document.querySelector("#paint-text").style.color = color;
}

function submitColor() {
    const color = document.querySelector("#color-select").value;
    document.body.style.backgroundColor = color;
}

function changeBackgroundColor() {
    const inputElement = document.querySelector("#text-input");
    const randomColor = getRandomColor();
    inputElement.style.backgroundColor = randomColor;
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

document.querySelector("#color-select").addEventListener("change", function() {
    const color = this.value;
    document.body.style.backgroundColor = color;
});

document.querySelectorAll("button[data-color]").forEach((button) => {
    button.addEventListener("click", () => {
        const color = button.dataset.color;
        document.querySelector("#paint-text").style.color = color;
    });
});

document.querySelector("#toggle-text").addEventListener("click", function() {
    const textElement = document.querySelector("#toggle-text-element");
    textElement.style.display = (textElement.style.display === "none" ? "block" : "none");
});

document.querySelector("#text-input").addEventListener("mousemove", function() {
    this.style.backgroundColor = "yellow";
});

document.querySelector("#hover-text").addEventListener("mouseover", changeMessage);
document.querySelector("#hover-text").addEventListener("mouseout", resetMessage);

document.querySelector("#text-input").addEventListener("input", changeBackgroundColor);
document.querySelector("#count-btn").addEventListener("click", count);

document.querySelector("#generate-message").addEventListener("click", function() {
    const name = document.querySelector("#name-input").value;
    const age = document.querySelector("#age-input").value;
    
    if (name && age) {
        const message = `Olá, ${name} tem ${age} anos!`;
        document.querySelector("#generated-message").textContent = message;
    } else {
        document.querySelector("#generated-message").textContent = "Por favor, preencha ambos os campos.";
    }
});
