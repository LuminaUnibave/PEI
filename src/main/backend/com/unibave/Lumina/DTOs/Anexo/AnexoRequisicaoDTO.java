package com.unibave.Lumina.DTOs.Anexo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO para criação de usuário (AnexoRequisicaoDTO)")
public class AnexoRequisicaoDTO {

    @Schema(description = "Tipo da extensão do anexo", example = "TXT")
    @NotBlank
    @NotNull
    private String extensao;

    @Schema(description = "Tamanho do anexo", example = "10000")
    @NotNull
    private Long tamanho;

    @Schema(description = "Conteudo do anexo", example = "")
    @NotNull
    private byte[] conteudo;

    @Schema(description = "Nome do anexo", example = "Nome_do_Anexo")
    @NotBlank
    @NotNull
    private String nmAnexo;

    @Schema(description = "Id da entidade referente", example = "1")
    @NotBlank
    @NotNull
    private Long idEntidade;

    @Schema(description = "Tipo da entidade referente", example = "AGENDAMENTO")
    @NotBlank
    @NotNull
    private String tpEntidade;
}
