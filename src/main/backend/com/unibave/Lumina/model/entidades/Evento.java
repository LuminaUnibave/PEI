package com.unibave.Lumina.model.entidades;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.unibave.Lumina.model.abstratos.Entidade;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "evento", schema = "public")
public class Evento extends Entidade implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evento", nullable = false, unique = true)
    protected long id;

    @Column(name = "dt_evento", nullable = false)
    protected LocalDateTime dtEvento;

    @Column(name = "nm_evento")
    protected String nmEvento;

    @Column(name = "dsc_evento")
    protected String descricao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    @JsonBackReference
    private Usuario usuario;

    private List<Arquivo> arquivos = new ArrayList<>();
}


