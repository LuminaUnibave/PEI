package com.unibave.Lumina.DTOs.Evento;

import com.unibave.Lumina.model.entidades.Evento;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EventoMapper {
    EventoRespostaDTO toDto(Evento entity);
    Evento toEntity(EventoRequisicaoDTO dto);
}
