package com.geoshield_backend.controller;

import com.geoshield_backend.dto.RiskCheckRequest;
import com.geoshield_backend.dto.RiskCheckResponse;
import com.geoshield_backend.model.RiskCheck;
import com.geoshield_backend.repository.RiskCheckRepository;
import com.geoshield_backend.service.CyberRiskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/risk")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5175")
public class RiskController {

    private final CyberRiskService cyberRiskService;
    private final RiskCheckRepository riskCheckRepository;

    // ✅ TEST ENDPOINT
    @GetMapping("/ping")
    public String ping() {
        return "RISK API WORKING";
    }

    // ✅ RISK CHECK ENDPOINT
    @PostMapping("/check")
    public RiskCheckResponse checkRisk(
            @RequestParam(required = false, defaultValue = "12.97") double latitude,
            @RequestParam(required = false, defaultValue = "77.59") double longitude,
            @RequestParam(required = false, defaultValue = "CAFE") String placeType
    ) {

        RiskCheckRequest req = new RiskCheckRequest();
        req.setLatitude(latitude);
        req.setLongitude(longitude);
        req.setPlaceType(placeType.toUpperCase());

        return cyberRiskService.calculateRisk(req);
    }

    // ✅ ADMIN ANALYTICS ENDPOINT
    @GetMapping("/admin/all")
    public List<RiskCheck> getAllRiskChecks() {
        return riskCheckRepository.findAll();
    }
}
