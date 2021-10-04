const boldBtn = document.querySelector('#bold-btn')
const italicBtn = document.querySelector('#italic-btn')
const underlineBtn = document.querySelector('#underline-btn')
const highlightColor = document.querySelector('#highlight')
const hiliteBtn = document.querySelector('#hilite-btn')
const fontChangeBtn = document.querySelector('#font')
const fontSizeBtn = document.querySelector('#font-size')
const aLeft = document.querySelector('#align-left-btn');
const aRite = document.querySelector('#align-rite-btn');
const aCenter = document.querySelector('#align-center-btn');
const aJustify = document.querySelector('#align-justify-btn');


boldBtn.addEventListener('click', () => {
    document.execCommand('bold');
})

italicBtn.addEventListener('click', () => {
    document.execCommand('italic');
})

underlineBtn.addEventListener('click', () => {
    document.execCommand('underline');
})

let isHilite = false;
hiliteBtn.addEventListener('click', () => {
    if (isHilite) {
        let arg = highlightColor.value;
        document.execCommand('hiliteColor', false, arg = '#ffffff');
        isHilite = false;
        arg = highlightColor.value;

    } else {
        document.execCommand('hiliteColor', false, highlightColor.value);
        isHilite = true;
    }
})

aLeft.addEventListener('click', () => {
    document.execCommand('justifyLeft')
})

aRite.addEventListener('click', () => {
    document.execCommand('justifyRight')
})
aCenter.addEventListener('click', () => {
    document.execCommand('justifyCenter')
})

aJustify.addEventListener('click', () => {
    document.execCommand('justifyFull')
})

fontChangeBtn.addEventListener('input', () => {
    document.execCommand('fontName', false, fontChangeBtn.value);
})

// change font size while typing
document.execCommand('fontSize', false, fontSizeBtn.value);
// change font size of the selected lines
fontSizeBtn.addEventListener('input', () => {
    document.execCommand('fontSize', false, fontSizeBtn.value);
})

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /*remove the attribute, and call this function once more:*/
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }      
        xhttp.open("GET", file, true);
        xhttp.send();
        /*exit the function:*/
        return;
      }
    }
  };

  includeHTML();