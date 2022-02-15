let colorInput = document.querySelector("#colorpicker");

function checkedId() {
  return document.querySelector('input[name="radio"]:checked').id;
}

function showHarmony() {
  let harmony = checkedId();
  switch (harmony) {
    case "analogous":
      console.log("hey");
      break;
    default:
      console.log("something else");
      break;
  }
}

function doAnalogous(hexColor) {
  let color = hexToHsl(hexColor);
}

function getColor(colorpicker) {
  return colorpicker.value;
}

function display(container, color) {
  container.textContent = color;
}

function displayColor(container, rgbColorString) {
  container.style.backgroundColor = `rgb(${rgbColorString})`;
}

function displayValues() {
  let colorHex = getColor(colorInput);
  let colorRgb = hexToRgb(colorHex);
  let colorHsl = hexToHsl(colorHex);
  display(document.querySelector("#resultBox>.hex"), colorHex);
  display(document.querySelector("#resultBox>.rgb"), colorRgb);
  display(document.querySelector("#resultBox>.hsl"), colorHsl);
  displayColor(document.querySelector("#resultBox>.box"), colorRgb);
}

//HEX to RGB
function hexToRgb(hexstring) {
  let red = lettersToNumbers(hexstring.charAt(1)) * 16 + lettersToNumbers(hexstring.charAt(2));
  let green = lettersToNumbers(hexstring.charAt(3)) * 16 + lettersToNumbers(hexstring.charAt(4));
  let blue = lettersToNumbers(hexstring.charAt(5)) * 16 + lettersToNumbers(hexstring.charAt(6));
  return red + ", " + green + ", " + blue;
}

function lettersToNumbers(character) {
  let number = character.toUpperCase().charCodeAt(0);
  if (number > 64) {
    return number - 55;
  } else return Number(character);
}

function rgbToHsl(rgbString) {
  let stringArray = rgbString.split(", ");
  let r = stringArray[0];
  let g = stringArray[1];
  let b = stringArray[2];

  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  return h.toFixed() + "%, " + s.toFixed() + "%, " + l.toFixed() + "%";
}

function hexToHsl(hexColor) {
  return rgbToHsl(hexToRgb(hexColor));
}
