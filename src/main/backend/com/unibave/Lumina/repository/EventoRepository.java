package com.unibave.Lumina.repository;

import com.unibave.Lumina.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
    //Find By idEvento
    List<Evento> findByIdEvento(Long idEvento);
    //Find By nomeEvento
    List<Evento> findByNomeEvento(String nomeEvento);
    //Find By dtEvento
    List<Evento> findByDtEvento(LocalDateTime dtEvento);
    List<Evento> findByDtEventoBetween(LocalDateTime dataInicio, LocalDateTime dataFim);
}
