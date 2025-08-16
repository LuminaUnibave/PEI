package com.unibave.Lumina.repository;

import com.unibave.Lumina.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
    List<Evento> findByDtEvento(LocalDateTime dtEvento);
    List<Evento> findByNomeEvento(String nome);
    List<Evento> findByIdEvento(Long id);
    List<Evento> findByDtEventoBetween(LocalDateTime dataInicio, LocalDateTime dataFim);
}
