package com.unibave.Lumina.service;

import com.unibave.Lumina.exception.http.ResourceNotFoundException;
import com.unibave.Lumina.model.entidades.Agendamento;
import com.unibave.Lumina.model.entidades.Paciente;
import com.unibave.Lumina.repository.AgendamentoRepository;
import com.unibave.Lumina.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final PacienteRepository pacienteRepository;

    @Autowired
    public AgendamentoService(AgendamentoRepository agendamentoRepository, PacienteRepository pacienteRepository) {
        this.agendamentoRepository = agendamentoRepository;
        this.pacienteRepository = pacienteRepository;
    }

    //GET
    //AGENDAMENTO
    @Transactional(readOnly = true)
    public long contar() {
        return agendamentoRepository.count();
    }

    @Transactional(readOnly = true)
    public Optional<Agendamento> buscarPorId(Long id) {
        return agendamentoRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Agendamento> buscarTpVisita(Agendamento.TpVisita tpVisita) {
        return agendamentoRepository.findByTpVisita(tpVisita);
    }

    @Transactional(readOnly = true)
    public List<Agendamento> buscarTodos() {
        return agendamentoRepository.findAll();
    }

    //AGENDAMENTO/PACIENTE
    @Transactional(readOnly = true)
    public List<Agendamento> buscarPorPacienteId(Long id) {
        if (!pacienteRepository.existsById(id)) {
            throw new ResourceNotFoundException("Paciente não encontrado com ID: " + id);
        }
        return agendamentoRepository.findByPaciente_id(id);
    }

    @Transactional(readOnly = true)
    public List<Agendamento> buscarPorPacienteNome(String nome) {
        return agendamentoRepository.findByPaciente_NomeContainingIgnoreCase(nome);
    }


    //POST
    @Transactional
    public Agendamento salvar(Agendamento agendamento) {
        Paciente paciente = pacienteRepository.findById(agendamento.getPaciente().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Paciente não encontrado"));
        agendamento.setPaciente(paciente);
        return agendamentoRepository.save(agendamento);
    }

    //DELETE
    @Transactional
    public void deletar(Long id) {
        if (!agendamentoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Agendamento não encontrado com ID: " + id);
        }
        agendamentoRepository.deleteById(id);
    }
}