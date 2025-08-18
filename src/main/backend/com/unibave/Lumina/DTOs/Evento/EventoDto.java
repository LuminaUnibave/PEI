package com.unibave.Lumina.DTOs.Evento;

import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.model.Evento;

import java.time.LocalDateTime;

public record EventoDto(
        Long idEvento,
        String nmEvento,
        LocalDateTime dtEvento,
        Situacao stEvento,
        String descricao) {

    public static EventoDto fromEntity(Evento evento) { // pega um objeto da entidade Evento e transformar em um EventoDto
        if (evento == null) {
            return null;
        }

        return new EventoDto(
                evento.getIdEvento(),
                evento.getNomeEvento(),
                evento.getDtEvento(),
                evento.getStEvento(),
                evento.getDescricao()
        );
    }
}

