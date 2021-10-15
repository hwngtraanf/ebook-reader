let chapters = [];
 
export default class EditorAPI {
    static getAllChapters() {
// consider rewrite here, call get-book?BookID= api here to return all chapters name
			const BookID = localStorage.getItem("selectedEditBookID");
			const api = "http://localhost:10001/Libri/get-book?BookID=" + BookID;
			$.get(api, function (data) {
    			const obj = JSON.parse(JSON.stringify(data));
				console.log(obj);
 	 		});
	
			$.ajax({
				type: "GET",
				url: "http://localhost:10001/Libri/get-book?BookID=" + BookID,
				async: false,
				success: function(data){
					chapters = JSON.parse(JSON.stringify(data));
				}, 
				error: function(){
					alert("Error");
					
				},
			});
	
		console.log(BookID);
		console.log(chapters);
        return chapters;
    }

    static saveChapter(chapterToSave) {
        // get all the exist chapters
        const chapters = EditorAPI.getAllChapters();
    
		const bookID = localStorage.getItem("selectedEditBookID");
		const chapterName = chapterToSave.chapterName;
		const chapterContent = chapterToSave.chapterContent;
		let postJSON = {
			"bookID" : bookID,
			"chapterName" : chapterName,
			"chapterContent" : chapterContent,
		};
		$.ajax({
			type : 'POST',
			contentType: "application/json",
     		url: "http://localhost:10001/Libri/set-chapter",
      		data: JSON.stringify(postJSON),
      		dataType: "text",
			success : function(){
				alert("Add new chapter successfully!");
			},
			error : function(){
				alert("Fail to add new chapter!");
			}
		})
		

        console.log(JSON.stringify(chapters))
        // set a key and a value in the local storage
        //localStorage.setItem("editor-chapters", JSON.stringify(chapters));
    }

    static deleteChapter(id) {
        // get all the exist chapters
        const chapters = EditorAPI.getAllChapters();
        /** Go through every id of exist chapter and take those that do not match the given id
         * Array filter(): method creates an array filled with all array elements that pass a test (provided by a function).
        */
        const newChapters = chapters.filter(chapter => chapter.chapterID != id);

        // set the key and the new value that pass the filter
        //localStorage.setItem("editor-chapters", JSON.stringify(newChapters));
    }
}