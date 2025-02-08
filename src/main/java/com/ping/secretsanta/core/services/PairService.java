package com.ping.secretsanta.core.services;

import com.ping.secretsanta.core.models.Employee;
import com.ping.secretsanta.core.models.Pair;
import com.ping.secretsanta.core.repositories.EmployeeRepository;
import com.ping.secretsanta.core.repositories.PairRepository;
import com.ping.secretsanta.rest.dto.ReceiverDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PairService {
    private final PairRepository pairRepository;
    private final EmployeeRepository employeeRepository;

    public ReceiverDTO findReceiverByUsername(String username) {
        Optional<Employee> giver = employeeRepository.findByUsername(username);
        if (giver.isEmpty()) {
            throw new IllegalArgumentException("Employee not found");
        }

        Pair pair = pairRepository.findByGiver(giver);
        if (pair == null) {
            return new ReceiverDTO(null, null);
        }

        Employee receiver = pair.getReceiver();
        return new ReceiverDTO(receiver.getName(), receiver.getSurname());
    }
}
