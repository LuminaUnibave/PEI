package com.unibave.Lumina.service;

import com.unibave.Lumina.DTOs.Evento.EventoDto;
import com.unibave.Lumina.DTOs.Paciente.PacienteDto;
import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.exception.ResourceNotFoundException;
import com.unibave.Lumina.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.unibave.Lumina.model.Evento;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EventoService {
    private final EventoRepository eventoRepository;

    @Autowired
    public EventoService(EventoRepository eventoRepository) {
        this.eventoRepository = eventoRepository;
    }

    @Transactional
    public Optional<EventoDto> buscarPorId(Long id) {
        return eventoRepository.findById(id)
                .map(EventoDto::fromEntity);
    }

    @Transactional(readOnly = true)
    public List<EventoDto> buscarPorNomeEvento(String nomeEvento) {
        return eventoRepository.findByNomeEventoContainingIgnoreCase(nomeEvento)
                .stream()
                .map(EventoDto::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<EventoDto> buscarPorStEvento(Situacao stEvento) {
        return eventoRepository.findByStEvento(stEvento)
                .stream()
                .map(EventoDto::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<EventoDto> buscarPorDtEvento(LocalDateTime dtEvento) {
        return eventoRepository.findByDtEvento(dtEvento)
                .stream()
                .map(EventoDto::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<EventoDto> buscarPorDtEventoAntes(LocalDateTime dtEventoAntes) {
        return eventoRepository.findByDtEventoBefore(dtEventoAntes)
                .stream()
                .map(EventoDto::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<EventoDto> buscarPorDtEventoDepois(LocalDateTime dtEventoDepois) {
        return eventoRepository.findByDtEventoAfter(dtEventoDepois)
                .stream()
                .map(EventoDto::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<EventoDto> buscarPorDtEventoEntre(LocalDateTime dtEventoDepois,  LocalDateTime dtEventoAntes) {
        return eventoRepository.findByDtEventoBetween(dtEventoDepois, dtEventoAntes)
                .stream()
                .map(EventoDto::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<EventoDto> buscarTodos() {
        return eventoRepository.findAll()
                .stream()
                .map(EventoDto::fromEntity)
                .toList();
    }

    @Transactional
    public Evento salvar(Evento evento) {

        if(evento.getNomeEvento() == null || evento.getNomeEvento().trim().isEmpty()) {
            throw new IllegalArgumentException("Título não pode ser vazio.");
        }
        if(evento.getNomeEvento().length() > 255) {
            throw new IllegalArgumentException("Título não pode exceder o tamanho.");
        }
        if(evento.getDescricao() != null &&  evento.getDescricao().length() > 255) {
            throw new IllegalArgumentException("Descrição não pode exceder o tamanho.");
        }
        if(evento.getDtEvento() == null) {
            throw new IllegalArgumentException("Data não pode ser nula.");
        }
        if(evento.getDtEvento().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Evento não pode ser no passado.");
        }

        Evento eventoSalvo = eventoRepository.save(evento);
        return eventoRepository.save(eventoSalvo);
    }

    @Transactional
    public void deletar(Long id) {
        if(!eventoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Evento não encontrato com  o ID: " + id);
        }
        eventoRepository.deleteById(id);
    }

}
