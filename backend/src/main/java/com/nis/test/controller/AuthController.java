package com.nis.test.controller;

import com.nis.test.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        // Dummy user database
        Map<String, String> userRoles = Map.of(
                "admin", "ADMIN",
                "user", "USER");

        if (!userRoles.containsKey(username) || !"testpass".equals(password)) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }

        List<String> roles = List.of(userRoles.get(username));

        String token = jwtUtil.generateToken(username, roles);
        return ResponseEntity.ok(Map.of("token", token));
    }
}
