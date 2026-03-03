# Профессиональное руководство по развертыванию сайта MVU AI LAB

>[!NOTE]
> Данный документ составлен с использованием методологии **Multi-Agent Brainstorming** для выявления лучших архитектурных решений, учитывающих ограничения (отсутствие привязки Github к Cloudflare, необходимость статики и наличие платежных API).

## 1. Архитектурная парадигма: "Умная Статика" (Cloudflare Pages + Next-on-Pages)

Вы запросили полностью **статичный сайт** (где есть `index.html`) без подключения вашего личного GitHub к Cloudflare. 
Однако, для работы **Outstatic (CMS)** и **Robokassa (Платежи)** сайту **необходимы** защищенные серверные функции (API Routes), недоступные в чистом HTML. 

**Решение:** Мы используем библиотеку `@cloudflare/next-on-pages`. Она компилирует ваш Next.js проект в серверную функцию Edge Worker для Cloudflare. Для вас процесс выглядит как деплой статики, сайт работает так же быстро, как статика (раздается с CDN серверов Cloudflare по всему миру, включая РФ), но при этом сохраняет возможность обрабатывать запросы от Робокассы и админ-панели CMS.

---

## 2. Развертывание на Cloudflare Pages без GitHub (Прямой деплой)

Так как вы не хотите подключать GitHub напрямую к Cloudflare, мы будем использовать локальную CLI-утилиту `wrangler`. Она возьмет ваш собранный код локально и загрузит напрямую на инфраструктуру Cloudflare.

### Шаг 2.1: Установка необходимых пакетов
В терминале вашего проекта (убедитесь, что стоите в корне проекта `d:\APRIORI\MVU-WEBSITE`):
```bash
npm install -g wrangler
npm install -D @cloudflare/next-on-pages
```

### Шаг 2.2: Добавление скрипта сборки
Откройте `package.json` и добавьте скрипт для сборки конкретно под Cloudflare. Измените раздел `"scripts"`:
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "pages:build": "npx @cloudflare/next-on-pages",
  "preview": "npm run pages:build && wrangler pages dev .vercel/output/static",
  "deploy": "npm run pages:build && wrangler pages deploy .vercel/output/static"
}
```

### Шаг 2.3: Настройка `next.config.ts` для Cloudflare
Cloudflare Pages не поддерживает стандартные API оптимизации картинок Next.js (если не подключать дополнительные сервисы). 
В `next.config.ts` необходимо отключить встроенную оптимизацию для развертывания на Cloudflare:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // ВАЖНО для статического экспорта и Edge-функций
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.boosty.to',
      },
    ],
  },
};

export default nextConfig;
```

### Шаг 2.4: Процесс публикации (Деплой)
Чтобы опубликовать или обновить сайт, выполните:
1. Авторизуйтесь в Cloudflare (единоразово): `wrangler login`
2. Запустите сборку и деплой:
```bash
npm run deploy
```
3. При первом деплое `wrangler` спросит:
   - Хотите создать новый проект? **Y**
   - Введите имя проекта: `mvu-website` (или ваше)
   - Ветка: `main`
4. Вы получите готовую ссылку (например, `mvu-website.pages.dev`), доступную из РФ с автоматическим SSL сертификатом.

---

## 3. Интеграция Outstatic (CMS)

Outstatic — это гениальное решение для CMS, которое не требует базы данных. Все статьи и проекты хранятся как Markdown `.md` файлы внутри самого проекта.

>[!IMPORTANT]
> Сама админ-панель Outstatic **требует** GitHub для работы. Даже если Cloudflare не имеет доступа к вашему коду, Outstatic использует OAuth от GitHub, чтобы коммитить ваши новые статьи прямо в ваш приватный репозиторий.

### Шаг 3.1: Установка
```bash
npm install outstatic
```

### Шаг 3.2: Интеграция в Next.js App Router
1. Создайте структуру папок для API роута: `src/app/api/outstatic/[[...ost]]/route.ts`
2. Поместите туда код:
```ts
import { OutstaticApi } from 'outstatic'
export const GET = OutstaticApi.GET
export const POST = OutstaticApi.POST
```
3. То же самое сделайте для самой админки (интерфейса): `src/app/outstatic/[[...ost]]/page.tsx`
```tsx
import { Outstatic } from 'outstatic'
export default async function Page() {
  return <Outstatic />
}
```

### Шаг 3.3: GitHub OAuth App
Для входа в админку перейдите в [GitHub Developer Settings](https://github.com/settings/apps) -> **OAuth Apps**.
- Создайте приложение "MVU Outstatic".
- Homepage URL: `https://mvu-website.pages.dev` (ссылка на ваш сайт)
- Authorization callback URL: `https://mvu-website.pages.dev/api/outstatic/callback`
Полученные `Client ID` и `Client Secret` укажите в переменных окружения в Cloudflare Pages дашборде.

---

## 4. Подключение Robokassa (Профессиональная интеграция)

Работа с платежами состоит из двух частей: формирование ссылки на оплату (переход пользователя) и получение скрытого подтверждения (Webhook / ResultURL), что платеж прошел.

### Шаг 4.1: Генерация ссылки на оплату (на клиенте или сервере)
Чтобы отправить человека на оплату определенной суммы:
```ts
import crypto from 'crypto';

// Устанавливается в настройках Робокассы
const MERCHANT_LOGIN = 'ВАШ_ЛОГИН'; 
const PASS1 = 'ПАРОЛЬ_1'; 

// Функция создания URL
export function createRobokassaUrl(outSum: string, invId: string, desc: string) {
  // Формируем подпись: логин:сумма:номерзаказа:пароль1
  const signatureString = `${MERCHANT_LOGIN}:${outSum}:${invId}:${PASS1}`;
  const signature = crypto.createHash('md5').update(signatureString).digest('hex');
  
  const paymentUrl = new URL('https://auth.robokassa.ru/Merchant/Index.aspx');
  paymentUrl.searchParams.append('MerchantLogin', MERCHANT_LOGIN);
  paymentUrl.searchParams.append('OutSum', outSum);
  paymentUrl.searchParams.append('InvId', invId);
  paymentUrl.searchParams.append('Description', desc);
  paymentUrl.searchParams.append('SignatureValue', signature);
  
  return paymentUrl.toString();
}
```

### Шаг 4.2: Обработка Webhook (ResultURL) - КРИТИЧЕСКИ ВАЖНО
Этот роут будет вызван сервером Робокассы, когда клиент оплатит счет.
Создайте файл `src/app/api/robokassa/route.ts`:

```ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

const PASS2 = process.env.ROBOKASSA_PASS2 || ''; // Второй секретный пароль из кабинета

export async function POST(req: Request) {
  const formData = await req.formData();
  
  const outSum = formData.get('OutSum') as string;
  const invId = formData.get('InvId') as string;
  const signature = formData.get('SignatureValue') as string;

  // Робокасса присылает подпись вида MD5(OutSum:InvId:Pass2)
  const expectedSignatureString = `${outSum}:${invId}:${PASS2}`;
  const expectedSignature = crypto.createHash('md5').update(expectedSignatureString).digest('hex');

  // Проверка подлинности (Защита от мошенничества)
  if (signature.toLowerCase() !== expectedSignature.toLowerCase()) {
    return new NextResponse('Bad Signature', { status: 400 });
  }

  // --- ТУТ ВАША БИЗНЕС-ЛОГИКА ---
  // 1. Найти заказ в базе (или файле) по InvId
  // 2. Пометить как оплаченный
  // 3. Отправить письмо с доступом или ссылкой на скачивание
  console.log(`Успешно оплачен заказ #${invId} на сумму ${outSum}`);

  // Робокасса требует обязательный текстовый ответ "OK{InvId}"
  return new NextResponse(`OK${invId}`, { status: 200 });
}
```

### Рекомендации по безопасности платежей:
1. **Никогда** не храните `PASS1` или `PASS2` в открытом виде в коде. Укажите их в дашборде Cloudflare Pages в разделе `Settings -> Environment Variables`. 
2. На сервере при проверке `ResultURL` (Шаг 4.2) используйте только `PASS2`.
3. Обязательно тестируйте оплату в демо-режиме (передав параметр `IsTest=1` при создании ссылки).
