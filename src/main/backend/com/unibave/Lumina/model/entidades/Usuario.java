package com.unibave.Lumina.model.entidades;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.unibave.Lumina.enums.TpUsuario;
import com.unibave.Lumina.model.abstratos.Entidade;
import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "usuario", schema = "public")
public class Usuario extends Entidade implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario", nullable = false, unique = true)
    protected Long id;

    @Column(name = "nome", nullable = false)
    protected String nome;

    @Column(name = "email", nullable = false, unique = true)
    protected String email;

    @Column(name = "senha", nullable = false)
    protected  String senha;

    @Column(name = "tp_usuario", nullable = false)
    protected TpUsuario tpUsuario;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnore
    List<Agendamento> agendamentoList;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnore
    List<Evento> eventoList;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnore
    List<Paciente> pacienteList;
}
