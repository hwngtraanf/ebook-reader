package com.ebook.model;

public class Chapter {
	private int chapterID;
	private int bookID;
	private String chapterName;
	private String chapterPosition;
	
	public Chapter() {}
	
	public Chapter(int chapterID, int bookID, String chapterName, String chapterPosition) {
		this.chapterID = chapterID;
		this.bookID = bookID;
		this.chapterName = chapterName;
		this.chapterPosition = chapterPosition;
	}
	
	public int getChapterID() {
		return chapterID;
	}
	public void setChapterID(int chapterID) {
		this.chapterID = chapterID;
	}
	public int getBookID() {
		return bookID;
	}
	public void setBookID(int bookID) {
		this.bookID = bookID;
	}
	public String getChapterName() {
		return chapterName;
	}
	public void setChapterName(String chapterName) {
		this.chapterName = chapterName;
	}
	public String getChapterPosition() {
		return chapterPosition;
	}
	public void setChapterPosition(String chapterPosition) {
		this.chapterPosition = chapterPosition;
	}
	
	
}
