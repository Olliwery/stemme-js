let votes = { "PartyA": 0, "PartyB": 0, "PartyC": 0, "PartyD": 0, "PartyE": 0 };
let partyColors = {
    "PartyA": "#1E90FF", // Blå
    "PartyB": "#8B0000", // Mørkerød
    "PartyC": "#006400", // Mørkegrønn
    "PartyD": "#00FF00", // Lysegrønn
    "PartyE": "#FF0000",  // Lyserød
};

// Funksjon for å stemme på et parti
function voteForParty(party) {
    votes[party]++;
    updateChart();
    localStorage.setItem(party, votes[party]);
    console.log(localStorage.getItem(party));
}

// Funksjon for å oppdatere diagrammet
function updateChart() {
    const data = Object.entries(votes);

    // Clear existing chart before updating
    const chartContainer = document.getElementById("chartContainer");
    chartContainer.innerHTML = "";

    // Create a new chart
    const canvas = document.createElement("canvas");
    canvas.width = 525;
    canvas.height = 200;
    chartContainer.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    // Draw a bar chart with text labels
    const barWidth = 80;
    const spacing = 30;
    let startX = 10;

    for (let i = 0; i < data.length; i++) {
        const [party, voteCount] = data[i];
        const barHeight = voteCount * 10;

        // Hent farge fra lokal lagring eller bruk standardfarge
        const partyColor = partyColors[party] || getRandomColor();

        // Draw the bar
        ctx.fillStyle = partyColor;
        ctx.fillRect(startX, canvas.height - barHeight, barWidth, barHeight);

        // Draw the vote count label above the bar
        ctx.fillStyle = "#000";
        ctx.font = "12px Arial";
        ctx.fillText(voteCount, startX + barWidth / 2 - 5, canvas.height - barHeight - 10);

        startX += barWidth + spacing;
    }
}

// Funksjon for å generere tilfeldig farge
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Initial oppdatering av diagrammet
updateChart();
