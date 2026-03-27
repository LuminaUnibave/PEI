package com.unibave.Lumina.repository;

import com.unibave.Lumina.enums.TpEntidade;
import com.unibave.Lumina.model.entidades.Arquivo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ArquivoRepository extends JpaRepository<Arquivo, Long> {

    // GET
    // Find By id - Já é fornecido pelo JpaRepository, pode ser removido
    // Optional<Arquivo> findById(Long id);

    // Find By idEntidade & tpEntidade
    List<Arquivo> findByIdEntidadeAndTpEntidade(Long idEntidade, TpEntidade tpEntidade);

    // Find By nomeArquivo
    List<Arquivo> findByNmArquivoContainingIgnoreCase(String nmArquivo);

    // Find By dataCadastro
    List<Arquivo> findByDtCadastroBefore(LocalDateTime dtCadastro);
    List<Arquivo> findByDtCadastroAfter(LocalDateTime dtCadastro);
    List<Arquivo> findByDtCadastroBetween(LocalDateTime dtCadastro1, LocalDateTime dtCadastro2);

    // Métodos adicionais seguindo o mesmo padrão:

    // Find By extensao
    List<Arquivo> findByExtensao(com.unibave.Lumina.enums.Extensao extensao);

    // Find By tamanho
    List<Arquivo> findByTamanhoLessThan(Long tamanho);
    List<Arquivo> findByTamanhoGreaterThan(Long tamanho);
    List<Arquivo> findByTamanhoBetween(Long tamanhoMin, Long tamanhoMax);

    // Find By tipoEntidade
    List<Arquivo> findByTpEntidade(TpEntidade tpEntidade);

    // Find By contentType
    List<Arquivo> findByContentTypeContainingIgnoreCase(String contentType);

    // Find arquivos por idEntidade
    List<Arquivo> findByIdEntidade(Long idEntidade);

    // Consultas customizadas com @Query
    @Query("SELECT a FROM Arquivo a WHERE a.nmArquivo LIKE %:termo% OR a.contentType LIKE %:termo%")
    List<Arquivo> buscarPorNomeOuTipo(@Param("termo") String termo);

    @Query("SELECT a FROM Arquivo a WHERE a.tamanho > :tamanhoMin AND a.extensao IN :extensoes")
    List<Arquivo> buscarArquivosGrandesPorExtensao(
            @Param("tamanhoMin") Long tamanhoMin,
            @Param("extensoes") List<com.unibave.Lumina.enums.Extensao> extensoes
    );

    @Query("SELECT COUNT(a) FROM Arquivo a WHERE a.tpEntidade = :tpEntidade AND a.idEntidade = :idEntidade")
    Long contarArquivosPorEntidade(
            @Param("tpEntidade") TpEntidade tpEntidade,
            @Param("idEntidade") Long idEntidade
    );

    // Buscar arquivos ordenados
    List<Arquivo> findByTpEntidadeOrderByDtCadastroDesc(TpEntidade tpEntidade);
    List<Arquivo> findByTpEntidadeOrderByTamanhoDesc(TpEntidade tpEntidade);

    // Verificar existência
    boolean existsByIdEntidadeAndTpEntidade(Long idEntidade, TpEntidade tpEntidade);
    boolean existsByNmArquivo(String nmArquivo);
}