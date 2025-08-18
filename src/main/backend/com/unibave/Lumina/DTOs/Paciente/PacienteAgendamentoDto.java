package com.unibave.Lumina.DTOs.Paciente;

import com.unibave.Lumina.model.Agendamento;
import com.unibave.Lumina.model.Usuario;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;

@Value
public class PacienteAgendamentoDto implements Serializable {
    Long id;
    Agendamento.TpVisita tpVisita;
    String observacao;
    LocalDateTime dtAgendamento;
    Usuario usuario;
    LocalDateTime dtCriacao;
    LocalDateTime dtModificacao;

    public static PacienteAgendamentoDto fromEntity(Agendamento agendamento) {
        if (agendamento == null) {
            return null;
        }
        return new PacienteAgendamentoDto(
                agendamento.getId(),
                agendamento.getTpVisita(),
                agendamento.getObservacao(),
                agendamento.getDtAgendamento(),
                agendamento.getUsuario(),
                agendamento.getDtCriacao(),
                agendamento.getDtModificacao()
        );
    }
}