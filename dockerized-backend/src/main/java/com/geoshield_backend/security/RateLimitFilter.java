package com.geoshield_backend.security;

import com.google.common.util.concurrent.RateLimiter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private final Map<String, RateLimiter> limiters = new ConcurrentHashMap<>();

    private RateLimiter getLimiter(String key, double permitsPerSecond) {
        return limiters.computeIfAbsent(
                key,
                k -> RateLimiter.create(permitsPerSecond)
        );
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        // ✅ DO NOT rate-limit auth endpoints
        if (path.startsWith("/api/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        String ip = request.getRemoteAddr();

        double rate;
        if (path.startsWith("/api/admin")) {
            rate = 0.08; // ~5 req/min
        } else if (path.startsWith("/api/risk")) {
            rate = 5.0; // 5 requests per second (DEV MODE)
        } else {
            rate = 0.16;
        }

        RateLimiter limiter = getLimiter(ip + path, rate);

        if (limiter.tryAcquire()) {
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("Too many requests - rate limit exceeded");
        }
    }
}
