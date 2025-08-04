package com.unibave.Lumina.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;


@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "paciente" , schema = "lumina")
public class Paciente extends Pessoa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_paciente", nullable = false, unique = true)
    protected Long idPaciente;
    @Column(name = "cpf", nullable = true, unique = true)
    protected String cpf;
    @Column(name = "dt_nascimento", nullable = false, unique = false)
    protected LocalDate dtNascimento;
    @Column(name = "crt_sus", nullable = true, unique = true)
    protected String crtSus;
    @Column(name = "email", nullable = true, unique = false)
    protected String email;
    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL)
    @JsonManagedReference
    List<Agendamento> agendamentoList;

    //Methods
    @Override
    public String toString(){
        return STR."nome, cpf, dt_nascimento, crtSus, email, situacao, dt_cadastro = [\{getNome()}, \{getCpf()}, \{getDtNascimento()}, \{getCrtSus()}, \{getEmail()}, \{getSituacao()}, \{getDtCadastro()}]";
    }

    //Constructors
    public Paciente(){
        super();
    }
    public Paciente(String nome, LocalDate dtNascimento, String email, String cpf, String crtSus){
        super(nome);
        this.email = email;
        this.dtNascimento = dtNascimento;
        this.cpf = cpf;
        this.crtSus = crtSus;
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

    public String getCpf() {
        return cpf;
    }
    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getCrtSus() {
        return crtSus;
    }
    public void setCrtSus(String crtSus) {
        this.crtSus = crtSus;
    }

    public List<Agendamento> getAgendamentoList() {
        return agendamentoList;
    }
}
