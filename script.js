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
    ["u","s"].includes(e.key.toLowerCase()))
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
// INFORMAÇÕES DAS ESCALAS
// ===============================

const SCALE_INFO = {

  "Maior":{

    description:
      "A escala maior é a base da música ocidental e possui sonoridade brilhante e estável.",

    formula:
      "1 2 3 4 5 6 7",

    application:
      "Usada em harmonias tradicionais, pop, rock, jazz e música clássica.",

    chords:
      "Maj7, 6, add9, triades maiores",

    styles:
      "Pop, Rock, Gospel, Fusion",

    players:
      "Eric Clapton, John Mayer, Steve Vai"

  },

  "Menor Natural":{

    description:
      "Escala com sonoridade melancólica e emocional.",

    formula:
      "1 2 b3 4 5 b6 b7",

    application:
      "Muito usada em solos emocionais e progressões menores.",

    chords:
      "m7, m9, m11",

    styles:
      "Rock, Metal, Blues, Pop",

    players:
      "David Gilmour, Slash, Santana"

  },

  "Pentatônica Menor":{

    description:
      "Escala simples e extremamente musical usada amplamente em solos.",

    formula:
      "1 b3 4 5 b7",

    application:
      "Ideal para improvisação e frases rápidas.",

    chords:
      "m7, power chords",

    styles:
      "Blues, Rock, Metal",

    players:
      "Jimi Hendrix, Slash, BB King"

  },

  "Menor Melódica":{

    description:
      "Escala sofisticada muito usada no jazz moderno.",

    formula:
      "1 2 b3 4 5 6 7",

    application:
      "Usada sobre acordes alterados e improvisação avançada.",

    chords:
      "mMaj7, alt, m6",

    styles:
      "Jazz Fusion, Progressive",

    players:
      "Allan Holdsworth, Frank Gambale"

  },

  "Menor Harmônica":{

    description:
      "Escala com sonoridade exótica e tensão clássica.",

    formula:
      "1 2 b3 4 5 b6 7",

    application:
      "Muito usada em metal neoclássico.",

    chords:
      "mMaj7, dim7",

    styles:
      "Metal, Música Clássica",

    players:
      "Yngwie Malmsteen, Jason Becker"

  },

  "Dom Dim":{

    description:
      "Escala dominante diminuta usada para tensão e resolução.",

    formula:
      "1 b2 b3 3 b5 5 6 b7",

    application:
      "Usada sobre acordes dominantes alterados.",

    chords:
      "7alt, 13b9",

    styles:
      "Jazz, Fusion",

    players:
      "Scott Henderson, Gambale"

  },

  "Jônio":{

    description:
      "Modo equivalente à escala maior.",

    formula:
      "1 2 3 4 5 6 7",

    application:
      "Usado em progressões maiores estáveis.",

    chords:
      "Maj7",

    styles:
      "Pop, Rock, Fusion",

    players:
      "Steve Lukather"

  },

  "Dórico":{

    description:
      "Modo menor com sexta maior muito usado no jazz e funk.",

    formula:
      "1 2 b3 4 5 6 b7",

    application:
      "Excelente para grooves menores.",

    chords:
      "m7, m9, m11",

    styles:
      "Jazz, Funk, Fusion",

    players:
      "Carlos Santana, John Frusciante"

  },

  "Frígio":{

    description:
      "Modo menor com segunda menor de sonoridade espanhola.",

    formula:
      "1 b2 b3 4 5 b6 b7",

    application:
      "Muito usado em riffs pesados.",

    chords:
      "sus(b9), m7",

    styles:
      "Metal, Flamenco",

    players:
      "Kirk Hammett, Marty Friedman"

  },

  "Lídio":{

    description:
      "Modo maior com quarta aumentada e sensação flutuante.",

    formula:
      "1 2 3 #4 5 6 7",

    application:
      "Muito usado em fusion e trilhas.",

    chords:
      "Maj7#11",

    styles:
      "Fusion, Soundtrack",

    players:
      "Joe Satriani, Vai"

  },

  "Mixolídio":{

    description:
      "Modo dominante com sétima menor.",

    formula:
      "1 2 3 4 5 6 b7",

    application:
      "Excelente sobre acordes dominantes.",

    chords:
      "7, 9, 13",

    styles:
      "Blues, Rock, Country",

    players:
      "SRV, Eric Johnson"

  },

  "Eólio":{

    description:
      "Modo equivalente à escala menor natural.",

    formula:
      "1 2 b3 4 5 b6 b7",

    application:
      "Muito usado em progressões menores.",

    chords:
      "m7",

    styles:
      "Rock, Metal",

    players:
      "Zakk Wylde"

  },

  "Lócrio":{

    description:
      "Modo instável com quinta diminuta.",

    formula:
      "1 b2 b3 4 b5 b6 b7",

    application:
      "Usado em acordes meio diminutos.",

    chords:
      "m7b5",

    styles:
      "Jazz Experimental",

    players:
      "John Scofield"

  }

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
// INFO ESCALA
// ===============================

  const info =
    SCALE_INFO[scaleName];

  document.getElementById(
    "scaleTitle"
  ).textContent =
    scaleName;

  document.getElementById(
    "scaleDescription"
  ).textContent =
    info.description;

  document.getElementById(
    "scaleFormula"
  ).textContent =
    info.formula;

  document.getElementById(
    "scaleApplication"
  ).textContent =
    info.application;

  document.getElementById(
    "scaleChords"
  ).textContent =
    info.chords;

  document.getElementById(
    "scaleStyles"
  ).textContent =
    info.styles;

  document.getElementById(
    "scalePlayers"
  ).textContent =
    info.players;

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