import frequencies from "./frequencies.js";

let oscillator;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } = Vex.Flow;
const div = document.getElementById("note");

document.onmousedown = event => {
    event = event || window.event;
    const elem = event.target;

    if (!elem.getAttribute("class")?.endsWith("key")) return;
    elem.style["background-color"] = "cyan";

    const frequency = frequencies[elem.id][0];

    oscillator = audioCtx.createOscillator();
    oscillator.type = "square";
    oscillator.frequency.value = frequency;

    oscillator.connect(audioCtx.destination);
    oscillator.start();

    div.innerHTML = "";
    const renderer = new Renderer(div, Renderer.Backends.SVG);

    renderer.resize(300, 300);
    const context = renderer.getContext();

    const stave = new Stave(15, 50, 250);
    stave.addClef("treble");
    stave.setContext(context).draw();

    let note;
    if (elem.id.endsWith("s")) {
        note = [new StaveNote({ keys: [frequencies[elem.id][1]], duration: "h" }).addModifier(new Accidental("#"))];
        note.push(new StaveNote({ keys: [frequencies[elem.id][2]], duration: "h" }).addModifier(new Accidental("b")));
    } else note = [new StaveNote({ keys: [frequencies[elem.id][1]], duration: "w" })];

    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(note);

    new Formatter().joinVoices([voice]).format([voice], 350);
    voice.draw(context, stave);
};

document.onmouseup = event => {
    event = event || window.event;
    const elem = event.target;

    const className = elem.getAttribute("class");
    if (!className?.endsWith("key")) return;

    elem.style["background-color"] = className.startsWith("b") ? "black" : "white";
    oscillator.stop();
};

document.onmouseleave = event => {
    event = event || window.event;
    const elem = event.target;
    if (!elem || !elem.getAttribute) return;

    const className = elem.getAttribute("class");
    if (!className?.endsWith("key")) return;

    oscillator.stop();
    elem.style["background-color"] = className.startsWith("b") ? "black" : "white";
};
