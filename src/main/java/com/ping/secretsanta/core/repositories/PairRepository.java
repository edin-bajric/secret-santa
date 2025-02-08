package com.ping.secretsanta.core.repositories;

import com.ping.secretsanta.core.models.Employee;
import com.ping.secretsanta.core.models.Pair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PairRepository extends JpaRepository<Pair, Integer> {
    Pair findByGiver(Optional<Employee> giver);
}
