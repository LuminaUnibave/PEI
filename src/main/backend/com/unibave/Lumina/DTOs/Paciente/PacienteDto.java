package com.unibave.Lumina.DTOs.Paciente;

import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.model.Paciente;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Value
public class PacienteDto implements Serializable {
    Long idPaciente;
    String nome;
    String cpf;
    LocalDate dtNascimento;
    String crtSus;
    String email;
    Situacao situacao;
    LocalDateTime dtCadastro;
    LocalDateTime dtModificacao;

    List<PacienteAgendamentoDto> agendamentoList;

    public static PacienteDto fromEntity(Paciente paciente) {
        return new PacienteDto(
                paciente.getIdPaciente(),
                paciente.getNome(),
                paciente.getCpf(),
                paciente.getDtNascimento(),
                paciente.getCrtSus(),
                paciente.getEmail(),
                paciente.getSituacao(),
                paciente.getDtCadastro(),
                paciente.getDtModificacao(),
                paciente.getAgendamentoList() == null ? null :
                        paciente.getAgendamentoList().stream()
                                .map(PacienteAgendamentoDto::fromEntity)
                                .collect(Collectors.toList())
        );
    }
}