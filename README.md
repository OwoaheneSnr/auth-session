<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Auth-Session NestJS

Sistema completo de **autenticación, gestión de usuarios y roles** basado en **NestJS**, **Prisma ORM**, con soporte de **JWT, cookies seguras, guards, pipes y DTOs personalizados**, listo para producción con **Docker/Podman**.

---

## 🧭 Tabla de Contenidos

- [Auth-Session NestJS](#auth-session-nestjs)
  - [🧭 Tabla de Contenidos](#-tabla-de-contenidos)
  - [📝 Descripción](#-descripción)
  - [📂 Estructura completa del proyecto](#-estructura-completa-del-proyecto)
  - [🧰 Tecnologías principales](#-tecnologías-principales)
  - [✅ Requisitos](#-requisitos)
  - [🚀 Instalación e inicialización](#-instalación-e-inicialización)
  - [🛠 onInit — Creación de administrador](#-oninit--creación-de-administrador)
  - [🔧 Uso / Ejemplos](#-uso--ejemplos)
    - [Registro de usuario](#registro-de-usuario)
    - [Login](#login)
    - [Obtener perfil (protegido)](#obtener-perfil-protegido)
  - [📚 Swagger / Documentación](#-swagger--documentación)
  - [📦 Scripts útiles](#-scripts-útiles)
  - [📄 Licencia](#-licencia)

---

## 📝 Descripción

Auth-Session es un sistema robusto para la gestión de usuarios y autenticación en NestJS, con:

- Roles y permisos mediante **guards personalizados**
- Autenticación con **JWT + cookies seguras**
- Estrategias de Passport para login
- DTOs y validación de datos con **class-validator / class-transformer**
- Validación de entorno con **Zod**
- Pipelines y pipes personalizados
- Migraciones automáticas y administración de base de datos con **Prisma**
- Contenedores Docker/Podman listos para producción

---

## 📂 Estructura completa del proyecto

```
src/
├── common/
│   ├── config/
│   │   ├── swagger/              # Configuración Swagger
│   │   ├── prisma/               # Configuración Prisma
│   │   └── errors/               # Excepciones personalizadas
│   ├── dto/                      # DTOs genéricos reutilizables
│   ├── interface/                # Interfaces globales
│   ├── resources/
│   │   ├── password/             # Encriptación y validación de passwords
│   │   ├── cookies/
│   │   │   ├── interfaces/       # Interfaces relacionadas con cookies
│   │   │   └── constants/        # Constantes relacionadas con cookies
│   │   ├── jwt/
│   │   │   ├── config/           # Configuración JWT
│   │   │   └── constants/        # Constantes JWT
│   │   ├── updateDecorators/     # Decoradores personalizados
│   │   └── match/                # Funciones de comparación y validación
│   ├── utils/
│   │   ├── date/                 # Utilidades de fecha y hora
│   │   └── database/             # Helpers de base de datos
│   └── role/
│       ├── constants/            # Constantes de roles
│       └── guards/               # Guards para roles
├── modules/
│   ├── users/
│   │   ├── dto/                  # DTOs específicos de usuarios
│   │   ├── entities/             # Entidades / modelos
│   │   ├── service/              # Servicios y lógica de negocio
│   │   └── interface/            # Interfaces específicas de usuarios
│   ├── auth/
│   │   ├── guards/               # Guards de autenticación
│   │   ├── strategies/           # Estrategias de Passport
│   │   ├── config/               # Configuración auth
│   │   ├── constants/            # Constantes auth
│   │   └── interfaces/           # Interfaces auth
│   └── seed/
│       └── interface/            # Interfaces para seeders / datos iniciales
```

> **Nota:** Cada subcarpeta contiene funciones, clases o interfaces específicas para su ámbito (p. ej. JWT, cookies, roles, utilidades, etc.) y está pensada para ser modular y reutilizable.

---

## 🧰 Tecnologías principales

- **TypeScript**
- **NestJS**
- **Prisma ORM + PostgreSQL**
- **Docker / Podman**
- **Passport.js** + Estrategias JWT
- **Cookie-Parser**
- **Class-Validator / Class-Transformer**
- **Zod**
- **Custom Decorators / Guards / Pipes**

---

## ✅ Requisitos

- Node.js ≥ 18
- npm o yarn
- Docker o Podman
- (Opcional) PostgreSQL local

---

## 🚀 Instalación e inicialización

1. **Clonar el repositorio:**

```bash
git clone https://github.com/francoabottaro/auth-session.git
cd auth-session
```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Configurar variables de entorno:**

```bash
cp .env.example .env
```

4. **Levantar contenedores (Docker / Podman):**

```bash
sudo docker-compose up -d
# o con Podman:
sudo podman-compose up -d
```

5. **Migraciones de base de datos:**

```bash
npx prisma migrate reset
npx prisma migrate dev --name init
```

6. **Iniciar la aplicación:**

**Desarrollo:**

```bash
npm run start:dev
```

**Producción:**

```bash
npm run build
npm run start:prod
```

---

## 🛠 onInit — Creación de administrador

Al iniciar la aplicación, se ejecuta un hook (`onModuleInit`) que crea automáticamente un **usuario administrador** si no existe. Definir variables `ADMIN_EMAIL` y `ADMIN_PASSWORD` en `.env`.

---

## 🔧 Uso / Ejemplos

### Registro de usuario

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","name":"Admin","password":"Secret"}'
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"content":"admin@example.com","password":"Secret"}'
```

### Obtener perfil (protegido)

```bash
curl http://localhost:3000/users/profile \
  -H "Authorization: Bearer <token>"
```

---

## 📚 Swagger / Documentación

Accede a la documentación interactiva en:

```
http://localhost:3000/api
```

Permite probar endpoints con **JSON, form-data y x-www-form-urlencoded**, incluyendo campos editables dinámicamente.

---

## 📦 Scripts útiles

| Comando                    | Descripción                                   |
| -------------------------- | --------------------------------------------- |
| `npm run start:dev`        | Modo desarrollo con recarga automática        |
| `npm run build`            | Compila TypeScript                            |
| `npm run start:prod`       | Ejecuta versión compilada en producción       |
| `npx prisma migrate dev`   | Genera nuevas migraciones                     |
| `npx prisma migrate reset` | Resetea la base de datos y aplica migraciones |
| `npx prisma studio`        | Interfaz visual de Prisma                     |

---

## 📄 Licencia

MIT — ver archivo `LICENSE`.
