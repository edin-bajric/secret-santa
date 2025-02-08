package com.ping.secretsanta.rest.controllers;

import com.ping.secretsanta.core.models.Pair;
import com.ping.secretsanta.core.services.SecretSantaService;
import com.ping.secretsanta.rest.dto.PairDTO;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/secret-santa")
@SecurityRequirement(name = "JWT Security")
@RequiredArgsConstructor
public class SecretSantaController {
    private final SecretSantaService secretSantaService;

    @PostMapping("/generate")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Void> generatePairs() {
        secretSantaService.generatePairs();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/pairs")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<List<PairDTO>> getAllPairs() {
        List<PairDTO> pairs = secretSantaService.getAllPairs();
        if (pairs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(pairs);
    }
}
