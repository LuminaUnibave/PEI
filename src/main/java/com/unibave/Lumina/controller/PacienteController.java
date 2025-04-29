package com.unibave.Lumina.controller;

import com.unibave.Lumina.model.Paciente;
import com.unibave.Lumina.service.PacienteService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/paciente")
public class PacienteController {
    private final PacienteService pacienteService;

    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @GetMapping("/nome/{nome}")
    public Optional<Paciente> buscarNome(@PathVariable("nome") String nome){
        return pacienteService.buscarNome(nome);
    }

    // GET /paciente/{id}
    @GetMapping("/{id}")
    public Optional<Paciente> buscarPorId(@PathVariable("id") Long id) {
        return pacienteService.buscarPorId(id);
    }
    // POST
    @PostMapping
    public Paciente salvar(@RequestBody Paciente paciente) {
        return pacienteService.salvar(paciente);
    }

    // DELETE /paciente/{id}
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable("id") Long id) {
        pacienteService.deletar(id);
    }
}
