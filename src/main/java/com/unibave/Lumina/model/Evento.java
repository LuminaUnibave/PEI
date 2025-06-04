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
        if(data == null){//verifica que a dataEvento não é nula
            throw new IllegalArgumentException("Data não pode ser nula.");
        }
        if(data.isBefore(LocalDate.now())){//impede o cadastro de um evento em uma dataEvento já passada
            throw new IllegalArgumentException("Evento não pode ser no passado.");
        }
        this.dataEvento = data;
    }

    public String getNomeEvento() {
        return nomeEvento;
    }

    public void setNomeEvento(String nomeEvento) {
        if(nomeEvento == null || nomeEvento.trim().isEmpty()){//verifica que o título não é vazio
            throw new IllegalArgumentException("Título não pode ser vazio.");
        }
        if(nomeEvento.length() > 255){//verifica o tamanho do título
            throw new IllegalArgumentException("Título não pode exceder o tamanho.");
        }
        this.nomeEvento = nomeEvento;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        if(descricao != null && descricao.length() > 255){//verifica o tamanho da descrição
            throw new IllegalArgumentException("Descrição não pode exceder o tamanho.");
        }
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
