package com.unibave.Lumina.model.entidades;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.unibave.Lumina.model.abstratos.Entidade;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "agendamento", schema = "public")
public class Agendamento extends Entidade implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_agendamento", nullable = false, unique = true)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"agendamentos"})
    @JoinColumn(name = "id_paciente")
    @JsonBackReference
    private Paciente paciente;

    @Enumerated(EnumType.STRING)
    @Column(name = "tp_visita", nullable = false)
    private TpVisita tpVisita;

    @Column(name = "dt_agendamento", nullable = false)
    private LocalDateTime dtAgendamento;

    @Column(name = "observacao", length = 1000)
    private String observacao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    @JsonBackReference
    private Usuario usuario;

    //Enum Tipo de Visita (somente para a classe)
    public enum TpVisita {
        VISITA,
        CONSULTA
    }
}
