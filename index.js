import frequencies from "./frequencies.js";

let oscillator;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

document.onmousedown = event => {
    event = event || window.event;
    const elem = event.target;

    if (!elem.getAttribute("class").endsWith("key")) return;
    elem.style["background-color"] = "cyan";

    const frequency = frequencies[elem.id];

    oscillator = audioCtx.createOscillator();
    oscillator.type = "square";
    oscillator.frequency.value = frequency;

    oscillator.connect(audioCtx.destination);
    oscillator.start();
};

document.onmouseup = event => {
    event = event || window.event;
    const elem = event.target;

    const className = elem.getAttribute("class");
    if (!className.endsWith("key")) return;

    elem.style["background-color"] = className.startsWith("b") ? "black" : "white";
    oscillator.stop();
};
