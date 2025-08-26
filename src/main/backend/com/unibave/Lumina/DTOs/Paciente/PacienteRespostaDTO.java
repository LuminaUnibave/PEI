package com.unibave.Lumina.DTOs.Paciente;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PacienteRespostaDTO {
    private Long id;
    private String nome;
    private String sobrenome;
    private  String cpf;
    private LocalDate dtNascimento;
    private String crtSus;
    private String email;
    private String contato;
    private UsuarioDTO usuario;
    private LocalDateTime dtCadastro;
    private String situacao;
    private List<AgendamentoListDTO> agendamentoList;

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
    public static class AgendamentoListDTO {
        private Long id;
    }
}
