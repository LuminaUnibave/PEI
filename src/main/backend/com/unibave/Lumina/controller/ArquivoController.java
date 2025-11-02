package com.unibave.Lumina.controller;

import com.unibave.Lumina.enums.TpEntidade;
import com.unibave.Lumina.model.entidades.Arquivo;
import com.unibave.Lumina.service.ArquivoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/arquivos")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Arquivos", description = "Gerenciamento de upload e download de arquivos")
public class ArquivoController {

    private final ArquivoService arquivoService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload de arquivo", description = "Faz upload de um arquivo para uma entidade específica")
    public ResponseEntity<Arquivo> uploadArquivo(
            @RequestParam("file") MultipartFile file,
            @RequestParam("idEntidade") Long idEntidade,
            @RequestParam("tpEntidade") TpEntidade tpEntidade) {

        try {
            Arquivo arquivoSalvo = arquivoService.uploadArquivo(file, idEntidade, tpEntidade);
            return ResponseEntity.ok(arquivoSalvo);
        } catch (Exception e) {
            log.error("Erro no upload do arquivo: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/download/{idArquivo}")
    @Operation(summary = "Download de arquivo", description = "Faz download de um arquivo pelo ID")
    public ResponseEntity<Resource> downloadArquivo(@PathVariable Long idArquivo) {
        try {
            Resource resource = arquivoService.downloadArquivo(idArquivo);
            Arquivo arquivo = arquivoService.buscarPorId(idArquivo);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(arquivo.getContentType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + arquivo.getNmArquivo() + "\"")
                    .body(resource);

        } catch (Exception e) {
            log.error("Erro no download do arquivo {}: {}", idArquivo, e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/entidade/{idEntidade}/tipo/{tpEntidade}")
    @Operation(summary = "Listar arquivos por entidade", description = "Lista todos os arquivos de uma entidade específica")
    public ResponseEntity<List<Arquivo>> listarPorEntidade(
            @PathVariable Long idEntidade,
            @PathVariable TpEntidade tpEntidade) {

        List<Arquivo> arquivos = arquivoService.listarPorEntidade(idEntidade, tpEntidade);
        return ResponseEntity.ok(arquivos);
    }

    @GetMapping("/{idArquivo}")
    @Operation(summary = "Buscar arquivo por ID", description = "Retorna os metadados de um arquivo")
    public ResponseEntity<Arquivo> buscarPorId(@PathVariable Long idArquivo) {
        try {
            Arquivo arquivo = arquivoService.buscarPorId(idArquivo);
            return ResponseEntity.ok(arquivo);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{idArquivo}")
    @Operation(summary = "Deletar arquivo", description = "Remove um arquivo do sistema")
    public ResponseEntity<Void> deletarArquivo(@PathVariable Long idArquivo) {
        try {
            arquivoService.deletarArquivo(idArquivo);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Erro ao deletar arquivo {}: {}", idArquivo, e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
}