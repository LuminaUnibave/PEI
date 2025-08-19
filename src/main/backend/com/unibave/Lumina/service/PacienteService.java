package com.unibave.Lumina.service;

import com.unibave.Lumina.DTOs.Paciente.PacienteDto;
import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.exception.ResourceNotFoundException;
import com.unibave.Lumina.model.Paciente;
import com.unibave.Lumina.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.module.ResolutionException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    @Autowired
    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    //GET
    //PACIENTE
    @Transactional(readOnly = true)
    public Optional<PacienteDto> buscarPorId(Long id) {
        return pacienteRepository.findById(id)
                .map(PacienteDto::fromEntity);
    }

    @Transactional(readOnly = true)
    public List<PacienteDto> buscarTodos() {
        return pacienteRepository.findAll()
                .stream()
                .map(PacienteDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PacienteDto> buscarPorNome(String nome) {
        return pacienteRepository.findByNomeContainingIgnoreCase(nome)
                .stream()
                .map(PacienteDto::fromEntity)
                .orElseThrow(() -> new ResourceNotFoundException(STR."Paciente não encontrado com o ID: \{id}"));
    }

    @Transactional(readOnly = true)
    public Optional<PacienteDto> buscarPorCpf(String cpf) {
        return pacienteRepository.findByCpf(cpf)
                .stream()
                .map(PacienteDto::fromEntity)
                .findFirst();
    }

    @Transactional(readOnly = true)
    public List<PacienteDto> buscarPorSituacao(Situacao situacao) {
        return pacienteRepository.findBySituacao(situacao)
                .stream()
                .map(PacienteDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PacienteDto> buscarPorDtNascimento(LocalDate dtNascimento) {
        return pacienteRepository.findByDtNascimento(dtNascimento)
                .stream()
                .map(PacienteDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PacienteDto> buscarPorDtNascimentoAntes(LocalDate dtNascimentoAntes) {
        return pacienteRepository.findByDtNascimentoBefore(dtNascimentoAntes)
                .stream()
                .map(PacienteDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PacienteDto> buscarPorDtNascimentoDepois(LocalDate dtNascimentoDepois) {
        return pacienteRepository.findByDtNascimentoAfter(dtNascimentoDepois)
                .stream()
                .map(PacienteDto::fromEntity)
                .collect(Collectors.toList());
    }


    public List<PacienteDto> buscarPorDtNascimentoEntre(LocalDate dtNascimentoDepois, LocalDate dtNascimentoAntes) {
        return pacienteRepository.findByDtNascimentoBetween(dtNascimentoDepois, dtNascimentoAntes)
                .stream()
                .map(PacienteDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<PacienteDto> buscarPorCrtSus(String crtSus) {
        return pacienteRepository.findByCrtSus(crtSus)
                .stream()
                .map(PacienteDto::fromEntity)
                .findFirst();
    }

    @Transactional(readOnly = true)
    public List<PacienteDto> buscarPorEmail(String email) {
        return pacienteRepository.findByEmail(email)
                .stream()
                .map(PacienteDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PacienteDto> buscarPorDtCadastro(LocalDateTime dtCadastro) {
        return pacienteRepository.findByDtCadastro(dtCadastro)
                .stream()
                .map(PacienteDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PacienteDto buscarPorCpf(String cpf) {
        return pacienteRepository.findByCpf(cpf)
                .map(PacienteDto::fromEntity)
                .orElseThrow(()-> new ResolutionException(STR."Paciente não econtrado com CPF: \{cpf}"));
    }

    @Transactional(readOnly = true)
    public List<PacienteDto> buscarPorSituacao(Situacao situacao) {
        return pacienteRepository.findBySituacao(situacao)
                .stream()
                .map(PacienteDto::fromEntity)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<PacienteDto> buscarPorDataNascimento(LocalDate dtNacimento) {
        return pacienteRepository.findByDtNascimento(dtNacimento)
                .stream()
                .map(PacienteDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PacienteDto> buscarPorDataNascimentoAntes(LocalDate dtNacimentoAntes) {
        return pacienteRepository.findByDtNascimentoBefore(dtNacimentoAntes)
                .stream()
                .map(PacienteDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PacienteDto> buscarPorDataNascimentoDepois(LocalDate dtNacimentoDepois) {
        return pacienteRepository.findByDtNascimentoAfter(dtNacimentoDepois)
                .stream()
                .map(PacienteDto::fromEntity)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<PacienteDto> buscarPorDataNascimentoentre(LocalDate dtNacimentoInicio, LocalDate dtNascimentoFim) {
        return pacienteRepository.findByDtNascimentoBetween(dtNacimentoInicio, dtNascimentoFim)
                .stream()
                .map(PacienteDto::fromEntity)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public PacienteDto buscarPorCrtSus(String crtSus) {
        return pacienteRepository.findByCrtSus(crtSus)
                .map(PacienteDto::fromEntity)
                .orElseThrow(() -> new RuntimeException(STR."Paciente não encontrado com Cartão SUS: \{crtSus}"));
    }

    @Transactional(readOnly = true)
    public List<PacienteDto> buscarPorEmail(String email) {
        return pacienteRepository.findByEmail(email)
                .stream()
                .map(PacienteDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PacienteDto> buscarPorDtCadastro(LocalDateTime dtCadastro) {
        return pacienteRepository.findByDtCadastro(dtCadastro)
                .stream()
                .map(PacienteDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PacienteDto> buscarPorDtCadastroAntes(LocalDateTime dtCadastroAntes) {
        return pacienteRepository.findByDtCadastroBefore(dtCadastroAntes)
                .stream()
                .map(PacienteDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PacienteDto> buscarPorDtCadastroDepois(LocalDateTime dtCadastroDepois) {
        return pacienteRepository.findByDtCadastroAfter(dtCadastroDepois)
                .stream()
                .map(PacienteDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PacienteDto> buscarPorDtCadastroEntre(LocalDateTime inicio, LocalDateTime fim) {
        return pacienteRepository.findByDtCadastroBetween(inicio, fim)
                .stream()
                .map(PacienteDto::fromEntity)
                .collect(Collectors.toList());
    }

    //POST
    @Transactional
    public PacienteDto salvar(PacienteDto pacienteDto) {
        // Converter DTO para entidade
        Paciente paciente = new Paciente();
        paciente.setId(pacienteDto.getId());
        paciente.setNome(pacienteDto.getNome());
        paciente.setDtNascimento(pacienteDto.getDtNascimento());
        paciente.setCpf(pacienteDto.getCpf());
        paciente.setCrtSus(pacienteDto.getCrtSus());
        paciente.setEmail(pacienteDto.getEmail());
        paciente.setSituacao(pacienteDto.getSituacao());
        paciente.setUsuario(pacienteDto.getUsuario());
        paciente.setDtCadastro(pacienteDto.getDtCadastro());
        paciente.setDtModificacao(pacienteDto.getDtModificacao());
        if (paciente.getDtCadastro() == null) {
            paciente.setDtCadastro(LocalDateTime.now());
        }

        Paciente pacienteSalvo = pacienteRepository.save(paciente);
        return PacienteDto.fromEntity(pacienteSalvo);
    }

    //DELETE
    @Transactional
    public void deletar(Long id) {
        if (!pacienteRepository.existsById(id)) {
            throw new ResourceNotFoundException("Paciente não encontrado com o ID: " + id);
        }
        pacienteRepository.deleteById(id);
    }
}