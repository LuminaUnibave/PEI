package com.unibave.Lumina.DTOs.Paciente;

import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.model.entidades.Paciente;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PacienteMapper {
    
    @Mapping(target = "situacao", source = "situacao", qualifiedByName = "stringToSituacao")
    Paciente toEntity(PacienteRequisicaoDTO dto);
    
    @Mapping(target = "situacao", source = "situacao", qualifiedByName = "stringToSituacao")
    Paciente toEntity(PacienteAtualizarDTO dto);
    
    @Mapping(target = "situacao", source = "situacao", qualifiedByName = "situacaoToString")
    PacienteRespostaDTO toDto(Paciente paciente);
    
    List<PacienteRespostaDTO> toDto(List<Paciente> pacientes);
    
    @Named("stringToSituacao")
    default Situacao stringToSituacao(String situacao) {
        if (situacao == null) {
            return Situacao.ATIVO;
        }
        try {
            return Situacao.valueOf(situacao.toUpperCase());
        } catch (IllegalArgumentException e) {
            return Situacao.ATIVO;
        }
    }
    
    @Named("situacaoToString")
    default String situacaoToString(Situacao situacao) {
        return situacao != null ? situacao.name() : Situacao.ATIVO.name();
    }
}