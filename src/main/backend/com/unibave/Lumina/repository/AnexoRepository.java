package com.unibave.Lumina.repository;

import com.unibave.Lumina.model.Anexo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AnexoRepository extends JpaRepository<Anexo, Long> {
    //GET
    //Find By idAgendamento
    List<Anexo> findByAgendamentoIdAgendamento(Long idAgendamento);
    //Find By idEvento
    List<Anexo> findByEventoIdEvento(Long idEvento);
    //Find By nomeAnexo
    List<Anexo> findByNomeAnexoContainingIgnoreCase(String nomeAnexo);
    //Find By dataUpload
    List<Anexo> findByDataUploadBefore(LocalDateTime dataUpload);
    List<Anexo> findByDataUploadAfter(LocalDateTime dataUpload);
    List<Anexo> findByDataUploadBetween(LocalDateTime dataUpload1, LocalDateTime dataUpload2);

    //POST
    @Override
    <S extends Anexo> List<S> saveAll(Iterable<S> entities);
}
