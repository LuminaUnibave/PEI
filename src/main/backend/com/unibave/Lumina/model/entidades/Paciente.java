package com.unibave.Lumina.model.entidades;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.unibave.Lumina.model.abstratos.Entidade;
import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;


@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "paciente" , schema = "lumina")
public class Paciente extends Entidade implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_paciente", nullable = false, unique = true)
    protected Long id;

    @Column(name = "nome", nullable = false)
    protected String nome;

    @Column(name = "sobrenome")
    protected String sobrenome;

    @Column(name = "cpf", unique = true)
    protected String cpf;

    @Column(name = "dt_nascimento", nullable = false)
    protected LocalDate dtNascimento;

    @Column(name = "crt_sus", unique = true)
    protected String crtSus;

    @Column(name = "email")
    protected String email;

    @Column(name = "contato")
    protected String contato;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    @JsonIgnore
    private Usuario usuario;

    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL)
    @JsonManagedReference
    List<Agendamento> agendamentoList;
}
