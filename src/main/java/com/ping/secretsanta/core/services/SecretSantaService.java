package com.ping.secretsanta.core.services;

import com.ping.secretsanta.core.models.Employee;
import com.ping.secretsanta.core.models.Pair;
import com.ping.secretsanta.core.repositories.EmployeeRepository;
import com.ping.secretsanta.core.repositories.PairRepository;
import com.ping.secretsanta.rest.dto.PairDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SecretSantaService {
    private final EmployeeRepository employeeRepository;
    private final PairRepository pairRepository;

    public void generatePairs() {
        List<Employee> employees = employeeRepository.findAll();
        if (employees.size() < 2) {
            throw new IllegalStateException("Not enough employees to generate pairs");
        }

        pairRepository.deleteAll();

        List<Employee> receivers = new ArrayList<>(employees);
        Collections.shuffle(receivers);

        List<Pair> pairs = new ArrayList<>();
        int employeeCount = employees.size();

        Collections.shuffle(employees);

        for (int i = 0; i < employeeCount; i++) {
            Employee giver = employees.get(i);
            Employee receiver = receivers.get(i);

            if (giver.equals(receiver)) {
                Collections.swap(receivers, i, (i + 1) % employeeCount);
                receiver = receivers.get(i);
            }

            Pair pair = new Pair();
            pair.setGiver(giver);
            pair.setReceiver(receiver);
            pairs.add(pair);
        }

        pairRepository.saveAll(pairs);
    }

    public List<PairDTO> getAllPairs() {
        List<Pair> pairs = pairRepository.findAll();
        return pairs.stream().map(pair -> new PairDTO(
                pair.getGiver().getName() + " " + pair.getGiver().getSurname(),
                pair.getReceiver().getName() + " " + pair.getReceiver().getSurname()
        )).toList();
    }

}
