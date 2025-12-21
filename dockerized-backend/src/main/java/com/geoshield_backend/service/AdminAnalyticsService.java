package com.geoshield_backend.service;
import com.geoshield_backend.repository.RiskCheckRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AdminAnalyticsService {

    private final RiskCheckRepository riskCheckRepository;

    public AdminAnalyticsService(RiskCheckRepository riskCheckRepository) {
        this.riskCheckRepository = riskCheckRepository;
    }

    // Total checks
    public long getTotalChecks() {
        return riskCheckRepository.count();
    }

    // Count by region
    public Map<String, Long> getCountByRegion() {
        Map<String, Long> result = new HashMap<>();

        riskCheckRepository.findAll().forEach(check -> {
            result.put(
                    check.getRegion(),
                    result.getOrDefault(check.getRegion(), 0L) + 1
            );
        });

        return result;
    }

    // Count by threat
    public Map<String, Long> getCountByThreat() {
        Map<String, Long> result = new HashMap<>();

        riskCheckRepository.findAll().forEach(check -> {
            check.getThreats().forEach(threat -> {
                result.put(
                        threat,
                        result.getOrDefault(threat, 0L) + 1
                );
            });
        });

        return result;
    }
}
