package com.unibave.Lumina.controller;

import com.unibave.Lumina.model.Agendamento;
import com.unibave.Lumina.model.Paciente;
import com.unibave.Lumina.service.AgendamentoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/agendamento") // Rota base para agendamento
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    //GET
    @GetMapping("/tpvisita")
    public List<Agendamento> buscarPorTpVisita(@RequestParam("tp_visita") Agendamento.TpVisita tpVisita){
        return agendamentoService.buscarTpVisita(tpVisita);
    }
    @GetMapping("/paciente/id")
    public List<Agendamento> buscarPorPacienteId(@RequestParam("id") Long id) {
        return agendamentoService.buscarPorPacienteId(id);
        }
    @GetMapping("/paciente/nome")
    public List<Agendamento> buscarPorPacienteNome(@RequestParam("nome") String nome){
        return agendamentoService.buscarPorPacienteNome(nome);
    }
    @GetMapping
    public List<Agendamento> listarTodos() {
        return agendamentoService.listarTodos();
    }
    @GetMapping("/id")
    public Optional<Agendamento> buscarPorId(@RequestParam("id") Long id){
        return agendamentoService.buscarPorId(id);
    }

    //POST
    @PostMapping
    public Agendamento salvar(@RequestBody Agendamento agendamento){
        return agendamentoService.salvar(agendamento);
    }

    // DELETE /agendamento/{id}
    @DeleteMapping("deletar/id")
    public void deletar(@RequestParam("id")Long id) {
        agendamentoService.deletar(id);
    }
}