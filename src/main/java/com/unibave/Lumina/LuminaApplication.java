package com.unibave.Lumina;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling // Ativar o agendamento de tarefas
public class LuminaApplication {

	public static void main(String[] args) {
        SpringApplication.run(LuminaApplication.class, args);

    }
}
