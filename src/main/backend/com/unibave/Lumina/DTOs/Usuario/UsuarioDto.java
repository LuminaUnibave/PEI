package com.unibave.Lumina.DTOs.Usuario;

import com.unibave.Lumina.model.Usuario;
import lombok.Value;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

@Value
public class UsuarioDto implements Serializable {
    Long id;
    String email;
    String senha;

    List<UsuarioAgendamentoDto> agendamentoList;

    public static UsuarioDto fromEntity(Usuario usuario){
        return new UsuarioDto(
                usuario.getId(),
                usuario.getEmail(),
                usuario.getSenha(),
                usuario.getAgendamentoList() == null ? null :
                        usuario.getAgendamentoList().stream()
                                .map(UsuarioAgendamentoDto::fromEntity)
                                .collect(Collectors.toList())
        );
    }
}
