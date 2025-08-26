package com.unibave.Lumina.DTOs.Anexo;

import com.unibave.Lumina.model.entidades.Anexo;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AnexoMapper {
    AnexoRespostaDTO toDto(Anexo entity);
    Anexo toEntity(AnexoRequisicaoDTO dto);
}
