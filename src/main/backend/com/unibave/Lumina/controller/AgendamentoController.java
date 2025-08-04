package com.unibave.Lumina.controller;

import com.unibave.Lumina.DTOs.Agendamento.AgendamentoDto;
import com.unibave.Lumina.model.Agendamento;
import com.unibave.Lumina.service.AgendamentoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamento")
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    // GET /agendamento/buscar/tpvisita?tp_visita=...
    @GetMapping("/buscar/tpvisita")
    public ResponseEntity<List<AgendamentoDto>> buscarPorTpVisita(
            @RequestParam("tp_visita") Agendamento.TpVisita tpVisita) {
        List<AgendamentoDto> agendamentos = agendamentoService.buscarTpVisita(tpVisita);
        return ResponseEntity.ok(agendamentos);
    }

    // GET /agendamento/buscar/paciente/id?id=...
    @GetMapping("/buscar/paciente/id")
    public ResponseEntity<List<AgendamentoDto>> buscarPorPacienteId(
            @RequestParam("id") Long id) {
        List<AgendamentoDto> agendamentos = agendamentoService.buscarPorPacienteId(id);
        return ResponseEntity.ok(agendamentos);
    }

    // GET /agendamento/buscar/paciente/nome?nome=...
    @GetMapping("/buscar/paciente/nome")
    public ResponseEntity<List<AgendamentoDto>> buscarPorPacienteNome(
            @RequestParam("nome") String nome) {
        List<AgendamentoDto> agendamentos = agendamentoService.buscarPorPacienteNome(nome);
        return ResponseEntity.ok(agendamentos);
    }

    // GET /agendamento/buscar/todos
    @GetMapping("/buscar/todos")
    public ResponseEntity<List<AgendamentoDto>> listarTodos() {
        List<AgendamentoDto> agendamentos = agendamentoService.buscarTodos();
        return ResponseEntity.ok(agendamentos);
    }

    // GET /agendamento/buscar/id?id=...
    @GetMapping("/buscar/id")
    public ResponseEntity<AgendamentoDto> buscarPorId(
            @RequestParam("id") Long id) {
        AgendamentoDto agendamento = agendamentoService.buscarPorId(id);
        return ResponseEntity.ok(agendamento);
    }

    // POST /agendamento/salvar
    @PostMapping("/salvar")
    public ResponseEntity<AgendamentoDto> salvar(
            @RequestBody AgendamentoDto agendamentoDto) {
        AgendamentoDto agendamentoSalvo = agendamentoService.salvar(agendamentoDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(agendamentoSalvo);
    }

    // DELETE /agendamento/deletar/id?id=...
    @DeleteMapping("/deletar/id")
    public ResponseEntity<Void> deletar(
            @RequestParam("id") Long id) {
        agendamentoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}