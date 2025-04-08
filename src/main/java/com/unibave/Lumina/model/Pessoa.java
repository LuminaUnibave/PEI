package com.unibave.Lumina.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@MappedSuperclass
public abstract class Pessoa {

    protected String nome;
    protected byte ativo;
    protected LocalDate dtCadastro;
    public DateTimeFormatter formataData = DateTimeFormatter.ofPattern("dd/MM/yyyy");

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
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        if (nome == null) {
            throw new IllegalArgumentException("Nome não pode ser nulo");
        }
        if (nome.trim().isEmpty()) {
            throw new IllegalArgumentException("Nome não pode ser vazio");
        }
        if (nome.length() > 50) { // Limite arbitrário, ajuste conforme necessidade
            throw new IllegalArgumentException("Nome não pode ter mais que 100 caracteres");
        }
        // Verificar se contém apenas caracteres válidos
        if (!nome.matches("[a-zA-ZÀ-ÿ\\s]+")) {
            throw new IllegalArgumentException("Nome deve conter apenas letras e espaços");
        }
        this.nome = nome.trim();
    }

    public byte getAtivo() {
        return ativo;
    }

    public void setAtivo(byte ativo) {
        if (ativo != 0 && ativo != 1) {
            throw new IllegalArgumentException("Ativo deve ser 0 (inativo) ou 1 (ativo)");
        }
        this.ativo = ativo;
    }

    public LocalDate getDtCadastro() {
        return dtCadastro;
    }

    public void setDtCadastro(LocalDate dtCadastro) {
        if (dtCadastro == null) {
            throw new IllegalArgumentException("Data de cadastro não pode ser nula");
        }
        if (dtCadastro.isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("Data de cadastro não pode ser futura");
        }
        this.dtCadastro = dtCadastro;
    }
}
