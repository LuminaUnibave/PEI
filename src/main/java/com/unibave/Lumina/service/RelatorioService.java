package com.unibave.Lumina.service;

import com.unibave.Lumina.model.entidades.Agendamento;
import com.unibave.Lumina.model.entidades.Evento;
import com.unibave.Lumina.model.entidades.Paciente;
import com.unibave.Lumina.repository.AgendamentoRepository;
import com.unibave.Lumina.repository.EventoRepository;
import com.unibave.Lumina.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class RelatorioService {

    private final EventoRepository eventoRepository;
    private final AgendamentoRepository agendamentoRepository;
    private final PacienteRepository pacienteRepository;

    @Autowired
    public RelatorioService(EventoRepository eventoRepository,
                            AgendamentoRepository agendamentoRepository,
                            PacienteRepository pacienteRepository) {
        this.eventoRepository = eventoRepository;
        this.agendamentoRepository = agendamentoRepository;
        this.pacienteRepository = pacienteRepository;
    }

    public byte[] relatorioEventos() {
        List<Evento> eventos = eventoRepository.findAll();

        StringBuilder content = new StringBuilder();
        content.append("RELATÓRIO DE EVENTOS\n");
        content.append("====================\n\n");

        for (Evento evento : eventos) {
            content.append(String.format("ID: %d | Nome: %s | Data: %s | Descrição: %s\n",
                    evento.getId(),
                    evento.getNmEvento(),
                    formatDate(evento.getDtEvento()),
                    evento.getDescricao()));
        }

        return content.toString().getBytes();
    }

    public byte[] relatorioAgendamentos() {
        List<Agendamento> agendamentos = agendamentoRepository.findAll();

        StringBuilder content = new StringBuilder();
        content.append("RELATÓRIO DE AGENDAMENTOS\n");
        content.append("====================\n\n");

        for (Agendamento agendamento : agendamentos) {
            content.append(String.format("ID: %d | Pac. CPF: %s | Data: %s | Tp. Visita: %s | Observação: %s | Situção: %s\n",//verificar o resto dos atributos
                    agendamento.getId(),
                    agendamento.getPaciente().getCpf(),
                    agendamento.getDtAgendamento(),
                    agendamento.getTpVisita(),
                    agendamento.getObservacao(),
                    agendamento.getSituacao())); //verificar o resto dos atributos
        }

        return content.toString().getBytes();
    }

    public byte[] relatorioPacientes() {
        List<Paciente> pacientes = pacienteRepository.findAll();

        StringBuilder content = new StringBuilder();
        content.append("RELATÓRIO DE PACIENTES\n");
        content.append("====================\n\n");

        for (Paciente paciente : pacientes) {
            content.append(String.format("ID: %d | Nome: %s | Sobrenome: %s | CPF: %s | Nascimento: %s | Email: %s | Contato: %s | Situação: %s\n",//verificar o resto dos atributos
                    paciente.getId(),
                    paciente.getNome(),
                    paciente.getSobrenome(),
                    paciente.getCpf(),
                    paciente.getDtNascimento(),
                    paciente.getEmail(),
                    paciente.getContato(),
                    paciente.getSituacao()));//verificar o resto dos atributos
        }

        return content.toString().getBytes();
    }

    private String formatDate(LocalDateTime date) {
        if (date == null) return "N/A";
        return date.format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"));
    }
}
