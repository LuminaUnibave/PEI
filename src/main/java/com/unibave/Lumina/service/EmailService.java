package com.unibave.Lumina.service;

import com.unibave.Lumina.enums.TpUsuario;
import com.unibave.Lumina.model.entidades.Evento;
import com.unibave.Lumina.model.entidades.Usuario;
import com.unibave.Lumina.repository.UsuarioRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

@Service
public class EmailService { // Realiza o envio dos emails

    @Autowired
    private JavaMailSender javaMailService;
    private final UsuarioRepository usuarioRepository;

    public EmailService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

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

    public void receberEmail(String remetente, String assunto, String conteudo) { // Sem anexo
        try {
            MimeMessage mensagem = javaMailService.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensagem, true, "UTF-8");

            helper.setFrom(remetente);
            helper.setTo("lumina.unibave@gmail.com");
            helper.setSubject(assunto);
            helper.setText(conteudo, true);
            javaMailService.send(mensagem);

        } catch (MessagingException e) {
            throw new RuntimeException("Erro ao enviar e-mail " + e.getMessage());
        }
    }

    public void enviarEmailEvento(Evento evento) {
        List<Usuario> destinatarios = usuarioRepository.findByTpUsuario(TpUsuario.VISITANTE);
            for (Usuario destinatario : destinatarios) {
                try {
                    MimeMessage mensagem = javaMailService.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(mensagem, true, "UTF-8");

                    helper.setFrom("lumina.unibave@gmail.com");
                    helper.setTo(destinatario.getEmail());
                    helper.setSubject(evento.getNmEvento());
                    helper.setText("<p><h4><strong>Data do Evento: " + evento.getDtEventoFormatado() + "</strong></h4></p>" + "<p><strong><h4>Descrição:</h4></strong><br />" + evento.getDescricao()+ "</p>", true);
                    javaMailService.send(mensagem);

                } catch (MessagingException e) {
                    throw new RuntimeException("Erro ao enviar e-mail " + e.getMessage());
                }
            }
    }
}

/*
-> Para realizar testes no Postman, usar Body -> form-data

-> O e-mail deve ser criado por lá, desde as mensagens até a colocação do anexo

 */

