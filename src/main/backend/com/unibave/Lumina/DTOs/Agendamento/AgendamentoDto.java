package com.unibave.Lumina.DTOs.Agendamento;

import com.unibave.Lumina.model.Agendamento;
import com.unibave.Lumina.model.Anexo;
import com.unibave.Lumina.model.Usuario;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Value
public class AgendamentoDto implements Serializable {
    Long id;
    AgendamentoPacienteDto paciente;
    Agendamento.TpVisita tpVisita;
    String observacao;
    LocalDateTime dtAgendamento;
    List<Anexo> anexoList;
    Usuario usuario;
    LocalDateTime dtCriacao;
    LocalDateTime dtModificacao;


    public static AgendamentoDto fromEntity(Agendamento agendamento) {
        if (agendamento == null) {
            return null;
        }

        return new AgendamentoDto(
                agendamento.getId(),
                AgendamentoPacienteDto.fromEntity(agendamento.getPaciente()),
                agendamento.getTpVisita(),
                agendamento.getObservacao(),
                agendamento.getDtAgendamento(),
                agendamento.getAnexos(),
                agendamento.getUsuario(),
                agendamento.getDtCriacao(),
                agendamento.getDtModificacao()
        );
    }
}