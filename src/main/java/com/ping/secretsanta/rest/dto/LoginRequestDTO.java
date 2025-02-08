package com.ping.secretsanta.rest.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class LoginRequestDTO {
    @NotBlank(message = "Please provide a valid username.")
    private String username;
    @NotBlank(message = "Please provide a valid password.")
    private String password;
}
