package com.unibave.Lumina.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

@Service
public class EmailService { // Realiza o envio dos emails solicitados por outras classes

    @Autowired
    private JavaMailSender javaMailService;

    @PostMapping("/enviar")
    public void enviarEmail(String para, String assunto, String conteudo) {
        try {
            MimeMessage mensagem = javaMailService.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensagem, true, "UTF-8");
            helper.setFrom("lumina.unibave@gmail.com"); // Aqui vai o remetente
            helper.setTo(para);
            helper.setSubject(assunto);
            helper.setText(conteudo, true); // possível enviar em HTML
            javaMailService.send(mensagem);
        } catch (MessagingException e) {
            throw new RuntimeException("Erro ao enviar e-mail " + e.getMessage());
        }
    }
}

