package com.geoshield_backend.controller;


import com.geoshield_backend.service.AdminAnalyticsService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/analytics")
public class AdminAnalyticsController {

    private final AdminAnalyticsService adminAnalyticsService;

    public AdminAnalyticsController(AdminAnalyticsService adminAnalyticsService) {
        this.adminAnalyticsService = adminAnalyticsService;
    }

    // 1️⃣ Total risk checks
    @GetMapping("/total-checks")
    public long totalChecks() {
        return adminAnalyticsService.getTotalChecks();
    }

    // 2️⃣ Risk checks grouped by region
    @GetMapping("/by-region")
    public Map<String, Long> byRegion() {
        return adminAnalyticsService.getCountByRegion();
    }

    // 3️⃣ Risk checks grouped by threat type
    @GetMapping("/by-threat")
    public Map<String, Long> byThreat() {
        return adminAnalyticsService.getCountByThreat();
    }
}
