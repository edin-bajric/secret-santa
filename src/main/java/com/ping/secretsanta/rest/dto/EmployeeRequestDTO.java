package com.ping.secretsanta.rest.dto;

import com.ping.secretsanta.core.models.Employee;
import com.ping.secretsanta.core.models.enums.UserType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class EmployeeRequestDTO {
    private String name;
    private String surname;
    @NotBlank(message = "Username is required.")
    @Size(min = 5, message = "Username must be at least 5 characters long.")
    private String username;
    @NotBlank(message = "Password is required.")
    @Size(min = 8, message = "Password must be at least 8 characters long.")
    private String password;

    public EmployeeRequestDTO(Employee employee) {
        this.name = employee.getName();
        this.surname = employee.getSurname();
        this.username = employee.getUsername();
        this.password = employee.getPassword();
    }

    public Employee toEntity() {
        return Employee.builder()
                .name(name)
                .surname(surname)
                .username(username)
                .password(password)
                .role(UserType.EMPLOYEE)
                .build();
    }
}
