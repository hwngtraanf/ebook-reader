/*function downloadHTML(filename, elId, mimeType) {
    let elHtml = document.getElementById(elId).innerHTML;
    let link = document.createElement('a');
    mimeType = mimeType || 'text/plain';
    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click();
}

export default class ChaptersView {
    constructor(root, { onSelect, onAdd, onEdit, onDelete } = {}) {
        // the root is stand for the whole editor
        // onSelect onAdd onEdit onDelete are function that will be define in Editor.js
        // these functions provide behaviors for the editor
        this.root = root;
        this.onSelect = onSelect;
        this.onAdd = onAdd;
        this.onEdit = onEdit;
        this.onDelete = onDelete;

        // render using js
        this.root.innerHTML = `
            <div class="chapters_sidebar">
                <button class="chapters_add" type="button">Add Chapter</button>
                <div class="chapters_list">
                    <div class="chapters_list-item chapters_list-item-selected">
                        <div class="chapters_small-title"></div>
                    </div>
                </div>
            </div>
            <div class="chapters_preview">
                <div class="chapters_toolbar">
                    <button type="button" id="bold-btn" class="tool-btn">
                        <i class=' fas fa-bold'></i>
                    </button>
                    <button type="button" id="italic-btn" class="tool-btn">
                        <i class=' fas fa-italic'></i>
                    </button>
                    <button type="button" id="underline-btn" class="tool-btn">
                        <i class=' fas fa-underline'></i>
                    </button>
                    <button type="button" class="tool-btn" id="hilite-btn">
                        <i class="fas fa-highlighter"></i>
                    </button>
                    <input class="tool-btn" id="highlight" type="color">
                    <button type="button" class="tool-btn" id="align-left-btn">
                        <i class="fas fa-align-left"></i>
                    </button>
                    <button type="button" class="tool-btn" id="align-center-btn">
                        <i class="fas fa-align-center"></i>
                    </button>
                    <button type="button" class="tool-btn" id="align-justify-btn">
                        <i class="fas fa-align-justify"></i>
                    </button>
                    <button type="button" class="tool-btn" id="align-rite-btn">
                        <i class="fas fa-align-right"></i>
                    </button>
                    <button type="button" class="tool-btn" id="save-btn">
                        <i class="fas fa-save"></i>
                    </button>
                    <button type="button" class="tool-btn" id="download-btn">
                        <i class="fas fa-download"></i>
                    </button>
                    <select class="tool-btn" id="font">
                        <option value="Arial">Arial</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Helvetica ">Helvetica </option>
                        <option value="Tahoma">Tahoma</option>
                        <option value="Trebuchet MS">Trebuchet MS</option>
                        <option value="Times New Roman">Times New Roman</option>
                    </select>
                    <select class="tool-btn" id="font-size">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                </div>
                <div class="chapters_content">
                    <input type="text" class="chapters_title" id = "chapters_title" placeholder="Enter a title...">
                    <p class="chapters_body" id="body-content" contenteditable="true" spellcheck="false">
                    </p>
                </div>
            </div>
        `;
        // Add function to paste as plain text
        // let ce = document.querySelector('[contenteditable]')
        // ce.addEventListener('paste', function (e) {
        //     e.preventDefault()
        //     let text = e.clipboardData.getData('text/plain')
        //     document.execCommand('insertText', false, text)
        // })

        // REFERENCES
        const addChapterBtn = this.root.querySelector(".chapters_add");
        const inpTitle = this.root.querySelector(".chapters_title");
        const inpBody = this.root.querySelector("#body-content");

        const saveBtn = document.querySelector('#save-btn');
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

        // BUTTON FUNCTIONS
        // add chapters
        addChapterBtn.addEventListener("click", () => {
            this.onAdd();
        });

        // body and title saving function
        saveBtn.addEventListener('click', () => {
            const updatedTitle = inpTitle.value.trim();
            const updatedBody = inpBody.innerHTML

            this.onEdit(updatedTitle, updatedBody);  // rewrite this function to render the exsiting chapter of the choosen book
// consider using updateChapter api
        })

        const downloadBtn = document.querySelector('#download-btn')
        downloadBtn.addEventListener('click', () => {
            console.log(document.getElementById("current").innerText)
            downloadHTML(document.getElementById("current").innerText+'.html', 'body-content','text/html')
        })

        // toolbar functions
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

        this.updateChapterPreviewVisibility(false);
    }

    

    // render the chapter in the sidebar
    _createListItemHTML(id, title) {
        return `
            <div class="chapters_list-item" data-chapter-id="${id}">
                <div class="chapters_small-title">${title}</div>
            </div>
        `
    }

    // update existing chapter, pass in the list of exist chapter
    updateChapterList(chapters) {
        // hold items store in the sidebar
        const chaptersListContainer = this.root.querySelector(".chapters_list");

        // empty list
        chaptersListContainer.innerHTML = "";

        // insert html for each chapter
        // take id and title of each chapter in list of exist chapter and render
        for (const chapter of chapters) {
            const html = this._createListItemHTML(chapter.chapterID, chapter.chapterName);

            // add html as a leaf to a DOM tree
            chaptersListContainer.insertAdjacentHTML("beforeend", html);
        }

        // add select/delete events for each list item
        // whenever a new chapter is added, this part will add function to that list-item
        chaptersListContainer.querySelectorAll(".chapters_list-item").forEach(chapterListItem => {
            chapterListItem.addEventListener("click", () => {
                // chapterId come from line 184 'data-chapter-id'
                this.onSelect(chapterListItem.dataset.chapterId);
            });

            chapterListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure to delete?");

                if (doDelete) {
                    this.onDelete(chapterListItem.dataset.chapterId);
                }
            });
        })
    }

    // called when a chapter is selected, get chapter title and body, make the selected chapter bold in the sidebar
    updateActiveChapter(chapter) {
        // update title and body
        this.root.querySelector(".chapters_title").value = chapter.chapterName;
        this.root.querySelector("#body-content").innerHTML = chapter.chapterContent;

        // update selected chapter
        this.root.querySelectorAll(".chapters_list-item").forEach(chapterListItem => {
            chapterListItem.classList.remove("chapters_list-item-selected");
            chapterListItem.removeAttribute("id")
        });

        // the chapter we choose gonna have bold effect
        this.root.querySelector(`.chapters_list-item[data-chapter-id="${chapter.chapterID}"]`).classList.add("chapters_list-item-selected");
        this.root.querySelector(`.chapters_list-item[data-chapter-id="${chapter.chapterID}"]`).id = "current"
    }

    // hide section when nothing is selected, hide by default
    updateChapterPreviewVisibility(visible) {
        this.root.querySelector(".chapters_preview").style.visibility = visible ? "visible" : "hidden"
    }
}
*/

function downloadHTML(filename, elId, mimeType) {
    let elHtml = document.getElementById(elId).innerHTML;
    let link = document.createElement('a');
    mimeType = mimeType || 'text/plain';
    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click();
}
// ----------------------------------- FOOTNOTE FUNCTION PROVIDE TO CONSTRUCTOR -------------------------------------------------------------
// Use @selectedAreas line 199
// Provide function to content in class .chapters_body
let footnoteBtn = document.querySelector('.footnote-btn');
function _selectedAreasMouseUp(event) {
    const selectedText = window.getSelection().toString().trim();
    setTimeout(() => {
        if (selectedText.length) {
            // value: cordinate
            // present position for selected text
            // need for set footnote btn positioning
            const x = event.pageX;
            const y = event.pageY;
            footnoteBtn.classList.add("btnEntrance");
            footnoteBtn.style.left = `${x + 2}px`;
            footnoteBtn.style.top = `${y}px`;
            footnoteBtn.style.display = "block";
        }
    }, 0);
}

// Use @line 205
// Affect on footnote-btn
// Listen to the whole document
function _documentMouseDown(event) {
    setTimeout(() => {
        // event.target.id !== "footnote-btn" ensure the btn not the target
        // otherwise: the btn disapear before the event is fire
        if (getComputedStyle(footnoteBtn).display === "block" && event.target.id !== "footnote-btn") {
            footnoteBtn.style.display = "none";
            footnoteBtn.classList.remove("btnEntrance");
            // empty the selction object
            // <=> window.getSelection().removeAllRanges()
            window.getSelection().empty();
        }
    }, 4000);
}
// Use @footnote-btn, line 207
// Return: list of objects in localstorage or empty array
function _getAllFootnotes() {
    const footnotes = JSON.parse(localStorage.getItem("footnotes") || "[]");
    return footnotes;
}

// Use @footnote-btn, line 229
// Param: id of the .footnote-link
// Return: object in localstorage with matching id
function _getFootnote(id) {
    let list = _getAllFootnotes();
    for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
            return list[i];
        }
    }
    return selectedNote;
}
// ----------------------------------------------------------------------------------------------------------
  
export default class ChaptersView {
    constructor(root, { onSelect, onAdd, onEdit, onDelete } = {}) {
        // the root is stand for the whole editor
        // onSelect onAdd onEdit onDelete are function that will be define in Editor.js
        // these functions provide behaviors for the editor
        this.root = root;
        this.onSelect = onSelect;
        this.onAdd = onAdd;
        this.onEdit = onEdit;
        this.onDelete = onDelete;

        // render using js
        this.root.innerHTML = `
        <div class="chapters_sidebar">
                <button class="chapters_add" type="button">
                    <i class="fas fa-plus"></i>
                </button>
                <button class="refresh-btn">
                     <i class="fas fa-sync-alt"></i>
                </button>
            <div class="chapters_list">
                <div class="chapters_list-item chapters_list-item-selected">
                    <div class="chapters_small-title"></div>
                </div>
            </div>
         </div>
            <div class="chapters_preview">
                <div class="chapters_toolbar">
                    <button type="button" id="preview-btn" class="tool-btn">
                        <i class=' fas fa-check-square'></i>
                    </button>
                    <button type="button" id="bold-btn" class="tool-btn">
                        <i class=' fas fa-bold'></i>
                    </button>
                    <button type="button" id="italic-btn" class="tool-btn">
                        <i class=' fas fa-italic'></i>
                    </button>
                    <button type="button" id="underline-btn" class="tool-btn">
                        <i class=' fas fa-underline'></i>
                    </button>
                    <button type="button" class="tool-btn" id="hilite-btn">
                        <i class="fas fa-highlighter"></i>
                    </button>
                    <input class="tool-btn" id="highlight" type="color">
                    <button type="button" class="tool-btn" id="align-left-btn">
                        <i class="fas fa-align-left"></i>
                    </button>
                    <button type="button" class="tool-btn" id="align-center-btn">
                        <i class="fas fa-align-center"></i>
                    </button>
                    <button type="button" class="tool-btn" id="align-justify-btn">
                        <i class="fas fa-align-justify"></i>
                    </button>
                    <button type="button" class="tool-btn" id="align-rite-btn">
                        <i class="fas fa-align-right"></i>
                    </button>
                    <button type="button" class="tool-btn" id="save-btn">
                        <i class="fas fa-save"></i>
                    </button>
                    <button type="button" class="tool-btn" id="download-btn">
                        <i class="fas fa-download"></i>
                    </button>
                    <select class="tool-btn" id="font">
                        <option value="Arial">Arial</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Helvetica ">Helvetica </option>
                        <option value="Tahoma">Tahoma</option>
                        <option value="Trebuchet MS">Trebuchet MS</option>
                        <option value="Times New Roman">Times New Roman</option>
                    </select>
                    <button type="button" class="tool-btn" id="up-btn">
                        <i class="fas fa-angle-up"></i>
                    </button>
                    <button type="button" class="tool-btn" id="down-btn">
                        <i class="fas fa-angle-down"></i>
                    </button>
                    
                </div>
                <div class="chapters_content">
                    <input type="text" class="chapters_title" placeholder="Enter a title...">
                    <textarea class="chapters_body2" id="body-content"></textarea>
                    <div class="chapters_body" id="right_pane"></div>
                </div>
            </div>
        `;
        // Add function to paste as plain text
        // let ce = document.querySelector('[contenteditable]')
        // ce.addEventListener('paste', function (e) {
        //     e.preventDefault()
        //     let text = e.clipboardData.getData('text/plain')
        //     document.execCommand('insertText', false, text)
        // })

        // REFERENCES
        const addChapterBtn = this.root.querySelector(".chapters_add");
        const inpTitle = this.root.querySelector(".chapters_title");
        const inpBody = this.root.querySelector("#body-content");

        const previewBtn = document.querySelector('#preview-btn');
        const saveBtn = document.querySelector('#save-btn');
        const boldBtn = document.querySelector('#bold-btn')
        const italicBtn = document.querySelector('#italic-btn')
        const underlineBtn = document.querySelector('#underline-btn')
        const highlightColor = document.querySelector('#highlight')
        const hiliteBtn = document.querySelector('#hilite-btn')
        const fontChangeBtn = document.querySelector('#font')

        const upbtn = document.querySelector('#up-btn');
        const downbtn = document.querySelector('#down-btn');

        const aLeft = document.querySelector('#align-left-btn');
        const aRite = document.querySelector('#align-rite-btn');
        const aCenter = document.querySelector('#align-center-btn');
        const aJustify = document.querySelector('#align-justify-btn');

        // BUTTON FUNCTIONS
        // add chapters
        addChapterBtn.addEventListener("click", () => {
            this.onAdd();
        });

        // body and title saving function
        saveBtn.addEventListener('click', () => {
            const updatedTitle = inpTitle.value.trim();
            const updatedBody = inpBody.innerHTML

            this.onEdit(updatedTitle, updatedBody);
        })

        const downloadBtn = document.querySelector('#download-btn')
        downloadBtn.addEventListener('click', () => {
            console.log(document.getElementById("current").innerText)
            downloadHTML(document.getElementById("current").innerText+'.html', 'right_pane','text/html')
        })

        // toolbar functions
        
        previewBtn.addEventListener('click', () => {
            this.preview();
        })

        boldBtn.addEventListener('click', () => {
            this.insertTag('strong');
        })

        italicBtn.addEventListener('click', () => {
            this.insertTag('i');
        })

        underlineBtn.addEventListener('click', () => {
            this.insertTag('u');
        })

        let isColor = false;
        hiliteBtn.addEventListener('click', () => {
            if (isColor) {
                let arg = highlightColor.value;
                this.insertTag('<span style= "color:'+'black'+';">');
                isColor = false;
                arg = highlightColor.value;

            } else {
                this.insertTag('<span style= "color:'+highlightColor.value+';">');
                isColor = true;
            }
        })

        aLeft.addEventListener('click', () => {
           this.insertTag('<p style="text-align:left;">');
        })

        aRite.addEventListener('click', () => {
            this.insertTag('<p style="text-align:right;">');
        })
        aCenter.addEventListener('click', () => {
            this.insertTag('<p style="text-align:center;">');
        })

        aJustify.addEventListener('click', () => {
            this.insertTag('<p style="text-align:justify;">');
        })

        fontChangeBtn.addEventListener('input', () => {
            var e = document.getElementById("font").value;
            this.insertTag('<span style= "font-family:'+e+';">');
        })
        upbtn.addEventListener('click', () => {
            this.insertTag('size-up');
        })
        downbtn.addEventListener('click', () => {
            this.insertTag('size-down');
        })
        this.updateChapterPreviewVisibility(false);

        // FOOTNOTE FUNCTION
        let selectedAreas = document.querySelectorAll(".chapters_body");
        let footnoteContent = document.querySelector('.footnote-body');
        let footnoteUpdateContent = document.querySelector('.footnote-body-update');
        let noteId = Math.floor(Math.random() * 100000);
        let links = document.querySelectorAll('.footnote-link');

        // Affect on content in class .chapters_body
        // Fired by mouseup event
        selectedAreas.forEach(ele => {
            ele.addEventListener('mouseup', _selectedAreasMouseUp);
        });

        // Affect on the button of class .footnote-btn
        // Fired by mousedouwn event
        document.addEventListener('mousedown', _documentMouseDown);

        footnoteBtn.addEventListener('click', () => {
            footnoteContent.innerHTML = "";

            const selectedText = window.getSelection();
            let note = document.createElement("a");
            note.textContent = selectedText.toString().trim();
            let range = selectedText.getRangeAt(0);
            range.deleteContents();
            range.insertNode(note);

            note.classList.add("footnote-link");
            note.id = noteId;

            // Update list of existing link of the .chapters_body class
            // RETURN null if dont update
            links = document.querySelectorAll('.footnote-link');
            // Affect on the .footnote-link class
            // // Return NULL if cant find appropriate note
            // for (let i = 0; i < links.length; i++) {
            //     links[i].setAttribute("data-bs-toggle", "offcanvas");
            //     links[i].setAttribute("data-bs-target", "#update");
            //     links[i].setAttribute("aria-controls", "update");

            //     links[i].addEventListener('click', () => {
            //         let note = _getFootnote(links[i].id);
            //         footnoteUpdateContent.innerHTML = note.content;
            //     })

            //     let delBtn = document.querySelector(".delete-btn");
            //     delBtn.addEventListener('click', () => {
            //         // let target = document.getElementById(link.id);
            //         const noti = confirm("Do you want to delete this footnote");
            //         if (noti) {
            //             const linkList = _getAllFootnotes();
            //             // console.log(linkList);
            //             const newLinkList = linkList.filter(newLink => newLink.id != links[i].id);
            //             if (newLinkList.length == linkList.length)
            //                 alert("Footnote does not exist")
            //             else {
            //                 localStorage.setItem("footnotes", JSON.stringify(newLinkList));
            //                 let sortedLinks = document.querySelectorAll('.footnote-link');
            //                 for (let k = 0; k < sortedLinks.length; k++) {
            //                     if (sortedLinks[k].id == links[i].id) {
            //                         sortedLinks[k].outerHTML = target.innerText;
            //                     } else {
            //                         alert("Footnote does not exist");
            //                     }
            //                 }
            //             }
            //         }
            //     })

            //     // update function for link
            //     let updateBtn = document.querySelector('.update-btn');
            //     // let footnoteUpdateContent = document.querySelector('.footnote-body-update');
            //     updateBtn.addEventListener('click', () => {
            //         if (links[i].innerText.length == 0)
            //             alert("No note detect")
            //         else {
            //             const notes = _getAllFootnotes();
            //             const newNotes = notes.filter(note => note.id != links[i].id);
            //             const target = _getFootnote(links[i].id);
            //             target.content = footnoteUpdateContent.innerText;
            //             newNotes.push(target)
            //             localStorage.setItem("footnotes", JSON.stringify(newNotes));
            //         }
            //     })

            // }
        });


        let refreshBtn = document.querySelector('.refresh-btn');
        refreshBtn.addEventListener('click', () => {
            links = document.querySelectorAll('.footnote-link')
            console.log(links);
            for (let i = 0; i < links.length; i++) {
                let note = _getFootnote(links[i].id);
                footnoteUpdateContent.innerHTML = note.content;


                links[i].setAttribute("data-bs-toggle", "offcanvas");
                links[i].setAttribute("data-bs-target", "#update");
                links[i].setAttribute("aria-controls", "update");

                links[i].addEventListener('click', () => {
                    let note = _getFootnote(links[i].id);
                    footnoteUpdateContent.innerHTML = note.content;
                })

                let delBtn = document.querySelector(".delete-btn");
                delBtn.addEventListener('click', () => {
                    // let target = document.getElementById(link.id);
                    const noti = confirm("Do you want to delete this footnote");
                    if (noti) {
                        const linkList = _getAllFootnotes();
                        // console.log(linkList);
                        const newLinkList = linkList.filter(newLink => newLink.id != links[i].id);
                        if (newLinkList.length == linkList.length)
                            alert("Footnote does not exist")
                        else {
                            localStorage.setItem("footnotes", JSON.stringify(newLinkList));
                            let sortedLinks = document.querySelectorAll('.footnote-link');
                            for (let k = 0; k < sortedLinks.length; k++) {
                                if (sortedLinks[k].id == links[i].id) {
                                    sortedLinks[k].outerHTML = target.innerText;
                                } else {
                                    alert("Footnote does not exist");
                                }
                            }
                        }
                    }
                })

                // update function for link
                let updateBtn = document.querySelector('.update-btn');
                // let footnoteUpdateContent = document.querySelector('.footnote-body-update');
                updateBtn.addEventListener('click', () => {
                    if (links[i].innerText.length == 0)
                        alert("No note detect")
                    else {
                        const notes = _getAllFootnotes();
                        const newNotes = notes.filter(note => note.id != links[i].id);
                        const target = _getFootnote(links[i].id);
                        target.content = footnoteUpdateContent.innerText;
                        newNotes.push(target)
                        localStorage.setItem("footnotes", JSON.stringify(newNotes));
                    }
                })
            }
        })
        // used @offcanvas-body
        // only appear when offcanvas appeared
        let submitBtn = document.querySelector('.submit-btn');
        submitBtn.addEventListener('click', () => {
            const notes = _getAllFootnotes();
            let noteToSave = {
                content: footnoteContent.innerHTML,
                id: noteId
            }
            noteId = Math.floor(Math.random() * 100000);
            notes.push(noteToSave);
            localStorage.setItem("footnotes", JSON.stringify(notes));
        })
    }

    // render the chapter in the sidebar
    _createListItemHTML(id, title) {
        return `
            <div class="chapters_list-item" data-chapter-id="${id}">
                <div class="chapters_small-title">${title}</div>
            </div>
        `
    }

    // update existing chapter, pass in the list of exist chapter
    updateChapterList(chapters) {
        // hold items store in the sidebar
        const chaptersListContainer = this.root.querySelector(".chapters_list");

        // empty list
        chaptersListContainer.innerHTML = "";

        // insert html for each chapter
        // take id and title of each chapter in list of exist chapter and render
        for (const chapter of chapters) {
            const html = this._createListItemHTML(chapter.chapterID, chapter.chapterName);

            // add html as a leaf to a DOM tree
            chaptersListContainer.insertAdjacentHTML("beforeend", html);
        }

        // add select/delete events for each list item
        // whenever a new chapter is added, this part will add function to that list-item
        chaptersListContainer.querySelectorAll(".chapters_list-item").forEach(chapterListItem => {
            chapterListItem.addEventListener("click", () => {
                // chapterId come from line 184 'data-chapter-id'
                this.onSelect(chapterListItem.dataset.chapterId);
            });

            chapterListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure to delete?");

                if (doDelete) {
                    this.onDelete(chapterListItem.dataset.chapterId);
                }
            });
        })
    }

    // called when a chapter is selected, get chapter title and body, make the selected chapter bold in the sidebar
    updateActiveChapter(chapter) {
        // update title and body
        this.root.querySelector(".chapters_title").value = chapter.chapterName;
        this.root.querySelector("#body-content").innerHTML = chapter.chapterContent;

        // update selected chapter
        this.root.querySelectorAll(".chapters_list-item").forEach(chapterListItem => {
            chapterListItem.classList.remove("chapters_list-item-selected");
            chapterListItem.removeAttribute("id")
        });

        // the chapter we choose gonna have bold effect
        this.root.querySelector(`.chapters_list-item[data-chapter-id="${chapter.chapterID}"]`).classList.add("chapters_list-item-selected");
        this.root.querySelector(`.chapters_list-item[data-chapter-id="${chapter.chapterID}"]`).id = "current"
    }

    // hide section when nothing is selected, hide by default
    updateChapterPreviewVisibility(visible) {
        this.root.querySelector(".chapters_preview").style.visibility = visible ? "visible" : "hidden"
    }

    insertTag(tag_name) {

        let editor_textarea = document.getElementById("body-content");
      
        let selection = null;
      
        if (editor_textarea.selectionStart == editor_textarea.selectionEnd)
          selection = editor_textarea.selectionStart;
        else
          selection = editor_textarea.value.slice(editor_textarea.selectionStart, editor_textarea.selectionEnd);
        if (tag_name.substring(0,2)==="<p")
            editor_textarea.setRangeText(`${tag_name}${selection}</p>`);
        else if (tag_name.substring(0,5)==="<span")
        editor_textarea.setRangeText(`${tag_name}${selection}</span>`);
        else if (tag_name != null)
          editor_textarea.setRangeText(`<${tag_name}>${selection}</${tag_name}>`);
      }
      
    preview() {
        let text_to_render = document.getElementById("body-content").value;
      
        text_to_render = text_to_render.replace(/\n/g, "<br>");
      
        text_to_render = text_to_render.replace(/<script>/g, "");
        text_to_render = text_to_render.replace(/<\/script>/g, "");
      
        text_to_render = text_to_render.replace(/<link>/g, "");
        text_to_render = text_to_render.replace(/<\/link>/g, "");
      
        text_to_render = text_to_render.replace(/<div>/g, "");
        text_to_render = text_to_render.replace(/<\/div>/g, "");
    
        text_to_render = text_to_render.replace(/<style>/g, "");
        text_to_render = text_to_render.replace(/<\/style>/g, "");
      
        let render_div = document.getElementById("right_pane");
      
        render_div.innerHTML = text_to_render;
    }
}

