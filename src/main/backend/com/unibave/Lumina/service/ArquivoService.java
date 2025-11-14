package com.unibave.Lumina.service;

import com.unibave.Lumina.enums.Extensao;
import com.unibave.Lumina.enums.TpEntidade;
import com.unibave.Lumina.model.entidades.Arquivo;
import com.unibave.Lumina.repository.ArquivoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static com.unibave.Lumina.enums.Extensao.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class ArquivoService {

    private final ArquivoRepository arquivoRepository;

    @Value("${app.file.upload-dir:./uploads}")
    private String uploadDir;

    /**
     * Realiza o upload de um arquivo
     */
    public Arquivo uploadArquivo(MultipartFile file, Long idEntidade, TpEntidade tpEntidade) throws IOException {
        // Validar arquivo
        validarArquivo(file);

        // Criar diretório se não existir
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Gerar nome único para o arquivo
        String nomeOriginal = file.getOriginalFilename();
        String extensao = getExtensao(nomeOriginal);
        String nomeArquivoSalvo = UUID.randomUUID() + "." + extensao;
        Path filePath = uploadPath.resolve(nomeArquivoSalvo);

        // Salvar arquivo no sistema de arquivos
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Criar entidade Arquivo
        Arquivo arquivo = Arquivo.builder()
                .nmArquivo(nomeOriginal)
                .caminho(filePath.toString())
                .tamanho(file.getSize())
                .idEntidade(idEntidade)
                .tpEntidade(tpEntidade)
                .extensao(Extensao.fromNomeArquivo(nomeOriginal))
                .contentType(file.getContentType())
                .build();

        // Validar se é EVENTO e se a extensão é permitida
        if (arquivo.getTpEntidade() == TpEntidade.EVENTO) {
            if (arquivo.getExtensao() != JPEG && arquivo.getExtensao() != PNG && arquivo.getExtensao() != JPG) {
                // Deletar o arquivo salvo fisicamente
                Files.deleteIfExists(filePath);
                throw new RuntimeException("Para eventos, apenas arquivos JPEG, JPG e PNG são permitidos");
            }
        }

        // Salvar metadados no banco
        Arquivo arquivoSalvo = arquivoRepository.save(arquivo);
        log.info("Arquivo upload realizado: ID {}, Nome: {}", arquivoSalvo.getId(), nomeOriginal);
        return arquivoSalvo;
    }

    /**
     * Realiza o download de um arquivo
     */
    public Resource downloadArquivo(Long idArquivo) throws IOException {
        Arquivo arquivo = arquivoRepository.findById(idArquivo)
                .orElseThrow(() -> new RuntimeException("Arquivo não encontrado: " + idArquivo));

        Path filePath = Paths.get(arquivo.getCaminho());
        if (!Files.exists(filePath)) {
            throw new RuntimeException("Arquivo não encontrado no sistema de arquivos: " + arquivo.getCaminho());
        }

        Resource resource = new UrlResource(filePath.toUri());
        if (!resource.exists() || !resource.isReadable()) {
            throw new RuntimeException("Não foi possível ler o arquivo: " + arquivo.getCaminho());
        }

        log.info("Download realizado: ID {}, Nome: {}", arquivo.getId(), arquivo.getNmArquivo());
        return resource;
    }

    /**
     * Lista arquivos por entidade
     */
    public List<Arquivo> listarPorEntidade(Long idEntidade, TpEntidade tpEntidade) {
        return arquivoRepository.findByIdEntidadeAndTpEntidade(idEntidade, tpEntidade);
    }

    /**
     * Deleta um arquivo
     */
    public void deletarArquivo(Long idArquivo) throws IOException {
        Arquivo arquivo = arquivoRepository.findById(idArquivo)
                .orElseThrow(() -> new RuntimeException("Arquivo não encontrado: " + idArquivo));

        // Deletar do sistema de arquivos
        Path filePath = Paths.get(arquivo.getCaminho());
        if (Files.exists(filePath)) {
            Files.delete(filePath);
        }

        // Deletar do banco
        arquivoRepository.delete(arquivo);
        log.info("Arquivo deletado: ID {}, Nome: {}", arquivo.getId(), arquivo.getNmArquivo());
    }

    /**
     * Busca arquivo por ID
     */
    public Arquivo buscarPorId(Long idArquivo) {
        return arquivoRepository.findById(idArquivo)
                .orElseThrow(() -> new RuntimeException("Arquivo não encontrado: " + idArquivo));
    }

    /**
     * Valida o arquivo antes do upload
     */
    private void validarArquivo(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("Arquivo vazio");
        }

        if (file.getSize() > 10 * 1024 * 1024) { // 10MB
            throw new RuntimeException("Arquivo muito grande. Tamanho máximo: 10MB");
        }

        String extensao = getExtensao(file.getOriginalFilename());
        if (extensao.equals("ERRO")) {
            throw new RuntimeException("Extensão de arquivo não suportada");
        }
    }

    private String getExtensao(String fileName) {
        if (fileName == null) return "ERRO";
        int lastIndex = fileName.lastIndexOf(".");
        return (lastIndex == -1) ? "ERRO" : fileName.substring(lastIndex + 1).toLowerCase();
    }
}