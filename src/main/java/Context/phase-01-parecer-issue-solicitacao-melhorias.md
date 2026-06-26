# Phase 01 - Parecer do Issue "Solicitacao de melhorias"

Data da analise: 2026-06-24

Issue analisado: GitHub #28, "Solicitacao de melhorias".

Escopo considerado neste parecer: somente backend.

## Resumo

O backend compila, mas ainda nao atende completamente aos pontos criticos do issue. As maiores pendencias estao em seguranca/autenticacao, tratamento padronizado de erros, validacao efetiva de entradas, consistencia dos controllers e testes automatizados.

Validacao executada:

```bash
mvn -Dmaven.repo.local=.m2/repository test
```

Resultado: `BUILD SUCCESS`, mas com `No tests to run`. Ou seja, o projeto compila, porem nao ha testes automatizados cobrindo os fluxos exigidos.

Observacao operacional: o uso de `.m2/repository` local foi necessario porque o wrapper Maven tentou escrever em `/root/.m2`, que estava somente leitura no ambiente.

## Pontos Criticos

### 1. Seguranca JWT incompleta

Arquivos principais:
- `src/main/java/com/unibave/Lumina/config/SecurityConfig.java`
- `src/main/java/com/unibave/Lumina/model/component/JwtFilter.java`
- `src/main/java/com/unibave/Lumina/config/JwtUtil.java`
- `src/main/java/com/unibave/Lumina/service/LoginService.java`

Estado atual:
- O login gera token JWT.
- Existe `JwtFilter`.
- Porem `SecurityConfig` usa `.anyRequest().permitAll()`.
- O `JwtFilter` nao esta registrado na chain de seguranca.

Conclusao: o token existe, mas o backend nao esta protegendo as rotas privadas. Este e o ponto mais urgente do issue.

O que precisa:
- Liberar somente endpoints publicos, principalmente `/auth/login`.
- Proteger os demais endpoints.
- Registrar o filtro JWT antes de `UsernamePasswordAuthenticationFilter`.
- Configurar sessao stateless.
- Padronizar respostas 401 e 403.
- Incluir perfil/papel do usuario no token ou carregar autoridades a partir do banco.
- Aplicar regras por perfil quando fizer sentido, por exemplo administrador e visitante/usuario.

### 2. Credenciais fixas no boot

Arquivo:
- `src/main/java/com/unibave/Lumina/config/DataLoader.java`

Estado atual:
- Cria usuario `admin@lumina.com` com senha fixa.
- Cria usuario `visitante@lumina.com` com senha fixa.
- Loga as senhas no startup.

Risco:
- Isso compromete deploy e seguranca.
- Mesmo que seja util em desenvolvimento, nao deve rodar igual em producao/Supabase.

O que precisa:
- Condicionar esse seed a profile `dev` ou variavel explicita.
- Remover logs de senha.
- Preferir senha inicial via env ou fluxo administrativo.
- Garantir que em producao nenhum usuario padrao inseguro seja criado automaticamente.

### 3. Falta de tratamento global de excecoes

Arquivos relevantes:
- `src/main/java/com/unibave/Lumina/exception/ServerException.java`
- `src/main/java/com/unibave/Lumina/exception/http/ResourceNotFoundException.java`
- Controllers em `src/main/java/com/unibave/Lumina/controller`

Estado atual:
- Nao ha `@ControllerAdvice`.
- Muitos controllers usam `RuntimeException` diretamente.
- Alguns controllers capturam `Exception` e retornam respostas vazias.
- `ResourceNotFoundException` recebe mensagem, mas chama `super()` e perde a mensagem.

O que precisa:
- Criar um `GlobalExceptionHandler` com `@RestControllerAdvice`.
- Criar DTO padrao de erro, por exemplo com `timestamp`, `status`, `error`, `message`, `path` e detalhes de validacao.
- Tratar:
  - recurso nao encontrado: 404;
  - validacao: 400;
  - conflito: 409;
  - autenticacao: 401;
  - autorizacao: 403;
  - erro interno: 500.
- Substituir `RuntimeException` generica por excecoes de dominio.

### 4. Validacao existe nos DTOs, mas nem sempre e aplicada

Arquivos relevantes:
- DTOs em `src/main/java/com/unibave/Lumina/DTOs`
- Controllers em `src/main/java/com/unibave/Lumina/controller`

Estado atual:
- Alguns DTOs ja possuem anotacoes como `@NotBlank`, `@NotNull`, `@Email`.
- O `LoginController` usa `@Valid`.
- Varios endpoints de criacao/atualizacao nao usam `@Valid`.

O que precisa:
- Adicionar `@Valid` em todos os `@RequestBody` de criacao e atualizacao.
- Revisar DTOs para validar campos obrigatorios corretamente.
- Adicionar validacoes de formato quando aplicavel, por exemplo CPF, datas futuras/passadas, enum valido e tamanhos maximos.
- Retornar erros de validacao pelo `ControllerAdvice`.

### 5. Controllers com retornos inconsistentes e bugs de runtime

Arquivos mais criticos:
- `src/main/java/com/unibave/Lumina/controller/UsuarioController.java`
- `src/main/java/com/unibave/Lumina/controller/EventoController.java`
- `src/main/java/com/unibave/Lumina/controller/PacienteController.java`
- `src/main/java/com/unibave/Lumina/controller/AgendamentoController.java`
- `src/main/java/com/unibave/Lumina/controller/ArquivoController.java`

Problemas observados:
- `ResponseEntity<Optional<DTO>>` em alguns endpoints.
- Endpoints documentados com 404, mas retornam 200 com lista vazia.
- Uso de `Optional.get()` sem checagem.
- Uso de `RuntimeException` para not found.
- Cast incorreto de `List<Usuario>` para `Usuario` em `UsuarioController`.
- Cast incorreto de `List<Evento>` para `Evento` em `EventoController`.
- Criacao e atualizacao usam status inconsistentes.

O que precisa:
- Retornar DTO direto, nao `Optional` no corpo.
- Corrigir mapeamento de listas usando mapper de lista, nao cast.
- Padronizar:
  - `GET /buscar/id`: 200 com DTO ou 404.
  - buscas por filtro: 200 com lista, mesmo vazia, salvo regra de negocio em contrario.
  - `POST`: 201 com DTO criado.
  - `PUT`: 200 com DTO atualizado ou 404.
  - `DELETE`: 204 ou 404.
- Centralizar not found no service ou exception handler.

### 6. Configuracao de deploy/Supabase precisa ser endurecida

Arquivos:
- `src/main/resources/application.properties`
- `docker-compose.yml`
- `Dockerfile`

Estado atual:
- Datasource usa variaveis de ambiente.
- O banco local foi removido do compose.
- `ddl-auto=update` esta ativo no properties.
- Logs de Spring Security estao em DEBUG no perfil padrao.
- `docker-compose.yml` mapeia `SPRING_DATASOURCE_USERNAME` a partir de `DB_USER`, enquanto o Spring espera `SPRING_DATASOURCE_USERNAME`.

O que precisa:
- Para producao, trocar `ddl-auto=update` por `validate` ou usar migrations.
- Remover `logging.level.org.springframework.security=DEBUG` do perfil padrao.
- Padronizar nomes de env:
  - `SPRING_DATASOURCE_URL`
  - `SPRING_DATASOURCE_USERNAME`
  - `SPRING_DATASOURCE_PASSWORD`
  - `JWT_SECRET`
  - variaveis de mail
- Documentar `.env.example` sem segredos reais.
- Garantir que o backend suba com Supabase via variaveis do provedor de deploy.

### 7. Dependencias e organizacao

Arquivo:
- `pom.xml`

Observacoes:
- Ha dependencias potencialmente nao usadas ou redundantes, como JDBC + Data JDBC + JPA, LDAP e WebFlux.
- `lombok.version` aparece duplicado.
- O projeto usa Java 21 com `--enable-preview`, o que aumenta risco em deploy se nao houver necessidade real.

O que precisa:
- Remover dependencias nao usadas.
- Manter somente stack necessaria para API Spring MVC/JPA.
- Avaliar se `--enable-preview` e realmente necessario.
- Padronizar nomenclatura de pacotes e arquivos sem alterar API sem necessidade.

### 8. Testes automatizados ausentes

Estado atual:
- `src/test` nao possui testes.
- `mvn test` passa porque nao ha testes para executar.

O que precisa:
- Criar testes de autenticacao:
  - login com sucesso;
  - senha invalida;
  - usuario inexistente/inativo;
  - token invalido;
  - token expirado;
  - endpoint protegido sem token.
- Criar testes de endpoints principais:
  - usuario;
  - paciente;
  - agendamento;
  - evento.
- Criar testes de validacao:
  - request body invalido;
  - campos obrigatorios ausentes;
  - formatos invalidos.
- Usar H2/test profile ou Testcontainers, dependendo da estrategia definida.

## Ordem Recomendada de Execucao

1. Criar `GlobalExceptionHandler` e DTO padrao de erro.
2. Corrigir `ResourceNotFoundException` e substituir `RuntimeException` nos controllers.
3. Aplicar `@Valid` nos request bodies e ajustar mensagens de validacao.
4. Corrigir bugs de cast e retornos inconsistentes nos controllers.
5. Fechar seguranca JWT de verdade no `SecurityConfig`.
6. Remover/condicionar seed de usuarios padrao.
7. Ajustar `application.properties`, compose e `.env.example` para Supabase/deploy.
8. Criar testes automatizados dos fluxos criticos.
9. Revisar dependencias do `pom.xml`.

## Estado Final Esperado

Backend deve:
- compilar;
- ter rotas privadas protegidas por JWT;
- retornar erros padronizados;
- validar entradas com Bean Validation;
- nao criar credenciais inseguras em producao;
- estar preparado para Supabase via env;
- possuir testes cobrindo autenticacao e CRUDs principais.

