# Setup React - Lumina Project

## 📋 Visão Geral

Este projeto integra **React 19** com **Spring Boot 3.4.4** para criar uma aplicação completa com frontend moderno e backend robusto.

---

## 🔧 Versões Instaladas

### React & NPM
| Dependência | Versão |
|---|---|
| **React** | `^19.2.5` |
| **React DOM** | `^19.2.5` |
| **React Scripts** | `5.0.1` |
| **Node** (recomendado) | `v18.17.0` |
| **NPM** (recomendado) | `9.6.7` |

### Testing Libraries
| Dependência | Versão |
|---|---|
| `@testing-library/dom` | `^10.4.1` |
| `@testing-library/jest-dom` | `^6.9.1` |
| `@testing-library/react` | `^16.3.2` |
| `@testing-library/user-event` | `^13.5.0` |
| `web-vitals` | `^2.1.4` |

### Backend Java
| Componente | Versão |
|---|---|
| **Java** | `21` |
| **Spring Boot** | `3.4.4` |
| **Maven** | `3.9.6` |
| **PostgreSQL** | `16-alpine` |

---

## 📁 Estrutura do Projeto

```
src/main/
├── frontend/                  # Frontend React (SPA)
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── build/                 # Build de produção
│   └── node_modules/
│
├── website/                   # Website React (SPA)
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── build/                 # Build de produção
│   └── node_modules/
│
├── resources/
│   ├── static/                # Arquivos estáticos servidos pelo Spring
│   │   ├── index.html         # Frontend padrão
│   │   ├── favicon.ico
│   │   ├── static/            # JS e CSS
│   │   └── website/           # Website React
│   │       ├── index.html
│   │       ├── favicon.ico
│   │       └── static/
│   └── application.properties
│
└── java/
    └── com/unibave/Lumina/
        ├── config/
        │   ├── WebConfig.java      # Configuração de CORS e rotas
        │   └── SecurityConfig.java
        └── ...
```

---

## 🚀 Como Rodar

### 1️⃣ Com Docker Compose (Recomendado)
```bash
# Construir e iniciar
docker-compose up --build

# Ou em background
docker-compose up -d --build

# Parar
docker-compose down

# Ver logs
docker-compose logs -f lumina-app
```

### 2️⃣ Desenvolvimento Local

#### Frontend
```bash
cd src/main/frontend
npm install
npm start
```
Acessa: `http://localhost:3000`

#### Website
```bash
cd src/main/website
npm install
npm start
```
Acessa: `http://localhost:3001`

#### Backend
```bash
# Instale Java 21 e Maven antes

mvn spring-boot:run
```
Acessa: `http://localhost:8080`

---

## 🌐 URLs de Acesso

| Aplicação | URL | Porta |
|---|---|---|
| **Frontend React** | http://localhost:8080/ | 8080 |
| **Website React** | http://localhost:8080/website | 8080 |
| **API Swagger** | http://localhost:8080/swagger-ui.html | 8080 |
| **PostgreSQL** | localhost:5433 | 5433 |

---

## 📦 Scripts Disponíveis

### Frontend/Website
```bash
npm start      # Inicia dev server (localhost:3000 ou 3001)
npm build      # Cria build de produção
npm test       # Executa testes
npm eject      # Ejetar configurações (⚠️ Não reversível)
```

### Backend
```bash
mvn clean      # Limpa
mvn compile    # Compila
mvn package    # Gera JAR
mvn test       # Executa testes
mvn spring-boot:run  # Inicia a aplicação
```

---

## 🔄 Workflow de Deploy

### 1. Desenvolvimento
```bash
# Frontend
cd src/main/frontend
npm start

# Em outro terminal - Backend
mvn spring-boot:run
```

### 2. Produção
```bash
# Build dos projetos React
cd src/main/frontend && npm run build
cd src/main/website && npm run build

# Build do Docker
docker-compose up --build
```

Os builds React são copiados para `src/main/resources/static/` e servidos pelo Spring Boot.

---

## ⚙️ Configurações Importantes

### WebConfig.java
- CORS habilitado para: `localhost:8000`, `localhost:5500`, `localhost:63342`
- Métodos HTTP permitidos: `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`
- Serve arquivos estáticos de `/static`
- Website acessível em `/website`

### application.properties
```properties
server.port=8080
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:postgresql://lumina-db:5432/lumina
```

---

## 🔐 Credenciais Padrão (Docker)

```env
DB_USER=admin
DB_PASSWORD=password
DB_NAME=lumina
MAIL_HOST=smtp-relay.brevo.com
MAIL_PORT=587
JWT_SECRET=password
```

---

## 🐛 Troubleshooting

### Build falha no Docker
```bash
# Limpar e reconstruir
docker-compose down -v --rmi all
docker-compose up --build
```

### Frontend não carrega
- Verifique se `/static` contém os arquivos do build React
- Limpe cache do navegador (Ctrl+Shift+Del)

### Conectar ao banco PostgreSQL
```bash
psql -h localhost -p 5433 -U admin -d lumina
```

---

## 📝 Branches & Versionamento

- **Branch atual**: `react`
- **Commits**: Todas as mudanças foram commitadas
- Use `git push` para sincronizar com o repositório remoto

---

## 📖 Links Úteis

- [React 19 Docs](https://react.dev)
- [React Scripts](https://create-react-app.dev)
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [Docker Compose](https://docs.docker.com/compose/)

---

**Criado em**: 11 de abril de 2026  
**Status**: ✅ Ambiente React totalmente configurado e testado