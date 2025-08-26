package com.unibave.Lumina.DTOs.Anexo;

import com.unibave.Lumina.model.entidades.Anexo;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnexoMapper {
    AnexoRespostaDTO toDto(Anexo entity);
    Anexo toEntity(AnexoRequisicaoDTO dto);
    List<AnexoRespostaDTO> toDto(List<Anexo> entity);
}
