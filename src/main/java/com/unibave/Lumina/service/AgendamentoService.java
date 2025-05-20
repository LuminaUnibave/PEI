package com.unibave.Lumina.service;

import com.unibave.Lumina.model.Agendamento;

import java.util.List;

public class AgendamentoService {
    private final AgendamentoRepository repository = new AgendamentoRepository();

    public void agendar(Agendamento agendamento) {
        repository.salvar(agendamento);
    }

    public List<Agendamento> listarAgendamentos() {
        return repository.listarTodos();
    }
}


// dando erro - ajustar e criar repository