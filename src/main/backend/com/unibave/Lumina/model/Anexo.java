package com.unibave.Lumina.model;

import com.unibave.Lumina.enums.Extensao;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "anexos", schema = "lumina")
public class Anexo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_anexo", nullable = false)
    private Long idAnexo;
    @Column(name = "extensao", nullable = false)
    @Enumerated(EnumType.STRING)
    private Extensao extensao;
    @Column(name = "tamanho", nullable = false)
    private Long tamanho;
    @Column(name = "conteudo", nullable = false)
    @Lob
    private byte[] conteudo;
    @Column(name = "nome", nullable = false)
    private String nome;
    @Column(name = "dt_upload", nullable = false)
    private LocalDateTime dataUpload = LocalDateTime.now();

    //Gets e Sets

}
