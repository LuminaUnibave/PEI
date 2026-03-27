package com.unibave.Lumina.DTOs.Agendamento;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO para criação de usuário (AgendamentoRequisicaoDTO)")
public class AgendamentoRequisicaoDTO {

    @Schema(description = "Id do paciente", example = "1")
    private Long idPaciente;

    @Schema(description = "Tipo de visita", example = "CONSULTA")
    @NotBlank
    @NotNull
    private String tpVisita;

    @Schema(description = "Data do agendamento", example = "2030-01-01 00:00:00")
    @NotNull
    private LocalDateTime dtAgendamento;

    @Schema(description = "Observação", example = "Observação")
    private String observacao;

    @Schema(description = "Id do usuário cadastrante", example = "1")
    @NotNull
    private Long idUsuario;
}
