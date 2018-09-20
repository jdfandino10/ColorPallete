const numColors = 5;
const circleDeg = 360;
const colorDistance = circleDeg/numColors;

const elementNames = ['.website-background', '.element-text', '.element-border',
'element-background', '.header'];
const elementQuery = ['body', 'body *', 'body *', 'body *', 'h1, h2, h3, h4, h5, h6'];
const elementCss = ['background-color', 'color', 'border-color', 'background-color', 'color'];

let colors = ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'];

function randomPalette(){
  let initial = Math.random() * circleDeg;
  let degrees = [initial];
  let saturation = Math.floor((Math.random() * 101) / 10) / 10;
  let value = Math.floor((Math.random() * 101) / 10) / 10;
  for (let i = 1; i < 5; i++) {
    degrees.push((degrees[i - 1] + colorDistance) % circleDeg);
  }
  colors = degrees.map((hue) => toCssRGB(hsvToRgb(hue, saturation, value)));
}

function toCssRGB(rgb) {
  let num = '#';
  for (let color : rgb) {
    num += color.toString(16);
  }
  return num;
}

function newPallete() {
  randomPalette();
}

function showChanges() {
  updateColors();
  $('#css-rules').text(generateRules());
}


function generateRules(){
  let rules = '';
  elementNames.forEach((elem, index) => {
    rules += elem + "{ " + elementCss[index] + ": " + colors[index] + "; } \n\n";
  });
  return rules;
}

function updateColors() {
  elementQuery.forEach((elem, index) => {
    $(elem).css(elementCss[index], colors[index]);
  });
}

function cleanPallete() {
  colors = colors.map((c) => '#FFFFFF');
  showChanges();
}
