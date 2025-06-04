package com.unibave.Lumina.controller;

import com.unibave.Lumina.model.Evento;
import com.unibave.Lumina.service.EventoService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/evento")
public class EventoController {
    private final EventoService eventoService;


    public EventoController(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    @GetMapping("/data")
    public List<Evento> buscarPorData(@RequestParam("data") LocalDate data){
        return eventoService.buscarPorData(data);
    }

    @GetMapping("/nomeEvento")
    public List<Evento> buscarPorNome(@RequestParam("nomeEvento") String nome){
        return eventoService.buscarPorNome(nome);
    }

    @GetMapping("/id")
    public List<Evento> buscarPorID(@RequestParam("id")Long id){
        return eventoService.buscarPorId(id);
    }

    @DeleteMapping("/id")
    public void deletar(@RequestParam("id")Long id){
        eventoService.deletar(id);
    }
}
