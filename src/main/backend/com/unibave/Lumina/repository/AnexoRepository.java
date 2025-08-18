package com.unibave.Lumina.repository;

import com.unibave.Lumina.model.Anexo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AnexoRepository extends JpaRepository<Anexo, Long> {
    //GET
    //Find By idAnexo
    Optional<Anexo> findById(Long id);
    //Find By idAgendamento
    List<Anexo> findByAgendamento_id(Long id);
    //Find By idEvento
    List<Anexo> findByEvento_id(Long id);
    //Find By nomeAnexo
    List<Anexo> findByNomeAnexoContainingIgnoreCase(String nomeAnexo);
    //Find By dataUpload
    List<Anexo> findByDataUploadBefore(LocalDateTime dataUpload);
    List<Anexo> findByDataUploadAfter(LocalDateTime dataUpload);
    List<Anexo> findByDataUploadBetween(LocalDateTime dataUpload1, LocalDateTime dataUpload2);
}
