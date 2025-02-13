package com.ping.secretsanta.core.repositories;

import com.ping.secretsanta.core.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    Optional<Employee> findByUsername(String username);
    boolean existsByUsername(String username);
}
