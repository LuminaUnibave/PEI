package com.unibave.Lumina.DTOs.Usuario;


import com.unibave.Lumina.model.Agendamento;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
public class UsuarioAgendamentoDto {
    Long idUsuarioAgendamentoDto;
    Agendamento.TpVisita tpVisitaUsuarioAgendamentoDto;
    String observacaoUsuarioAgendamentoDto;
    LocalDateTime dtAgendamentoUsuarioAgendamentoDto;
    LocalDateTime dtCriacaoUsuarioAgendamentoDto;
    LocalDateTime dtModificacaoUsuarioAgendamentoDto;

    public static UsuarioAgendamentoDto fromEntity(Agendamento agendamento) {
        if(agendamento == null){
            return null;
        }
        return new UsuarioAgendamentoDto(
                agendamento.getIdAgendamento(),
                agendamento.getTpVisita(),
                agendamento.getObservacao(),
                agendamento.getDtAgendamento(),
                agendamento.getDtCriacao(),
                agendamento.getDtModificacao()
        );
    }
}