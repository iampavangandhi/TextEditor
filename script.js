import { Stack } from "./stack.js";

//Prevent the user to do cut, copy and paste
document.onkeydown = function (event) {
  if (event.ctrlKey || event.metaKey) {
    event.preventDefault();
  }
};

onload = function () {
  // Get reference to elements
  const textbox = document.getElementById("comment");
  const undo = document.getElementById("undo");
  const clear = document.getElementById("clear");
  const temptext = document.getElementById("temptext");

  textbox.value = "";
  let text = "";
  let stack = new Stack();

  //TODO Implement it without using the below method
  //Prevent the cursor to move
  textbox.onclick = function () {
    textbox.selectionStart = textbox.selectionEnd = textbox.value.length;
  };

  clear.onclick = function () {
    stack.clear();
    text = "";
    textbox.value = "";
    temptext.innerHTML = "Sequence of operations will be shown here !";
  };

  textbox.oninput = function (event) {
    switch (event.inputType) {
      case "insertText":
        stack.push(0, event.data); //0 is insert operation
        break;
      case "deleteContentBackward":
        stack.push(1, text[text.length - 1]); //1 is delete operation
        break;
    }

    temptext.innerHTML =
      "On stack " + stack.top() + "<br>" + temptext.innerHTML;
    text = textbox.value;
  };

  undo.onclick = function () {
    let operation = stack.pop();
    if (operation[0] !== -1) {
      temptext.innerHTML = "Performing undo operation<br>" + temptext.innerHTML;
      if (operation[0] === 0) {
        let len = operation[1].length;
        textbox.value = textbox.value.substring(0, textbox.value.length - len);
      } else {
        textbox.value += operation[1];
      }
      text = textbox.value;
    }
  };
};
