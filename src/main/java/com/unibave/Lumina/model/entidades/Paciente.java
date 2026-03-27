package com.unibave.Lumina.model.entidades;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.model.abstratos.Entidade;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "paciente", schema = "public")
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

    @Enumerated(EnumType.STRING)
    @Column(name = "situacao", nullable = false)
    protected Situacao situacao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    @JsonIgnore
    private Usuario usuario;

    @Column(name = "dt_cadastro", nullable = false)
    protected LocalDateTime dtCadastro;

    @Column(name = "dt_modificacao")
    protected LocalDateTime dtModificacao;

    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnore
    List<Agendamento> agendamentoList;

    @PrePersist
    public void prePersist() {
        this.dtCadastro = LocalDateTime.now();
        this.dtModificacao = LocalDateTime.now();
        if (this.situacao == null) {
            this.situacao = Situacao.ATIVO;
        }
    }

    @PreUpdate
    public void preUpdate() {
        this.dtModificacao = LocalDateTime.now();
    }
}