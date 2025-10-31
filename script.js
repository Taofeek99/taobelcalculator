function appendValue(val) {
  document.getElementById("display").value += val;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function calculate() {
  let expression = document.getElementById("display").value;

  expression = expression.replace(/sin\(/g, "Math.sin(");
  expression = expression.replace(/cos\(/g, "Math.cos(");
  expression = expression.replace(/tan\(/g, "Math.tan(");
  expression = expression.replace(/log\(/g, "Math.log10(");
  expression = expression.replace(/ln\(/g, "Math.log(");
  expression = expression.replace(/√\(/g, "Math.sqrt(");
  expression = expression.replace(/\^/g, "**");

  try {
    const result = eval(expression);
    document.getElementById("display").value = result;
    speak("The answer is " + result);
  } catch {
    document.getElementById("display").value = "Error";
    speak("There was an error in your calculation.");
  }
}

function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }
}

function startListening() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Sorry, your browser doesn't support voice input.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.continuous = false;

  recognition.onstart = () => {
    document.getElementById("mic").classList.add("listening");
    speak("Listening...");
  };

  recognition.onresult = (event) => {
    const voiceText = event.results[0][0].transcript;
    document.getElementById("display").value = voiceText;
    speak("Calculating...");
    setTimeout(() => calculate(), 500);
  };

  recognition.onerror = (event) => {
    alert("Voice recognition error: " + event.error);
    speak("Sorry, I did not catch that. Please try again.");
  };

  recognition.onend = () => {
    document.getElementById("mic").classList.remove("listening");
  };

  recognition.start();
}

document.getElementById("mic").addEventListener("click", startListening);
