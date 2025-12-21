package com.geoshield_backend.repository;



import com.geoshield_backend.model.RiskCheck;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface RiskCheckRepository extends MongoRepository<RiskCheck, String> {

    // Total number of risk checks
    long count();

    // Find by region
    List<RiskCheck> findByRegion(String region);

    // Find by threat type
    @Query("{ 'threats': ?0 }")
    List<RiskCheck> findByThreatsContains(String threat);
}