// Given a colour, find the corresponding text colour
export default function getContrastColour(rbg) {
  let baseRGB = rbg.replace(' ', '');
  let parsedRGB = baseRGB.substring(4, baseRGB.length - 2);
  let RGBParts = parsedRGB.split(',');

  const brightness = Math.round(
    (parseInt(RGBParts[0]) * 299 +
      parseInt(RGBParts[1]) * 587 +
      parseInt(RGBParts[2]) * 114) /
      1000
  );
  return brightness > 125 ? 'black' : 'white';
}
