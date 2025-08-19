package com.unibave.Lumina.controller;

import com.unibave.Lumina.DTOs.Evento.EventoDto;
import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.model.Evento;
import com.unibave.Lumina.repository.EventoRepository;
import com.unibave.Lumina.service.EventoService;
import org.springframework.http.ResponseEntity;
import org.aspectj.apache.bcel.classfile.Module;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/evento")
public class EventoController {
    private final EventoService eventoService;


    public EventoController(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    @GetMapping("/buscar/id")
    public ResponseEntity<Optional<EventoDto>> buscarPorId(@RequestParam("id") Long id){
        Optional<EventoDto> evento = eventoService.buscarPorId(id);
        return ResponseEntity.ok(evento);
    }

    @GetMapping("/buscar/nomeEvento")
    public ResponseEntity<List<EventoDto>> buscarPorNome(@RequestParam("nomeEvento") String nome){
        List<EventoDto> eventoDtos = eventoService.buscarPorNomeEvento(nome);
        return ResponseEntity.ok(eventoDtos);
    }

    @GetMapping("/buscar/stEvento")
    public ResponseEntity<List<EventoDto>> buscarPorStEvento(@RequestParam("stEvento") Situacao stEvento){
        List<EventoDto> eventoDtos = eventoService.buscarPorStEvento(stEvento);
        return ResponseEntity.ok(eventoDtos);
    }

    @GetMapping("/buscar/dtEvento")
    public List<EventoDto> buscarPorDtEvento(@RequestParam("dtEvento") LocalDateTime dtEvento){
        return eventoService.buscarPorDtEvento(dtEvento);
    }

    @GetMapping("/buscar/dtEventoAntes")
    public List<EventoDto> buscarPorDtEventoAntes(@RequestParam("dtEventoAntes") LocalDateTime dtEventoAntes){
        return eventoService.buscarPorDtEventoAntes(dtEventoAntes);
    }

    @GetMapping("/buscar/dtEventoDepois")
    public List<EventoDto> buscarPorDtEventoDepois(@RequestParam("dtEventoDepois") LocalDateTime dtEventoDepois){
        return eventoService.buscarPorDtEventoDepois(dtEventoDepois);
    }

    @GetMapping("/buscar/dtEventoEntre")
    public List<EventoDto> buscarPorDtEventoEntre(@RequestParam("dtEventoEntre") LocalDateTime dtEventoDepois, LocalDateTime dtEventoAntes){
        return eventoService.buscarPorDtEventoEntre(dtEventoDepois, dtEventoAntes);
    }

    @PostMapping("/salvar")
    public Evento salvar(@RequestBody Evento evento){
        return eventoService.salvar(evento);
    }

    @DeleteMapping("/deletar/id")
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        eventoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
