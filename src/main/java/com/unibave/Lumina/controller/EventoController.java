package com.unibave.Lumina.controller;

import com.unibave.Lumina.model.Evento;
import com.unibave.Lumina.repository.EventoRepository;
import com.unibave.Lumina.service.EventoService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

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
    public List<Evento> buscarPorData(@RequestParam("data") LocalDate data){
        return eventoService.buscarPorDataEvento(data);
    }

    @GetMapping("/buscar/nomeEvento")
    public List<Evento> buscarPorNome(@RequestParam("nomeEvento") String nome){
        return eventoService.buscarPorNomeEvento(nome);
    }

    @GetMapping("/buscar/id")
    public List<Evento> buscarPorID(@RequestParam("id")Long id){
        return eventoService.buscarPorIdEvento(id);
    }
    @GetMapping("/buscar/data/filtro")
    public List<Evento> filtrarPorData(
            @RequestParam("inicio") String inicio,
            @RequestParam("fim") String fim) {

        LocalDate dataInicio = LocalDate.parse(inicio);
        LocalDate dataFim = LocalDate.parse(fim);

        return eventoRepository.findByDataEventoBetween(dataInicio, dataFim);
    }

    @PostMapping
    public Evento salvar(@RequestBody Evento evento){return eventoService.salvar(evento);}

    @DeleteMapping("/deletar/id")
    public void deletar(@RequestParam("id")Long id){
        eventoService.deletar(id);
    }
}
