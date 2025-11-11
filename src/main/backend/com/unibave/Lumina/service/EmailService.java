package com.unibave.Lumina.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;

@Service
public class EmailService { // Realiza o envio dos emails

    @Autowired
    private JavaMailSender javaMailService;

    public void enviarEmail(String destinatario, String assunto, String conteudo) { // Sem anexo
        try {
            MimeMessage mensagem = javaMailService.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensagem, true, "UTF-8");

            helper.setFrom("lumina.unibave@gmail.com");
            helper.setTo(destinatario);
            helper.setSubject(assunto);
            helper.setText(conteudo, true);
            javaMailService.send(mensagem);

        } catch (MessagingException e) {
            throw new RuntimeException("Erro ao enviar e-mail " + e.getMessage());
        }
    }

    public void enviarEmail(String destinatario, String assunto, String conteudo, MultipartFile anexo) { // Com anexo
        try {
            MimeMessage mensagem = javaMailService.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensagem, true, "UTF-8");

            helper.setFrom("lumina.unibave@gmail.com");
            helper.setTo(destinatario);
            helper.setSubject(assunto);
            helper.setText(conteudo, true);
            helper.addAttachment(Objects.requireNonNull(anexo.getOriginalFilename()), anexo);

            javaMailService.send(mensagem);

        } catch (MessagingException e) {
            throw new RuntimeException("Erro ao enviar e-mail " + e.getMessage());
        }
    }
}

/*
-> Para realizar testes no Postman, usar Body -> form-data

-> O e-mail deve ser criado por lá, desde as mensagens até a colocação do anexo

 */

