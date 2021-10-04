package com.ebook.service.Chapter;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.util.List;
import java.util.ArrayList;

import com.ebook.model.Chapter;
import com.ebook.ulti.DBConnection;

public class ChapterService implements ChapterDAO{
	//private String getChapterScript = "CALL getChapter(?)";
	//private String setChapterScript = "CALL setChapter(?, ?)";
	private String getChapterScript = "SELECT * FROM chapter WHERE ChapterID = ?";
	private String setChapterScript = "INSERT into chapter() values() ";
	Chapter chapter = new Chapter();
	
	@Override
	public Chapter getChapter(int chapterID) {
		Connection connection =  DBConnection.getConnection();
		
		// get location of that chapter
		try {
			//CallableStatement statement = connection.prepareCall(getChapterScript);
			PreparedStatement statement = connection.prepareStatement(getChapterScript);
			statement.setInt(1, chapterID);
			ResultSet rs = statement.executeQuery();
			while(rs.next()) {
				int chapterId = rs.getInt(1);
				int bookID = rs.getInt(2);
				String chapterName = rs.getString(3);
				String chapterLocation = rs.getString(4);
				chapter = new Chapter(chapterId, bookID, chapterName, chapterLocation);
				
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return chapter;
	}
	
	@Override
	public void setChapter(int bookID, int chapterID) {
		Connection connection =  DBConnection.getConnection();
		String message = null;
		
		try {
			CallableStatement statement = connection.prepareCall(setChapterScript);
			statement.setInt(1, bookID);
			statement.setInt(2, chapterID);
			int rs = statement.executeUpdate(); // change to executeUpdate later
			// reseach about the return, meaning that when it return 1, 0 or it always returns 1 :D
			if(rs == 1) {
				message =  "Add chapter successfully!";
			} else {
				message = "Fail to add chapter!";
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		//return message;
	}
}

