package com.unibave.Lumina.model;

import com.unibave.Lumina.interfaces.Cadastro;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Scanner;

@Entity
@Table(name = "pacientes")
public class Paciente extends Pessoa implements Cadastro {
    private String email;
    private LocalDate dtNascimento;
    //Constructors
    public Paciente(){
        super();
    }
    public Paciente(String nome, LocalDate dtNascimento, String email){
        super(nome);
        this.email = email;
        this.dtNascimento = dtNascimento;
    }

    //Methods
    @Override
    public void cadastrar() {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Digite seu nome: ");
        setNome(scanner.nextLine());
        System.out.print("Digite seu E-mail: ");
        setEmail(scanner.nextLine());
        System.out.print("Digite sua data de nascimento: ");
        setDtNascimento(LocalDate.parse(scanner.nextLine()));
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
    public LocalDate getDtNascimento() {
        return dtNascimento;
    }

    public void setDtNascimento(LocalDate dtNascimento) {
        this.dtNascimento = dtNascimento;
    }
}
