package com.unibave.Lumina.DTOs.Paciente;

import com.unibave.Lumina.model.Agendamento;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;

@Value
public class PacienteAgendamentoDto implements Serializable {
    Long idAgendamento;
    Agendamento.TpVisita tpVisita;
    String observacao;
    LocalDateTime dtAgendamento;
    LocalDateTime dtCriacao;
    LocalDateTime dtModificacao;

    public static PacienteAgendamentoDto fromEntity(Agendamento agendamento) {
        if (agendamento == null) {
            return null;
        }
        return new PacienteAgendamentoDto(
                agendamento.getIdAgendamento(),
                agendamento.getTpVisita(),
                agendamento.getObservacao(),
                agendamento.getDtAgendamento(),
                agendamento.getDtCriacao(),
                agendamento.getDtModificacao()
        );
    }
}