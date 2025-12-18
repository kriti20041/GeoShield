package com.geoshield_backend.controller;

import com.geoshield_backend.dto.AuthRequest;
import com.geoshield_backend.security.JwtUtil;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5175")
public class AuthController {

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    // ✅ SIGNUP ENDPOINT (WHAT FRONTEND IS CALLING)
    @PostMapping("/register")
    public String register(@RequestBody AuthRequest request) {
        // In real app: save user to DB
        // For now: just return token
        return jwtUtil.generateToken(request.getEmail(), "USER");
    }

    // ✅ LOGIN ENDPOINT
    @PostMapping("/login")
    public String login(@RequestBody AuthRequest request) {
        // In real app: validate credentials
        return jwtUtil.generateToken(request.getEmail(), "USER");
    }

    // existing test endpoint
    @GetMapping("/token")
    public String generateToken(@RequestParam String role) {
        return jwtUtil.generateToken("admin-user", role);
    }
}