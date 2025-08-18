package com.unibave.Lumina.controller;

import com.unibave.Lumina.DTOs.Evento.EventoDto;
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
    private final EventoRepository eventoRepository;


    public EventoController(EventoService eventoService, EventoRepository eventoRepository) {
        this.eventoService = eventoService;
        this.eventoRepository = eventoRepository;
    }

    @GetMapping("/buscar/data")
    public List<EventoDto> buscarPorData(@RequestParam("data") LocalDateTime data){
        return eventoService.buscarPorDataEvento(data);
    }

    @GetMapping("/buscar/nomeEvento")
    public ResponseEntity<List<EventoDto>> buscarPorNome(@RequestParam("nomeEvento") String nome){
        List<EventoDto> eventoDtos = eventoService.buscarPorNomeEvento(nome);
        return ResponseEntity.ok(eventoDtos);
    }

    @GetMapping("/buscar/id")
    public ResponseEntity<Optional<EventoDto>> buscarPorId(@RequestParam("id") Long id){
        Optional<EventoDto> evento = eventoService.buscarPorId(id);
        return ResponseEntity.ok(evento);
    }

    @GetMapping("/buscar/data/filtro")
    public List<EventoDto> filtrarPorData(
            @RequestParam("inicio") String inicio,
            @RequestParam("fim") String fim) {

        LocalDateTime dataInicio = LocalDateTime.parse(inicio);
        LocalDateTime dataFim = LocalDateTime.parse(fim);

        return eventoRepository.findByDtEventoBetween(dataInicio, dataFim);
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
