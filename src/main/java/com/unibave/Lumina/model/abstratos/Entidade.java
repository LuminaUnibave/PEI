package com.unibave.Lumina.model.abstratos;

import com.unibave.Lumina.enums.Situacao;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
public abstract class Entidade {

    @Version
    @Column(name = "version", nullable = false)
    protected Long version = 0L;

    @Column(name = "dt_cadastro", nullable = false, updatable = false)
    @CreatedDate
    protected LocalDateTime dtCadastro;

    @Column(name = "dt_modificao")
    @LastModifiedDate
    private LocalDateTime dtModificacao  = LocalDateTime.now();

    @Column(name = "situacao", nullable = false)
    @Enumerated(EnumType.STRING)
    protected Situacao situacao = Situacao.ATIVO;

    @PrePersist
    protected void onCreate() {
        if (this.getDtCadastro() == null) {
            this.setDtCadastro(LocalDateTime.now());
        }
    }
}
