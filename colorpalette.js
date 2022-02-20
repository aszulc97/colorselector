let colorInput = document.querySelector("#colorpicker");

function checkedId() {
  return document.querySelector('input[name="radio"]:checked').id;
}

function showHarmony() {
  let colorHex = getColor(colorInput);
  let harmony = checkedId();
  switch (harmony) {
    case "analogous":
      analogousLoop(colorHex);
      break;
    case "monochromatic":
      monochromaticLoop(colorHex);
      break;
    case "triad":
      triadLoop(colorHex);
      break;
    case "complementary":
      complementaryLoop(colorHex);
      break;
    case "compound":
      compoundLoop(colorHex);
      break;
    default:
      console.log("something else");
      break;
  }
}

function doAnalogous(hexColor, step) {
  let color = hexToHsl(hexColor);
  let h = color.h - step;
  if (h < 0) {
    h = 360 + h;
  }
  if (h > 360) {
    h = h - 360;
  }
  let s = color.s;
  let l = color.l;
  return { h, s, l };
}

function analogousLoop(colorHex) {
  let step = -40;
  for (i = 1; i < 6; i++) {
    if (i === 3) {
      step += 20;
    } else {
      display(document.querySelector("#color" + i + ">.hsl"), doHslString(doAnalogous(colorHex, step)));
      display(document.querySelector("#color" + i + ">.rgb"), doRgbString(hslToRgb(doAnalogous(colorHex, step))));
      display(document.querySelector("#color" + i + ">.hex"), rgbToHex(hslToRgb(doAnalogous(colorHex, step))));
      displayColor(document.querySelector("#color" + i + ">.box"), rgbToCss(hslToRgb(doAnalogous(colorHex, step))));
      step += 15;
    }
  }
}

function doMonochromatic(hexColor, step, variable, operation) {
  let color = hexToHsl(hexColor);
  color.h = parseInt(color.h);
  color.s = parseInt(color.s);
  color.l = parseInt(color.l);
  let h = color.h;
  let s = color.s;
  let l = color.l;
  if (variable === "l") {
    if (operation === "more") {
      l = color.l + step;
    } else if (operation === "less") {
      l = color.l - step;
    }
    if (l < 0) {
      l = 100 + l;
    }
    if (l > 100) {
      l = l - 100;
    }
  } else if (variable === "s") {
    if (operation === "more") {
      s = color.s + step;
    } else if (operation === "less") {
      s = color.s - step;
    }
    if (s < 0) {
      s = 100 + s;
    }
    if (s > 100) {
      s = s - 100;
    }
  }
  return { h, s, l };
}

function monochromaticLoop(colorHex) {
  let step = 15;

  for (i = 1; i < 6; i++) {
    let operation = "";
    let variable = "";
    if (i === 3) {
    } else {
      if (i % 2) {
        operation = "more";
      } else {
        operation = "less";
      }
      if (i < 3) {
        variable = "s";
      } else {
        variable = "l";
      }
      display(document.querySelector("#color" + i + ">.hsl"), doHslString(doMonochromatic(colorHex, step, variable, operation)));
      display(
        document.querySelector("#color" + i + ">.rgb"),
        doRgbString(hslToRgb(doMonochromatic(colorHex, step, variable, operation)))
      );
      display(
        document.querySelector("#color" + i + ">.hex"),
        rgbToHex(hslToRgb(doMonochromatic(colorHex, step, variable, operation)))
      );
      displayColor(
        document.querySelector("#color" + i + ">.box"),
        rgbToCss(hslToRgb(doMonochromatic(colorHex, step, variable, operation)))
      );
    }
  }
}

function doTriad(hexColor, step, importance) {
  let color = hexToHsl(hexColor);
  color.h = parseInt(color.h);
  color.s = parseInt(color.s);
  color.l = parseInt(color.l);
  let h = color.h + step;
  let s = color.s;
  let l = color.l;
  if (importance === "low") {
    l = color.l + 10;
    if (l > 100) {
      l = l - 100;
    }
  }
  if (h < 0) {
    h = 360 + h;
  }
  if (h > 360) {
    h = h - 360;
  }
  return { h, s, l };
}

function triadLoop(colorHex) {
  let step = 120;

  for (i = 1; i < 6; i++) {
    let importance = "";
    if (i === 3) {
      step *= 2;
    } else {
      if (i % 2) {
        importance = "low";
      }
      display(document.querySelector("#color" + i + ">.hsl"), doHslString(doTriad(colorHex, step, importance)));
      display(document.querySelector("#color" + i + ">.rgb"), doRgbString(hslToRgb(doTriad(colorHex, step, importance))));
      display(document.querySelector("#color" + i + ">.hex"), rgbToHex(hslToRgb(doTriad(colorHex, step, importance))));
      displayColor(document.querySelector("#color" + i + ">.box"), rgbToCss(hslToRgb(doTriad(colorHex, step, importance))));
    }
  }
}

function doComplementary(hexColor, step, importance) {
  let color = hexToHsl(hexColor);
  color.h = parseInt(color.h);
  color.s = parseInt(color.s);
  color.l = parseInt(color.l);
  let h = color.h + step;
  let s = color.s;
  let l = color.l;
  if (importance === "low") {
    l = color.l + 10;
  } else if (importance === "lower") {
    l = color.l + 20;
  }
  if (l > 100) {
    l = l - 100;
  }
  if (h < 0) {
    h = 360 + h;
  }
  if (h > 360) {
    h = h - 360;
  }
  return { h, s, l };
}

function complementaryLoop(colorHex) {
  let step = 0;

  for (i = 1; i < 6; i++) {
    let importance = "";
    if (i === 3) {
      step = 180;
    } else {
      if (i === 1) {
        importance = "lower";
      } else if (i != 4) {
        importance = "low";
      }
      console.log(i, importance);
      display(document.querySelector("#color" + i + ">.hsl"), doHslString(doComplementary(colorHex, step, importance)));
      display(document.querySelector("#color" + i + ">.rgb"), doRgbString(hslToRgb(doComplementary(colorHex, step, importance))));
      display(document.querySelector("#color" + i + ">.hex"), rgbToHex(hslToRgb(doComplementary(colorHex, step, importance))));
      displayColor(
        document.querySelector("#color" + i + ">.box"),
        rgbToCss(hslToRgb(doComplementary(colorHex, step, importance)))
      );
    }
  }
}

//1st & 5th analog

function compoundLoop(colorHex) {
  let compStep = 0;
  let analogStep = -40;
  let step;
  for (i = 1; i < 6; i++) {
    let importance = "";
    if (i === 3) {
      compStep = 180;
      analogStep += 20;
    } else {
      if (i === 1 || i === 5) {
        step = analogStep;
      } else if (i != 4) {
        step = compStep;
        importance = "low";
      }
      console.log(i, importance);
      display(document.querySelector("#color" + i + ">.hsl"), doHslString(doComplementary(colorHex, step, importance)));
      display(document.querySelector("#color" + i + ">.rgb"), doRgbString(hslToRgb(doComplementary(colorHex, step, importance))));
      display(document.querySelector("#color" + i + ">.hex"), rgbToHex(hslToRgb(doComplementary(colorHex, step, importance))));
      displayColor(
        document.querySelector("#color" + i + ">.box"),
        rgbToCss(hslToRgb(doComplementary(colorHex, step, importance)))
      );
      analogStep += 15;
    }
  }
}

function getColor(colorpicker) {
  return colorpicker.value;
}

function display(container, color) {
  container.textContent = color;
}

function displayColor(container, rgbColorString) {
  container.style.backgroundColor = rgbColorString;
}

function displayUserColorValues() {
  let colorHex = getColor(colorInput);
  let colorRgb = hexToRgb(colorHex);
  let colorHsl = hexToHsl(colorHex);

  display(document.querySelector("#resultBox>.hex"), colorHex.toUpperCase());
  display(document.querySelector("#resultBox>.rgb"), doRgbString(colorRgb));
  display(document.querySelector("#resultBox>.hsl"), doHslString(colorHsl));
  displayColor(document.querySelector("#resultBox>.box"), rgbToCss(colorRgb));
}

function doHslString(hslObject) {
  return hslObject.h + "%, " + hslObject.s + "%, " + hslObject.l + "%";
}

function doRgbString(rgbObject) {
  return rgbObject.r + ", " + rgbObject.g + ", " + rgbObject.b;
}

//HEX to RGB
function hexToRgb(hexstring) {
  let r = lettersToNumbers(hexstring.charAt(1)) * 16 + lettersToNumbers(hexstring.charAt(2));
  let g = lettersToNumbers(hexstring.charAt(3)) * 16 + lettersToNumbers(hexstring.charAt(4));
  let b = lettersToNumbers(hexstring.charAt(5)) * 16 + lettersToNumbers(hexstring.charAt(6));
  return { r, g, b };
}

function lettersToNumbers(character) {
  let number = character.toUpperCase().charCodeAt(0);
  if (number > 64) {
    return number - 55;
  } else return Number(character);
}

function rgbToHsl(rgbObject) {
  let r = rgbObject.r;
  let g = rgbObject.g;
  let b = rgbObject.b;

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

  h = h.toFixed();
  s = s.toFixed();
  l = l.toFixed();

  return { h, s, l };
  //return h.toFixed() + "%, " + s.toFixed() + "%, " + l.toFixed() + "%";
}

function hexToHsl(hexColor) {
  return rgbToHsl(hexToRgb(hexColor));
}

function hslToRgb(hslObject) {
  h = hslObject.h;
  s = hslObject.s / 100;
  l = hslObject.l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return { r, g, b };
}

//RGB to HEX
function rgbToHex(rgbObject) {
  let hexVersion = "";
  for (const item in rgbObject) {
    let division = Math.floor(rgbObject[item] / 16);
    let rest = rgbObject[item] % 16;
    hexVersion = hexVersion + numbersToLetters(division).toString() + numbersToLetters(rest).toString();
  }
  hexVersion = "#" + hexVersion;
  return hexVersion;
}

function numbersToLetters(number) {
  if (number > 9) {
    return String.fromCharCode(55 + number);
  } else return number;
}

//RGB to CSS
function rgbToCss(rgbObject) {
  let rgbColorString = rgbObject.r + ", " + rgbObject.g + ", " + rgbObject.b;
  return "rgb(" + rgbColorString + ")";
}
