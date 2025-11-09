package com.unibave.Lumina.DTOs.Usuario;

import com.unibave.Lumina.enums.TpUsuario;
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
public class UsuarioAtualizarDTO {

    @Schema(description = "Id do usuario", example = "2")
    @NotNull
    private Long id;

    @Schema(description = "Nome do usuário", example = "Gabriel")
    @NotBlank
    private String nome;

    @Schema(description = "Email do usuário", example = "gabrielsilva@gmail.com")
    @Email(message = "Email inválido")
    private String email;

    @Schema(description = "Senha do usuário", example = "$enh@")
    @NotBlank
    private String senha;

    @Schema(description = "Tipo do usuário", example = "OPERADOR")
    @NotNull
    private TpUsuario tpUsuario;
}