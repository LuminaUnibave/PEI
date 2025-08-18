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

    // GET /paciente/buscar/id?id=...
    @GetMapping("/buscar/id")
    public ResponseEntity<Optional<PacienteDto>> buscarPorId(@RequestParam("id") Long id) {
        Optional<PacienteDto> paciente = pacienteService.buscarPorId(id);
        return ResponseEntity.ok(paciente);
    }

    // GET /paciente/buscar/todos...
    @GetMapping("/buscar/todos")
    public ResponseEntity<List<PacienteDto>> buscarTodos() {
        List<PacienteDto> paciente = pacienteService.buscarTodos();
        return ResponseEntity.ok(paciente);
    }

    // GET /paciente/buscar/nome?nome=...
    @GetMapping("/buscar/nome")
    public ResponseEntity<List<PacienteDto>> buscarPorNome(@RequestParam("nome") String nome) {
        List<PacienteDto> pacientes = pacienteService.buscarPorNome(nome);
        return ResponseEntity.ok(pacientes);
    }

    // GET /paciente/buscar/cpf?cpf=...
    @GetMapping("/buscar/cpf")
    public ResponseEntity<Optional<PacienteDto>> buscarPorCpf(@RequestParam("cpf") String cpf) {
        Optional<PacienteDto> pacientes = pacienteService.buscarPorCpf(cpf);
        return ResponseEntity.ok(pacientes);
    }

    // GET /paciente/buscar/situacao?situacao=...
    @GetMapping("/buscar/situacao")
    public ResponseEntity<List<PacienteDto>> buscarPorSituacao(@RequestParam("situacao")Situacao situacao) {
        List<PacienteDto> pacientes = pacienteService.buscarPorSituacao(situacao);
        return ResponseEntity.ok(pacientes);
    }

    // GET /paciente/buscar/dtNascimento?dtNascimento=...
    @GetMapping("/buscar/dtNascimento")
    public ResponseEntity<List<PacienteDto>> buscarPorDtNascimento(@RequestParam("dtNascimento") LocalDate dtNascimento) {
        List<PacienteDto> pacientes = pacienteService.buscarPorDtNascimento(dtNascimento);
        return ResponseEntity.ok(pacientes);
    }
    // GET /paciente/buscar/dtNascimentoAntes?dtNascimentoAntes=...
    @GetMapping("/buscar/dtNascimentoAntes")
    public ResponseEntity<List<PacienteDto>> buscarPorDtNascimentoAntes(@RequestParam("dtNascimentoAntes") LocalDate dtNascimentoAntes) {
        List<PacienteDto> pacientes = pacienteService.buscarPorDtNascimentoAntes(dtNascimentoAntes);
        return ResponseEntity.ok(pacientes);
    }

    // GET /paciente/buscar/dtNascimentoDepois?dtNascimentoDepois=...
    @GetMapping("/buscar/dtNascimentoDepois")
    public ResponseEntity<List<PacienteDto>> buscarPorDtNascimentoDepois(@RequestParam("dtNascimentoDepois") LocalDate dtNascimentoDepois) {
        List<PacienteDto> pacientes = pacienteService.buscarPorDtNascimentoDepois(dtNascimentoDepois);
        return ResponseEntity.ok(pacientes);
    }

    // GET /paciente/buscar/dtNascimentoEntre?dtNascimentoEntre=...
    @GetMapping("/buscar/dtNascimentoEntre")
    public ResponseEntity<List<PacienteDto>> buscarPorDtNascimentoEntre(@RequestParam("dtNascimentoEntre") LocalDate dtNascimentoDepois, LocalDate dtNascimentoAntes) {
        List<PacienteDto> pacientes = pacienteService.buscarPorDtNascimentoEntre(dtNascimentoDepois,  dtNascimentoAntes);
        return ResponseEntity.ok(pacientes);
    }

    // GET /paciente/buscar/crtSus?crtSus=...
    @GetMapping("/buscar/crtSus")
    public ResponseEntity<Optional<PacienteDto>> buscarPorCrtSus(@RequestParam("crtSus") String crtSus) {
        Optional<PacienteDto> pacientes = pacienteService.buscarPorCrtSus(crtSus);
        return ResponseEntity.ok(pacientes);
    }

    // GET /paciente/buscar/email?email=...
    @GetMapping("/buscar/email")
    public ResponseEntity<List<PacienteDto>> buscarPorEmail(@RequestParam("email") String email) {
        List<PacienteDto> pacientes = pacienteService.buscarPorEmail(email);
        return ResponseEntity.ok(pacientes);
    }

    // GET /paciente/buscar/dtCadastro?dtCadastro=...
    @GetMapping("/buscar/dtCadastro")
    public ResponseEntity<List<PacienteDto>> buscarPorDtCadastro(@RequestParam("dtCadastro") LocalDateTime dtCadastro) {
        List<PacienteDto> pacientes = pacienteService.buscarPorDtCadastro(dtCadastro);
        return ResponseEntity.ok(pacientes);
    }

    // GET /paciente/buscar/dtCadastroDepois?dtCadastroDepois=...
    @GetMapping("/buscar/dtCadastroDepois")
    public ResponseEntity<List<PacienteDto>> buscarPorDtCadastroDepois(@RequestParam("dtCadastroDepois") LocalDateTime dtCadastroDepois) {
        List<PacienteDto> pacientes = pacienteService.buscarPorDtCadastroDepois(dtCadastroDepois);
        return ResponseEntity.ok(pacientes);
    }

    // GET /paciente/buscar/dtCadastroAntes?dtCadastroAntes=...
    @GetMapping("/buscar/dtCadastroAntes")
    public ResponseEntity<List<PacienteDto>> buscarPorDtCadastroAntes(@RequestParam("dtCadastroAntes") LocalDateTime dtCadastroAntes) {
        List<PacienteDto> pacientes = pacienteService.buscarPorDtCadastroAntes(dtCadastroAntes);
        return ResponseEntity.ok(pacientes);
    }

    // GET /paciente/buscar/dtCadastroEntre?dtCadastroEntre=...
    @GetMapping("/buscar/dtCadastroEntre")
    public ResponseEntity<List<PacienteDto>> buscarPorDtCadastroEntre(@RequestParam("dtCadastroEntre") LocalDateTime dtCadastroDepois, LocalDateTime dtCadastroAntes) {
        List<PacienteDto> pacientes = pacienteService.buscarPorDtCadastroEntre(dtCadastroDepois, dtCadastroAntes);
        return ResponseEntity.ok(pacientes);
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