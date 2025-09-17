package com.unibave.Lumina.repository;

import com.unibave.Lumina.enums.TpEntidade;
import com.unibave.Lumina.model.entidades.Arquivo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ArquivoRepository extends JpaRepository<Arquivo, Long> {
    //GET
    //Find By idAnexo
    Optional<Arquivo> findById(Long id);
    //Find By idEntidade & tpEntidade
    List<Arquivo> findByIdEntidadeAndTpEntidade(Long idEntidade, TpEntidade tpEntidade);
    //Find By nomeAnexo
    List<Arquivo> findByNmArquivoContainingIgnoreCase(String nmArquivo);
    //Find By dataUpload
    List<Arquivo> findByDtCadastroBefore(LocalDateTime dtCadastro);
    List<Arquivo> findByDtCadastroAfter(LocalDateTime dtCadastro);
    List<Arquivo> findByDtCadastroBetween(LocalDateTime dtCadastro1, LocalDateTime dtCadastro2);
}
