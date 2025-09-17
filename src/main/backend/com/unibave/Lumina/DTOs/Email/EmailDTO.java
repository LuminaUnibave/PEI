package com.unibave.Lumina.DTOs.Email;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO para envio de e-mail")
public class EmailDTO {

    @NotNull
    @NotBlank
    @Schema( description = "Endereço de e-mail do destinatário", example = "fulano@gmail.com")
    private String destinatario;

    @Schema(description = "Assunto do e-mail", example = "Agendamento de consulta")
    private String assunto;

    @NotNull
    @NotBlank
    @Schema(description = "Conteúdo do e-mail", example = "Bom dia, Sr(a) Fulano da Silva. Consulta agendada para o dia 2")
    private String conteudo;

    @Schema(description = "Arquivo de anexo", example = "documento.pdf")
    private String anexo;
}
