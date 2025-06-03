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
    protected LocalDate data;
    @Column(name = "nome_evento")
    protected String nome;
    @Column(name = "descricao_evento")
    protected String descricao;

    public Evento() {
    }

    public Evento(long idEvento, LocalDate data, String nome, String descricao) {
        this.idEvento = idEvento;
        this.data = data;
        this.nome = nome;
        this.descricao = descricao;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        if(data == null){//verifica que a data não é nula
            throw new IllegalArgumentException("Data não pode ser nula.");
        }
        if(data.isBefore(LocalDate.now())){//impede o cadastro de um evento em uma data já passada
            throw new IllegalArgumentException("Evento não pode ser no passado.");
        }
        this.data = data;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String titulo) {
        if(titulo == null || titulo.trim().isEmpty()){//verifica que o título não é vazio
            throw new IllegalArgumentException("Título não pode ser vazio.");
        }
        if(titulo.length() > 255){//verifica o tamanho do título
            throw new IllegalArgumentException("Título não pode exceder o tamanho.");
        }
        this.nome = titulo;
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
        return STR."\{getData()} - \{getNome()}: \{getDescricao()}";
    }
}
