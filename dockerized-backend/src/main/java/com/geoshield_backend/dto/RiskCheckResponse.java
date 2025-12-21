package com.geoshield_backend.dto;



import lombok.Data;
import java.util.List;

@Data
public class RiskCheckResponse {
    private double riskScore;
    private List<String> threats;
    private String advice;
}
