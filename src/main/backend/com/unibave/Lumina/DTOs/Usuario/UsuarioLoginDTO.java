package com.unibave.Lumina.DTOs.Usuario;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO para atualizar usuário (UsuarioAtualizarDTO)")
public class UsuarioLoginDTO {

    @Schema(description = "Id do usuário", example = "1")
    @NotBlank
    @NotNull
    private Long id;

    @Schema(description = "Nome do usuário", example = "gabriel")
    @NotBlank
    @NotNull
    private String nome;

    @Schema(description = "Email do usuário", example = "gabrielsilva@gmail.com")
    @Email(message = "Email inválido")
    private String email;

    @Schema(description = "Senha do usuário", example = "$enh@")
    @NotBlank
    @NotNull
    private String senha;

    @Schema(description = "Tipo do usuário", example = "OPERADOR")
    @NotBlank
    @NotNull
    private String tpUsuario;
}
