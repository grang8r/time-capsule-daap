# Cápsula del tiempo DApp
**Descripción**
Aplicación descentralizada (DApp) que permite almacenar mensajes encriptados en una blockchain local y desbloquearlos automáticamente tras 10 segundos. El frontend está desarrollado en Angular, el backend en Solidity con Truffle y la red local usando Ganache.

**Requisitos Previos**
Node.js (v18+ recomendado)
npm o yarn
Angular CLI (`npm install -g @angular/cli`)
Ganache (app de escritorio o CLI)
Truffle (`npm install -g truffle`)
Git (para control de versiones)

**Instalación y Configuración**
1. Clona el repositorio:
git clone (https://github.com/grang8r/time-capsule-daap)
cd capsula-tiempo
2. Instala las dependencias del frontend (Angular):
cd frontend
npm install
3. Instala las dependencias para smart contracts (Truffle):
cd ../contracts
npm install
4. Levanta Ganache en modo local:
- Usando la interfaz gráfica de Ganache, o
- Por línea de comandos:
ganache-cli

**Despliegue de Smart Contracts**
Desde la carpeta de contratos, ejecuta:
truffle compile
truffle migrate --network development
Nota: Verifica que el archivo `truffle-config.js` está configurado para apuntar a Ganache.
Ejecutar la DApp (Frontend Angular)
Desde la carpeta frontend:
ng serve
Luego abre en tu navegador:
http://localhost:4200/

**Comandos útiles**

npm install --> Instala las dependencias
ng serve --> Levanta servidor Angular para desarrollo
ng build --> Construye la app Angular para producción
truffle compile --> Compila los smart contracts
truffle migrate --> Despliega contratos en la red configurada
truffle test --> Ejecuta tests de smart contracts
ng test --> Ejecuta tests de frontend Angular


**Testing**
- Smart Contracts:
cd contracts
truffle test
- Frontend Angular:
cd frontend
ng test
**Estructura del Proyecto**
/
├── contracts/          # Smart contracts (Solidity + tests)
├── frontend/           # Aplicación Angular
├── migrations/         # Scripts de migración Truffle
├── truffle-config.js   # Configuración Truffle
└── README.md           # Este documento
**Notas**
El tiempo de desbloqueo se maneja en el frontend Angular.
El mensaje se encripta antes de almacenarse en la blockchain.
Asegúrate de tener Ganache corriendo antes de migrar contratos o ejecutar la DApp.
