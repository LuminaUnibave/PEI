package com.unibave.Lumina.model;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class AgendamentoTest {
    static Agendamento agendamento;
    static Agendamento agendamentoConstrutor;

    @DisplayName("Teste Gets + Sets e construtor vazio")
    @Test
    void dadosAgendamento(){
        System.out.println("Teste dos Gets, Sets e construtor vazio");
       agendamento = new Agendamento();
       agendamento.setPaciente(new Paciente("teste", LocalDate.parse("1900-01-01"), "teste@teste.com.br", "907.341.110-61","18933001613"));
        System.out.println("\nAgendamento inicializado: " + agendamento);

        agendamento.setTpVisita(Agendamento.TpVisita.CONSULTA);
        agendamento.setDtAgendamento(LocalDateTime.parse("2025-06-14T16:45"));
        agendamento.setObservacao("Teste de observação");

        System.out.println("\nAgendamento cadastrado: " + agendamento);

        assertEquals(STR."paciente_id, tp_visita, dt_agendamento, observacao, dt_criacao = [null, CONSULTA, 2025-06-14T16:45, Teste de observação, \{LocalDate.now()}]", agendamento.toString());
        System.out.println("\ntoString validado");
    }

    @DisplayName("Teste construtor Agendamento")
    @Test
    void construtor(){
        System.out.println("Teste do construtor de Agendamento");
        agendamentoConstrutor = new Agendamento(new Paciente("teste", LocalDate.parse("1900-01-01"), "teste@teste.com.br", "907.341.110-61","18933001613"),
                Agendamento.TpVisita.CONSULTA, LocalDateTime.parse("2025-06-14T16:45"), "Teste de observação");

        System.out.println("\nAgendamento do construtor: " + agendamentoConstrutor);
        assertEquals(STR."paciente_id, tp_visita, dt_agendamento, observacao, dt_criacao = [null, CONSULTA, 2025-06-14T16:45, Teste de observação, \{LocalDate.now()}]", agendamentoConstrutor.toString());
        System.out.println("\ntoString validado");
    }
}