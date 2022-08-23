const detectedUrl = (str) => {
  // var regexp =
  //   /(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/gi;
  // var matches_array = str.match(regexp);
  // for (var i = 0; i < matches_array?.length; i++) {
  //   document
  //     .getElementById("result")
  //     ?.append(
  //       '<p><a href="http://' +
  //         matches_array[i] +
  //         '" title="' +
  //         matches_array[i] +
  //         '">' +
  //         matches_array[i] +
  //         "</a></p>"
  //     );
  // }
  const regexUrl =
    /((?:http(s)?:\/\/)?(?:www(\d)?\.)?([\w\-]+\.\w{2,})\/?((?:\?(?:[\w\-]+(?:=[\w\-]+)?)?(?:&[\w\-]+(?:=[\w\-]+)?)?))?(#(?:[^\s]+)?)?)/g;

  return str.replaceAll(regexUrl, '<a href="http$2://www$3.$4$5$6">$1</a>');
};

export { detectedUrl };
