package com.unibave.Lumina.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "agendamento", schema = "lumina")
public class Agendamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_agendamento")
    private Long idAgendamento;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "id_paciente")
    private Paciente paciente;
    @Enumerated(EnumType.STRING)
    @Column(name = "tp_visita", nullable = false)
    private TpVisita tpVisita;
    @Column(name = "dt_agendamento", nullable = false)
    private LocalDateTime dtAgendamento;
    @Column(name = "observacao")
    private String observacao;
    @Column(name = "dt_criacao", nullable = false, updatable = false)
    private LocalDate dataCriacaoAgendamento = LocalDate.now();

    //Constructors
    public Agendamento() {
        this.dataCriacaoAgendamento = LocalDate.now();
    }

    public Agendamento(Paciente paciente, TpVisita tpVisita, LocalDateTime dataAgendamento, String observacoes){
        this.paciente = paciente;
        this.tpVisita = tpVisita;
        this.dtAgendamento = dataAgendamento;
        this.observacao = observacoes;
        this.dataCriacaoAgendamento = LocalDate.now();
    }
    //Methods
    @Override
    public String toString() {
        return STR."paciente_id, tp_visita, dt_agendamento, observacao, dt_criacao = [\{paciente.getIdPaciente()}, \{getTpVisita()}, \{getDtAgendamento()}, \{getObservacao()}, \{getDataCriacaoAgendamento()}]";
    }

    //Getter & Setter
    public Long getIdAgendamento() {
        return idAgendamento;
    }

    public Paciente getPaciente() {
        return paciente;
    }
    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public TpVisita getTpVisita() {
        return tpVisita;
    }
    public void setTpVisita(TpVisita tpVisita) {
        this.tpVisita = tpVisita;
    }

    public LocalDateTime getDtAgendamento() {
        return dtAgendamento;
    }
    public void setDtAgendamento(LocalDateTime dtAgendamento) {
        this.dtAgendamento = dtAgendamento;
    }

    public String getObservacao() {
        return observacao;
    }
    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public LocalDate getDataCriacaoAgendamento() {
        return dataCriacaoAgendamento;
    }

    //Enum Tipo de Visita (somente para a classe)
    public enum TpVisita {
        VISITA,
        CONSULTA
    }
}
