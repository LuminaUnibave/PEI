package com.unibave.Lumina.controller;

import com.unibave.Lumina.model.Paciente;
import com.unibave.Lumina.service.PacienteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/paciente")
public class PacienteController {
    private final PacienteService pacienteService;

    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    //GETS
    @GetMapping("/nome")
    public List<Paciente> buscarPorNome(@RequestParam("nome") String nome) {
        return pacienteService.buscarPorNome(nome);
    }
    @GetMapping("/id") // /paciente/{id}
    public Optional<Paciente> buscarPorId(@RequestParam("id") Long id) {
        return pacienteService.buscarPorId(id);
    }

    // POST
    @PostMapping
    public Paciente salvar(@RequestBody Paciente paciente) {
        return pacienteService.salvar(paciente);
    }

    // DELETE /paciente/{id}
    @DeleteMapping("/id")
    public void deletar(@RequestParam("id") Long id) {
        pacienteService.deletar(id);
    }
}
