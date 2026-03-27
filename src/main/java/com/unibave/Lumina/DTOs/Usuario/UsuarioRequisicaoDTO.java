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
@Schema(description = "DTO para criação de usuário (UsuarioRequisicaoDTO)")
public class UsuarioRequisicaoDTO {

    @Schema(description = "Nome do usuário", example = "João")
    @NotBlank
    private String nome;

    @Schema(description = "Email do usuário", example = "joaosilva@gmail.com")
    @Email(message = "Email inválido")
    private String email;

    @Schema(description = "Senha do usuário", example = "Pa$sw0rd")
    @NotBlank
    private String senha;

    @Schema(description = "Tipo do usuário", example = "ADMINISTRADOR")
    @NotNull
    private TpUsuario tpUsuario;
}