package com.ping.secretsanta.rest.controllers;

import com.ping.secretsanta.core.services.AuthService;
import com.ping.secretsanta.core.services.JwtService;
import com.ping.secretsanta.rest.dto.EmployeeDTO;
import com.ping.secretsanta.rest.dto.EmployeeRequestDTO;
import com.ping.secretsanta.rest.dto.LoginDTO;
import com.ping.secretsanta.rest.dto.LoginRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<EmployeeDTO> signUp(@RequestBody EmployeeRequestDTO employeeRequestDTO) {
        return ResponseEntity.ok(authService.signUp(employeeRequestDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginDTO> signIn(@RequestBody LoginRequestDTO loginRequestDTO) {
        return ResponseEntity.ok(authService.signIn(loginRequestDTO));
    }
}
