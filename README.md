﻿# Consolin

**Consolin** es un asistente de inteligencia artificial diseñado para ejecutarse en la consola. Actualmente, cuenta con dos herramientas principales: una que simula una API de clima y otra para finalizar la sesión/chat.

## Instalación

Clona el repositorio e instala las dependencias:

```sh
git clone https://github.com/fiorafran/consolin.git
cd consolin
npm install
```

## Uso

Para iniciar **Consolin**, ejecuta:

```sh
npm start
```

## Requisitos

Este proyecto utiliza modelos de IA a través de [OpenRouter](https://openrouter.ai/) y el paquete `openai`. Para su correcto funcionamiento, necesitarás:

- Una API Key válida de OpenRouter u OpenAI.
- Especificar el nombre del modelo de IA que deseas usar.

Configura estas credenciales en un archivo `.env` en la raíz del proyecto:

```
APIKEY=tu_api_key_aqui
MODEL=nombre_del_modelo
```

## Herramientas Disponibles

1. **Simulación de API de Clima**: Proporciona información ficticia sobre el clima de una ciudad ingresada por el usuario.
2. **Finalizar Sesión/Chat**: Permite cerrar la conversación.

## Contribución

Si deseas contribuir a **Consolin**, puedes hacer un fork del repositorio, realizar mejoras y enviar un pull request.

