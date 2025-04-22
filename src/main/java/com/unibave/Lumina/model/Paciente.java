package com.unibave.Lumina.model;

import com.unibave.Lumina.interfaces.ICadastro;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Scanner;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "paciente" , schema = "lumina")
public class Paciente extends Pessoa implements ICadastro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_paciente", nullable = false, unique = true)
    protected Long idPaciente;
    @Column(name = "email", nullable = true, unique = false)
    protected String email;
    @Column(name = "dt_nascimento", nullable = false, unique = false)
    protected LocalDate dtNascimento;


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
        System.out.print("Digite sua data de nascimento: (dd/mm/aaaa) ");
        String dataInput = scanner.nextLine();
        DateTimeFormatter inputFormato = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate dataFormatada = LocalDate.parse(dataInput, inputFormato);
        setDtNascimento(dataFormatada);
    }

    //Getter & Setter
    public Long getIdPaciente() {
        return idPaciente;
    }

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
