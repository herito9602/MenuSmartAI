# 🍽️ MenuSmart AI

**MenuSmart AI** es una plataforma SaaS de menús digitales para restaurantes, potenciada por Inteligencia Artificial. Digitaliza tu carta, controla el stock en tiempo real y recibe recomendaciones estratégicas para aumentar tus ventas.

---

## ✨ Características Principales

| Característica | Descripción |
|---|---|
| 📱 **Menú Digital (QR)** | Vista mobile-first que los clientes abren escaneando un QR. Carga en menos de 1 segundo. |
| ⚡ **Stock en Tiempo Real** | Activa/desactiva platos al instante mediante Supabase Realtime. |
| 🤖 **Ingeniero de Menú IA** | GPT-4o analiza clicks/vistas y genera recomendaciones de precios y promociones. |
| 🔐 **Panel de Administración** | Acceso protegido con sesión. Gestión completa de platos (añadir, editar, eliminar). |
| 📊 **QR Dinámico** | Genera y descarga tu código QR personalizado listo para imprimir. |

---

## 🛠️ Stack Tecnológico

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) + TypeScript
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn/UI](https://ui.shadcn.com/)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
- **Base de Datos:** [Supabase](https://supabase.com/) (PostgreSQL + Realtime)
- **Inteligencia Artificial:** [OpenAI API](https://openai.com/api/) — GPT-4o
- **QR Code:** [qrcode.react](https://www.npmjs.com/package/qrcode.react)
- **Iconos:** [Lucide React](https://lucide.dev/)

---

## 🚀 Cómo Empezar

### 1. Clonar e Instalar

```bash
git clone <url-del-repositorio>
cd MenuSmartAI
npm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key

# OpenAI (opcional — hay fallback simulado si no se configura)
OPENAI_API_KEY=tu_openai_api_key
```

> **¿Dónde encuentro las claves de Supabase?**
> Tu proyecto en [supabase.com](https://supabase.com) → **Project Settings** → **API Keys**.

### 3. Configurar la Base de Datos

Ejecuta el archivo `supabase-setup.sql` completo en el **SQL Editor** de tu proyecto de Supabase. El script crea todas las tablas, activa Row Level Security y habilita Realtime en la tabla `items`.

### 4. Ejecutar el Proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx                    # Landing page B2B (página comercial)
│   ├── admin/
│   │   ├── login/                  # Pantalla de login (sin sidebar)
│   │   ├── menu/                   # Editor de platos (CRUD completo)
│   │   ├── qr/                     # Generador de códigos QR
│   │   ├── analytics/              # Dashboard de AI Analytics
│   │   └── settings/               # Configuración del restaurante
│   ├── r/[restaurant-slug]/        # Vista pública del menú (clientes)
│   └── api/
│       └── ai-analyze/             # API Route → OpenAI GPT-4o
├── components/
│   ├── ui/                         # Componentes base de Shadcn/UI
│   └── menu/                       # DishCard, CategoryNav
├── lib/
│   └── supabase.ts                 # Cliente de Supabase
└── middleware.ts                   # Protección de rutas /admin
```

---

## 🔐 Acceso Demo

| Campo | Valor |
|---|---|
| URL | `/admin/login` |
| Email | `demo@menusmart.ai` |
| Contraseña | `demo1234` |
| Sesión | Cookie de 24 horas |

> ⚠️ En producción, esto debe reemplazarse con **Supabase Auth**.

---

## 🗄️ Esquema de Base de Datos

| Tabla | Descripción |
|---|---|
| `restaurants` | Perfil del local (nombre, slug, logo, moneda) |
| `categories` | Categorías del menú |
| `items` | Platos con `is_available` para Realtime |
| `analytics` | Clicks y vistas por plato |
| `ai_reports` | Historial de reportes generados por GPT-4o |

---

## 🗺️ Roadmap

- [ ] Autenticación real con Supabase Auth
- [ ] Conexión completa de CRUD a Supabase
- [ ] Tracking de analytics en tiempo real
- [ ] Sistema multi-tenant (múltiples restaurantes)
- [ ] Dashboard de métricas con gráficas
- [ ] Despliegue en producción (Vercel + dominio propio)

---

## 📄 Licencia

MIT — Libre para uso personal y comercial.
