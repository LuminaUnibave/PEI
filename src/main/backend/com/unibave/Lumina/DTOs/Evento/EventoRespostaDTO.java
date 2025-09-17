package com.unibave.Lumina.DTOs.Evento;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventoRespostaDTO {

    private Long id;
    private String nmEvento;
    private String descricao;
    protected LocalDateTime dtEvento;
    private LocalDateTime dtCadastro;
    private LocalDateTime dtModificacao;
    private String situacao;
    private UsuarioDTO usuario;
    private List<ArquivoListDTO> arquivoList;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UsuarioDTO {
        private Long id;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ArquivoListDTO {
        private Long id;
    }
}
