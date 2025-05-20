package com.unibave.Lumina.controller;

import com.unibave.Lumina.model.Agendamento;
import com.unibave.Lumina.service.AgendamentoService;

import java.time.LocalDateTime;
import java.util.Scanner;

public class AgendamentoController {
    private final AgendamentoService service = new AgendamentoService();
    private final Scanner scanner = new Scanner(System.in);

    public void menuAgendamento() {
        System.out.println("1 - Agendar Consulta ou Visita");
        System.out.println("2 - Listar Agendamentos");
        System.out.print("Escolha uma opção: ");
        int opcao = scanner.nextInt();
        scanner.nextLine();

        switch (opcao) {
            case 1 -> agendar();
            case 2 -> listar();
            default -> System.out.println("Opção inválida!");
        }
    }

    private void agendar() {
        System.out.print("Nome do Paciente: ");
        String nome = scanner.nextLine();

        System.out.print("Tipo (Consulta ou Visita): ");
        String tipo = scanner.nextLine();

        System.out.print("Data e hora (formato: DD-mm-YYYY HH:mm): ");
        LocalDateTime dataHora = LocalDateTime.parse(scanner.nextLine());

        System.out.print("Observações: ");
        String obs = scanner.nextLine();

        Agendamento agendamento = new Agendamento();
        agendamento.setNome(nome);
        agendamento.setTipoVisita(tipo);
        agendamento.setDataHora(dataHora);
        agendamento.setObservacoes(obs);

        service.agendar(agendamento);
        System.out.println("Agendamento realizado com sucesso!");
    }

    private void listar() {
        System.out.println("Agendamentos:");
        for (var agendamentos : service.listarAgendamentos()) {
            System.out.println(agendamentos.getTipoVisita() + " - " + agendamentos.getNome() + " - " + agendamentos.getDataHora() + " - " + agendamentos.getObservacoes());
        }
    }
}
