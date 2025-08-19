package com.unibave.Lumina.controller;

import com.unibave.Lumina.DTOs.Paciente.PacienteDto;
import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.service.PacienteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/paciente")
public class PacienteController {
    private final PacienteService pacienteService;

    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }


    // GET /paciente/buscar/todos
    @GetMapping("/buscar/todos")
    public ResponseEntity<List<PacienteDto>> buscarTodos() {
        return ResponseEntity.ok(pacienteService.buscarTodos());
    }

    // GET /paciente/buscar/id?id=...
    @GetMapping("/buscar/id")
    public ResponseEntity<PacienteDto> buscarPorId(@RequestParam("id") Long id) {
        return ResponseEntity.ok(pacienteService.buscarPorId(id));
    }

    // GET /paciente/buscar/nome?nome=...
    @GetMapping("/buscar/nome")
    public ResponseEntity<List<PacienteDto>> buscarPorNome(@RequestParam("nome") String nome) {
        return ResponseEntity.ok(pacienteService.buscarPorNome(nome));
    }

    // GET /paciente/buscar/cpf?cpf=...
    @GetMapping("/buscar/cpf")
    public ResponseEntity<PacienteDto> buscarPorCpf(@RequestParam("cpf") String cpf) {
        return ResponseEntity.ok(pacienteService.buscarPorCpf(cpf));
    }

    // GET /paciente/buscar/situacao?situacao=ATIVO
    @GetMapping("/buscar/situacao")
    public ResponseEntity<List<PacienteDto>> buscarPorSituacao(@RequestParam("situacao") Situacao situacao) {
        return ResponseEntity.ok(pacienteService.buscarPorSituacao(situacao));
    }

    // GET /paciente/buscar/dtnascimento?data=2000-01-01
    @GetMapping("/buscar/dtnascimento")
    public ResponseEntity<List<PacienteDto>> buscarPorDataNascimento(
            @RequestParam("data") LocalDate data) {
        return ResponseEntity.ok(pacienteService.buscarPorDataNascimento(data));
    }

    // GET /paciente/buscar/dtnascimento/antes?data=2000-01-01
    @GetMapping("/buscar/dtnascimento/antes")
    public ResponseEntity<List<PacienteDto>> buscarPorDataNascimentoAntes(
            @RequestParam("data") LocalDate data) {
        return ResponseEntity.ok(pacienteService.buscarPorDataNascimentoAntes(data));
    }

    // GET /paciente/buscar/dtnascimento/depois?data=2000-01-01
    @GetMapping("/buscar/dtnascimento/depois")
    public ResponseEntity<List<PacienteDto>> buscarPorDataNascimentoDepois(
            @RequestParam("data") LocalDate data) {
        return ResponseEntity.ok(pacienteService.buscarPorDataNascimentoDepois(data));
    }

    // GET /paciente/buscar/dtnascimento/entre?inicio=1990-01-01&fim=2000-12-31
    @GetMapping("/buscar/dtnascimento/entre")
    public ResponseEntity<List<PacienteDto>> buscarPorDataNascimentoEntre(
            @RequestParam("inicio") LocalDate inicio,
            @RequestParam("fim") LocalDate fim) {
        return ResponseEntity.ok(pacienteService.buscarPorDataNascimentoentre(inicio, fim));
    }

    // GET /paciente/buscar/crtsus?crtsus=123456
    @GetMapping("/buscar/crtsus")
    public ResponseEntity<PacienteDto> buscarPorCrtSus(@RequestParam("crtsus") String crtSus) {
        return ResponseEntity.ok(pacienteService.buscarPorCrtSus(crtSus));
    }

    // GET /paciente/buscar/email?email=teste@email.com
    @GetMapping("/buscar/email")
    public ResponseEntity<List<PacienteDto>> buscarPorEmail(@RequestParam("email") String email) {
        return ResponseEntity.ok(pacienteService.buscarPorEmail(email));
    }

    // GET /paciente/buscar/dtcadastro?data=2025-01-01T10:00:00
    @GetMapping("/buscar/dtcadastro")
    public ResponseEntity<List<PacienteDto>> buscarPorDtCadastro(
            @RequestParam("data") LocalDateTime data) {
        return ResponseEntity.ok(pacienteService.buscarPorDtCadastro(data));
    }

    // GET /paciente/buscar/dtcadastro/antes?data=2025-01-01T10:00:00
    @GetMapping("/buscar/dtcadastro/antes")
    public ResponseEntity<List<PacienteDto>> buscarPorDtCadastroAntes(
            @RequestParam("data") LocalDateTime data) {
        return ResponseEntity.ok(pacienteService.buscarPorDtCadastroAntes(data));
    }

    // GET /paciente/buscar/dtcadastro/depois?data=2025-01-01T10:00:00
    @GetMapping("/buscar/dtcadastro/depois")
    public ResponseEntity<List<PacienteDto>> buscarPorDtCadastroDepois(
            @RequestParam("data")LocalDateTime data) {
        return ResponseEntity.ok(pacienteService.buscarPorDtCadastroDepois(data));
    }

    // GET /paciente/buscar/dtcadastro/entre?inicio=2025-01-01T10:00:00&fim=2025-08-01T10:00:00
    @GetMapping("/buscar/dtcadastro/entre")
    public ResponseEntity<List<PacienteDto>> buscarPorDtCadastroEntre(
            @RequestParam("inicio") LocalDateTime inicio,
            @RequestParam("fim") LocalDateTime fim) {
        return ResponseEntity.ok(pacienteService.buscarPorDtCadastroEntre(inicio, fim));
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