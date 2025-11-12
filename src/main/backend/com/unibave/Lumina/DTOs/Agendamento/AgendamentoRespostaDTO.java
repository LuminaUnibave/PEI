package com.unibave.Lumina.DTOs.Agendamento;

import com.unibave.Lumina.model.entidades.Agendamento;
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
    private Agendamento.TpVisita tpVisita;
    private LocalDateTime dtAgendamento;
    private UsuarioDTO usuario;
    private LocalDateTime dtCadastro;
    private LocalDateTime dtModificacao;
    private String situacao;

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
        private String nome;
    }
}
