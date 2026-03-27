package com.unibave.Lumina.controller;

import com.unibave.Lumina.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping(value = "/enviar", consumes = "multipart/form-data")
    public ResponseEntity<String> enviar(
            @RequestParam String destinatario,
            @RequestParam String assunto,
            @RequestParam String conteudo,
            @RequestParam("anexo") MultipartFile anexo) {
        try {
            emailService.enviarEmail(destinatario, assunto, conteudo, anexo);
            return ResponseEntity.ok("E-mail enviado");
        } catch (Exception e) {
            throw new RuntimeException("Erro inesperado ao enviar o e-mail\n" + e.getMessage());
        }
    }

    @PostMapping(value = "/receber")
    public ResponseEntity<String> receber(
            @RequestParam String remetente,
            @RequestParam String assunto,
            @RequestParam String conteudo) {
        try {
            emailService.receberEmail(remetente, assunto, conteudo);
            return ResponseEntity.ok("E-mail enviado");
        } catch (Exception e) {
            throw new RuntimeException("Erro inesperado ao enviar o e-mail\n" + e.getMessage());
        }
    }
}
// consumes = "multpart/form-data" --> Informa que o spring vai receber dados em vários formatos
