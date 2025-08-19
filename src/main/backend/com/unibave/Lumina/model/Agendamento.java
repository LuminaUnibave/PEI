package com.unibave.Lumina.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "agendamento", schema = "lumina")
public class Agendamento implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_agendamento", nullable = false, unique = true)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"agendamentos"})
    @JoinColumn(name = "id_paciente")
    private Paciente paciente;

    @Enumerated(EnumType.STRING)
    @Column(name = "tp_visita", nullable = false)
    private TpVisita tpVisita;

    @Column(name = "dt_agendamento", nullable = false)
    private LocalDateTime dtAgendamento;

    @Column(name = "observacao")
    private String observacao;

    @OneToMany(mappedBy = "agendamento", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Anexo> anexos = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    @JsonBackReference
    private Usuario usuario;

    @Column(name = "dt_criacao", nullable = false, updatable = false)
    @CreatedDate
    private LocalDateTime dtCriacao;

    @Column(name = "dt_modificao")
    @LastModifiedDate
    private LocalDateTime dtModificacao;

    @Version
    @Column(name = "version", nullable = false)
    protected Long version = 0L;

    //Enum Tipo de Visita (somente para a classe)
    public enum TpVisita {
        VISITA,
        CONSULTA
    }
}
