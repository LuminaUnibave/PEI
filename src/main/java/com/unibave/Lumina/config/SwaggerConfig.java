package com.unibave.Lumina.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI OpenAPI() {
        final String securitySchemeName = "bearerAuth";

        Server server = new Server();
        server.setUrl("https://pei-production.up.railway.app");

        return new OpenAPI()
                .servers(List.of(server))
                .info(new Info()
                        .title("LUMINA API REST")
                        .version("1.0.0")
                        .description("Documentação API REST Lumina")
                        .contact(new Contact()
                                .name("Lucca P. Müller")
                                .email("lumina.unibave@gmail.com")))
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .components(new Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .name(securitySchemeName)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                        )
                );
    }
}
