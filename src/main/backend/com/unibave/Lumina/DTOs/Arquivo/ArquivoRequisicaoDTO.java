package com.unibave.Lumina.DTOs.Arquivo;

import com.unibave.Lumina.enums.Extensao;
import com.unibave.Lumina.enums.TpEntidade;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO para criação de usuário (AnexoRequisicaoDTO)")
public class ArquivoRequisicaoDTO {

    @Schema(description = "Tamanho do anexo", example = "10000")
    @NotNull
    private Long tamanho;

    @Schema(description = "Conteudo do anexo", example = "")
    @NotNull
    private byte[] conteudo;

    @Schema(description = "Nome do arquivo", example = "Nome_do_Arquivo")
    @NotBlank
    @NotNull
    private String nmArquivo;

    @Schema(description = "Id da entidade referente", example = "1")
    @NotBlank
    @NotNull
    private Long idEntidade;

    @Schema(description = "Tipo da entidade referente", example = "EVENTO")
    @NotBlank
    @NotNull
    private String tpEntidade;

    public ArquivoRequisicaoDTO(MultipartFile multipartFile, Long idEntidade, String tpEntidade) throws IOException {
        this.tamanho = multipartFile.getSize();
        this.conteudo = multipartFile.getBytes();
        this.nmArquivo = multipartFile.getOriginalFilename();
        this.idEntidade = idEntidade;
        this.tpEntidade = tpEntidade;
    }
}
