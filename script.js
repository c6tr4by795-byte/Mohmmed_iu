const inputs = document.querySelectorAll(".code-box input");
const button = document.getElementById("nextBtn");

button.disabled = true;

inputs.forEach((input, index) => {

  input.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (!value) {
      checkCode();
      return;
    }

    e.target.value = value[0];

    if (index < inputs.length - 1) {
      inputs[index + 1].focus();
    }

    checkCode();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && input.value === "" && index > 0) {
      inputs[index - 1].focus();
    }
  });

});

function checkCode() {
  button.disabled = [...inputs].some(i => i.value === "");
}
