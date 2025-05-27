package com.unibave.Lumina.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@MappedSuperclass
public abstract class Pessoa {

    @Column(name = "nome", nullable = false, unique = false)
    protected String nome;
    @Column(name = "situacao", nullable = false, unique = false)
    protected Situacao situacao;
    @Column(name = "dt_cadastro", nullable = false, unique = false, updatable = false)
    protected LocalDate dtCadastro;

    //Constructors
    public Pessoa (){
        this.situacao = Situacao.ATIVO;
        this.dtCadastro = LocalDate.now();
    }
    public Pessoa(String nome) {
        this.nome = nome;
        this.situacao = Situacao.ATIVO;
        this.dtCadastro = LocalDate.now();
    }

    //Getter & Setter
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome.trim();
    }

    public Situacao getSituacao() {
        return situacao;
    }
    public void setSituacao(Situacao situacao) {
            this.situacao = situacao;
    }

    public LocalDate getDtCadastro() {
        return dtCadastro;
    }
    public void setDtCadastro(LocalDate dtCadastro) {
        this.dtCadastro = dtCadastro;
    }
}
