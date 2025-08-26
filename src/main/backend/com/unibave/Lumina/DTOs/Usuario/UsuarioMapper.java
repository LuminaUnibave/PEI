package com.unibave.Lumina.DTOs.Usuario;

import com.unibave.Lumina.model.entidades.Usuario;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {
    UsuarioRespostaDTO toDto(Usuario usuario);
    Usuario toEntity(UsuarioRequisicaoDTO dto);
}
