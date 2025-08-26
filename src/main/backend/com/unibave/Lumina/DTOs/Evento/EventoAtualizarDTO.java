package com.unibave.Lumina.DTOs.Evento;


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
@Schema(description = "DTO para atualizar o evento (EventoAtualizarDTO)")
public class EventoAtualizarDTO {

    @Schema(description = "Id do evento", example = "1")
    @NotNull
    private Long id;

    @Schema(description = "Data do evento", example = "2030-01-01 00:00:00")
    @NotNull
    private LocalDateTime dtEvento;

    @Schema(description = "Nome do evento", example = "Nome do Evento")
    @NotBlank
    @NotNull
    private String nmEvento;

    @Schema(description = "Descrição do Evento", example = "Descrição do evento")
    @NotBlank
    @NotNull
    private String descricao;

    @Schema(description = "Id do usuário cadastrante", example = "1")
    @NotNull
    private Long idUsuario;
}
