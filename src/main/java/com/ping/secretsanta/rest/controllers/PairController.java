package com.ping.secretsanta.rest.controllers;

import com.ping.secretsanta.core.models.Employee;
import com.ping.secretsanta.core.services.PairService;
import com.ping.secretsanta.rest.dto.ReceiverDTO;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/pairs")
@SecurityRequirement(name = "JWT Security")
@RequiredArgsConstructor
public class PairController {
    private final PairService pairService;

    @GetMapping("/receiver")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<ReceiverDTO> getReceiver(Principal principal) {
        String username = principal.getName();
        if (username == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        ReceiverDTO receiverDTO = pairService.findReceiverByUsername(username);
        if (receiverDTO == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok(receiverDTO);
    }
}
