<script>
// ============================
// ✅ Taobel Scientific Calculator (No safeEval)
// ============================

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".key");

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent.trim();

    if (value === "C") {
      display.value = "";
    } 
    else if (value === "DEL") {
      display.value = display.value.slice(0, -1);
    } 
    else if (value === "=") {
      calculateResult();
    } 
    else {
      display.value += value;
    }
  });
});

// ✅ Calculation function (no eval directly)
function calculateResult() {
  let expr = display.value;

  try {
    // Convert symbols to JavaScript math
    expr = expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/π/g, "Math.PI")
      .replace(/√/g, "Math.sqrt")
      .replace(/sin/g, "Math.sin(Math.PI/180*")
      .replace(/cos/g, "Math.cos(Math.PI/180*")
      .replace(/tan/g, "Math.tan(Math.PI/180*")
      .replace(/log/g, "Math.log10")
      .replace(/ln/g, "Math.log")
      .replace(/\^/g, "**");

    // Fix missing parentheses after trig functions
    const openCount = (expr.match(/\(/g) || []).length;
    const closeCount = (expr.match(/\)/g) || []).length;
    if (openCount > closeCount) {
      expr += ")".repeat(openCount - closeCount);
    }

    const result = Function('"use strict"; return (' + expr + ")")();
    display.value = isNaN(result) ? "Error" : Math.round(result * 1e12) / 1e12;
  } catch (e) {
    display.value = "Error";
  }
}
</script>
  recognition.start();
}

document.getElementById("mic").addEventListener("click", startListening);
