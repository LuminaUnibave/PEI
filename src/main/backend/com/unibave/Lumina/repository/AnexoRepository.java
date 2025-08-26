package com.unibave.Lumina.repository;

import com.unibave.Lumina.enums.TpEntidade;
import com.unibave.Lumina.model.entidades.Anexo;
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
    //Find By idEntidade & tpEntidade
    List<Anexo> findByIdEntidadeAndTpEntidade(Long idEntidade, TpEntidade tpEntidade);
    //Find By nomeAnexo
    List<Anexo> findByNmAnexoContainingIgnoreCase(String nmAnexo);
    //Find By dataUpload
    List<Anexo> findByDtCadastroBefore(LocalDateTime dtCadastro);
    List<Anexo> findByDtCadastroAfter(LocalDateTime dtCadastro);
    List<Anexo> findByDtCadastroBetween(LocalDateTime dtCadastro1, LocalDateTime dtCadastro2);
}
