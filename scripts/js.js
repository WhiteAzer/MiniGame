// Изменение цветов хэдера
let $header = document.querySelector(".header");

function randColor() {
    let r = Math.floor(Math.random() * (256)),
        g = Math.floor(Math.random() * (256)),
        b = Math.floor(Math.random() * (256));
    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
};

$header.addEventListener("click", function() {
    let color = randColor();
    $header.style.backgroundColor = color;
});

// Блок времени
const $clock = document.querySelector(".clock");
const $today = document.querySelector(".today");
let day;

function month(i) {
    switch(i) {
        case 0: return "Jan";
        case 1: return "Feb";
        case 2: return "Mar";
        case 3: return "Apr";
        case 4: return "May";
        case 5: return "June";
        case 6: return "July";
        case 7: return "Aug";
        case 8: return "Sept";
        case 9: return "Oct";
        case 10: return "Nov";
        case 11: return "Dec";
        default: return "Это не месяц";

    }
}

onload = function() {
    setInterval(function() {
        let date = new Date();
        $clock.innerHTML = date.toLocaleTimeString();
        day = month(date.getMonth()) + ' ' + date.getDate().toString();
        $today.innerHTML = day;
    }, 1000);
};

// Изменение текста хэдера
const $btn = document.querySelector(".header-button");
const $headerInput = document.querySelector(".header-input");
const $headerText = document.querySelector(".header-text");

$btn.addEventListener("click", function (event) {
    event.stopPropagation();
    let value = $headerInput.value;
    localStorage.setItem("headerText", value);
    if (value && value.trim())
    $headerText.textContent = value;
});

document.addEventListener("DOMContentLoaded", function() {
    let text = localStorage.getItem("headerText");
    if (text && text.trim())
    $headerText.textContent = text;
})

$headerInput.addEventListener("click", function (event) {
    event.stopPropagation();
});

// Мини игра
let $start = document.querySelector(".app-button");
let $game = document.querySelector(".game");
let $time = document.querySelector(".app-header-time");
let $headerTime = document.querySelector(".app-header-text");
let $headerResult = document.querySelector(".app-header-result");
let $result = document.querySelector(".result");
let $gameTime = document.querySelector("#game-time");

let score = 0;
let isGameStarted = false;

$start.addEventListener("click", startGame);
$game.addEventListener("click", handleBoxClick);
$gameTime.addEventListener("input", setGameTime);

function startGame() {
    score = 0;
    setGameTime();
    isGameStarted = true;
    hide($start);
    $game.style.backgroundColor = "#fffafa";
    $gameTime.setAttribute("disabled", "true");

    let interval = setInterval(function() {
        let time = parseFloat($time.textContent);
        if (time <= 0) {
            endGame();
            clearInterval(interval);
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        } 
    }, 100);   

    renderBox();
}

function renderBox() {
    let box = document.createElement("div");
    let boxSize = getRandom(30, 100);
    let gameSize = $game.getBoundingClientRect();
    let maxTop = gameSize.height - boxSize;
    let maxLeft = gameSize.width - boxSize;
    let colors = ["#FFA9E7", "#FF84E8", "#7F2CCB", "#414361", "#2A2D43"];

    $game.innerHTML = "";

    box.style.height = box.style.width = boxSize + "px";
    box.style.position = "absolute";
    box.style.backgroundColor = colors[getRandom(0, colors.length - 1)];
    box.style.top = getRandom(0, maxTop) + "px";
    box.style.left = getRandom(0, maxLeft) + "px";
    box.style.cursor = "pointer";
    box.setAttribute("data-box", "true");

    $game.insertAdjacentElement("afterbegin", box);
}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return;
    }
    if (event.target.dataset.box) {
        renderBox();
        score++;
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function endGame() {
    $gameTime.removeAttribute("disabled");
    isGameStarted = false;
    show($start);
    $game.innerHTML = "";
    hide($headerTime);
    show($headerResult);
    $game.style.backgroundColor = "#ededed";

    setGameScore();
}

function setGameScore() {
    $result.textContent = score.toString();
}

function setGameTime() {
    let time = +$gameTime.value;
    $time.textContent = time.toFixed(1);
    show($headerTime);
    hide($headerResult);
}

function show($el) {
    $el.classList.remove("hide");
}

function hide($el) {
    $el.classList.add("hide");
}