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
@Table(name = "arquivo", schema = "lumina")
public class Arquivo extends Entidade implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_arquivo", nullable = false, unique = true)
    private Long id;

    @Column(name = "tamanho", nullable = false)
    private Long tamanho;

    @Column(name = "conteudo", columnDefinition = "bytea")
    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] conteudo;

    @Column(name = "nm_arquivo")
    private String nmArquivo;

    @Column(name = "id_entidade")
    private Long idEntidade;

    @Column(name = "tp_entidade")
    private TpEntidade tpEntidade;

    public String getExtensao(String nmArquivo) {
        int index = nmArquivo.lastIndexOf(".");
        return (index > 0) ? nmArquivo.substring(index + 1).toUpperCase() : "ERRO";
    }

}
