package com.unibave.Lumina.DTOs.Agendamento;

import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.model.Paciente;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Value
public class AgendamentoPacienteDto implements Serializable {
    Long id;
    String nome;
    String cpf;
    LocalDate dtNascimento;
    String crtSus;
    String email;
    Situacao situacao;
    LocalDateTime dtCadastro;
    LocalDateTime dtModificacao;

    public static AgendamentoPacienteDto fromEntity(Paciente paciente) {
        if (paciente == null) {
            return null;
        }
        return new AgendamentoPacienteDto(
                paciente.getId(),
                paciente.getNome(),
                paciente.getCpf(),
                paciente.getDtNascimento(),
                paciente.getCrtSus(),
                paciente.getEmail(),
                paciente.getSituacao(),
                paciente.getDtCadastro(),
                paciente.getDtModificacao()
        );
    }
}