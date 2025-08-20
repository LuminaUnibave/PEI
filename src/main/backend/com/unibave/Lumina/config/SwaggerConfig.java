package com.unibave.Lumina.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI OpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("LUMINA API REST")
                        .version("1.0.0")
                        .description("Documentação Lumina")
                        .contact(new Contact()
                                .name("Lucca P. Müller")
                                .email("lumina.unibave@gmail.com")));
    }
}