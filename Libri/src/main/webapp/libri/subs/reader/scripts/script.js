/*function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
   /* z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
      //  file = elmnt.getAttribute("w3-include-html");
     //   if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
        //    xhttp = new XMLHttpRequest();
         //   xhttp.onreadystatechange = function () {
          //      if (this.readyState == 4) {
           //         if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          //          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /*remove the attribute, and call this function once more:*/
           //         elmnt.removeAttribute("w3-include-html");
         //           includeHTML();
         //       }
       //     }
      //      xhttp.open("GET", file, true);
       //     xhttp.send();
            /*exit the function:*/
  //          return;
      //  }
//    }
//}  *

        // Get the location if the bookmark and store inside the local storage

        // Note add to key bookID and ChapterID to differentiate
        //Parameter searcher for the URL
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const bookID = urlParams.get('BookID')
        console.log(bookID);

        // Get the location if the bookmark and store inside the local storage

        function saveCurrentState() {
            console.log(document.getElementById('output').innerHTML);
            localStorage.setItem('currentState_BookID=' + bookID, document.getElementById('output').innerHTML);
        }
        function loadState() {
            let state = localStorage.getItem('currentState_BookID=' + bookID);
            console.log(state)
            document.getElementById('output').innerHTML = state;
            renderBookmarkButton();
        }

        function bookmark() {
            var sel = window.getSelection && window.getSelection();
            if (sel && sel.rangeCount == 0 && savedRange != null) {
                sel.addRange(savedRange);
            }
            if (sel && sel.rangeCount > 0) {
                // Get location and text info
                let range = sel.getRangeAt(0);
                console.log(range)

                let paraRange = document.createRange();
                let node = document.createElement('span')
                node.setAttribute('class', 'bookmark')
                paraRange.setStart(range.startContainer, range.startOffset);
                paraRange.setEnd(range.startContainer, range.startOffset);
                paraRange.insertNode(node);
                saveCurrentState();
            }
            renderBookmarkButton();
        }
        function scrolltoBookmark(index) {
            let bookmarklist = document.getElementsByClassName('bookmark');
            let markLocation = bookmarklist[index];
            markLocation.scrollIntoView({ behavior: 'smooth' });
        }
        function removeBookmark(index) {
            let bookmarklist = document.getElementsByClassName('bookmark');
            let markLocation = bookmarklist[index];
            markLocation.outerHTML = markLocation.innerHTML;
            renderBookmarkButton();
        }
        // Render the bookmark buttons ()
        function renderBookmarkButton() {
            let bookmarklist = document.getElementsByClassName('bookmark');
            let list = document.getElementById('bookmarkButtons');
            while (list.hasChildNodes()) {
                list.removeChild(list.firstChild);
            }
            for (let i = 0; i < bookmarklist.length; i++) {
                let btn = document.createElement('button')
                btn.innerHTML = i;
                btn.addEventListener('click', function () { scrolltoBookmark(i) })
                list.appendChild(btn);
            }
        }
        function highlight() {
            var sel = window.getSelection && window.getSelection();
            if (sel && sel.rangeCount == 0 && savedRange != null) {
                sel.addRange(savedRange);
            }
            if (sel && sel.rangeCount > 0) {
                // Get location and text info
                let range = sel.getRangeAt(0);
                // console.log(range)

                let selText = range.cloneContents();
                // let paraRange = document.createRange();
                let node = document.createElement('mark')
                node.setAttribute('class', 'highlight')

                node.appendChild(selText);
                range.deleteContents();
                range.insertNode(node);
                saveCurrentState();
            }
        }

        // Work to do fix so it finds the html inside the selection area
        function unHighlight() {
            var sel = window.getSelection && window.getSelection();
            if (sel && sel.rangeCount == 0 && savedRange != null) {
                sel.addRange(savedRange);
            }
            if (sel && sel.rangeCount > 0) {
                // Get location and text info
                let range = sel.getRangeAt(0);
                console.log(range)
                let node = document.createElement('p')
                node.setAttribute('class', 'unhighlight')
                let selText = range.cloneContents();
                node.appendChild(selText);
                let markedList = node.getElementsByTagName('mark');
                for (let i = 0; i < markedList.length; i++) {
                    markedList[i].outerHTML = markedList[i].innerHTML;
                }

                range.deleteContents();
                range.insertNode(node);
                // Remove the tags from inserted node
                var unHiteLiteList = document.getElementsByClassName('unhighlight');

                for (let i = 0 ; i < unHiteLiteList.length; i ++) {
                    var parent = unHiteLiteList[i].parentNode;
                    while (unHiteLiteList[i].firstChild) {
                        parent.insertBefore(unHiteLiteList[i].firstChild, unHiteLiteList[i]);
                    }
                    parent.removeChild(unHiteLiteList[i]);
                }
                // range.selectNodeContents(selText);   
                saveCurrentState();
            }
        }



const chapters = JSON.parse(localStorage.getItem("editor-chapters"));
console.log(chapters);
$(function () {
	const BookID = localStorage.getItem("selectedReadBookID");
	const api = "http://localhost:10001/Libri/get-book?BookID=" + BookID;
	$.get(api, function (data) {
    const obj = JSON.parse(JSON.stringify(data));
	console.log(obj);
	
    obj.map((val)=>{
		$(`
			
	         <p scope="row" style="text-align:center" id="${val.chapterID}"> ${val.chapterName} </p>
			<p scope="row">${val.chapterContent}</p>
			
		
		`).appendTo(".reader_body")
	});
	renderTableOfContent(obj);
	/*obj.map((val) => {
    	$(
      `<a href="#${val.chapterID}"><h3 class="chapters">${val.chapterName}</h3></a>`
    	).appendTo(".reader_list");
 	 });*/
  });
	
	
	
});


const renderTableOfContent = (data) => {
  data.map((val) => {
    $(
      `<a href="#${val.chapterID}"><h3 class="chapters">${val.chapterName}</h3></a>`
    ).appendTo(".reader_list");
  });
};




let fontSizePx = 16;
function changeFontSize(inputScale) {
    /**
     * if inputScale < 1: scale down, otherwise, it is scale up
     */
    if (inputScale < 1)
        fontSizePx -= 3;
    else
        fontSizePx += 3;
    let fontTag = document.querySelectorAll("font, span, p");
    // if a plain text pass in, add tag p to the paragraph
    console.log(fontTag.length)
    if (fontTag.length == 0) {
        let p = document.createElement('P');
        let output = document.getElementById('output');
        p.innerHTML = output.innerHTML;
        output.style.fontSize = fontSizePx + "px";

    } else {
        for (let i = 0; i < fontTag.length; i++) {
            let fontSize = fontTag[i].getAttribute('size')
            if (fontSize != null) {
                if (fontSize == 0) {
                    fontSize = 3
                }
                fontTag[i].setAttribute('size', fontSize * inputScale)
            }
            else { // this part is for <p> tag, idea is add 'style' attribute and then modify its properties
                /**
                 * if there is no attribute style in the tag, create one
                 * else: increase the fontSizePx value in the style attribute
                 */
                if (fontTag[i].getAttribute('style') == null) {
                    let att = document.createAttribute('style')
                    att.value = "font-size: " + fontSizePx + "px";
                    fontTag[i].setAttributeNode(att);
                } else {
                    fontTag[i].style.fontSize = fontSizePx + "px";
                }
            }
        }
    }
}

function changeFontType(inputType) {
    // get font tag
    let fontTag = document.querySelectorAll("font,p");
    /** in each fontTag get attribute face
     * if exist: set attribute face = inputType
     * if is not exist: create attribute face and set temp value for it
     * and then set face = inputType
     */
    if (fontTag.length == 0) {
        let p = document.createElement('P');
        let output = document.getElementById('output');
        p.innerHTML = output.innerHTML;
        output.style.fontFamily = inputType;
    }
    for (let i = 0; i < fontTag.length; i++) {
        fontTag[i].style.fontFamily = inputType;
    }
}
