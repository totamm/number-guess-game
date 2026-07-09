let $ = document;
let resultRandomNumber;
let userInputFromValue;
let userInputToValue;
let chance;

let userInputFrom = $.getElementById("from");
let userInputTo = $.getElementById("to");
let numberBox = $.getElementById("number_box");
let checkButton = $.getElementById("check_button");
let guideReport = $.getElementById("guide_report");
let startButten = $.getElementById("game_start_button");
let gameReportMassage = $.getElementById("game_report_message");
let inputUserGesses = $.querySelector("#playing_area input");
let currentScore = $.querySelector("#current_score").children[1];
let resetButton = $.getElementById("reset_button");
let toastContainer = $.getElementById("toast_container");
let gameNumberReportBox = $.getElementById("game_number_report_box");
let highestScore = $.querySelector("#highest_score").children[1];
let disabled = (checkButton.disabled = true);

function startBox() {
  disabled = checkButton.disabled = false;

  userInputFromValue = +userInputFrom.value;
  userInputToValue = +userInputTo.value;
  if (
    userInputFromValue > userInputToValue ||
    userInputTo.value === "" ||
    userInputFrom.value === "" ||
    userInputFromValue < 0 ||
    userInputToValue < 0
  ) {
    showToast("لطفا بازه ی اعداد را به درستی در ورودی ها وارد کنید");
    return;
  } else {
    resultRandomNumber =
      Math.floor(Math.random() * (userInputToValue - userInputFromValue + 1)) +
      userInputFromValue;

    calculateChance();
    currentScore.innerHTML = chance;
    showToast("بازی شروع شد");
  }
}
function checkBox() {
  let userGesses = +inputUserGesses.value;

  if (inputUserGesses.value === "") {
    showToast("لطفاً یک عدد معتبر حدس بزن.");
    return;
  }
  chance--;
  currentScore.innerHTML = chance;
  console.log(chance);

  if (userGesses > resultRandomNumber) {
    guideReport.innerHTML = "عدد حدس زده شده بزرگ است";
  } else if (userGesses < resultRandomNumber) {
    guideReport.innerHTML = "عدد حدس زده شده کوچک است";
  } else {
    guideReport.innerHTML = " تو بردی";
    guideReport.style.color = "green";
    gameReportMassage.innerHTML = "تو بردی";
    gameReportMassage.style.color = "green";
    numberBox.innerHTML = resultRandomNumber;
    numberBox.style.color = "white";
    numberBox.style.backgroundColor = "green";
    highestScore.innerHTML = chance;
    showToast("بازی را بردید، برای بازی مجدد روی دکمه‌ی بازی مجدد کلیک بکنید");
  }

  if (chance === 0 && userGesses !== resultRandomNumber) {
    guideReport.innerHTML = "متاسفانه امتیازها تمام شد";
    guideReport.style.color = "red";
    gameReportMassage.innerHTML = "متاسفانه امتیازها تمام شد";
    gameReportMassage.style.color = "red";
    numberBox.style.backgroundColor = "red";

    showToast(
      "بازی را باختید، برای بازی مجدد روی دکمه‌ی بازی مجدد کلیک بکنید.",
    );
  }
}

function resetBox() {
  resultRandomNumber = undefined;
  chance = 0;

  userInputTo.value = "";
  userInputFrom.value = "";
  inputUserGesses.value = "";

  currentScore.innerHTML = 0;
  numberBox.innerHTML = "?";
  guideReport.innerHTML = "...";
  guideReport.style.color = "white";
  gameReportMassage.innerHTML = "عدد را حدس بزن ";
  gameReportMassage.style.color = "#f0f0f5";
  numberBox.style.backgroundColor = "#f9c846";
}

function calculateChance() {
  chance = Math.floor(Math.log2(userInputToValue - userInputFromValue + 1)) + 1;
}

function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}
startButten.addEventListener("click", startBox);
checkButton.addEventListener("click", checkBox);
resetButton.addEventListener("click", resetBox);
