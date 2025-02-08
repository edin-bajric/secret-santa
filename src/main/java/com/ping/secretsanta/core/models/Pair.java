package com.ping.secretsanta.core.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.Index;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
        name = "pair",
        uniqueConstraints = {
                @UniqueConstraint(name = "unique_pair", columnNames = {"giver_id", "receiver_id"})
        },
        indexes = {
                @Index(name = "fk_employee_id_pair_giver_id", columnList = "giver_id"),
                @Index(name = "fk_employee_id_pair_receiver_id", columnList = "receiver_id")
        }
)
public class Pair {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "giver_id", nullable = false, foreignKey = @ForeignKey(name = "fk_employee_id_pair_giver_id"))
    private Employee giver;

    @ManyToOne(optional = false)
    @JoinColumn(name = "receiver_id", nullable = false, foreignKey = @ForeignKey(name = "fk_employee_id_pair_receiver_id"))
    private Employee receiver;

}
