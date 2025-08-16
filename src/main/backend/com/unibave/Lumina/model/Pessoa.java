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
@MappedSuperclass
public abstract class Pessoa {

    @Column(name = "nome", nullable = false)
    protected String nome;
    @Column(name = "situacao", nullable = false)
    @Enumerated(EnumType.STRING)
    protected Situacao situacao;
    @Column(name = "dt_cadastro", nullable = false, updatable = false)
    protected LocalDate dtCadastro;
}
