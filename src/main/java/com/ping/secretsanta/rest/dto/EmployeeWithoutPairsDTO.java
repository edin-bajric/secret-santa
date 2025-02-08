package com.ping.secretsanta.rest.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class EmployeeWithoutPairsDTO {
    private Integer id;
    private String name;
    private String surname;

    public EmployeeWithoutPairsDTO(Integer id, String name, String surname) {
        this.id = id;
        this.name = name;
        this.surname = surname;
    }
}