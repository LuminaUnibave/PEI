package com.unibave.Lumina.service;

import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.model.entidades.Paciente;
import com.unibave.Lumina.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    public long contar() {
        return pacienteRepository.count();
    }

    public List<Paciente> buscarTodos() {
        return pacienteRepository.findAll();
    }

    public Optional<Paciente> buscarPorId(Long id) {
        return pacienteRepository.findById(id);
    }

    @Transactional
    public Paciente salvar(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }

    @Transactional
    public void deletar(Long id) {
        // Em vez de deletar fisicamente, marca como EXCLUIDO
        Optional<Paciente> pacienteOpt = pacienteRepository.findById(id);
        if (pacienteOpt.isPresent()) {
            Paciente paciente = pacienteOpt.get();
            paciente.setSituacao(Situacao.EXCLUIDO);
            pacienteRepository.save(paciente);
        } else {
            throw new RuntimeException("Paciente não encontrado");
        }
    }

    public List<Paciente> buscarPorSituacao(Situacao situacao) {
        return pacienteRepository.findBySituacao(situacao);
    }

    public List<Paciente> buscarPorNome(String nome) {
        return pacienteRepository.findByNomeContainingIgnoreCase(nome);
    }

    public Optional<Paciente> buscarPorCpf(String cpf) {
        return pacienteRepository.findByCpf(cpf);
    }

    public List<Paciente> buscarPorDtNascimento(LocalDate dtNascimento) {
        return pacienteRepository.findByDtNascimento(dtNascimento);
    }

    public List<Paciente> buscarPorDtNascimentoAntes(LocalDate antes) {
        return pacienteRepository.findByDtNascimentoBefore(antes);
    }

    public List<Paciente> buscarPorDtNascimentoDepois(LocalDate depois) {
        return pacienteRepository.findByDtNascimentoAfter(depois);
    }

    public List<Paciente> buscarPorDtNascimentoEntre(LocalDate inicio, LocalDate fim) {
        return pacienteRepository.findByDtNascimentoBetween(inicio, fim);
    }

    public Optional<Paciente> buscarPorCrtSus(String crtSus) {
        return pacienteRepository.findByCrtSus(crtSus);
    }

    public List<Paciente> buscarPorEmail(String email) {
        return pacienteRepository.findByEmail(email);
    }

    public List<Paciente> buscarPorDtCadastro(LocalDateTime dtCadastro) {
        return pacienteRepository.findByDtCadastro(dtCadastro);
    }

    public List<Paciente> buscarPorDtCadastroAntes(LocalDateTime antes) {
        return pacienteRepository.findByDtCadastroBefore(antes);
    }

    public List<Paciente> buscarPorDtCadastroDepois(LocalDateTime depois) {
        return pacienteRepository.findByDtCadastroAfter(depois);
    }

    public List<Paciente> buscarPorDtCadastroEntre(LocalDateTime inicio, LocalDateTime fim) {
        return pacienteRepository.findByDtCadastroBetween(inicio, fim);
    }
}