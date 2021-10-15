const createBtn = document.querySelector('.create-btn');
const table = document.querySelector('.table-body');

let titleInput = document.getElementById("title");
let index = 0;
let books = [];

const list = JSON.parse(localStorage.getItem("book-list") || "[]");
let searchIndex = 0;
let matchingList = [];
let searchBarBtn = document.querySelector('.search-bar_btn');
let searchBar = document.querySelector('.search-bar_text');

// render table
//_render();
showBooks();

function showBooks(){
	const api = "http://localhost:10001/Libri/get-all-books";
	getAllBooks(api);
}

function clickAndSave(){
	$("body").on("click", ".book", function () {
    	let id = $(this).attr("id");
    	localStorage.setItem("selectedEditBookID",id)
    	console.log(id);
  	});
}

function getAllBooks(api){
	$(function () {
	//const api = "http://localhost:10001/Libri/get-all-books";
	$.get(api, function (data) {
    const obj = JSON.parse(JSON.stringify(data));
	console.log(obj);
    obj.map((val)=>{
		$(`
			<tr onclick="location.href='/Libri/libri/subs/editor/editor.html';" class="book" id = "${val.bookID}" >
	         <td scope="row">${val.bookName}</td>
	         <td scope="row">${val.bookID}</td>
	         
	     </tr>
		`).appendTo(".table-body")
	});

  });
	clickAndSave();
  });
	
}

createBtn.addEventListener('click', () => {
    if (titleInput.value == "") {
        alert("ERROR: NO TITLE DETECT");
    } else {
	
		let title = titleInput.value;
		console.log(title);
		
		const api = "http://localhost:10001/Libri/set-book?BookName=" + title;
		console.log(api);
		$.get(api, function (data) {
			console.log("a")
			console.log(api);
   		const obj = JSON.parse(JSON.stringify(data));
		let bookName = obj.bookName;
		let bookID = obj.bookID;
		console.log(bookName);
		console.log(bookID);
		console.log(obj);

	let html = `
        <tr onclick="location.href='/Libri/libri/subs/editor/editor.html';" class="book" id = "${bookID}">
            <td scope="row">${bookName}</td>
            <td scope="row">${bookID}</td>
        </tr>
        `
	console.log(html);
	table.insertAdjacentHTML("beforeend", html);
	
	
  		});
    }
});


searchBarBtn.addEventListener('click', () => {
    let searchInput = document.querySelector('.search-bar_text').value;
    if (searchInput == "") {
        table.innerHTML = "";
        _render();
    } else {
        const matching = list.find(book => book.title == searchInput);
        if (matching) {
            matchingList[index] = matching;
            _createBook(matching.title, matching.id);
            table.innerHTML = "";
            _searchResult(matchingList);
        }
        searchBar.value = "";
    }
})

function _searchResult(matchingList) {
    // get array list in local storage and parse to JSON object
    // loop through the list to render item in the list
    for (const book of matchingList) {
        const html = _createBook(book.title, book.id);
        table.insertAdjacentHTML("beforeend", html);
    }
}


function _render() {
    // get array list in local storage and parse to JSON object
    const list = JSON.parse(localStorage.getItem("book-list") || "[]");
    // loop through the list to render item in the list
    for (const book of list) {
        const html = _createBook(book.title, book.id);
        table.insertAdjacentHTML("beforeend", html);
    }
}