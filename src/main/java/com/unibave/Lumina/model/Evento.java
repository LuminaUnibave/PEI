package com.unibave.Lumina.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "evento", schema = "lumina")
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evento")
    protected long idEvento;
    @Column(name = "dt_evento", nullable = false)
    protected LocalDate dataEvento;
    @Column(name = "nome_evento")
    protected String nomeEvento;
    @Column(name = "descricao_evento"
    )
    protected String descricao;

    public Evento() {
    }

    public Evento(long idEvento, LocalDate data, String nomeEvento, String descricao) {
        this.idEvento = idEvento;
        this.dataEvento = data;
        this.nomeEvento = nomeEvento;
        this.descricao = descricao;
    }

    public LocalDate getData() {
        return dataEvento;
    }

    public void setData(LocalDate data) {
        this.dataEvento = data;
    }

    public String getNomeEvento() {
        return nomeEvento;
    }

    public void setNomeEvento(String nomeEvento) {
        this.nomeEvento = nomeEvento;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public long getIdEvento() {
        return idEvento;
    }

    @Override
    public String toString() {
        return STR."\{getData()} - \{getNomeEvento()}: \{getDescricao()}";
    }
}
