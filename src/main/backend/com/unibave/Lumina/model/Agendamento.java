package com.unibave.Lumina.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "agendamento", schema = "lumina")
public class Agendamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_agendamento", nullable = false, unique = true)
    private Long idAgendamento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"agendamentos"})
    @JoinColumn(name = "id_paciente")
    private Paciente paciente;

    @Enumerated(EnumType.STRING)
    @Column(name = "tp_visita", nullable = false)
    private TpVisita tpVisita;

    @Column(name = "dt_agendamento", nullable = false)
    private LocalDateTime dtAgendamento;

    @Column(name = "observacao")
    private String observacao;

    @OneToMany(mappedBy = "agendamento", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Anexo> anexos = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @Column(name = "dt_criacao", nullable = false, updatable = false)
    private LocalDateTime dtCriacao = LocalDateTime.now();

    @Column(name = "dt_modificao", nullable = false)
    private LocalDateTime dtModificacao = LocalDateTime.now();

    //Methods
    @Override
    public String toString() {
        return STR."id_agendamento, id_paciente, tp_visita, dt_agendamento, observacao, id_usuario, dt_criacao, dt_modificao = [\{getIdAgendamento()},\{paciente.getIdPaciente()}, \{getTpVisita()}, \{getDtAgendamento()}, \{getObservacao()}, \{usuario.getIdUsuario()}, \{getDtCriacao()}, \{getDtModificacao()}]";
    }

    //Enum Tipo de Visita (somente para a classe)
    public enum TpVisita {
        VISITA,
        CONSULTA
    }
}
