package com.unibave.Lumina.service;

import com.unibave.Lumina.DTOs.Agendamento.AgendamentoDto;
import com.unibave.Lumina.exception.ResourceNotFoundException;
import com.unibave.Lumina.model.Agendamento;
import com.unibave.Lumina.model.Paciente;
import com.unibave.Lumina.repository.AgendamentoRepository;
import com.unibave.Lumina.repository.AnexoRepository;
import com.unibave.Lumina.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final PacienteRepository pacienteRepository;
    private final AnexoRepository anexoRepository;

    @Autowired
    public AgendamentoService(AgendamentoRepository agendamentoRepository,
                              PacienteRepository pacienteRepository, AnexoRepository anexoRepository) {
        this.agendamentoRepository = agendamentoRepository;
        this.pacienteRepository = pacienteRepository;
        this.anexoRepository = anexoRepository;
    }

    //GET
    //AGENDAMENTO
    @Transactional(readOnly = true)
    public AgendamentoDto buscarPorId(Long id) {
        return agendamentoRepository.findById(id)
                .map(AgendamentoDto::fromEntity)
                .orElseThrow(() -> new ResourceNotFoundException("Agendamento não encontrado com ID: " + id));
    }

    @Transactional(readOnly = true)
    public List<AgendamentoDto> buscarTpVisita(Agendamento.TpVisita tpVisita) {
        return agendamentoRepository.findByTpVisita(tpVisita)
                .stream()
                .map(AgendamentoDto::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<AgendamentoDto> buscarTodos() {
        return agendamentoRepository.findAll()
                .stream()
                .map(AgendamentoDto::fromEntity)
                .toList();
    }

    //AGENDAMENTO/PACIENTE
    @Transactional(readOnly = true)
    public List<AgendamentoDto> buscarPorPacienteId(Long id) {
        if (!pacienteRepository.existsById(id)) {
            throw new ResourceNotFoundException("Paciente não encontrado com ID: " + id);
        }
        return agendamentoRepository.findByPaciente_id(id)
                .stream()
                .map(AgendamentoDto::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<AgendamentoDto> buscarPorPacienteNome(String nome) {
        return agendamentoRepository.findByPaciente_NomeContainingIgnoreCase(nome)
                .stream()
                .map(AgendamentoDto::fromEntity)
                .toList();
    }


    //POST
    @Transactional
    public AgendamentoDto salvar(AgendamentoDto agendamentoDto) {
        Paciente paciente = pacienteRepository.findById(agendamentoDto.getPaciente().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Paciente não encontrado"));

        Agendamento agendamento = new Agendamento();
        // Mapear campos do DTO para a entidade
        agendamento.setPaciente(paciente);
        agendamento.setTpVisita(agendamentoDto.getTpVisita());
        agendamento.setObservacao(agendamentoDto.getObservacao());
        agendamento.setDtAgendamento(agendamentoDto.getDtAgendamento());

        Agendamento agendamentoSalvo = agendamentoRepository.save(agendamento);
        return AgendamentoDto.fromEntity(agendamentoSalvo);
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