package com.unibave.Lumina.DTOs.Arquivo;

import com.unibave.Lumina.model.entidades.Arquivo;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ArquivoMapper {
    ArquivoRespostaDTO toDto(Arquivo entity);
    Arquivo toEntity(ArquivoRequisicaoDTO dto);
    List<ArquivoRespostaDTO> toDto(List<Arquivo> entity);
}
