const detectedLineBreak = (str) => {
  return str.replaceAll(/[\n|\n\r]/g, "</br>");
};

export { detectedLineBreak };
