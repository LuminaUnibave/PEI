package com.unibave.Lumina.DTOs.Paciente;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO para criação de paciente (PacienteRequisicaoDTO)")
public class PacienteRequisicaoDTO {

    @Schema(description = "Nome do paciente", example = "João")
    @NotBlank
    @NotNull
    private String nome;

    @Schema(description = "Sobrenome do paciente", example = "Silva")
    @NotBlank
    @NotNull
    private String sobrenome;

    @Schema(description = "CPF do paciente", example = "111.222.333-44")
    @NotBlank
    @NotNull
    private String cpf;

    @Schema(description = "Data de nascimento do paciente", example = "2000-01-01")
    @NotNull
    private LocalDate dtNascimento;

    @Schema(description = "Cartão do SUS do paciente", example = "212174936760000")
    private String crtSus;

    @Schema(description = "Email do paciente", example = "joaosilva@gmail.com")
    @Email(message = "Email inválido")
    private String email;

    @Schema(description = "Contato do paciente", example = "(44) 93434-5019")
    private String contato;

    @Schema(description = "Id do usuário cadastrante", example = "1")
    @NotNull
    private Long idUsuario;
}
