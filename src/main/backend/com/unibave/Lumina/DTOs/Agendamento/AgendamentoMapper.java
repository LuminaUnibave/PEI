package com.unibave.Lumina.DTOs.Agendamento;

import com.unibave.Lumina.model.entidades.Agendamento;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AgendamentoMapper {
    AgendamentoRespostaDTO toDto(Agendamento agendamento);
    Agendamento toEntity(AgendamentoRequisicaoDTO dto);
    Agendamento toEntity(AgendamentoAtualizarDTO dto);
    List<AgendamentoRespostaDTO> toDto(List<Agendamento> agendamentos);
}
