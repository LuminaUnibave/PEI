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

    public List<Evento> buscarPorDataEvento(LocalDate data){
        return eventoRepository.findByDataEvento(data);
    }
    public List<Evento> buscarPorNomeEvento(String nome){
        return eventoRepository.findByNomeEvento(nome);
    }
    public List<Evento> buscarPorIdEvento(Long id){
        return eventoRepository.findByIdEvento(id);
    }
    public Evento salvar(Evento evento){
        try{
            if(evento.getNomeEvento() == null || evento.getNomeEvento().trim().isEmpty()){//verifica que o título não é vazio
                throw new IllegalArgumentException("Título não pode ser vazio.");
            }
            if(evento.getNomeEvento().length() > 255){//verifica o tamanho do título
                throw new IllegalArgumentException("Título não pode exceder o tamanho.");
            }
            if(evento.getDescricao() != null &&  evento.getDescricao().length() > 255){//verifica o tamanho da descrição
                throw new IllegalArgumentException("Descrição não pode exceder o tamanho.");
            }
            if(evento.getData() == null){//verifica que a dataEvento não é nula
                throw new IllegalArgumentException("Data não pode ser nula.");
            }
            if(evento.getData().isBefore(LocalDate.now())){//impede o cadastro de um evento em uma dataEvento já passada
                throw new IllegalArgumentException("Evento não pode ser no passado.");
            }
        } catch (IllegalArgumentException e){
            throw new IllegalArgumentException("Dados inválidos, verifique e tente novamente!");
        }
        return eventoRepository.save(evento);
    }

    public void deletar(Long id){
        eventoRepository.deleteById(id);}
}
