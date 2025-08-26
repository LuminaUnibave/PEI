package com.unibave.Lumina.service;

import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.exception.ResourceNotFoundException;
import com.unibave.Lumina.model.entidades.Paciente;
import com.unibave.Lumina.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    public Optional<Paciente> buscarPorId(Long id) {
        return pacienteRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Paciente> buscarTodos() {
        return pacienteRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Paciente> buscarPorNome(String nome) {
        return pacienteRepository.findByNomeContainingIgnoreCase(nome);
    }

    @Transactional(readOnly = true)
    public Optional<Paciente> buscarPorCpf(String cpf) {
        return pacienteRepository.findByCpf(cpf);
    }

    @Transactional(readOnly = true)
    public List<Paciente> buscarPorSituacao(Situacao situacao) {
        return pacienteRepository.findBySituacao(situacao);
    }
    @Transactional(readOnly = true)
    public List<Paciente> buscarPorDtNascimento(LocalDate dtNacimento) {
        return pacienteRepository.findByDtNascimento(dtNacimento);
    }

    @Transactional(readOnly = true)
    public List<Paciente> buscarPorDtNascimentoAntes(LocalDate antes) {
        return pacienteRepository.findByDtNascimentoBefore(antes);
    }

    @Transactional(readOnly = true)
    public List<Paciente> buscarPorDtNascimentoDepois(LocalDate depois) {
        return pacienteRepository.findByDtNascimentoAfter(depois);
    }
    @Transactional(readOnly = true)
    public List<Paciente> buscarPorDtNascimentoEntre(LocalDate depois, LocalDate antes) {
        return pacienteRepository.findByDtNascimentoBetween(depois, antes);
    }
    @Transactional(readOnly = true)
    public Optional<Paciente> buscarPorCrtSus(String crtSus) {
        return pacienteRepository.findByCrtSus(crtSus);
    }

    @Transactional(readOnly = true)
    public List<Paciente> buscarPorEmail(String email) {
        return pacienteRepository.findByEmail(email);
    }

    @Transactional(readOnly = true)
    public List<Paciente> buscarPorDtCadastro(LocalDateTime dtCadastro) {
        return pacienteRepository.findByDtCadastro(dtCadastro);
    }

    @Transactional(readOnly = true)
    public List<Paciente> buscarPorDtCadastroAntes(LocalDateTime antes) {
        return pacienteRepository.findByDtCadastroBefore(antes);
    }

    @Transactional(readOnly = true)
    public List<Paciente> buscarPorDtCadastroDepois(LocalDateTime depois) {
        return pacienteRepository.findByDtCadastroAfter(depois);
    }

    @Transactional(readOnly = true)
    public List<Paciente> buscarPorDtCadastroEntre(LocalDateTime depois, LocalDateTime antes) {
        return pacienteRepository.findByDtCadastroBetween(depois, antes);
    }

    //POST
    @Transactional
    public Paciente salvar(Paciente paciente) {
        return pacienteRepository.save(paciente);
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