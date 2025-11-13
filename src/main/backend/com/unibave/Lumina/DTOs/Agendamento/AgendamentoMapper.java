package com.unibave.Lumina.DTOs.Agendamento;

import com.unibave.Lumina.model.entidades.Agendamento;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AgendamentoMapper {
    
    @Mapping(source = "observacao", target = "observacao")
    AgendamentoRespostaDTO toDto(Agendamento agendamento);
    
    @Mapping(source = "observacao", target = "observacao")
    @Mapping(source = "tpVisita", target = "tpVisita", qualifiedByName = "stringToTpVisita")
    Agendamento toEntity(AgendamentoRequisicaoDTO dto);
    
    @Mapping(source = "observacao", target = "observacao")
    @Mapping(source = "tpVisita", target = "tpVisita", qualifiedByName = "stringToTpVisita")
    Agendamento toEntity(AgendamentoAtualizarDTO dto);
    
    List<AgendamentoRespostaDTO> toDto(List<Agendamento> agendamentos);
    
    @Named("stringToTpVisita")
    default Agendamento.TpVisita stringToTpVisita(String tpVisita) {
        return Agendamento.TpVisita.valueOf(tpVisita);
    }
}