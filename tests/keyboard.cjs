const fs = require('node:fs');
const vm = require('node:vm');

class Element {
  constructor(text) { this.textContent = text; this.value = text; this.handlers = {}; }
  addEventListener(type, callback) { this.handlers[type] = callback; }
  click() { this.handlers.click(); }
  closest() { return null; }
}

const display = { textContent: '0' };
const buttons = '7 8 9 DEL 4 5 6 + 1 2 3 - . 0 / × RESET ='.split(' ').map((text) => new Element(text));
const options = ['1', '2', '3'].map((text) => new Element(text));
let keyboard;
const document = {
  body: { dataset: {} },
  querySelector: () => display,
  querySelectorAll: (selector) => selector.includes('keypad') ? buttons : options,
  addEventListener: (type, callback) => { if (type === 'keydown') keyboard = callback; },
};
vm.runInNewContext(fs.readFileSync('script.js', 'utf8'), {
  document, Element,
  localStorage: { getItem: () => null, setItem: () => {} },
  window: { matchMedia: () => ({ matches: false }) },
});
function test(keys, expected) {
  for (const key of keys) keyboard({ key, target: new Element(''), preventDefault() {} });
  if (display.textContent !== expected) throw new Error(`${keys.join(' ')}: expected ${expected}, got ${display.textContent}`);
  console.log(`${keys.join(' ')} => ${expected}`);
}
test(['Escape', '1', '2', '+', '7', 'Enter'], '19');
test(['Escape', '3', '*', '4', 'Enter'], '12');
test(['Escape', '8', '/', '0', 'Enter'], 'Error');
test(['Escape', '1', '2', 'Backspace'], '1');
test(['Escape', '1', '.', '5', '+', '2', 'Enter'], '3.5');
