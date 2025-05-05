package com.unibave.Lumina.model;

import java.time.LocalDate;

public class Evento {
    private LocalDate data;
    private String titulo;
    private String descricao;

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

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        if(titulo == null || titulo.trim().isEmpty()){//verifica que o título não é vazio
            throw new IllegalArgumentException("Título não pode ser vazio.");
        }
        if(titulo.length() > 255){//verifica o tamanho do título
            throw new IllegalArgumentException("Título não pode exceder o tamanho.");
        }
        this.titulo = titulo;
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

    @Override
    public java.lang.String toString() {
        return getData() + " - " + getTitulo() + ": " + getDescricao();
    }
}
