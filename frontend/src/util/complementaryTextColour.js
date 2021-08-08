// Given a colour, find the corresponding text colour
export default function getComplementaryTextColour(colour) {
  let result = { bgColour: '', textColour: '' };
  let index = -1;
  if (
    !isNaN(colour[0][2]) &&
    colour[0][0] + colour[0][1] + colour[0][2] !== 0
  ) {
    index = 0;
  } else if (
    !isNaN(colour[1][2]) &&
    colour[1][0] + colour[1][1] + colour[1][2] !== 0
  ) {
    index = 1;
  }
  if (index !== -1) {
    result[
      'bgColour'
    ] = `rgb(${colour[index][0]}, ${colour[index][1]}, ${colour[index][2]})`;
    result['textColour'] =
      colour[index][0] * 0.299 +
        colour[index][1] * 0.587 +
        colour[index][2] * 0.114 >
      186
        ? 'black'
        : 'white';
  } else {
    result['bgColour'] = 'black';
    result['textColour'] = 'white';
  }
  return result;
}

/* -------------------------
// Given a colour, find the corresponding text colour
export default function getComplementaryTextColour(colour) {
  // console.log(colour);
  return colour;
  // let baseRGB = colour.replace(' ', '');
  // let parsedRGB = baseRGB.substring(4, baseRGB.length - 2);
  // let RGBParts = parsedRGB.split(',');

  // const brightness = Math.round(
  //   (parseInt(RGBParts[0]) * 299 +
  //     parseInt(RGBParts[1]) * 587 +
  //     parseInt(RGBParts[2]) * 114) /
  //     1000
  // );
  // return brightness > 125 ? 'black' : 'white';
}

*/
