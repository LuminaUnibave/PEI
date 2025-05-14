package com.unibave.Lumina.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter // usando lombok para diminuir quantidade de código
@Setter
public class Agendamento {

    private Long id;
    private String nome;
    private String tipoVisita; // Se é visita ou consulta
    private LocalDateTime dataHora;
    private String observacoes;

    public Agendamento() {
        this.id = id;
        this.nome = nome;
        this.tipoVisita = tipoVisita;
        this.dataHora = dataHora;
        this.observacoes = observacoes;
    }


}
