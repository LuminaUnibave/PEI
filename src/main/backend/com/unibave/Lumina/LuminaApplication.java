package com.unibave.Lumina;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling // Ativar o agendamento de tarefas
public class LuminaApplication {

	public static void main(String[] args) {
            Dotenv dotenv = Dotenv.load();
            System.setProperty("DB_URL", dotenv.get("DB_URL"));
            System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
            System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
            //SMTP
            System.setProperty("SMTP_MAIL", dotenv.get("SMTP_MAIL"));
            System.setProperty("SMTP_PORT", dotenv.get("SMTP_PORT"));
            System.setProperty("SMTP_USERNAME", dotenv.get("SMTP_USERNAME"));
            System.setProperty("SMTP_PASSWORD", dotenv.get("SMTP_PASSWORD"));
            System.setProperty("SMTP_PROTOCOL", dotenv.get("SMTP_PROTOCOL"));


        SpringApplication.run(LuminaApplication.class, args);

    }
}
