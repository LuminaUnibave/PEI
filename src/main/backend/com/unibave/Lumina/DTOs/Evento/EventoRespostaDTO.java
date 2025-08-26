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
    private String tpUsuario;
    protected LocalDateTime dtEvento;
    private LocalDateTime dtCadastro;
    private String situacao;
    private UsuarioDTO usuario;
    private List<AnexoListDTO> anexoList;

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
    public static class AnexoListDTO {
        private Long id;
    }
}
