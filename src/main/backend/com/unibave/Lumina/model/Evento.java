package com.unibave.Lumina.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.unibave.Lumina.enums.Situacao;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "evento", schema = "lumina")
public class Evento implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evento", nullable = false, unique = true)
    protected long idEvento;

    @Column(name = "dt_evento", nullable = false)
    protected LocalDateTime dtEvento;

    @Column(name = "nm_evento")
    protected String nomeEvento;

    @Column(name = "dsc_evento")
    protected String descricao;

    @Column(name = "st_evento", nullable = false)
    @Enumerated(EnumType.STRING)
    protected Situacao stEvento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @OneToMany(mappedBy = "evento", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Anexo> anexos = new ArrayList<>();

    @Column(name = "dt_criacao", nullable = false, updatable = false)
    protected LocalDateTime dtCriacao = LocalDateTime.now();

    @Column(name = "dt_modificao", nullable = false)
    private LocalDateTime dtModificacao = LocalDateTime.now();

    //Methods
    @Override
    public String toString() {
        return STR."id_evento, dt_evento, nm_evento, dsc_evento, st_evento, dt_criacao, dt_modificao = [\{getIdEvento()}, \{getDtEvento()}, \{getNomeEvento()}, \{getDescricao()}, \{getStEvento()}, \{getDtCriacao()}, \{getDtModificacao()}]";
    }
}


