package com.ping.secretsanta.core.services;

import com.ping.secretsanta.core.repositories.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                return employeeRepository.findByUsername(username)
                        .orElseThrow(() -> new UsernameNotFoundException(String.format("User with username '%s' not found", username)));
            }
        };
    }
}
