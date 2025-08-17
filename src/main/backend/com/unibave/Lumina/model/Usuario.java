package com.unibave.Lumina.model;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "usuario", schema = "lumina")
public class Usuario extends Pessoa implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario", nullable = false, unique = true)
    protected Long idUsuario;

    @Column(name = "email")
    protected String email;

    @Column(name = "senha", nullable = false)
    protected  String senha;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonManagedReference
    List<Agendamento> agendamentoList;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonManagedReference
    List<Evento> eventoList;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonManagedReference
    List<Paciente> pacienteList;

    //Methods
    @Override
    public String toString(){
        return STR."id_usuario, nome, email, senha, situacao, dt_cadastro, dt_modificao = [\{getIdUsuario()}, \{getNome()}, \{getEmail()}, \{getSenha()}, \{getSituacao()}, \{getDtCadastro()}, \{getDtModificacao()}]";
    }
}
