package com.unibave.Lumina.model;

import com.unibave.Lumina.enums.Extensao;
import com.unibave.Lumina.enums.TipoEntidade;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "anexo", schema = "lumina")
public class Anexo implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_anexo", nullable = false, unique = true)
    private Long id;

    @Column(name = "extensao", nullable = false)
    @Enumerated(EnumType.STRING)
    private Extensao extensao;

    @Column(name = "tamanho", nullable = false)
    private Long tamanho;

    @Column(name = "conteudo")
    @Lob
    private byte[] conteudo ;

    @Column(name = "nm_anexo")
    private String nomeAnexo;

    @Column(name = "dt_upload", nullable = false, updatable = true)
    @CreatedDate
    private LocalDateTime dataUpload;

    @Version
    @Column(name = "version", nullable = false)
    protected Long version = 0L;

    @ManyToOne
    @JoinColumn(name = "id_evento")
    private Evento evento;

    @ManyToOne
    @JoinColumn(name = "id_agendamento")
    private Agendamento agendamento;
}
