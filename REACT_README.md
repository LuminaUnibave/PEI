# Ambiente React Integrado

Este projeto agora inclui ambientes React para frontend e website.

## Estrutura
- `src/main/frontend/`: Aplicação React para o frontend interno (servido em /)
- `src/main/website/`: Aplicação React para o website público (servido em /website)

## Desenvolvimento
Para desenvolver o frontend:
```bash
cd src/main/frontend
npm start
```

Para o website:
```bash
cd src/main/website
npm start
```

## Build
O Maven constrói automaticamente os projetos React durante `mvn clean package` e copia para `src/main/resources/static`.

## Acesso
- Frontend: http://localhost:8080/
- Website: http://localhost:8080/website/