package com.unibave.Lumina.model;

import com.unibave.Lumina.interfaces.Cadastro;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "pacientes")
public class Paciente extends Pessoa implements Cadastro {
    private String email;

    //Constructors
    public Paciente(){
        super();
    }
    public Paciente(String nome){
        super(nome);
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

    //Getter & Setter
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
