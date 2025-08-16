package com.unibave.Lumina.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "paciente" , schema = "lumina")
public class Paciente extends Pessoa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_paciente", nullable = false, unique = true)
    protected Long idPaciente;

    @Column(name = "cpf", unique = true)
    protected String cpf;

    @Column(name = "dt_nascimento", nullable = false)
    protected LocalDate dtNascimento;

    @Column(name = "crt_sus", unique = true)
    protected String crtSus;

    @Column(name = "email")
    protected String email;

    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL)
    @JsonManagedReference
    List<Agendamento> agendamentoList;

    //Methods
    @Override
    public String toString(){
        return STR."id_paciente, nome, cpf, dt_nascimento, crtSus, email, situacao, dt_cadastro, dt_modificao = [\{getIdPaciente()}, \{getNome()}, \{getCpf()}, \{getDtNascimento()}, \{getCrtSus()}, \{getEmail()}, \{getSituacao()}, \{getDtCadastro()}, \{getDtModificacao()}]";
    }
}
