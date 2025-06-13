package com.unibave.Lumina;

import io.github.cdimascio.dotenv.Dotenv;
import org.junit.jupiter.api.*;

class DotEnvTest {

    /*
    Este teste deve garantir que o arquivo .env seja aberto, lido e que as variaveis cheguem até o application proporties.

    Isso são as "configurações" do banco de dados. Caso o .env seja alterado, as mesmas configurações devem ser lidas
    e alocadas no application.properties, que é onde ficam as variaveis para a conexão com o banco de dados.

    Caso seja necessario altere  ou melhore os testes.
     */
    private static Dotenv dotenv; //Atributo da classe de teste para ser inicializado posteriormente. no setUp

    @BeforeAll
    static void loadEnv() {
        dotenv = Dotenv.load();
        System.setProperty("DB_URL", dotenv.get("DB_URL"));
        System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
        System.out.println(".env aberto e lido");
    }

    @Test
    @DisplayName("Teste .env: DB_URL")
    void dotEnvDB_URL() {
        Assertions.assertEquals(System.getProperty("DB_URL"), dotenv.get("DB_URL"));
        System.out.println("DB_URL em application.properties é igual ao .env");
    }

    @Test
    @DisplayName("Teste .env: DB_USERNAME")
    void dotEnvDB_USERNAME() {
        Assertions.assertEquals(System.getProperty("DB_USERNAME"), dotenv.get("DB_USERNAME"));
        System.out.println("DB_USERNAME em application.properties é igual ao .env");
    }

    @Test
    @DisplayName("Teste .env: DB_PASSWORD")
    void dotEnvDB_PASSWORD() {
        Assertions.assertEquals(System.getProperty("DB_PASSWORD"), dotenv.get("DB_PASSWORD"));
        System.out.println("DB_PASSWORD em application.properties é igual ao .env");
    }
}
