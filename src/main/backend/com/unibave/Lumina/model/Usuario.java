package com.unibave.Lumina.model;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "usuario", schema = "lumina")
public class Usuario extends Pessoa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario", nullable = false, unique = true)
    protected Long idUsuario;
    @Column(name = "email", nullable = true, unique = false)
    protected String email;
    @Column(name = "senha", nullable = false, unique = false)
    protected  String senha;
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonManagedReference
    List<Agendamento> agendamentoList;

    //Methods
    @Override
    public String toString(){
        return STR."id_usuario, nome, email, senha, situacao, dt_cadastro = [\{getIdUsuario()}, \{getNome()}, \{getEmail()}, \{getSenha()}, \{getSituacao()}, \{getDtCadastro()}]";
    }

    //Constructors
    public Usuario(){
        super();
    }
    public Usuario(String nome, String email, String senha){
        super(nome);
        this.email = email;
        this.senha = senha;
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

    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }

    public List<Agendamento> getAgendamentoList() {
        return agendamentoList;
    }
    public void setAgendamentoList(List<Agendamento> agendamentoList) {
        this.agendamentoList = agendamentoList;
    }

}
