package com.unibave.Lumina.DTOs.Paciente;

import com.unibave.Lumina.model.entidades.Paciente;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PacienteMapper {
    PacienteRespostaDTO toDto(Paciente paciente);
    Paciente toEntity(PacienteRequisicaoDTO dto);
    Paciente toEntity(PacienteAtualizarDTO dto);
    List<PacienteRespostaDTO> toDto(List<Paciente> pacientes);
}
