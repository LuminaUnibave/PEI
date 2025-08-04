package com.unibave.Lumina.repository;

import com.unibave.Lumina.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
    List<Evento> findByDataEvento(LocalDate dataEvento);
    List<Evento> findByNomeEvento(String nome);
    List<Evento> findByIdEvento(Long id);
    List<Evento> findByDataEventoBetween(LocalDate dataInicio, LocalDate dataFim);
}
