package com.unibave.Lumina.model;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

public abstract class Pessoa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private byte ativo;
    private LocalDate dtCadastro;

    //Constructors
    public Pessoa (){
        this.ativo = 1;
        this.dtCadastro = LocalDate.now();
    }
    public Pessoa(String nome) {
        this.nome = nome;
        this.ativo = 1;
        this.dtCadastro = LocalDate.now();
    }

    //Methods
    @Override
    public String toString() {
        return "nome " + nome + " Data de cadastro " + dtCadastro;
    }

    //Getter & Setter
    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public byte getAtivo() {
        return ativo;
    }

    public void setAtivo(byte ativo) {
        this.ativo = ativo;
    }

    public LocalDate getDtCadastro() {
        return dtCadastro;
    }

    public void setDtCadastro(LocalDate dtCadastro) {
        this.dtCadastro = dtCadastro;
    }
}
