/*const table = document.querySelector('.table-body');
let searchBarBtn = document.querySelector('.search-bar_btn');
let searchBar = document.querySelector('.search-bar_text');
const list = JSON.parse(localStorage.getItem("book-list") || "[]");
let matchingList = [];
let index = 0;*/

//render();



$(function () {
	const api = "http://localhost:10001/Libri/get-all-books";
	$.get(api, function (data) {
    const obj = JSON.parse(JSON.stringify(data));
	console.log(obj);
    obj.map((val)=>{
		$(`
			<tr onclick="location.href='/Libri/libri/subs/reader/index.html?BookID=' + ${val.bookID}" class="book" id = "${val.bookID}" >
	         <td scope="row">${val.bookName}</td>
	         <td scope="row">${val.bookID}</td>
	         
	     </tr>
		`).appendTo(".table-body")
	});

  });
	$("body").on("click", ".book", function () {
    	let id = $(this).attr("id");
    	localStorage.setItem("selectedReadBookID",id)
    	console.log(id);
  	});
  });

function getSelectedBook(id){
	    	 console.log(id)
	    	 localStorage.setItem("selectedReadBookID", id);
	     }

/*searchBarBtn.addEventListener('click', () => {
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

function _render() {
    // get array list in local storage and parse to JSON object
    // loop through the list to render item in the list
    for (const book of list) {
        const html = _createBook(book.title, book.id);
        table.insertAdjacentHTML("beforeend", html);
    }

	
}

function render(){
	fetch('http://localhost:10001/Libri/get-all-books')
	.then(function (response){
		return response.json();
	})
	.then(function (data){
		var mainContainer = document.getElementById("book-list");
            for (var i = 0; i < data.length; i++) {
                var div = document.createElement("div");
                div.innerHTML = 'Name: ' + data[i].bookName + ' ID: ' + data[i].bookID;
                mainContainer.appendChild(div);
				localStorage.setItem("bookID", data[i].bookID);
				//document.body.appendChild(div);
            }
	})
	.catch(function (err){
		console.log(err);
	})
	
}



function appendData(data) {
            var mainContainer = document.getElementById("book-list");
            for (var i = 0; i < data.length; i++) {
                var div = document.createElement("div");
                div.innerHTML = 'Name: ' + data[i].bookName + 'ID: ' + data[i].bookID;
                mainContainer.appendChild(div);
            }


        }
*/
/*function render(){
	  $.ajax({
  type: 'GET',
  url: 'http://localhost:10001/Libri/get-all-books',
  success: function(data) {
    dataRender(data);
  },
  error:function () {
    alert("Error loading order");
    },
  })
}*/

/*function dataRender(data) {
data.map(val=>{
  $(`<tr class=${val.BookID}>
    <td>${val.BookName}</td>
    <td>${val.BookID}</td>
      <tr>`).appendTo(".book-list");
})
}*/
