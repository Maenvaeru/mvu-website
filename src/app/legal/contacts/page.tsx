import React from 'react';

export const metadata = {
    title: 'Контакты и Реквизиты | MVU AI LAB',
    description: 'Контактная информация и реквизиты.',
};

export default function ContactsPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-cyan drop-shadow-[0_0_8px_rgba(0,239,255,0.8)]">Контакты и Реквизиты</h1>

            <div className="glass p-8 rounded-2xl mb-8 border border-glass-border shadow-[0_0_30px_rgba(0,239,255,0.1)]">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Контактная информация</h2>
                <ul className="space-y-4 text-muted">
                    <li><strong>Email:</strong> maenvaeru@yandex.ru</li>
                    <li><strong>Телефон:</strong> +7 965 037-40-37</li>
                    <li><strong>Telegram:</strong> (укажите ваш телеграм, если нужен)</li>
                    <li><strong>Служба поддержки:</strong> Отвечаем в течение 24 часов.</li>
                </ul>
            </div>

            <div className="glass p-8 rounded-2xl border border-glass-border shadow-[0_0_30px_rgba(0,239,255,0.1)]">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Реквизиты Исполнителя</h2>
                <ul className="space-y-2 text-muted">
                    <li><strong>Статус:</strong> Плательщик налога на профессиональный доход (Самозанятый)</li>
                    <li><strong>ИНН:</strong> 910302878258</li>
                    {/* FIO is legally required by 54-FZ and Consumer Rights act for any commercial entity/self-employed. You must enter it here. */}
                    <li><strong>ФИО:</strong> Гнатюк Михаил Петрович </li>
                </ul>
                <p className="mt-4 text-sm text-muted/80 italic">
                    * Данные реквизиты указаны в соответствии с требованиями Федерального закона «О защите прав потребителей» и правилами платежных агрегаторов.
                </p>
            </div>
        </div>
    );
}
