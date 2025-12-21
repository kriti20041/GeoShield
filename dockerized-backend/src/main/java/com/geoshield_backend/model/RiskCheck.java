package com.geoshield_backend.model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "risk_checks")
public class RiskCheck {

    @Id
    private String id;

    private String region;        // geohash / grid
    private String placeType;     // CAFE, MALL, etc
    private double riskScore;
    private List<String> threats;
    private LocalDateTime checkedAt;

    // Getter and Setter for id
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Getter and Setter for region
    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    // Getter and Setter for placeType
    public String getPlaceType() {
        return placeType;
    }

    public void setPlaceType(String placeType) {
        this.placeType = placeType;
    }

    // Getter and Setter for riskScore
    public double getRiskScore() {
        return riskScore;
    }

    public void setRiskScore(double riskScore) {
        this.riskScore = riskScore;
    }

    // Getter and Setter for threats
    public List<String> getThreats() {
        return threats;
    }

    public void setThreats(List<String> threats) {
        this.threats = threats;
    }

    // Getter and Setter for checkedAt
    public LocalDateTime getCheckedAt() {
        return checkedAt;
    }

    public void setCheckedAt(LocalDateTime checkedAt) {
        this.checkedAt = checkedAt;
    }
}
