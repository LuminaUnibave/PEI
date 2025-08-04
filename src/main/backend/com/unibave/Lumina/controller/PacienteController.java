package com.unibave.Lumina.controller;

import com.unibave.Lumina.DTOs.Paciente.PacienteDto;
import com.unibave.Lumina.service.PacienteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/paciente")
public class PacienteController {
    private final PacienteService pacienteService;

    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    // GET /paciente/buscar/nome?nome=...
    @GetMapping("/buscar/nome")
    public ResponseEntity<List<PacienteDto>> buscarPorNome(@RequestParam("nome") String nome) {
        List<PacienteDto> pacientes = pacienteService.buscarPorNome(nome);
        return ResponseEntity.ok(pacientes);
    }

    // GET /paciente/buscar/id?id=...
    @GetMapping("/buscar/id")
    public ResponseEntity<PacienteDto> buscarPorId(@RequestParam("id") Long id) {
        PacienteDto paciente = pacienteService.buscarPorId(id);
        return ResponseEntity.ok(paciente);
    }

    // POST /paciente/salvar
    @PostMapping("/salvar")
    public ResponseEntity<PacienteDto> salvar(@RequestBody PacienteDto pacienteDto) {
        PacienteDto pacienteSalvo = pacienteService.salvar(pacienteDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(pacienteSalvo);
    }

    // DELETE /paciente/deletar/id?id=...
    @DeleteMapping("/deletar/id")
    public ResponseEntity<Void> deletar(@RequestParam("id") Long id) {
        pacienteService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}