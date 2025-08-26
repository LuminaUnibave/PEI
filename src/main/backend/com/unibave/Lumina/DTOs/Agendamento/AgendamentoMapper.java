package com.unibave.Lumina.DTOs.Agendamento;

import com.unibave.Lumina.model.entidades.Agendamento;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AgendamentoMapper {
    AgendamentoRespostaDTO toDto(Agendamento agendamento);
    Agendamento toEntity(AgendamentoRequisicaoDTO dto);
}
