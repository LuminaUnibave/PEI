package com.unibave.Lumina.model.entidades;

import com.unibave.Lumina.enums.Extensao;
import com.unibave.Lumina.enums.TpEntidade;
import com.unibave.Lumina.model.abstratos.Entidade;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Getter
@Setter
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "arquivo", schema = "public")
public class Arquivo extends Entidade implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_arquivo", nullable = false, unique = true)
    private Long id;

    @Column(name = "tamanho", nullable = false)
    private Long tamanho;

    @Column(name = "caminho", length = 500)
    private String caminho;

    @Column(name = "nm_arquivo", nullable = false, length = 255)
    private String nmArquivo;

    @Column(name = "id_entidade")
    private Long idEntidade;

    @Column(name = "tp_entidade", length = 50)
    @Enumerated(EnumType.STRING)
    private TpEntidade tpEntidade;

    @Column(name = "extensao", length = 10)
    @Enumerated(EnumType.STRING)
    private Extensao extensao;

    @Column(name = "content_type", length = 100)
    private String contentType;

    @Transient
    public String getExtensaoFromNome() {
        if (nmArquivo == null || nmArquivo.trim().isEmpty()) {
            return "ERRO";
        }
        int index = nmArquivo.lastIndexOf(".");
        return (index > 0) ? nmArquivo.substring(index + 1).toUpperCase() : "ERRO";
    }

    @PreUpdate
    private void prePersist() {
        if (this.extensao == null && this.nmArquivo != null) {
            String extensaoStr = getExtensaoFromNome();
            try {
                this.extensao = Extensao.valueOf(extensaoStr);
            } catch (IllegalArgumentException e) {
                this.extensao = Extensao.ERRO;
            }
        }
    }
}