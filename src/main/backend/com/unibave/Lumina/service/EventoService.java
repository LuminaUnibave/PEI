package com.unibave.Lumina.service;

import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.exception.http.ResourceNotFoundException;
import com.unibave.Lumina.model.entidades.Usuario;
import com.unibave.Lumina.repository.EventoRepository;
import com.unibave.Lumina.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.unibave.Lumina.model.entidades.Evento;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EventoService {
    private final EventoRepository eventoRepository;
    private final UsuarioRepository usuarioRepository;
    private final EmailService emailService;

    @Autowired
    public EventoService(EventoRepository eventoRepository, EmailService emailService, UsuarioRepository usuarioRepository) {
        this.eventoRepository = eventoRepository;
        this.usuarioRepository = usuarioRepository;
        this.emailService = emailService;
    }

    @Transactional(readOnly = true)
    public long contar() {
        return eventoRepository.count();
    }

    @Transactional
    public Optional<Evento> buscarPorId(Long id) {
        return eventoRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Evento> buscarPorNmEvento(String nomeEvento) {
        return eventoRepository.findByNmEventoContainingIgnoreCase(nomeEvento);
    }

    @Transactional(readOnly = true)
    public List<Evento> buscarPorStEvento(Situacao situacao) {
        return eventoRepository.findBySituacao(situacao);
    }

    @Transactional(readOnly = true)
    public List<Evento> buscarPorDtEvento(LocalDateTime dtEvento) {
        return eventoRepository.findByDtEvento(dtEvento);
    }

    @Transactional(readOnly = true)
    public List<Evento> buscarPorDtEventoAntes(LocalDateTime dtEventoAntes) {
        return eventoRepository.findByDtEventoBefore(dtEventoAntes);
    }

    @Transactional(readOnly = true)
    public List<Evento> buscarPorDtEventoDepois(LocalDateTime dtEventoDepois) {
        return eventoRepository.findByDtEventoAfter(dtEventoDepois);
    }

    @Transactional(readOnly = true)
    public List<Evento> buscarPorDtEventoEntre(LocalDateTime dtEventoDepois,  LocalDateTime dtEventoAntes) {
        return eventoRepository.findByDtEventoBetween(dtEventoDepois, dtEventoAntes);
    }

    @Transactional(readOnly = true)
    public List<Evento> buscarTodos() {
        return eventoRepository.findAll();
    }

    @Transactional
    public Evento salvar(Evento evento) {

        if(evento.getNmEvento() == null || evento.getNmEvento().trim().isEmpty()) {
            throw new IllegalArgumentException("Título não pode ser vazio.");
        }
        if(evento.getNmEvento().length() > 255) {
            throw new IllegalArgumentException("Título não pode exceder o tamanho.");
        }
        if(evento.getDescricao() != null &&  evento.getDescricao().length() > 2000) {
            throw new IllegalArgumentException("Descrição não pode exceder o tamanho.");
        }
        if(evento.getDtEvento() == null) {
            throw new IllegalArgumentException("Data não pode ser nula.");
        }
        if(evento.getDtEvento().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Evento não pode ser no passado.");
        }
        enviarEmailEvento(evento);
        return eventoRepository.save(evento);
    }

    @Transactional
    public void deletar(Long id) {
        if(!eventoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Evento não encontrato com  o ID: " + id);
        }
        eventoRepository.deleteById(id);
    }

    public void enviarEmailEvento (Evento evento) {
        List<Usuario> destinatario = usuarioRepository.findAll();
        for (Usuario usuario : destinatario) {
            emailService.enviarEmail(usuario.getEmail(), evento.getNmEvento(), evento.getDescricao());
        }
    }
}
