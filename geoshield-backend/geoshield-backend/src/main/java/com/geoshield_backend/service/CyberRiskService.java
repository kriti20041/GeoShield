package com.geoshield_backend.service;

import com.geoshield_backend.dto.RiskCheckRequest;
import com.geoshield_backend.dto.RiskCheckResponse;
import com.geoshield_backend.model.RiskCheck;
import com.geoshield_backend.repository.RiskCheckRepository;
import com.geoshield_backend.util.GeoHashUtil;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CyberRiskService {

    private final RiskCheckRepository riskCheckRepository;

    public CyberRiskService(RiskCheckRepository riskCheckRepository) {
        this.riskCheckRepository = riskCheckRepository;
    }

    public RiskCheckResponse calculateRisk(RiskCheckRequest request) {

        // ✅ SAFE DEFAULTS
        String placeType = request.getPlaceType() != null
                ? request.getPlaceType()
                : "UNKNOWN";

        double latitude = request.getLatitude();
        double longitude = request.getLongitude();

        double fakeWifiRisk = 0.0;
        double phishingRisk = 0.0;

        if ("CAFE".equalsIgnoreCase(placeType)) {
            fakeWifiRisk = 8.0;
        }

        int hour = LocalTime.now().getHour();
        if (hour >= 18) {
            phishingRisk = 7.0;
        }

        double riskScore =
                fakeWifiRisk * 0.4 +
                        phishingRisk * 0.4 +
                        2.0 * 0.2;

        List<String> threats = new ArrayList<>();
        if (fakeWifiRisk > 5) threats.add("FAKE_WIFI");
        if (phishingRisk > 5) threats.add("PHISHING");

        // ✅ BUILD RESPONSE FIRST (never fail)
        RiskCheckResponse response = new RiskCheckResponse();
        response.setRiskScore(Math.min(riskScore, 10.0));
        response.setThreats(threats);
        response.setAdvice("Avoid public Wi-Fi and never share OTPs.");

        // ✅ OPTIONAL: SAVE TO DB (FAIL-SAFE)
        try {
            RiskCheck check = new RiskCheck();

            String region = "UNKNOWN";
            try {
                region = GeoHashUtil.toRegion(latitude, longitude);
            } catch (Exception ignored) {}

            check.setRegion(region);
            check.setPlaceType(placeType);
            check.setRiskScore(response.getRiskScore());
            check.setThreats(threats);
            check.setCheckedAt(LocalDateTime.now());

            riskCheckRepository.save(check);
        } catch (Exception ignored) {
            // DB failure should NOT break API
        }

        return response;
    }
}
