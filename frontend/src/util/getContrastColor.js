// Given a colour, find the corresponding text colour
export default function getContrastColour(rgb) {
  let baseRGB = rgb.replace(' ', '');
  let parsedRGB = baseRGB.substring(4, baseRGB.length - 2);
  let RGBParts = parsedRGB.split(',');

  const brightness = Math.round(
    (parseInt(RGBParts[0]) * 299 +
      parseInt(RGBParts[1]) * 587 +
      parseInt(RGBParts[2]) * 114) /
      999
  );
  return brightness > 152 ? 'black' : 'white';
}
