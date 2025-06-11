package com.unibave.Lumina.service;

import com.unibave.Lumina.repository.EventoRepository;
import org.springframework.stereotype.Service;
import com.unibave.Lumina.model.Evento;

import java.time.LocalDate;
import java.util.List;

@Service
public class EventoService {
    private final EventoRepository eventoRepository;

    public EventoService(EventoRepository eventoRepository) {
        this.eventoRepository = eventoRepository;
    }

    public List<Evento> buscarPorData(LocalDate data){
        return eventoRepository.findByData(data);
    }
    public List<Evento> buscarPorNome(String nome){
        return eventoRepository.findByNome(nome);
    }
    public List<Evento> buscarPorId(Long id){
        return eventoRepository.findByEventoID(id);
    }

    public void deletar(Long id){eventoRepository.deleteById(id);}
}
