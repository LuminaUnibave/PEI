package com.unibave.Lumina.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "agendamento", schema = "lumina")
public class Agendamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_agendamento")
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
    @Column(name = "anexo")
    private Anexo anexo;
    @Column(name = "id_usuario")
    @ManyToOne(fetch = FetchType.LAZY)
    private Usuario usuario;
    @Column(name = "dt_criacao", nullable = false, updatable = false)
    private LocalDate dataCriacaoAgendamento;

    //Methods
    @Override
    public String toString() {
        return STR."id_agendamento, id_paciente, tp_visita, dt_agendamento, observacao, id_usuario, dt_criacao = [\{getIdAgendamento()},\{paciente.getIdPaciente()}, \{getTpVisita()}, \{getDtAgendamento()}, \{getObservacao()}, \{usuario.getIdUsuario()}, \{getDataCriacaoAgendamento()}]";
    }

    //Enum Tipo de Visita (somente para a classe)
    public enum TpVisita {
        VISITA,
        CONSULTA
    }
}
