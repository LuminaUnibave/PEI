package com.unibave.Lumina.service;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.unibave.Lumina.model.Agendamento;
import com.unibave.Lumina.model.Paciente;
import com.unibave.Lumina.repository.AgendamentoRepository;
import com.unibave.Lumina.repository.PacienteRepository;
import jakarta.persistence.OneToMany;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgendamentoService {
    private final AgendamentoRepository agendamentoRepository;
    private final PacienteRepository pacienteRepository;

    public AgendamentoService(AgendamentoRepository agendamentoRepository, PacienteRepository pacienteRepository) {
        this.agendamentoRepository = agendamentoRepository;
        this.pacienteRepository = pacienteRepository;
    }

    public List<Agendamento> buscarTpVisita(Agendamento.TpVisita tpVisita){
        return agendamentoRepository.findByTpVisita(tpVisita);
    }

    public List<Agendamento> buscarPorPacienteId(Long idPaciente) {
        return agendamentoRepository.findByPacienteIdPaciente(idPaciente);
    }

    public List<Agendamento>buscarPorPacienteNome(String nome){
        return agendamentoRepository.findByPacienteNomeContainingIgnoreCase(nome);
    }

    public List<Agendamento> listarTodos() {
        return agendamentoRepository.findAll();
    }

    public Optional<Agendamento> buscarPorId(Long id) {
        return agendamentoRepository.findById(id);
    }
    @OneToMany(mappedBy = "paciente")
    @JsonManagedReference
    public Agendamento salvar(Agendamento agendamento) {
        Long pacienteId = agendamento.getPaciente().getIdPaciente();
        Optional<Paciente> paciente = pacienteRepository.findById(pacienteId);
        agendamento.setPaciente(paciente.orElse(null));
        System.out.println(STR."\nAgendamento salvo: \{agendamento}\n");
        return agendamentoRepository.save(agendamento);
    }

    public void deletar(Long id) {
        agendamentoRepository.deleteById(id);
    }
}