package com.unibave.Lumina.controller;

import com.unibave.Lumina.DTOs.Email.EmailDTO;
import com.unibave.Lumina.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/enviar")
    public ResponseEntity<String> enviar(@RequestBody EmailDTO request) {
        try {
            emailService.enviarEmail(request.getPara(), request.getAssunto(), request.getConteudo());
            return ResponseEntity.ok("E-mail enviado");
        } catch (Exception e) {
            throw new RuntimeException("Erro inesperado ao enviar o e-mail\n" + e.getMessage());
        }
    }
}
