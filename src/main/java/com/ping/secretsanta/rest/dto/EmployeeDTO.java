package com.ping.secretsanta.rest.dto;

import com.ping.secretsanta.core.models.Employee;
import com.ping.secretsanta.core.models.enums.UserType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class EmployeeDTO {
    private Integer id;
    private String name;
    private String surname;
    private String username;
    private String password;
    private UserType role;

    public EmployeeDTO(Employee employee) {
        this.id = employee.getId();
        this.name = employee.getName();
        this.surname = employee.getSurname();
        this.username = employee.getUsername();
        this.password = employee.getPassword();
        this.role = employee.getRole();
    }
}
