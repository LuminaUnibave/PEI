package com.unibave.Lumina.model;

import com.unibave.Lumina.enums.Situacao;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "evento", schema = "lumina")
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evento")
    protected long idEvento;
    @Column(name = "dt_evento", nullable = false)
    protected LocalDate dataEvento;
    @Column(name = "nm_evento")
    protected String nomeEvento;
    @Column(name = "dsc_evento")
    protected String descricao;
    @Column(name = "st_evento")
    @Enumerated(EnumType.STRING)
    protected Situacao stEvento;
    @Column(name = "dt_criacao")
    protected LocalDate dtCriacao;

    //Methods
    @Override
    public String toString() {
        return STR."id_evento, dt_evento, nm_evento, dsc_evento, st_evento, dt_criacao= [\{getIdEvento()}, \{getDataEvento()}, \{getNomeEvento()}, \{getDescricao()}, \{getStEvento()}, \{getDtCriacao()}]";
    }
}


