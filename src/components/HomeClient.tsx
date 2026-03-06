"use client";

import Link from "next/link";
import Image from "next/image";
import { NeonButton } from "@/components/ui/NeonButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { Zap, Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn, getAssetPath } from "@/lib/utils";

export function HomeClient({ homepage, posts }: { homepage: any, posts: any[] }) {
    const [lang, setLang] = useState("ru");

    useEffect(() => {
        const checkLang = () => {
            const currentLang = document.documentElement.lang || "ru";
            setLang(currentLang);
        };
        const interval = setInterval(checkLang, 500);
        return () => clearInterval(interval);
    }, []);

    const content = {
        ru: {
            heroTitle: homepage?.heroTitle ? (
                <span dangerouslySetInnerHTML={{ __html: homepage.heroTitle }} />
            ) : (
                <>Добро пожаловать в <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple via-purple-400 to-gold">MVU AI LAB</span></>
            ),
            heroDesc: homepage?.heroSubtitleRu || "Профессиональные нейросетевые инструменты, премиальная ретушь и автоматизированные решения для ComfyUI от MaenVaerU.",
            btnShowcase: homepage?.btnShowcaseRu || "Изучить Витрину",
            btnSubscribe: homepage?.btnSubscribeRu || "Оформить Подписку",
            servicesTitle: <>Наши <span className="text-gold">Услуги</span></>,
            service1Title: homepage?.service1TitleRu || "Ретушь и Апскейл",
            service1Desc: homepage?.service1DescRu || "Премиальная обработка фотографий с применением передовых нейросетевых технологий (Flux, SDXL, SEEDVR2).",
            service1Price: homepage?.service1PriceRu || "от 1,500 ₽",
            service2Title: homepage?.service2TitleRu || "Установка ComfyUI (под ключ)",
            service2Desc: homepage?.service2DescRu || "Индивидуальная настройка, полная установка продвинутых окружений и удаленная помощь.",
            service2Price: homepage?.service2PriceRu || "6,000 ₽",
            service3Title: homepage?.service3TitleRu || "Онлайн обработка",
            service3Desc: homepage?.service3DescRu || "Скоро: автоматизированный онлайн-сервис для быстрой ретуши фото прямо на сайте!",
            service3BadgetStatus: homepage?.service3BadgetStatusRu || "В разработке",
            order: homepage?.orderRu || "Заказать",
            soon: homepage?.soonRu || "Скоро",
            workflowTitle: <>Эксклюзивные <span className="text-purple">Релизы</span></>,
            workflowDesc: homepage?.workflowDescRu || "Витрина лучших проектов и воркфлоу, доступных для приобретения.",
            btnVitrina: homepage?.btnVitrinaRu || "В Витрину",
            tierTitle: <>Уровни <span className="text-purple">Подписки</span></>,
            tierDesc: homepage?.tierDescRu || "Доступ к закрытому сообществу, техническая поддержка и уникальные материалы.",
            tier1Name: homepage?.tier1NameRu || "Творец",
            tier1Price: homepage?.tier1PriceRu || "600 ₽",
            tier2Name: homepage?.tier2NameRu || "Новатор",
            tier2Price: homepage?.tier2PriceRu || "1,000 ₽",
            tier3Name: homepage?.tier3NameRu || "Архитектор",
            tier3Price: homepage?.tier3PriceRu || "3,000 ₽",
            tier4Name: homepage?.tier4NameRu || "Демиург",
            tier4Price: homepage?.tier4PriceRu || "11,500 ₽",
            perMonth: homepage?.perMonthRu || " / мес",
            subscribeAction: homepage?.subscribeActionRu || "Оформить",
            newsTitle: <>Последние <span className="text-purple">Новости</span></>,
            newsLink: homepage?.newsLinkRu || "Все новости",
            readMore: homepage?.readMoreRu || "Читать далее"
        },
        en: {
            heroTitle: homepage?.heroTitle ? (
                <span dangerouslySetInnerHTML={{ __html: homepage.heroTitle }} />
            ) : (
                <>Welcome to <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple via-purple-400 to-gold">MVU AI LAB</span></>
            ),
            heroDesc: homepage?.heroSubtitleEn || "Professional AI tools, premium retouching, and automated ComfyUI solutions by MaenVaerU.",
            btnShowcase: homepage?.btnShowcaseEn || "Explore Showcase",
            btnSubscribe: homepage?.btnSubscribeEn || "Subscribe Now",
            servicesTitle: <>Our <span className="text-gold">Services</span></>,
            service1Title: homepage?.service1TitleEn || "Retouch & Upscale",
            service1Desc: homepage?.service1DescEn || "Premium photo processing using cutting-edge AI technologies (Flux, SDXL, SEEDVR2).",
            service1Price: homepage?.service1PriceEn || "from 1,500 ₽",
            service2Title: homepage?.service2TitleEn || "ComfyUI Setup (Turnkey)",
            service2Desc: homepage?.service2DescEn || "Custom configuration, full installation of advanced environments, and remote assistance.",
            service2Price: homepage?.service2PriceEn || "6,000 ₽",
            service3Title: homepage?.service3TitleEn || "Online Processing",
            service3Desc: homepage?.service3DescEn || "Coming soon: automated online service for fast photo retouching directly on the site!",
            service3BadgetStatus: homepage?.service3BadgetStatusEn || "In Development",
            order: homepage?.orderEn || "Order Now",
            soon: homepage?.soonEn || "Soon",
            workflowTitle: <>Exclusive <span className="text-purple">Releases</span></>,
            workflowDesc: homepage?.workflowDescEn || "Showcase of the best projects and workflows available for purchase.",
            btnVitrina: homepage?.btnVitrinaEn || "To Showcase",
            tierTitle: <>Subscription <span className="text-purple">Tiers</span></>,
            tierDesc: homepage?.tierDescEn || "Access to a private community, technical support, and unique materials.",
            tier1Name: homepage?.tier1NameEn || "Creator",
            tier1Price: homepage?.tier1PriceEn || "600 ₽",
            tier2Name: homepage?.tier2NameEn || "Innovator",
            tier2Price: homepage?.tier2PriceEn || "1,000 ₽",
            tier3Name: homepage?.tier3NameEn || "Architect",
            tier3Price: homepage?.tier3PriceEn || "3,000 ₽",
            tier4Name: homepage?.tier4NameEn || "Demiurge",
            tier4Price: homepage?.tier4PriceEn || "11,500 ₽",
            perMonth: homepage?.perMonthEn || " / mo",
            subscribeAction: homepage?.subscribeActionEn || "Subscribe",
            newsTitle: <>Latest <span className="text-purple">News</span></>,
            newsLink: homepage?.newsLinkEn || "All news",
            readMore: homepage?.readMoreEn || "Read more"
        }
    }[lang as "ru" | "en"];

    // Dynamic blocks logic
    let blocks = [];
    try {
        if (homepage?.blocksData) {
            blocks = JSON.parse(homepage.blocksData);
        }
    } catch (e) {
        console.error("Failed to parse blocksData", e);
    }

    // Default static blocks if no dynamic blocks exist
    if (blocks.length === 0) {
        blocks = [
            { type: 'hero', id: 'hero-def' },
            { type: 'services', id: 'services-def' },
            { type: 'news', id: 'news-def' },
            { type: 'workflows', id: 'workflows-def' },
            { type: 'subscriptions', id: 'subscriptions-def' }
        ];
    }

    const renderHeroTitle = (customTitle?: any) => {
        const title = customTitle || homepage?.heroTitle;
        if (title && typeof title === 'string') {
            if (title.includes('MVU AI LAB')) {
                return <>Добро пожаловать в <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple via-purple-400 to-gold">MVU AI LAB</span></>;
            }
            return <span dangerouslySetInnerHTML={{ __html: title }} />;
        }
        if (title && typeof title === 'object') {
            // If it's already a React element or unexpected object
            return title.heroTitle || title.title || JSON.stringify(title);
        }
        return content.heroTitle;
    };

    return (
        <div className="flex flex-col items-center w-full">
            {blocks.map((block: any) => {
                switch (block.type) {
                    case 'hero':
                        return (
                            <section key={block.id} className="w-full py-16 md:py-32 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden min-h-[500px] md:min-h-[600px]">
                                <div className="absolute inset-0 -z-20">
                                    <Image
                                        src={getAssetPath(block.data?.coverImg || "/images/cover.jpg")}
                                        alt="Background"
                                        fill
                                        className="object-cover opacity-20"
                                        priority
                                    />
                                </div>

                                <div className="mb-6 relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple shadow-[0_0_150px_60px_rgba(138,43,226,0.35)]">
                                    <Image
                                        src={getAssetPath(block.data?.avatarImg || "/images/avatar.jpg")}
                                        alt="Avatar"
                                        fill
                                        sizes="128px"
                                        quality={100}
                                        priority
                                        className="object-cover"
                                    />
                                </div>

                                <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tighter mb-6 break-words">
                                    {renderHeroTitle(block.data?.title)}
                                </h1>
                                <p className="text-sm md:text-xl text-muted max-w-2xl mb-10 whitespace-pre-wrap">
                                    {lang === 'ru' ? (block.data?.subtitleRu || content.heroDesc) : (block.data?.subtitleEn || content.heroDesc)}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href="#workflows"><NeonButton variant="purple" className="w-full sm:w-auto">{lang === 'ru' ? (block.data?.btnShowcaseRu || content.btnShowcase) : (block.data?.btnShowcaseEn || content.btnShowcase)}</NeonButton></Link>
                                    <Link href="#subscriptions"><NeonButton variant="orange" className="w-full sm:w-auto">{lang === 'ru' ? (block.data?.btnSubscribeRu || content.btnSubscribe) : (block.data?.btnSubscribeEn || content.btnSubscribe)}</NeonButton></Link>
                                </div>
                            </section>
                        );

                    case 'services':
                        return (
                            <section key={block.id} id="services" className="w-full py-16 md:py-24 px-4 container mx-auto">
                                <div className="flex flex-col mb-12">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{lang === 'ru' ? (block.data?.titleRu || content.servicesTitle) : (block.data?.titleEn || content.servicesTitle)}</h2>
                                    <div className="w-20 h-1 bg-gold rounded" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <GlassCard className="flex flex-col h-full">
                                        <Sparkles className="w-10 h-10 text-purple mb-4" />
                                        <h3 className="text-lg md:text-xl font-bold mb-3">{lang === 'ru' ? (block.data?.s1TitleRu || content.service1Title) : (block.data?.s1TitleEn || content.service1Title)}</h3>
                                        <p className="text-muted mb-6 text-sm flex-1">
                                            {lang === 'ru' ? (block.data?.s1DescRu || content.service1Desc) : (block.data?.s1DescEn || content.service1Desc)}
                                        </p>
                                        <div className="text-xl md:text-2xl font-bold text-foreground mb-4">{lang === 'ru' ? (block.data?.s1PriceRu || content.service1Price) : (block.data?.s1PriceEn || content.service1Price)}</div>
                                        <NeonButton variant="purple" className="w-full text-sm">{content.order}</NeonButton>
                                    </GlassCard>

                                    <GlassCard className="flex flex-col border-2 border-gold shadow-[0_0_30px_rgba(234,179,8,0.2)] p-0 overflow-hidden relative h-full">
                                        <div className="relative w-full h-48 md:h-40">
                                            <Image src={getAssetPath(block.data?.s2Img || "/images/master-key.webp")} alt="Service" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,0.95)] via-[rgba(26,26,26,0.4)] to-transparent" />
                                            <div className="absolute top-0 right-0 bg-gold text-black text-xs font-bold px-3 py-1 rounded-bl-lg z-10">HIT</div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            <h3 className="text-lg md:text-xl font-bold mb-3 text-gold">{lang === 'ru' ? (block.data?.s2TitleRu || content.service2Title) : (block.data?.s2TitleEn || content.service2Title)}</h3>
                                            <p className="text-muted mb-6 text-sm flex-1">
                                                {lang === 'ru' ? (block.data?.s2DescRu || content.service2Desc) : (block.data?.s2DescEn || content.service2Desc)}
                                            </p>
                                            <div className="text-xl md:text-2xl font-bold text-foreground mb-4">{lang === 'ru' ? (block.data?.s2PriceRu || content.service2Price) : (block.data?.s2PriceEn || content.service2Price)}</div>
                                            <NeonButton variant="gold" className="w-full text-sm font-bold text-black">{content.order}</NeonButton>
                                        </div>
                                    </GlassCard>

                                    <GlassCard className="flex flex-col h-full">
                                        <Zap className="w-10 h-10 text-muted mb-4" />
                                        <h3 className="text-lg md:text-xl font-bold mb-3">{lang === 'ru' ? (block.data?.s3TitleRu || content.service3Title) : (block.data?.s3TitleEn || content.service3Title)}</h3>
                                        <p className="text-muted mb-6 text-sm flex-1">
                                            {lang === 'ru' ? (block.data?.s3DescRu || content.service3Desc) : (block.data?.s3DescEn || content.service3Desc)}
                                        </p>
                                        <div className="text-xl md:text-2xl font-bold text-foreground mb-4 opacity-50">{lang === 'ru' ? (block.data?.s3StatusRu || content.service3BadgetStatus) : (block.data?.s3StatusEn || content.service3BadgetStatus)}</div>
                                        <NeonButton variant="softgray" disabled className="w-full text-sm opacity-50 cursor-not-allowed">{content.soon}</NeonButton>
                                    </GlassCard>
                                </div>
                            </section>
                        );

                    case 'news':
                        return posts && posts.length > 0 && (
                            <section key={block.id} id="news" className="w-full py-16 md:py-24 px-4 container mx-auto bg-glass-bg border-t border-glass-border">
                                <div className="flex flex-col mb-12 items-start">
                                    <div className="flex justify-between w-full items-end">
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-bold mb-2">{content.newsTitle}</h2>
                                            <div className="w-20 h-1 bg-purple rounded" />
                                        </div>
                                        <Link href="/news" className="text-muted hover:text-purple transition-colors flex items-center gap-1 text-sm font-medium">
                                            {content.newsLink} <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {posts.slice(0, 3).map((post) => (
                                        <GlassCard key={post.slug} className="flex flex-col h-full">
                                            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                                            <p className="text-xs text-muted mb-4 border-b border-glass-border pb-2 border-opacity-50">
                                                {new Date(post.date || post.publishedAt).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                            <p className="text-muted mb-6 text-sm flex-1">
                                                {post.description}
                                            </p>
                                            <Link href={`/news/${post.slug}`}>
                                                <NeonButton variant="softgray" className="w-full text-sm">{content.readMore}</NeonButton>
                                            </Link>
                                        </GlassCard>
                                    ))}
                                </div>
                            </section>
                        );

                    case 'workflows':
                        return (
                            <section key={block.id} id="workflows" className="w-full py-16 md:py-24 px-4 container mx-auto bg-glass-bg border-y border-glass-border">
                                <div className="flex flex-col mb-12 items-end text-right">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{content.workflowTitle}</h2>
                                    <div className="w-20 h-1 bg-purple rounded" />
                                    <p className="text-muted max-w-xl mt-4">{lang === 'ru' ? (block.data?.descRu || content.workflowDesc) : (block.data?.descEn || content.workflowDesc)}</p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {[1, 2, 3, 4].map(n => {
                                        const wDefaults = [
                                            { tag: lang === 'ru' ? 'АПГРЕЙД' : 'UPGRADE', name: 'RESTORATOR 2.2', img: '/images/restorator2.webp', color: 'text-gold', btn: 'gold', desc: lang === 'ru' ? 'Flux2 Klein 9B + Экстрактор + SEED. Самое совершенное решение.' : 'Flux2 Klein 9B + Extractor + SEED. The most advanced solution.' },
                                            { tag: lang === 'ru' ? 'ГЕНЕРАЦИЯ' : 'GENERATION', name: lang === 'ru' ? 'АРХАНГЕЛ' : 'ARCHANGEL', img: '/images/archangel.webp', color: 'text-blue-400', btn: 'purple', desc: lang === 'ru' ? 'Новейший и мощный инструмент.' : 'The newest and powerful tool.' },
                                            { tag: content.soon, name: 'SUPIR-X', img: '/images/supir-x.webp', color: 'text-red-400', btn: 'softgray', desc: lang === 'ru' ? 'Секретный проект следующего поколения.' : 'Next generation secret project.', disabled: true },
                                            { tag: 'RELEASE', name: 'MVU-Comfy-Desktop', img: '/images/desktop.webp', color: 'text-green-400', btn: 'purple', desc: lang === 'ru' ? 'Полноценное десктопное окружение.' : 'Full desktop environment for AI.' }
                                        ][n - 1];

                                        const wTitle = block.data?.[`w${n}Name`] || wDefaults.name;
                                        const wTag = lang === 'ru' ? (block.data?.[`w${n}TagRu`] || wDefaults.tag) : (block.data?.[`w${n}TagEn`] || wDefaults.tag);
                                        const wDesc = lang === 'ru' ? (block.data?.[`w${n}DescRu`] || wDefaults.desc) : (block.data?.[`w${n}DescEn`] || wDefaults.desc);
                                        const wImg = block.data?.[`w${n}Img`] || wDefaults.img;
                                        const isDisabled = n === 3 && !block.data?.[`w${n}Img`]; // Logic for 'Soon' cases if not configured

                                        return (
                                            <GlassCard key={n} className="flex flex-col md:flex-row gap-6 p-0 overflow-hidden group">
                                                <div className="w-full md:w-2/5 relative min-h-[250px] md:min-h-[200px] border-b md:border-b-0 md:border-r border-glass-border overflow-hidden">
                                                    <Image src={getAssetPath(wImg)} alt={wTitle} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                                                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/20 to-transparent group-hover:opacity-70 transition-opacity duration-500" />
                                                    <div className={cn("absolute top-4 left-4 text-[10px] font-mono px-2 py-1 rounded backdrop-blur-sm shadow-lg z-10", n === 1 ? "text-black bg-gold/90" : n === 3 ? "text-white bg-red-600" : "text-white bg-green-500")}>
                                                        {wTag}
                                                    </div>
                                                </div>
                                                <div className="p-6 flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <div className={cn("text-xs font-bold tracking-widest mb-2", wDefaults.color)}>{wTag}</div>
                                                        <h3 className="text-2xl font-bold mb-3">{wTitle}</h3>
                                                        <p className="text-sm text-muted mb-4">{wDesc}</p>
                                                    </div>
                                                    <NeonButton variant={wDefaults.btn as any} disabled={wDefaults.disabled} className={cn("w-full md:w-auto self-start mt-4", wDefaults.disabled && "opacity-50 cursor-not-allowed")}>
                                                        {wDefaults.disabled ? content.soon : content.btnVitrina}
                                                    </NeonButton>
                                                </div>
                                            </GlassCard>
                                        );
                                    })}
                                </div>

                            </section>
                        );

                    case 'subscriptions':
                        const tiers = [
                            { id: 1, defaultImg: '/images/tvorets.webp' },
                            { id: 2, defaultImg: '/images/novator.webp' },
                            { id: 3, defaultImg: '/images/architector.webp' },
                            { id: 4, defaultImg: '/images/demiurg.webp' }
                        ];
                        return (
                            <section key={block.id} id="subscriptions" className="w-full py-16 md:py-24 px-4 container mx-auto">
                                <div className="flex flex-col mb-12 items-center text-center">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{lang === 'ru' ? (block.data?.titleRu || content.tierTitle) : (block.data?.titleEn || content.tierTitle)}</h2>
                                    <div className="w-20 h-1 bg-purple rounded mb-4" />
                                    <p className="text-muted max-w-xl">
                                        {lang === 'ru' ? (block.data?.descRu || content.tierDesc) : (block.data?.descEn || content.tierDesc)}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                                    {tiers.map((tier) => (
                                        <GlassCard key={tier.id} className={cn(
                                            "flex flex-col p-0 overflow-hidden",
                                            tier.id === 2 ? "border-t-2 border-t-purple" :
                                                tier.id === 3 ? "border-2 border-gold shadow-[0_0_30px_rgba(234,179,8,0.15)]" :
                                                    tier.id === 4 ? "border-2 border-[#ff6600] shadow-[0_0_50px_rgba(255,102,0,0.5)]" :
                                                        "border-t-2 border-t-purple/50"
                                        )}>
                                            <div className="relative w-full h-48 sm:h-40">
                                                <Image src={getAssetPath(block.data?.[`t${tier.id}Img`] || tier.defaultImg)} alt="Tier" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,0.95)] via-[rgba(26,26,26,0.2)] to-transparent" />
                                                {tier.id === 3 && <div className="absolute top-0 right-0 bg-gold text-black text-xs font-bold px-3 py-1 rounded-bl-lg z-10">BEST</div>}
                                            </div>
                                            <div className="p-6 flex flex-col flex-1">
                                                <h3 className={cn("text-lg md:text-xl font-bold mb-2", tier.id === 2 ? "text-purple" : tier.id === 3 ? "text-gold" : "text-foreground")}>
                                                    {lang === 'ru' ? (block.data?.[`t${tier.id}NameRu`] || (content as any)[`tier${tier.id}Name`]) : (block.data?.[`t${tier.id}NameEn`] || (content as any)[`tier${tier.id}Name`])}
                                                </h3>
                                                <div className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                                    {lang === 'ru' ? (block.data?.[`t${tier.id}PriceRu`] || (content as any)[`tier${tier.id}Price`]) : (block.data?.[`t${tier.id}PriceEn`] || (content as any)[`tier${tier.id}Price`])}
                                                    <span className="text-sm text-muted/60 font-normal">{content.perMonth}</span>
                                                </div>

                                                <div className="space-y-2 mb-6 flex-1">
                                                    {(lang === 'ru' ? block.data?.[`t${tier.id}FeaturesRu`] : block.data?.[`t${tier.id}FeaturesEn`])?.split('\n').filter(Boolean).map((f: string, idx: number) => (
                                                        <div key={idx} className="flex items-center gap-2 text-xs text-muted">
                                                            <div className="w-1 h-1 rounded-full bg-purple/50" />
                                                            {f}
                                                        </div>
                                                    ))}
                                                </div>

                                                <NeonButton
                                                    variant={tier.id === 4 ? "orange" : tier.id === 1 ? "softgray" : tier.id === 2 ? "purple" : "gold"}
                                                    className={cn("w-full mt-auto", tier.id === 3 && "text-black font-bold")}
                                                >
                                                    {content.subscribeAction}
                                                </NeonButton>
                                            </div>

                                        </GlassCard>
                                    ))}
                                </div>
                            </section>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
}

