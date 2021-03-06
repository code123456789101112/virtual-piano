const frequencies = {
    c: [261.6256, "C/4"],
    cs: [277.1826, "C#/4", "Db/4"],
    d: [293.6648, "D/4"],
    ds: [311.127, "D#/4", "Eb/4"],
    e: [329.6276, "E/4"],
    f: [349.2282, "F/4"],
    fs: [369.9944, "F#/4", "Gb/4"],
    g: [391.9954, "G/4"],
    gs: [415.3047, "G#/4", "Ab/4"],
    a: [440, "A/4"],
    as: [466.1638, "A#/4", "Bb/4"],
    b: [493.8833, "B/4"],
    cc: [523.2511, "C/5"]
};

const keys = {
    a: "c",
    w: "cs",
    s: "d",
    e: "ds",
    d: "e",
    f: "f",
    t: "fs",
    g: "g",
    y: "gs",
    h: "a",
    u: "as",
    j: "b",
    k: "cc"
};

export default [frequencies, keys];
