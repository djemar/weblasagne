"use strict";

const strings = ["lasagne", "panda", "palla", "pasta", "a"];

function newStr(strings) {
  for (let i = 0; i < strings.length; i++) {
    if (strings[i].length < 2) {
      strings[i] = "";
    } else {
      strings[i] = strings[i].substring(0, 2) + strings[i].substring(strings[i].length - 2, strings[i].length);
    }
  }
}

newStr(strings);

console.log(strings);
