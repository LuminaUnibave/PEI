package com.unibave.Lumina.model;
import com.unibave.Lumina.enums.Situacao;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
public abstract class Pessoa {

    @Column(name = "nome", nullable = false)
    protected String nome;

    @Column(name = "situacao", nullable = false)
    @Enumerated(EnumType.STRING)
    protected Situacao situacao;

    @Version
    @Column(name = "version", nullable = false)
    protected Long version = 0L;

    @Column(name = "dt_cadastro", nullable = false, updatable = false)
    @CreatedDate
    protected LocalDateTime dtCadastro;

    @Column(name = "dt_modificao")
    @LastModifiedDate
    private LocalDateTime dtModificacao  = LocalDateTime.now();

    @PrePersist
    protected void onCreate() {
        if (this.getDtCadastro() == null) {
            this.setDtCadastro(LocalDateTime.now());
        }
    }
}
