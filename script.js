.container{
    position:fixed;
    inset:0;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding:20px;
}
const inputs = document.querySelectorAll(".code-box input");
const button = document.getElementById("nextBtn");

button.disabled = true;

inputs.forEach((input, index) => {

  input.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");

    if (e.target.value && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }

    checkCode();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !input.value && index > 0) {
      inputs[index - 1].focus();
    }
  });

});

function checkCode() {
  const complete = [...inputs].every(input => input.value !== "");

  button.disabled = !complete;

  if (complete) {
    button.style.background = "#16a34a";
  } else {
    button.style.background = "#cfcfcf";
  }
}

button.addEventListener("click", () => {
  alert("تم إدخال الكود بنجاح");
});
