package com.unibave.Lumina.service;

import com.unibave.Lumina.DTOs.Paciente.PacienteDto;
import com.unibave.Lumina.exception.ResourceNotFoundException;
import com.unibave.Lumina.model.Paciente;
import com.unibave.Lumina.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    @Autowired
    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    @Transactional(readOnly = true)
    public List<PacienteDto> buscarTodos() {
        return pacienteRepository.findAll()
                .stream()
                .map(PacienteDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PacienteDto buscarPorId(Long id) {
        return pacienteRepository.findById(id)
                .map(PacienteDto::fromEntity)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente não encontrado com o ID: " + id));
    }

    @Transactional(readOnly = true)
    public List<PacienteDto> buscarPorNome(String nome) {
        return pacienteRepository.findByNomeContainingIgnoreCase(nome)
                .stream()
                .map(PacienteDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public PacienteDto salvar(PacienteDto pacienteDto) {
        // Converter DTO para entidade
        Paciente paciente = new Paciente();
        paciente.setNome(pacienteDto.getNome());
        paciente.setCpf(pacienteDto.getCpf());
        paciente.setDtNascimento(pacienteDto.getDtNascimento());
        paciente.setCrtSus(pacienteDto.getCrtSus());
        paciente.setEmail(pacienteDto.getEmail());

        Paciente pacienteSalvo = pacienteRepository.save(paciente);
        return PacienteDto.fromEntity(pacienteSalvo);
    }

    @Transactional
    public void deletar(Long id) {
        if (!pacienteRepository.existsById(id)) {
            throw new ResourceNotFoundException("Paciente não encontrado com o ID: " + id);
        }
        pacienteRepository.deleteById(id);
    }
}