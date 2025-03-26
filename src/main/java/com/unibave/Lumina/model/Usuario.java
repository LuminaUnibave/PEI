package com.unibave.Lumina.model;
import java.util.Scanner;
import com.unibave.Lumina.interfaces.Cadastro;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "usuario", schema = "lumina")
public class Usuario extends Pessoa implements Cadastro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long idUsuario;
    protected String email;

    //Constructors
    public Usuario(){
        super();
    }
    public Usuario(String nome, String email){
        super(nome);
        this.email = email;
    }

    //Methods
    @Override
    public void cadastrar() {

    }

    @Override
    public void atualizar() {
    }

    @Override
    public void excluir() {
    }

    @Override
    public String toString(){
        return "Nome: " + getNome() +
                "\nEmail: " + getEmail() +
                "\nAtivo: " + getAtivo() +
                " \nData de cadastro " + getDtCadastro();
    }

    //Getter & Setter
    public Long getIdUsuario() {
        return idUsuario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
