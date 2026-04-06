package com.srmap.lostandfound.dto;

public class ItemRequest {
    private String title;
    private String description;
    private String type;
    private String category;
    private String location;
    private String dateOccurred;
    private String contactInfo;

    public ItemRequest() {}

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getDateOccurred() { return dateOccurred; }
    public void setDateOccurred(String dateOccurred) { this.dateOccurred = dateOccurred; }
    public String getContactInfo() { return contactInfo; }
    public void setContactInfo(String contactInfo) { this.contactInfo = contactInfo; }
}
