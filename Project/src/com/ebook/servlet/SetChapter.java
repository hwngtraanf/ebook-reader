package com.ebook.servlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ebook.service.Chapter.ChapterDAO;
import com.ebook.service.Chapter.ChapterService;

import java.io.*;

@WebServlet(name = "SetChapter", urlPatterns = "/set-chapter")
public class SetChapter extends HttpServlet {
    protected void doPost(HttpServletRequest request,
                         HttpServletResponse response) throws ServletException, IOException {
    	
    	String divResponse = request.getParameter("response");
    	System.out.println(divResponse);
//    	String bookName = request.getParameter("bookName");
//    	String chapterName = request.getParameter("chapterName");
//    	   	
//    	ChapterDAO chapter = new ChapterService();
//    	chapter.setChapter(bookName, chapterName);
    	
    	
    	  	
    	String location = "C:/Users/Admin/eclipse-workspace/Project/WebContent/WEB-INF/Book1Chapter2.txt";
    	//String location = "/WEB-INF/Book1Chapter2.txt";
    	
    	PrintWriter pw = response.getWriter();
    	
    	try {
    		File file = new File(location);
    		FileWriter fstream = new FileWriter(file, false); // false: override the file, true: append
    		BufferedWriter writer = new BufferedWriter(fstream);
    		writer.write(divResponse);
    		writer.close();
    		pw.println("File created successfully!");
    		
    	} catch(Exception e) {
    		System.out.println(e);
    	}
    	
    }
    
}
