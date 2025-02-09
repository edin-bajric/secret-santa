package com.ping.secretsanta.core.services;

import com.ping.secretsanta.core.models.Employee;
import com.ping.secretsanta.core.repositories.EmployeeRepository;
import com.ping.secretsanta.rest.dto.EmployeeDTO;
import com.ping.secretsanta.rest.dto.EmployeeRequestDTO;
import com.ping.secretsanta.rest.dto.LoginDTO;
import com.ping.secretsanta.rest.dto.LoginRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public EmployeeDTO signUp(EmployeeRequestDTO employeeRequestDTO) {
        try {
            employeeRequestDTO.setPassword(
                    passwordEncoder.encode(employeeRequestDTO.getPassword())
            );

            if (employeeRepository.existsByUsername(employeeRequestDTO.getUsername())) {
                throw new RuntimeException("User already exists");
            }

            Employee employee = employeeRepository.save(employeeRequestDTO.toEntity());

            return new EmployeeDTO(employee);

        } catch (RuntimeException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new RuntimeException("An error occurred during user registration. Please try again.");
        }
    }

    public LoginDTO signIn(LoginRequestDTO loginRequestDTO) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsername(), loginRequestDTO.getPassword())
            );

            Employee employee = employeeRepository.findByUsername(loginRequestDTO.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("This user does not exist."));

            String jwt = jwtService.generateToken(employee);

            return new LoginDTO(jwt);

        } catch (org.springframework.security.authentication.BadCredentialsException ex) {
            throw new UsernameNotFoundException("Invalid email or password.");
        } catch (Exception ex) {
            throw new RuntimeException("An error occurred during the authentication process. Please try again.");
        }
    }
}
