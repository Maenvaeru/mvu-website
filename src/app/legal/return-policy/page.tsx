import React from 'react';

export const metadata = {
    title: 'Политика Возврата | MVU AI LAB',
    description: 'Условия предоставления услуг и информация о процедуре возврата.',
};

export default function ReturnPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-cyan drop-shadow-[0_0_8px_rgba(0,239,255,0.8)]">Условия Возврата</h1>

            <div className="glass p-8 rounded-2xl border border-glass-border shadow-[0_0_30px_rgba(0,239,255,0.1)] prose dark:prose-invert max-w-none text-foreground dark:text-muted">
                <h2>Политика отмены и возврата средств</h2>
                <p>На этой странице описаны условия, при которых возможен возврат средств за приобретенные цифровые товары или услуги.</p>

                <h3>1. Цифровые товары</h3>
                <p>В соответствии с законодательством РФ, возврат средств за цифровые товары (воркфлоу, пресеты, доступ к материалам) надлежащего качества после их получения не производится.</p>

                <h3>2. Услуги (Настройка, Установка)</h3>
                <p>Возврат средств за услуги возможен в случае, если услуга не была оказана в полном объеме по вине исполнителя. Заявки на возврат рассматриваются индивидуально.</p>

                <h3>3. Порядок возврата</h3>
                <p>Для запроса на возврат свяжитесь с нами по email: <strong>maenvaeru@yandex.ru</strong>.</p>
            </div>
        </div>
    );
}
