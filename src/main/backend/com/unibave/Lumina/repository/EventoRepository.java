package com.unibave.Lumina.repository;

import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
    //Find By id
    Optional<Evento> findById(Long id);
    //Find By nomeEvento
    List<Evento> findByNomeEventoContainingIgnoreCase(String nomeEvento);
    //Find By stEvento
    List<Evento> findByStEvento(Situacao stEvento);
    //Find By dtEvento
    List<Evento> findByDtEvento(LocalDateTime dtEvento);
    List<Evento> findByDtEventoBefore(LocalDateTime dtEventoBefore);
    List<Evento> findByDtEventoAfter(LocalDateTime dtEventoAfter);
    List<Evento> findByDtEventoBetween(LocalDateTime dataInicio, LocalDateTime dataFim);
}
