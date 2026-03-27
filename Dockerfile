# Estágio de Build
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Cache de dependências
COPY pom.xml .
RUN mvn dependency:go-offline

# Copia o código e gera o JAR
COPY src ./src
RUN mvn clean package -DskipTests

# Estágio de Execução
FROM amazoncorretto:21-alpine
WORKDIR /app

# Cria a pasta de logs com permissões
RUN mkdir -p /app/logs/json /app/logs/txt && chmod -R 777 /app/logs

# COPIA O JAR (Usando wildcard para evitar erro de nome/versão)
COPY --from=build /app/target/Lumina-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

# Executa com as flags de preview
ENTRYPOINT ["java", "--enable-preview", "-jar", "app.jar"]