package com.unibave.Lumina.service;

import com.unibave.Lumina.model.Agendamento;
import com.unibave.Lumina.repository.AgendamentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgendamentoService {
    private final AgendamentoRepository agendamentoRepository;

    public AgendamentoService(AgendamentoRepository agendamentoRepository) {
        this.agendamentoRepository = agendamentoRepository;
    }

    // Retorna todos os agendamentos que estão no banco
    public List<Agendamento> listarTodos() {
        return agendamentoRepository.findAll();
    }

    // Buscar por Id do agendamento
    public Optional<Agendamento> buscarPorID(Long id) {
        return agendamentoRepository.findById(id);
    }

    // Salvar ou editar um agendamento ja existente pelo Id
    public Agendamento salvar(Agendamento agendamento) {
        return agendamentoRepository.save(agendamento);
    }

    // Deletar um agendamento por Id
    public void deletar(Long id) {
        agendamentoRepository.deleteById(id);
    }
}