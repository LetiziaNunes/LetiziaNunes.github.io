let countValue = 0;

// Eventos de Rato
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
    const color = document.querySelector("#color-input").value.toLowerCase();
    document.body.style.backgroundColor = color;
    document.querySelector("#color-input").value = '';
}

function count() {
    countValue += 1;
    document.querySelector("#count-result").textContent = countValue;
}

function changeBackgroundColor() {
    const inputElement = document.querySelector("#text-input");
    const randomColor = getRandomColor();
    inputElement.style.backgroundColor = randomColor;
}

function getRandomColor() {
    // Gerar valores aleatórios para RGB (de 0 a 255)
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Novos eventos implementados

// Evento de Rato: click
document.querySelector("#toggle-text").addEventListener("click", function() {
    const textElement = document.querySelector("#toggle-text-element");
    textElement.style.display = (textElement.style.display === "none" ? "block" : "none");
});

// Evento de Rato: mousemove
document.querySelector("#text-input").addEventListener("mousemove", function() {
    this.style.backgroundColor = "yellow";
});


document.querySelector("#hover-text").addEventListener("mouseover", changeMessage);
document.querySelector("#hover-text").addEventListener("mouseout", resetMessage);

document.querySelector("#red-btn").addEventListener("click", function() { changeColor('red'); });
document.querySelector("#green-btn").addEventListener("click", function() { changeColor('green'); });
document.querySelector("#blue-btn").addEventListener("click", function() { changeColor('blue'); });

document.querySelector("#text-input").addEventListener("input", changeBackgroundColor);
document.querySelector("#submit-color").addEventListener("click", submitColor);
document.querySelector("#count-btn").addEventListener("click", count);
