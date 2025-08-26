package com.unibave.Lumina.model.entidades;

import com.unibave.Lumina.enums.Extensao;
import com.unibave.Lumina.enums.TpEntidade;
import com.unibave.Lumina.model.abstratos.Entidade;
import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "anexo", schema = "lumina")
public class Anexo extends Entidade implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_anexo", nullable = false, unique = true)
    private Long id;

    @Column(name = "extensao", nullable = false)
    @Enumerated(EnumType.STRING)
    private Extensao extensao;

    @Column(name = "tamanho", nullable = false)
    private Long tamanho;

    @Column(name = "conteudo", columnDefinition = "bytea")
    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] conteudo;

    @Column(name = "nm_anexo")
    private String nmAnexo;

    @Column(name = "id_entidade")
    private Long idEntidade;

    @Column(name = "tp_entidade")
    private TpEntidade tpEntidade;
}
