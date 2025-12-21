package com.geoshield_backend.util;



public class GeoHashUtil {

    // Coarse region calculation (privacy-safe)
    public static String toRegion(double latitude, double longitude) {

        int latBucket = (int) (latitude * 10);   // ~11 km precision
        int lonBucket = (int) (longitude * 10);

        return latBucket + "_" + lonBucket;
    }
}
