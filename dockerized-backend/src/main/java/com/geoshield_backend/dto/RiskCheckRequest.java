package com.geoshield_backend.dto;



import lombok.Data;

@Data
public class RiskCheckRequest {
    private double latitude;
    private double longitude;
    private String placeType; // CAFE, MALL, AIRPORT
}
