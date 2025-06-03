package com.unibave.Lumina.repository;

import com.unibave.Lumina.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
    List<Evento> findByData(LocalDate data);
    List<Evento> findByNome(String nome);
    List<Evento> findByEventoID(Long id);
}
