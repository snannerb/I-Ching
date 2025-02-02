// Hexagram data (storing names and interpretations)
const hexagramData = [
  { name: "The Creative", interpretation: "Represents strong, creative energy and success." },
  { name: "The Receptive", interpretation: "Symbolizes receptivity, nurturing, and adaptability." },
  { name: "Difficulty at the Beginning", interpretation: "Indicates initial challenges and perseverance." },
  { name: "Youthful Folly", interpretation: "Suggests inexperience and the need for caution." },
  { name: "Waiting", interpretation: "Encourages patience and timing." },
  { name: "Conflict", interpretation: "Warns of disputes and the need for resolution." },
  { name: "The Army", interpretation: "Symbolizes discipline and collective effort." },
  { name: "Holding Together", interpretation: "Emphasizes unity and collaboration." },
  // Add all 64 hexagrams with their interpretations
];

// Coin throw simulation
function throwCoins() {
  return Math.floor(Math.random() * 2); // 0 = tails, 1 = heads
}

// Map coin throws to hexagram lines
function generateLine() {
  const throws = [throwCoins(), throwCoins(), throwCoins()];
  const sum = throws.reduce((acc, val) => acc + val, 0);
  // 0 or 3 tails: changing yin, 1 tail: yang, 2 tails: yin
  if (sum === 0 || sum === 3) return [true, "-- -- (changing)"]; // Changing yin
  if (sum === 1) return [false, "————"]; // Yang
  return [false, "-- --"]; // Yin
}

// Generate hexagram (6 lines)
function generateHexagram() {
  const hexagram = [];
  let hasChangingLines = false;
  for (let i = 0; i < 6; i++) {
  const [isChanging, line] = generateLine();
  hexagram.unshift(line); // Add lines from bottom to top
    if (isChanging) hasChangingLines = true;
  }
  return { hexagram, hasChangingLines };
}

// Convert hexagram to binary representation
function hexagramToBinary(hexagram) {
  return hexagram.map(line => line.includes("————") ? 1 : 0).join('');
}

// Find hexagram index in hexagramData
function findHexagramIndex(hexagram) {
  const binary = hexagramToBinary(hexagram);
  return parseInt(binary, 2) % hexagramData.length;
}

// Display hexagram
function displayHexagram(hexagram) {
  const hexagramDisplay = hexagram.join("\n");
  document.getElementById("hexagram").textContent = hexagramDisplay;
}

// Display interpretation
function displayInterpretation(hexagramIndex) {
  const { name, interpretation } = hexagramData[hexagramIndex];
  document.getElementById("interpretation").innerHTML = `
    <strong>Hexagram Name:</strong> ${name}<br>
    <strong>Interpretation:</strong> ${interpretation}
  `;
}

// Main function
function performDivination() {
  const { hexagram, hasChangingLines } = generateHexagram();
  displayHexagram(hexagram);
  const hexagramIndex = findHexagramIndex(hexagram);
  displayInterpretation(hexagramIndex);
  if (hasChangingLines) {
    document.getElementById("changing-lines").textContent = "There are changing lines. Consider the second hexagram.";
  } else {
    document.getElementById("changing-lines").textContent = "No changing lines.";
  }
}

// Event listener for button
document.getElementById("throw-coins").addEventListener("click", performDivination);