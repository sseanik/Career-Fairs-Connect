import { prominent } from 'color.js';

// Grab the most common colour from an image and determine the accompanying text colour
export default async function getDominantColour(image) {
  // console.log(image);

  // if () {

  // }

  const colour = await prominent(image, {
    amount: 2,
  });
  let index = -1;
  if (colour[0][0] + colour[0][1] + colour[0][2] !== 0) {
    index = 0;
  } else if (colour[1][0] + colour[1][1] + colour[1][2] !== 0) {
    index = 1;
  }
  return index !== -1
    ? `rgb(${colour[index][0]}, ${colour[index][1]}, ${colour[index][2]})`
    : 'black';
}
