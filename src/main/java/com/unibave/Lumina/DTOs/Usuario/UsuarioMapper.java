package com.unibave.Lumina.DTOs.Usuario;

import com.unibave.Lumina.model.entidades.Usuario;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {
    UsuarioRespostaDTO toDto(Usuario usuario);
    Usuario toEntity(UsuarioRequisicaoDTO dto);
    Usuario toEntity(UsuarioAtualizarDTO dto);
    List<UsuarioRespostaDTO> toDto(List<Usuario> usuarios);
}
