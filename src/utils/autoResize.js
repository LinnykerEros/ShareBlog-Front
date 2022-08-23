function autoResize(id) {
  let objTextArea = document.getElementById(id);
  while (objTextArea?.scrollHeight > objTextArea?.offsetHeight) {
    objTextArea.rows += 1;
  }
  while (objTextArea?.scrollHeight < objTextArea?.offsetHeight) {
    objTextArea.rows -= 1;
  }
}

export { autoResize };
