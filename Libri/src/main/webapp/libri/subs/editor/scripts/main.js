import Editor from "./Editor.js";

const root = document.getElementById("app");
const editor = new Editor(root);



$(function () {
	const api = "http://localhost:10001/Libri/get-all-books";
	$.get(api, function (data) {
    const obj = JSON.parse(JSON.stringify(data));
	console.log(obj);
    obj.map((val)=>{
		$(`
			<tr onclick="location.href='/Libri/libri/subs/reader/index.html';" class="book" id = "${val.bookID}" >
	         <td scope="row">${val.bookName}</td>
	         <td scope="row">${val.bookID}</td>
	         
	     </tr>
		`).appendTo(".table-body")
	});

  });
	$("body").on("click", ".book", function () {
    	let id = $(this).attr("id");
    	localStorage.setItem("selectedEditBookID",id)
    	console.log(id);
  	});
  });