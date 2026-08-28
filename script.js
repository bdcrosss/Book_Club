const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const names = [
    "Brice",
    "Reese",
    "Hannah",
    "Melodi",
    "Emily",
    "Olivia"
];

const colors = [
    "#E8CFC7",
    "#F1DFC9",
    "#D9DDD0",
    "#E4D8E7",
    "#D5E0E3",
    "#EAD9C8"
];

const numberOfSections = names.length;
const degreesPerSection = 360 / numberOfSections;

let currentRotation = 0;
let spinning = false;


// ==========================================
// DRAW THE WHEEL
// ==========================================

function drawWheel() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;

    for (let i = 0; i < numberOfSections; i++) {

        const startAngle =
            (i * degreesPerSection - 90) * Math.PI / 180;

        const endAngle =
            ((i + 1) * degreesPerSection - 90) * Math.PI / 180;


        // Section
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);

        ctx.arc(
            centerX,
            centerY,
            radius,
            startAngle,
            endAngle
        );

        ctx.closePath();

        ctx.fillStyle = colors[i];
        ctx.fill();

        ctx.strokeStyle = "#FFFDF9";
        ctx.lineWidth = 3;
        ctx.stroke();


        // Name
        const textAngle =
            (i * degreesPerSection +
                degreesPerSection / 2 - 90) *
            Math.PI / 180;

        const textX =
            centerX + Math.cos(textAngle) * (radius * 0.68);

        const textY =
            centerY + Math.sin(textAngle) * (radius * 0.68);


        ctx.save();

        ctx.translate(textX, textY);

        ctx.fillStyle = "#493D3A";
        ctx.font = "bold 18px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(names[i], 0, 0);

        ctx.restore();
    }


    // Center circle
    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        35,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#FFFDF9";
    ctx.fill();

    ctx.strokeStyle = "#EADFD8";
    ctx.lineWidth = 3;
    ctx.stroke();
}


// ==========================================
// SPIN THE WHEEL
// ==========================================

function spinWheel() {

    if (spinning) {
        return;
    }

    spinning = true;

    const button = document.getElementById("spinButton");
    const result = document.getElementById("result");

    button.disabled = true;
    button.textContent = "SPINNING...";
    result.textContent = "";


    // --------------------------------------
    // Pick the winner
    // --------------------------------------

    const winnerIndex = Math.floor(
        Math.random() * numberOfSections
    );


    // --------------------------------------
    // Pick a RANDOM POINT INSIDE that person's
    // section.
    //
    // We stay 10 degrees away from each edge
    // so it can NEVER land between names.
    // --------------------------------------

    const padding = 10;

    const minimumAngle =
        winnerIndex * degreesPerSection + padding;

    const maximumAngle =
        (winnerIndex + 1) * degreesPerSection - padding;

    const randomAngle =
        minimumAngle +
        Math.random() *
        (maximumAngle - minimumAngle);


    // --------------------------------------
    // The pointer is at the TOP (0 degrees).
    //
    // The selected point needs to rotate
    // to the top.
    // --------------------------------------

    const targetRotation =
        360 - randomAngle;


    // --------------------------------------
    // Figure out current position
    // --------------------------------------

    const currentPosition =
        currentRotation % 360;


    let rotationNeeded =
        targetRotation - currentPosition;


    // Always rotate forward
    if (rotationNeeded < 0) {
        rotationNeeded += 360;
    }


    // --------------------------------------
    // Add 5 complete spins
    // --------------------------------------

    const fullSpins = 360 * 5;

    currentRotation +=
        fullSpins + rotationNeeded;


    // --------------------------------------
    // Animate
    // --------------------------------------

    canvas.style.transition =
        "transform 4s cubic-bezier(0.15, 0.8, 0.25, 1)";

    canvas.style.transform =
        `rotate(${currentRotation}deg)`;


    // --------------------------------------
    // Show winner
    // --------------------------------------

    setTimeout(function () {

        result.textContent =
            `✨ ${names[winnerIndex]} is up next! ✨`;

        button.disabled = false;
        button.textContent = "SPIN AGAIN";

        spinning = false;

    }, 4100);
}


// ==========================================
// INITIALIZE
// ==========================================

drawWheel();

document
    .getElementById("spinButton")
    .addEventListener("click", spinWheel);