package com.unibave.Lumina.DTOs.Agendamento;

import com.unibave.Lumina.model.Agendamento;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;

@Value
public class AgendamentoDto implements Serializable {
    Long idAgendamento;
    AgendamentoPacienteDto paciente;
    Agendamento.TpVisita tpVisita;
    String observacao;
    LocalDateTime dtAgendamento;
    LocalDateTime dtCriacao;
    LocalDateTime dtModificacao;


    public static AgendamentoDto fromEntity(Agendamento agendamento) {
        if (agendamento == null) {
            return null;
        }

        return new AgendamentoDto(
                agendamento.getIdAgendamento(),
                AgendamentoPacienteDto.fromEntity(agendamento.getPaciente()),
                agendamento.getTpVisita(),
                agendamento.getObservacao(),
                agendamento.getDtAgendamento(),
                agendamento.getDtCriacao(),
                agendamento.getDtModificacao()
        );
    }
}