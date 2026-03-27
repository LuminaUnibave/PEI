package com.unibave.Lumina.model.entidades;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.unibave.Lumina.model.abstratos.Entidade;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Getter
@Setter
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
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

    @Column(name = "dsc_evento", length = 2000)
    protected String descricao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    @JsonBackReference
    private Usuario usuario;

    public String getDtEventoFormatado() {
        DateTimeFormatter formatterCompleto = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        String dataHoraFormatada = dtEvento.format(formatterCompleto);
        return dataHoraFormatada;
    }
}


