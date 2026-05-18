// ===============================
// PROTEÇÃO LEVE
// ===============================

document.addEventListener("contextmenu", e => {
  e.preventDefault();
});

document.addEventListener("dragstart", e => {
  e.preventDefault();
});

document.addEventListener("keydown", e => {

  if(
    (e.ctrlKey &&
    ["c","u","s"].includes(e.key.toLowerCase()))
    ||
    e.key === "F12"
  ){
    e.preventDefault();
  }

});

// DETECTAR DEVTOOLS

setInterval(() => {

  const threshold = 160;

  if(
    window.outerWidth - window.innerWidth > threshold ||
    window.outerHeight - window.innerHeight > threshold
  ){
    document.body.innerHTML = "";
  }

},1000);


// ===============================
// TEORIA MUSICAL
// ===============================

const NOTES = [

  "C","C#","D","D#","E","F",
  "F#","G","G#","A","A#","B"

];

const SCALES = {

  "Maior":[0,2,4,5,7,9,11],

  "Menor Natural":[0,2,3,5,7,8,10],

  "Pentatônica Menor":[0,3,5,7,10],

  "Menor Melódica":[0,2,3,5,7,9,11],

  "Menor Harmônica":[0,2,3,5,7,8,11],

  "Dom Dim":[0,1,3,4,6,7,9,10],

  "Jônio":[0,2,4,5,7,9,11],

  "Dórico":[0,2,3,5,7,9,10],

  "Frígio":[0,1,3,5,7,8,10],

  "Lídio":[0,2,4,6,7,9,11],

  "Mixolídio":[0,2,4,5,7,9,10],

  "Eólio":[0,2,3,5,7,8,10],

  "Lócrio":[0,1,3,5,6,8,10]

};

const TUNINGS = {

  guitar6:[
    "E","A","D","G","B","E"
  ],

  guitar7:[
    "B","E","A","D","G","B","E"
  ],

  bass4:[
    "E","A","D","G"
  ],

  ukulele:[
    "G","C","E","A"
  ],

  cavaquinho:[
    "D","G","B","D"
  ]

};


// ===============================
// ELEMENTOS
// ===============================

const keySelect =
  document.getElementById("keySelect");

const scaleSelect =
  document.getElementById("scaleSelect");

const instrumentSelect =
  document.getElementById("instrumentSelect");

const fretCountInput =
  document.getElementById("fretCount");

const fretValue =
  document.getElementById("fretValue");

const fretboard =
  document.getElementById("fretboard");

const invertStringsBtn =
  document.getElementById("invertStringsBtn");


// ===============================
// ESTADO
// ===============================

let invertStrings = false;


// ===============================
// POPULAR SELECTS
// ===============================

NOTES.forEach(note => {

  const option =
    document.createElement("option");

  option.value = note;
  option.textContent = note;

  keySelect.appendChild(option);

});

Object.keys(SCALES).forEach(scale => {

  const option =
    document.createElement("option");

  option.value = scale;
  option.textContent = scale;

  scaleSelect.appendChild(option);

});

keySelect.value = "C";
scaleSelect.value = "Maior";


// ===============================
// GERAR ESCALA
// ===============================

function generateScale(root, intervals){

  const rootIndex =
    NOTES.indexOf(root);

  return intervals.map(interval => {

    return NOTES[
      (rootIndex + interval) % 12
    ];

  });

}


// ===============================
// DESENHAR BRAÇO
// ===============================

function drawFretboard(){

  const root =
    keySelect.value;

  const scaleName =
    scaleSelect.value;

  const frets =
    parseInt(fretCountInput.value);

  fretValue.textContent = frets;

  let tuning = [
    ...TUNINGS[instrumentSelect.value]
  ];

  if(invertStrings){

    tuning.reverse();

  }

  const scaleNotes =
    generateScale(
      root,
      SCALES[scaleName]
    );

  const strings =
    tuning.length;

  // ===============================
  // DIMENSÕES
  // ===============================

  const fretWidth = 82;

  const stringGap = 70;

  const openArea = 55;

  const nutX = 95;

  const width =
    nutX +
    frets * fretWidth +
    120;

  const height =
    strings * stringGap + 90;

  fretboard.setAttribute(
    "viewBox",
    `0 0 ${width} ${height}`
  );

  fretboard.innerHTML = "";

  // ===============================
  // DEFS
  // ===============================

  const defs =
    document.createElementNS(
      "http://www.w3.org/2000/svg",
      "defs"
    );

  defs.innerHTML = `

    <linearGradient id="wood"
      x1="0%"
      y1="0%"
      x2="100%"
      y2="0%">

      <stop offset="0%"
        stop-color="#2a1b14"/>

      <stop offset="50%"
        stop-color="#160d09"/>

      <stop offset="100%"
        stop-color="#2a1b14"/>

    </linearGradient>

    <filter id="glow">

      <feGaussianBlur
        stdDeviation="4"
        result="blur"/>

      <feMerge>

        <feMergeNode in="blur"/>

        <feMergeNode
          in="SourceGraphic"/>

      </feMerge>

    </filter>

  `;

  fretboard.appendChild(defs);

  // ===============================
  // BRAÇO
  // ===============================

  const neck =
    document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );

  neck.setAttribute("x",nutX);

  neck.setAttribute("y",35);

  neck.setAttribute(
    "width",
    width - nutX - 40
  );

  neck.setAttribute(
    "height",
    height - 70
  );

  neck.setAttribute("rx",22);

  neck.setAttribute(
    "fill",
    "url(#wood)"
  );

  fretboard.appendChild(neck);

  // ===============================
  // PESTANA
  // ===============================

  const nut =
    document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );

  nut.setAttribute(
    "x",
    nutX - 6
  );

  nut.setAttribute("y",35);

  nut.setAttribute("width",10);

  nut.setAttribute(
    "height",
    height - 70
  );

  nut.setAttribute(
    "fill",
    "#f3f4f6"
  );

  fretboard.appendChild(nut);

  // ===============================
  // TRASTES
  // ===============================

  for(let fret = 1; fret <= frets; fret++){

    const x =
      nutX +
      fret * fretWidth;

    const fretLine =
      document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );

    fretLine.setAttribute("x1",x);

    fretLine.setAttribute("y1",35);

    fretLine.setAttribute("x2",x);

    fretLine.setAttribute(
      "y2",
      height - 35
    );

    fretLine.setAttribute(
      "stroke",
      "#bdbdbd"
    );

    fretLine.setAttribute(
      "stroke-width",
      "4"
    );

    fretboard.appendChild(fretLine);

  }

  // ===============================
  // CORDAS
  // ===============================

  tuning.forEach((stringNote,index)=>{

    const y =
      70 + index * stringGap;

    const string =
      document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );

    string.setAttribute(
      "x1",
      openArea
    );

    string.setAttribute("y1",y);

    string.setAttribute(
      "x2",
      width - 40
    );

    string.setAttribute("y2",y);

    string.setAttribute(
      "stroke",
      "#d8d8d8"
    );

    let thickness;

    if(invertStrings){

      thickness =
        1 + (index + 1) * 0.7;

    } else {

      thickness =
        1 + (strings - index) * 0.7;

    }

    string.setAttribute(
      "stroke-width",
      thickness
    );

    fretboard.appendChild(string);

  });

  // ===============================
  // MARCADORES
  // ===============================

  const inlays = [
    3,5,7,9,12,
    15,17,19,21,24
  ];

  inlays.forEach(fret => {

    if(fret > frets) return;

    const x =
      nutX +
      (fret - 0.5) *
      fretWidth;

    if(fret === 12 || fret === 24){

      [0.38,0.62].forEach(pos => {

        const dot =
          document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );

        dot.setAttribute("cx",x);

        dot.setAttribute(
          "cy",
          height * pos
        );

        dot.setAttribute("r",7);

        dot.setAttribute(
          "fill",
          "rgba(255,255,255,.22)"
        );

        fretboard.appendChild(dot);

      });

    } else {

      const dot =
        document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );

      dot.setAttribute("cx",x);

      dot.setAttribute(
        "cy",
        height / 2
      );

      dot.setAttribute("r",7);

      dot.setAttribute(
        "fill",
        "rgba(255,255,255,.16)"
      );

      fretboard.appendChild(dot);

    }

  });

  // ===============================
  // NOTAS
  // ===============================

  tuning.forEach((openNote,stringIndex)=>{

    const openIndex =
      NOTES.indexOf(openNote);

    for(let fret = 0; fret <= frets; fret++){

      const note =
        NOTES[
          (openIndex + fret) % 12
        ];

      if(scaleNotes.includes(note)){

        const x =
          fret === 0
          ? openArea - 8
          : nutX +
            (fret - 1) *
            fretWidth +
            fretWidth / 2;

        const y =
          70 +
          stringIndex *
          stringGap;

        const isRoot =
          note === root;

        // GLOW

        const glow =
          document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );

        glow.setAttribute("cx",x);

        glow.setAttribute("cy",y);

        glow.setAttribute(
          "r",
          isRoot ? 23 : 20
        );

        glow.setAttribute(
          "fill",
          isRoot
          ? "rgba(6,182,212,.22)"
          : "rgba(139,92,246,.18)"
        );

        glow.setAttribute(
          "filter",
          "url(#glow)"
        );

        fretboard.appendChild(glow);

        // CÍRCULO

        const circle =
          document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );

        circle.setAttribute("cx",x);

        circle.setAttribute("cy",y);

        circle.setAttribute(
          "r",
          isRoot ? 20 : 17
        );

        circle.setAttribute(
          "fill",
          isRoot
          ? "#06b6d4"
          : "#8b5cf6"
        );

        circle.setAttribute(
          "stroke",
          isRoot
          ? "#67e8f9"
          : "#c4b5fd"
        );

        circle.setAttribute(
          "stroke-width",
          "2"
        );

        circle.classList.add("note");

        fretboard.appendChild(circle);

        // TEXTO

        const text =
          document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
          );

        text.setAttribute("x",x);

        text.setAttribute(
          "y",
          y + 5
        );

        text.setAttribute(
          "text-anchor",
          "middle"
        );

        text.setAttribute(
          "fill",
          "#ffffff"
        );

        text.setAttribute(
          "font-size",
          "14"
        );

        text.setAttribute(
          "font-weight",
          "700"
        );

        text.textContent = note;

        fretboard.appendChild(text);

      }

    }

  });

}


// ===============================
// EVENTOS
// ===============================

[
  keySelect,
  scaleSelect,
  instrumentSelect,
  fretCountInput
].forEach(element => {

  element.addEventListener(
    "input",
    drawFretboard
  );

});

invertStringsBtn.addEventListener(
  "click",
  () => {

    invertStrings =
      !invertStrings;

    drawFretboard();

  }
);


// ===============================
// INIT
// ===============================

drawFretboard();