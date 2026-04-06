package com.srmap.lostandfound.dto;

import com.srmap.lostandfound.model.Item;
import java.time.LocalDateTime;

public class ItemResponse {
    private Long id;
    private String title;
    private String description;
    private String type;
    private String category;
    private String location;
    private String status;
    private LocalDateTime dateReported;
    private String dateOccurred;
    private String contactInfo;
    private String reportedByName;
    private String reportedByEmail;
    private Long reportedById;

    public static ItemResponse fromItem(Item item) {
        ItemResponse r = new ItemResponse();
        r.id = item.getId();
        r.title = item.getTitle();
        r.description = item.getDescription();
        r.type = item.getType().name();
        r.category = item.getCategory();
        r.location = item.getLocation();
        r.status = item.getStatus().name();
        r.dateReported = item.getDateReported();
        r.dateOccurred = item.getDateOccurred();
        r.contactInfo = item.getContactInfo();
        r.reportedByName = item.getReportedBy().getName();
        r.reportedByEmail = item.getReportedBy().getEmail();
        r.reportedById = item.getReportedBy().getId();
        return r;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getType() { return type; }
    public String getCategory() { return category; }
    public String getLocation() { return location; }
    public String getStatus() { return status; }
    public LocalDateTime getDateReported() { return dateReported; }
    public String getDateOccurred() { return dateOccurred; }
    public String getContactInfo() { return contactInfo; }
    public String getReportedByName() { return reportedByName; }
    public String getReportedByEmail() { return reportedByEmail; }
    public Long getReportedById() { return reportedById; }
}
