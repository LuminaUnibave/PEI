package com.unibave.Lumina.DTOs.Agendamento;

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
public class AgendamentoRespostaDTO {

    private Long id;
    private PacienteDTO paciente;
    private String tpVisita;
    private LocalDateTime dtAgendamento;
    private UsuarioDTO usuario;
    private LocalDateTime dtCadastro;
    private String situacao;
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
    public static class PacienteDTO {
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
