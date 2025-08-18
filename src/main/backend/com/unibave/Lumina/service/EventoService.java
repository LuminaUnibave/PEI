package com.unibave.Lumina.service;

import com.unibave.Lumina.DTOs.Evento.EventoDto;
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

    @Transactional(readOnly = true) // @Transaction -- gerenciamento de transações (Spring/JPA/Hibernate)
    public List<EventoDto> buscarPorIdEvento(Long id) {
       if(eventoRepository.existsById(id)) {
       throw new ResourceNotFoundException("Evento não encontrado com o ID: " + id);
       }
       return eventoRepository.findById(id)
               .stream()
               .map(EventoDto::fromEntity) // Converte cada objeto Evento num objeto do DTO
               .toList();
    }

    @Transactional(readOnly = true)
    public List<EventoDto> buscarPorDataEvento(LocalDateTime data) {
        return eventoRepository.findByDtEvento(data)
                .stream()
                .map(EventoDto::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<EventoDto> buscarPorNomeEvento(String nome) {
        return eventoRepository.findByNomeEvento(nome)
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
    public Optional<Evento> buscarPorId(Long id){
        return eventoRepository.findById(id);

    @Transactional
    public void deletar(Long id) {
        if(!eventoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Evento não encontrato com  o ID: " + id);
        }
        eventoRepository.deleteById(id);
    }

}
