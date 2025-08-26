package com.unibave.Lumina.DTOs.Usuario;

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
public class UsuarioRespostaDTO {
    private Long id;
    private String nome;
    private String email;
    private String tpUsuario;
    private LocalDateTime dtCadastro;
    private LocalDateTime dtModificacao;
    private String situacao;
    private List<AgendamentoListDTO> agendamentoList;
    private List<EventoListDTO> eventoList;
    private List<PacienteListDTO> pacienteList;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AgendamentoListDTO {
        private Long id;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class EventoListDTO {
        private Long id;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PacienteListDTO {
        private Long id;
    }
}
