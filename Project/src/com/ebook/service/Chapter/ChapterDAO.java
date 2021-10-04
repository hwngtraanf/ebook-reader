package com.ebook.service.Chapter;

import java.util.List;
import com.ebook.model.*;

public interface ChapterDAO {
	public Chapter getChapter(int chapterID);
	public void setChapter(int bookID, int chapterID);
}
