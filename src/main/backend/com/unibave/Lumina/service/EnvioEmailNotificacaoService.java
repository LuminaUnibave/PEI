package com.unibave.Lumina.service;

import com.unibave.Lumina.model.entidades.Agendamento;
import com.unibave.Lumina.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
public class EnvioEmailNotificacaoService {

    @Autowired
    private final EmailService emailService;
    private final TaskScheduler taskScheduler;
    private final AgendamentoRepository agendamentoRepository;

    public EnvioEmailNotificacaoService(EmailService emailService, TaskScheduler taskScheduler, AgendamentoRepository agendamentoRepository) {
        this.emailService = emailService;
        this.taskScheduler = taskScheduler;
        this.agendamentoRepository = agendamentoRepository;
    }

    public void lembreteConsulta(Agendamento agendamento) {
        LocalDateTime dataLembrete = agendamento.getDtAgendamento().minusDays(1); // Subtrai 1 dia da data da consulta para saber quando enviar o e-mail

        Instant instante = dataLembrete.atZone(ZoneId.of("America/Sao_Paulo")).toInstant(); // Usa o horário de São Paulo como base

        taskScheduler.schedule(() -> {
            emailService.enviarEmail(
                    agendamento.getPaciente().getEmail(),
                    "Confirmação de Consulta",
                    "Olá " + agendamento.getPaciente().getNome() +
                            ", sua consulta é em " + agendamento.getDtAgendamento()
            );
        }, instante);
    }
}
