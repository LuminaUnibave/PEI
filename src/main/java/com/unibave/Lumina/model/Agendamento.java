package com.unibave.Lumina.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "agendamentos", schema = "lumina")
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_agendamento")
    private Long idAgendamento;

    @Column(name = "nm_nome", nullable = false)
    private String nome;

    @Column(name = "tp_visita", nullable = false)
    private String tipoVisita; // "Consulta" ou "Visita"

    @Column(name = "dt_agendamento", nullable = false)
    private LocalDateTime dataAgendamento; // Agendamento da consulta/visita

    @Column(name = "dt_criacao", nullable = false, updatable = false)
    private LocalDateTime dataCriacaoAgendamento = LocalDateTime.now();

    @Column(name = "ds_observacoes")
    private String observacoes;

    public Agendamento() {
        this.dataCriacaoAgendamento = LocalDateTime.now(); // Data que foi realizado o agendamento
    }


    public Agendamento(String nome, String tipoVisita, LocalDateTime dataAgendamento, String observacoes) {
        this.nome = nome;
        this.tipoVisita = tipoVisita;
        this.dataAgendamento = dataAgendamento;
        this.observacoes = observacoes;
        this.dataCriacaoAgendamento = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "Id agendamento: " + idAgendamento  + ", Nome: " + nome + ", Data da visita: " + dataAgendamento + "\nObs: " + observacoes;
    }


    public Long getIdAgendamento() {
        return idAgendamento;
    }

    public void setIdAgendamento(Long idAgendamento) {
        this.idAgendamento = idAgendamento;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        if (nome == null || nome.trim().isEmpty()) {
            throw new IllegalArgumentException("Nome não pode ser nulo");
        }

        if (nome.length() > 255) { // Limite arbitrário, ajuste conforme necessidade
            throw new IllegalArgumentException("Nome não pode ter mais que 255 caracteres");
        }
        // Verificar se contém apenas caracteres válidos
        if (!nome.matches("[a-zA-ZÀ-ÿ\\s.-]+")) {
            throw new IllegalArgumentException("Nome contém caractere inválido. Permitido apenas letras, espaços, pontos e hífens.");
        }
        this.nome = nome.trim();
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        if (observacoes == null || observacoes.trim().isEmpty()){
            throw new IllegalArgumentException("Observação não pode ser nula");
        }

        if (observacoes.length() > 1000) {
            throw new IllegalArgumentException("Nome não pode ter mais que 255 caracteres");
        }

        this.observacoes = observacoes.trim();
    }

    public LocalDateTime getDataCriacaoAgendamento() {
        return dataCriacaoAgendamento;
    }

    public void setDataCriacaoAgendamento(LocalDateTime dataCriacaoAgendamento) {
        if (!dataCriacaoAgendamento.toLocalDate().equals(LocalDate.now())) {
            throw new IllegalArgumentException("A data de cadastro deve ser a data atual.");
        }
        this.dataCriacaoAgendamento = dataCriacaoAgendamento;
    }
}
