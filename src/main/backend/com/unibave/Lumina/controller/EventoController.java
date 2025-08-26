package com.unibave.Lumina.controller;

import com.unibave.Lumina.DTOs.Evento.EventoAtualizarDTO;
import com.unibave.Lumina.DTOs.Evento.EventoMapper;
import com.unibave.Lumina.DTOs.Evento.EventoRequisicaoDTO;
import com.unibave.Lumina.DTOs.Evento.EventoRespostaDTO;
import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.model.entidades.Evento;
import com.unibave.Lumina.model.entidades.Usuario;
import com.unibave.Lumina.service.EventoService;
import com.unibave.Lumina.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/evento")
public class EventoController {

    private final EventoService eventoService;
    private final EventoMapper eventoMapper;
    private  final UsuarioService usuarioService;

    @Autowired
    public EventoController(EventoService eventoService, EventoMapper eventoMapper, UsuarioService usuarioService) {
        this.eventoService = eventoService;
        this.eventoMapper = eventoMapper;
        this.usuarioService = usuarioService;
    }

    @GetMapping("/buscar/todos")
    @Operation(summary = "Buscar todos os evento", description = "Retorna todos os eventos")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Evento(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Evento(s) não encontrado(s)")
    })
    public ResponseEntity<List<EventoRespostaDTO>> buscarTodos(){
        List<Evento> eventos = eventoService.buscarTodos();
        return ResponseEntity.ok(Collections.singletonList(eventoMapper.toDto((Evento) eventos)));
    }

    @GetMapping("/buscar/id")
    @Operation(summary = "Buscar evento por ID", description = "Retorna o evento pelo seu identificador único")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Evento encontrado"),
            @ApiResponse(responseCode = "404", description = "Evento não encontrado")
    })
    public ResponseEntity<Optional<EventoRespostaDTO>> buscarPorId(
            @RequestParam("id") Long id){
        Evento evento = eventoService.buscarPorId(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado"));
        return ResponseEntity.ok(Optional.ofNullable(eventoMapper.toDto(evento)));
    }

    @GetMapping("/buscar/nmEvento")
    @Operation(summary = "Buscar evento por nome", description = "Retorna o(s) evento(s) pelo nome")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Evento(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Evento(s) não encontrado(s)")
    })
    public ResponseEntity<List<EventoRespostaDTO>> buscarPorNome(
            @RequestParam("nmEvento") String nmEvento){
        List<Evento> eventos = eventoService.buscarPorNmEvento(nmEvento);
        return ResponseEntity.ok(Collections.singletonList(eventoMapper.toDto((Evento) eventos)));
    }

    @GetMapping("/buscar/stEvento")
    @Operation(summary = "Buscar evento por situação", description = "Retorna o(s) evento(s) pela situação")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Evento(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Evento(s) não encontrado(s)")
    })
    public ResponseEntity<List<EventoRespostaDTO>> buscarPorStEvento(
            @RequestParam("stEvento") Situacao stEvento){
        List<Evento> eventos = eventoService.buscarPorStEvento(stEvento);
        return ResponseEntity.ok(Collections.singletonList(eventoMapper.toDto((Evento) eventos)));
    }

    @GetMapping("/buscar/dtEvento")
    @Operation(summary = "Buscar evento pela data", description = "Retorna o(s) evento(s) pela data")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Evento(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Evento(s) não encontrado(s)")
    })
    public ResponseEntity<List<EventoRespostaDTO>> buscarPorDtEvento(
            @RequestParam("dtEvento") LocalDateTime dtEvento){
        List<Evento> eventos = eventoService.buscarPorDtEvento(dtEvento);
        return ResponseEntity.ok(Collections.singletonList(eventoMapper.toDto((Evento) eventos)));
    }

    @GetMapping("/buscar/dtEvento/antes")
    @Operation(summary = "Buscar evento pela data antes do período", description = "Retorna o(s) evento(s) pela data antes do período")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Evento(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Evento(s) não encontrado(s)")
    })
    public ResponseEntity<List<EventoRespostaDTO>> buscarPorDtEventoAntes(
            @RequestParam("antes") LocalDateTime antes){
        List<Evento> eventos = eventoService.buscarPorDtEventoAntes(antes);
        return ResponseEntity.ok(Collections.singletonList(eventoMapper.toDto((Evento) eventos)));
    }

    @GetMapping("/buscar/dtEvento/depois")
    @Operation(summary = "Buscar evento pela data depois do período", description = "Retorna o(s) evento(s) pela data depois do período")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Evento(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Evento(s) não encontrado(s)")
    })
    public ResponseEntity<List<EventoRespostaDTO>> buscarPorDtEventoDepois(
            @RequestParam("depois") LocalDateTime depois){
        List<Evento> eventos = eventoService.buscarPorDtEventoDepois(depois);
        return ResponseEntity.ok(Collections.singletonList(eventoMapper.toDto((Evento) eventos)));
    }

    @GetMapping("/buscar/dtEvento/entre")
    @Operation(summary = "Buscar evento pela data entre o período", description = "Retorna o(s) evento(s) pela data entre o período")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Evento(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Evento(s) não encontrado(s)")
    })
    public ResponseEntity<List<EventoRespostaDTO>> buscarPorDtEventoEntre(
            @RequestParam("entre") LocalDateTime depois, LocalDateTime antes){
        List<Evento> eventos = eventoService.buscarPorDtEventoEntre(depois, antes);
        return ResponseEntity.ok(Collections.singletonList(eventoMapper.toDto((Evento) eventos)));
    }

    @PostMapping("/salvar")
    @Operation(summary = "Salvar evento", description = "Salva o evento")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Evento salvo"),
            @ApiResponse(responseCode = "404", description = "Evento não salvo")
    })
    public ResponseEntity<EventoRespostaDTO> salvar(
            @RequestBody EventoRequisicaoDTO eventoRequisicaoDTO){
        Evento evento = eventoMapper.toEntity(eventoRequisicaoDTO);
        Optional<Usuario> usuario = usuarioService.buscarPorId(eventoRequisicaoDTO.getIdUsuario());
        evento.setUsuario(usuario.get());
        evento = eventoService.salvar(evento);
        return ResponseEntity.ok(eventoMapper.toDto(evento));
    }

    @PutMapping("/atualizar")
    @Operation(summary = "Atualizar evento", description = "Atualiza o evento")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Evento atualizado"),
            @ApiResponse(responseCode = "404", description = "Evento não atualizado")
    })
    public ResponseEntity<EventoRespostaDTO> atualizar(
            @RequestBody EventoAtualizarDTO eventoAtualizarDTO){
        Evento evento = eventoMapper.toEntity(eventoAtualizarDTO);
        Optional<Usuario> usuario = usuarioService.buscarPorId(eventoAtualizarDTO.getIdUsuario());
        evento.setUsuario(usuario.get());
        evento = eventoService.salvar(evento);
        return ResponseEntity.ok(eventoMapper.toDto(evento));
    }

    @DeleteMapping("/deletar/id")
    @Operation(summary = "Deletar evento", description = "Deleta o evento")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Evento deletado"),
            @ApiResponse(responseCode = "404", description = "Evento não deletado")
    })
    public ResponseEntity<Void> deletar(
            @RequestParam("id") Long id){
        eventoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
