package com.unibave.Lumina.model;
import java.util.Scanner;
import com.unibave.Lumina.interfaces.Cadastro;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "pacientes")
public class Usuario extends Pessoa implements Cadastro {

    private String email;
    private LocalDate dtNascimento;

    //Constructors
    public Usuario(){
        super();
    }
    public Usuario(String nome, LocalDate dtNascimento, String email){
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

    @Override
    public String toString(){
        return "Nome: " + getNome() +
                " \nData de nascimento: " + getDtNascimento() +
                "\nEmail: " + getEmail() +
                "\nAtivo: " + getAtivo() +
                " \nData de cadastro " + getDtCadastro();
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
