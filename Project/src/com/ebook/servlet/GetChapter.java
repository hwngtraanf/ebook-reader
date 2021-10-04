package com.ebook.servlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ebook.model.Chapter;
import com.ebook.service.Chapter.ChapterDAO;
import com.ebook.service.Chapter.ChapterService;

import java.io.*;

@WebServlet(name = "GetChapter", urlPatterns = "/get-chapter")

public class GetChapter extends HttpServlet {
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("text/html");
        int chapterID = Integer.parseInt(request.getParameter("chapterID"));
       // String filename = "C:/Users/Admin/eclipse-workspace/Project/WebContent/WEB-INF/Book1Chapter1.txt";
        ChapterDAO chapterService = new ChapterService();
        Chapter chapter = chapterService.getChapter(chapterID);
        request.setAttribute("chapter", chapter);
        // We are going to read a file called configuration.properties. 
        // This file is placed under the WEB-INF directory.
        String filename = "/WEB-INF/Book1Chapter1.txt";
        
       // String filename = chapter.getChapterPosition();

        ServletContext context = getServletContext();

        // First get the file InputStream using ServletContext.getResourceAsStream() method.
        InputStream is = context.getResourceAsStream(filename);
        
        if (is != null) {
            InputStreamReader isr = new InputStreamReader(is);
            BufferedReader reader = new BufferedReader(isr);
            PrintWriter writer = response.getWriter();
            String text;

            // We read the file line by line and later will be displayed on the browser page.
            while ((text = reader.readLine()) != null) {
            	System.out.println(text);
                writer.println(text);
            }
        }
    }
}
