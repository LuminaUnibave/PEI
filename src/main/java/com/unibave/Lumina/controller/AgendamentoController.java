package com.unibave.Lumina.controller;

import com.unibave.Lumina.model.Agendamento;
import com.unibave.Lumina.service.AgendamentoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamentos") // Rota base para agendamentos
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    // Pega todos os agendamentos
    @GetMapping
    public List<Agendamento> listarTodos() {
        return agendamentoService.listarTodos();
    }

    // Pega um agendamento pelo id
    @GetMapping("/{id}")
    public ResponseEntity<Agendamento> buscarPorId(@PathVariable Long id) {
        return agendamentoService.buscarPorID(id)
                .map(ResponseEntity::ok)  // Se encontrar, retorna o agendamento
                .orElse(ResponseEntity.notFound().build());  // Retorna erro 404
    }

    // Cria um novo agendamento
    @PostMapping
    public ResponseEntity<Agendamento> criar(@RequestBody Agendamento agendamento) {
        Agendamento salvo = agendamentoService.salvar(agendamento);
        return ResponseEntity.ok(salvo); // Retorna o agendamento criado
    }

    // Atualiza um agendamento existente
    @PutMapping("/{id}")
    public ResponseEntity<Agendamento> atualizar(@PathVariable Long id, @RequestBody Agendamento agendamento) {
        return agendamentoService.buscarPorID(id)
                .map(existente -> {
                    agendamento.setIdAgendamento(id); // Define o id para atualizar
                    return ResponseEntity.ok(agendamentoService.salvar(agendamento));  // Salva e retorna
                })
                .orElse(ResponseEntity.notFound().build()); // Retorna erro 404
    }

    // Deleta um agendamento pelo id
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletar(@PathVariable Long id) {
        return agendamentoService.buscarPorID(id)
                .map(a -> {
                    agendamentoService.deletar(id); // Deleta o agendamento
                    return ResponseEntity.noContent().build(); // Retorna sucesso sem conteúdo 204
                })
                .orElse(ResponseEntity.notFound().build()); // Retorna erro 404
    }
}