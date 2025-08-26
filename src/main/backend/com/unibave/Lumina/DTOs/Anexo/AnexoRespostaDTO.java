package com.unibave.Lumina.DTOs.Anexo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AnexoRespostaDTO {
    private Long id;
    private String extensao;
    private Long tamanho;
    private byte[] conteudo;
    protected String nmAnexo;
    private Long idEntidade;
    private String tpEntidade;
    private LocalDateTime dtCadastro;
    private String situacao;
}
