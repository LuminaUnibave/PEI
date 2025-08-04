package com.unibave.Lumina.model;

import com.unibave.Lumina.enums.Situacao;
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
    @Column(name = "nm_evento")
    protected String nomeEvento;
    @Column(name = "dsc_evento")
    protected String descricao;
    @Column(name = "st_evento")
    protected Situacao stEvento;
    @Column(name = "dt_criacao")
    protected LocalDate dtCriacao;

    //Contructors
    public Evento() {
        this.stEvento = Situacao.PENDENTE;
        this.dtCriacao = LocalDate.now();
    }

    public Evento(long idEvento, LocalDate data, String nomeEvento, String descricao) {
        this.idEvento = idEvento;
        this.dataEvento = data;
        this.nomeEvento = nomeEvento;
        this.descricao = descricao;
        this.stEvento = Situacao.PENDENTE;
        this.dtCriacao = LocalDate.now();
    }

    //Methods
    @Override
    public String toString() {
        return STR."dt_evento, nm_evento, dsc_evento, st_evento, dt_criacao= [\{getData()}, \{getNomeEvento()}, \{getDescricao()}, \{getStEvento()}, \{getDtCriacao()}]";
    }


    //Gets & Sets
    public long getIdEvento() {
        return idEvento;
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

    public LocalDate getDtCriacao() {
        return dtCriacao;
    }

    public Situacao getStEvento() {
        return stEvento;
    }
    public void setStEvento(Situacao stEvento) {
        this.stEvento = stEvento;
    }
}


