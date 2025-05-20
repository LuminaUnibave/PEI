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
    protected byte situacao;
    @Column(name = "dt_cadastro", nullable = false, unique = false, updatable = false)
    protected LocalDate dtCadastro;

    //Constructors

    public Pessoa (){
        this.situacao = 1;
        this.dtCadastro = LocalDate.now();
    }
    public Pessoa(String nome) {
        this.nome = nome;
        this.situacao = 1;
        this.dtCadastro = LocalDate.now();
    }

    //Methods
    @Override
    public String toString() {
        return "Nome " + nome + ", data de cadastro " + dtCadastro;
    }

    //Getter & Setter
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome.trim();
    }

    public byte getSituacao() {
        return situacao;
    }
    public void setSituacao(byte situacao) {
            this.situacao = situacao;
    }

    public LocalDate getDtCadastro() {
        return dtCadastro;
    }
    public void setDtCadastro(LocalDate dtCadastro) {
        this.dtCadastro = dtCadastro;
    }
}
