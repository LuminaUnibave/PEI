package com.unibave.Lumina.controller;

import com.unibave.Lumina.DTOs.Agendamento.AgendamentoAtualizarDTO;
import com.unibave.Lumina.DTOs.Agendamento.AgendamentoMapper;
import com.unibave.Lumina.DTOs.Agendamento.AgendamentoRequisicaoDTO;
import com.unibave.Lumina.DTOs.Agendamento.AgendamentoRespostaDTO;
import com.unibave.Lumina.model.entidades.Agendamento;
import com.unibave.Lumina.model.entidades.Paciente;
import com.unibave.Lumina.model.entidades.Usuario;
import com.unibave.Lumina.service.AgendamentoService;
import com.unibave.Lumina.service.PacienteService;
import com.unibave.Lumina.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/agendamento")
public class AgendamentoController {

    private final AgendamentoService agendamentoService;
    private final AgendamentoMapper agendamentoMapper;
    private final UsuarioService usuarioService;
    private final PacienteService pacienteService;

    @Autowired
    public AgendamentoController(AgendamentoService agendamentoService, AgendamentoMapper agendamentoMapper, UsuarioService usuarioService, PacienteService pacienteService) {
        this.agendamentoService = agendamentoService;
        this.agendamentoMapper = agendamentoMapper;
        this.usuarioService = usuarioService;
        this.pacienteService = pacienteService;
    }

    @GetMapping("/contar")
    @Operation(summary = "Contar todos os agendamentos", description = "Conta a quantidade de agendamentos")
    public ResponseEntity<Long> contar(){
        long contador = agendamentoService.contar();
        return ResponseEntity.ok(contador);
    }

    @GetMapping("/buscar/todos")
    @Operation(summary = "Buscar todos os agendamentos", description = "Retorna todos os agendamentos")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Agendamento(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Agendamento(s) não encontrado(s)")
    })
    public ResponseEntity<List<AgendamentoRespostaDTO>> buscarTodos(){
        List<Agendamento> agendamentos = agendamentoService.buscarTodos();
        return ResponseEntity.ok(Collections.singletonList(agendamentoMapper.toDto((Agendamento) agendamentos)));
    }

    // GET /agendamento/buscar/id?id=...
    @GetMapping("/buscar/id")
    @Operation(summary = "Buscar agendamento por ID", description = "Retorna o agendamento pelo seu identificador (único)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Agendamento encontrado"),
            @ApiResponse(responseCode = "404", description = "Agendamento não encontrado")
    })
    public ResponseEntity<Optional<AgendamentoRespostaDTO>> buscarPorId(
            @RequestParam("id") Long id){
        Agendamento agendamento = agendamentoService.buscarPorId(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado"));
        return ResponseEntity.ok(Optional.ofNullable(agendamentoMapper.toDto(agendamento)));
    }

    // GET /agendamento/buscar/tpvisita?tp_visita=...
    @GetMapping("/buscar/tpVisita")
    @Operation(summary = "Buscar agendamentos por tipo de visita", description = "Retorna o(s) agendamento(s) pelo tipo de visita")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Agendamento(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Agendamento(s) não encontrado(s)")
    })
    public ResponseEntity<List<AgendamentoRespostaDTO>> buscarPorTpVisita(
            @RequestParam("tpVisita")Agendamento.TpVisita tpVisita) {
        List<Agendamento> agendamentos = agendamentoService.buscarTpVisita(tpVisita);
        return ResponseEntity.ok(Collections.singletonList(agendamentoMapper.toDto((Agendamento) agendamentos)));
    }

    // GET /agendamento/buscar/paciente/id?id=...
    @GetMapping("/buscar/paciente/id")
    @Operation(summary = "Buscar agendamentos pelo id do paciente", description = "Retorna o(s) agendamento(s) pelo identificador do paciente")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Agendamento(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Agendamento(s) não encontrado(s)")
    })
    public ResponseEntity<List<AgendamentoRespostaDTO>> buscarPorPacienteId(
            @RequestParam("id") Long id) {
        List<Agendamento> agendamentos = agendamentoService.buscarPorPacienteId(id);
        return ResponseEntity.ok(Collections.singletonList(agendamentoMapper.toDto((Agendamento) agendamentos)));
    }

    // GET /agendamento/buscar/paciente/nome?nome=...
    @GetMapping("/buscar/paciente/nome")
    @Operation(summary = "Buscar agendamentos pelo nome do paciente", description = "Retorna o(s) agendamento(s) pelo nome do paciente")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Agendamento(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Agendamento(s) não encontrado(s)")
    })
    public ResponseEntity<List<AgendamentoRespostaDTO>> buscarPorPacienteNome(
            @RequestParam("nome") String nome) {
        List<Agendamento> agendamentos = agendamentoService.buscarPorPacienteNome(nome);
        return ResponseEntity.ok(Collections.singletonList(agendamentoMapper.toDto((Agendamento) agendamentos)));
    }

    // POST /agendamento/salvar
    @PostMapping("/salvar")
    @Operation(summary = "Salvar agendamento", description = "Salva o agendamento")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Agendamento salvo"),
            @ApiResponse(responseCode = "404", description = "Agendamento não salvo")
    })
    public ResponseEntity<AgendamentoRespostaDTO> salvar(
            @RequestBody AgendamentoRequisicaoDTO agendamentoRequisicaoDTO) {
        Agendamento agendamento = agendamentoMapper.toEntity(agendamentoRequisicaoDTO);
        Optional<Paciente> paciente = pacienteService.buscarPorId(agendamentoRequisicaoDTO.getIdPaciente());
        Optional<Usuario> usuario = usuarioService.buscarPorId(agendamentoRequisicaoDTO.getIdUsuario());
        agendamento.setPaciente(paciente.get());
        agendamento.setUsuario(usuario.get());
        agendamento = agendamentoService.salvar(agendamento);
        return ResponseEntity.ok(agendamentoMapper.toDto(agendamento));
    }

    //PUT /agendamento/atualizar
    @PutMapping("/atualizar")
    @Operation(summary = "Atualizar agendamento", description = "Atualiza o agendamento")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Agendamento atualizado"),
            @ApiResponse(responseCode = "404", description = "Agendamento não atualizado")
    })
    public ResponseEntity<AgendamentoRespostaDTO> atualizar(
            @RequestBody AgendamentoAtualizarDTO agendamentoAtualizarDTO) {
        Agendamento agendamento = agendamentoMapper.toEntity(agendamentoAtualizarDTO);
        //Busca as entitades referenciadas
        Optional<Paciente> paciente = pacienteService.buscarPorId(agendamentoAtualizarDTO.getIdPaciente());
        Optional<Usuario> usuario = usuarioService.buscarPorId(agendamentoAtualizarDTO.getIdUsuario());
        //Set das entidades no agendamento
        agendamento.setPaciente(paciente.get());
        agendamento.setUsuario(usuario.get());
        //Salva o agendamento
        agendamento = agendamentoService.salvar(agendamento);
        return ResponseEntity.ok(agendamentoMapper.toDto(agendamento));
    }

    // DELETE /agendamento/deletar/id?id=...
    @DeleteMapping("/deletar/id")
    @Operation(summary = "Deletar agendamento", description = "Deleta o agendamento")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Agendamento deletado"),
            @ApiResponse(responseCode = "404", description = "Agendamento não deletado")
    })
    public ResponseEntity<Void> deletar(
            @RequestParam("id") Long id) {
        agendamentoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}