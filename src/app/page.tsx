import Image from "next/image";
import { NeonButton } from "@/components/ui/NeonButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { Terminal, Zap, Wrench, Sparkles, CheckCircle2, Shield, Gem } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden min-h-[600px]">
        {/* Background Cover Image */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/images/cover.jpg"
            alt="Boosty Cover"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        {/* Avatar with extreme native box-shadow glow (Fixes Banding completely) */}
        <div className="mb-6 relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple shadow-[0_0_150px_60px_rgba(138,43,226,0.35)]">
          <Image
            src="/images/avatar.jpg"
            alt="MaenVaerU Avatar"
            fill
            sizes="128px"
            quality={100}
            priority
            className="object-cover"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 mt-4 drop-shadow-lg">
          Добро пожаловать в <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple via-purple-400 to-gold">MVU AI LAB</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 drop-shadow-md font-medium">
          Профессиональные нейросетевые инструменты, премиальная ретушь и автоматизированные решения для ComfyUI от MaenVaerU.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#workflows"><NeonButton variant="purple" className="w-full sm:w-auto">Изучить Витрину</NeonButton></a>
          <a href="#subscriptions"><NeonButton variant="gold" className="w-full sm:w-auto">Оформить Подписку</NeonButton></a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full py-20 px-4 container mx-auto">
        <div className="flex flex-col mb-12">
          <h2 className="text-3xl font-bold mb-2">Наши <span className="text-gold">Услуги</span></h2>
          <div className="w-20 h-1 bg-gold rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="flex flex-col h-full">
            <Sparkles className="w-10 h-10 text-purple mb-4" />
            <h3 className="text-xl font-bold mb-3">Ретушь и Апскейл</h3>
            <p className="text-gray-400 mb-6 text-sm flex-1">
              Премиальная обработка фотографий с применением передовых нейросетевых технологий (Flux, SDXL, SEEDVR2).
            </p>
            <div className="text-2xl font-bold text-white mb-4">от 1,500 ₽</div>
            <NeonButton variant="purple" className="w-full text-sm">Заказать</NeonButton>
          </GlassCard>

          <GlassCard className="flex flex-col border-2 border-gold shadow-[0_0_30px_rgba(234,179,8,0.2)] p-0 overflow-hidden relative h-full">
            <div className="relative w-full h-48 md:h-40">
              <Image src="/images/master-key.webp" alt="Ключ от Мастерской" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,0.95)] via-[rgba(26,26,26,0.4)] to-transparent" />
              <div className="absolute top-0 right-0 bg-gold text-black text-xs font-bold px-3 py-1 rounded-bl-lg z-10">ХИТ</div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-3 text-gold">Установка ComfyUI (под ключ)</h3>
              <p className="text-gray-300 mb-6 text-sm flex-1">
                Индивидуальная настройка, полная установка продвинутых окружений и удаленная помощь.
              </p>
              <div className="text-2xl font-bold text-white mb-4">6,000 ₽</div>
              <NeonButton variant="gold" className="w-full text-sm font-bold text-black">Заказать</NeonButton>
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col h-full">
            <Zap className="w-10 h-10 text-gray-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">Онлайн обработка</h3>
            <p className="text-gray-400 mb-6 text-sm flex-1">
              Скоро: автоматизированный онлайн-сервис для быстрой ретуши фото прямо на сайте!
            </p>
            <div className="text-2xl font-bold text-white mb-4 opacity-50">В разработке</div>
            <NeonButton variant="softgray" disabled className="w-full text-sm opacity-50 cursor-not-allowed">Скоро</NeonButton>
          </GlassCard>
        </div>
      </section>

      {/* Workflows / Showcase Section */}
      <section id="workflows" className="w-full py-20 px-4 container mx-auto bg-white/[0.02] border-y border-white/5">
        <div className="flex flex-col mb-12 items-end text-right">
          <h2 className="text-3xl font-bold mb-2">Эксклюзивные <span className="text-purple">Релизы</span></h2>
          <div className="w-20 h-1 bg-purple rounded" />
          <p className="text-gray-400 max-w-xl mt-4">Витрина лучших проектов и воркфлоу, доступных для приобретения.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1 */}
          <GlassCard className="flex flex-col md:flex-row gap-6 p-0 overflow-hidden group">
            <div className="w-full md:w-2/5 relative min-h-[250px] md:min-h-[200px] border-b md:border-b-0 md:border-r border-white/10 overflow-hidden">
              <Image src="/images/restorator2.webp" alt="RESTORATOR 2.2" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/20 to-transparent group-hover:opacity-70 transition-opacity duration-500" />
              <div className="absolute top-4 left-4 text-[10px] font-mono text-black bg-gold/90 px-2 py-1 rounded backdrop-blur-sm shadow-lg z-10">v2.2</div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-xs text-gold font-bold tracking-widest mb-2">АПГРЕЙД</div>
                <h3 className="text-2xl font-bold mb-3">RESTORATOR 2.2</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Flux2 Klein 9B + Экстрактор + SEED. Самое совершенное решение для восстановления и апскейла.
                </p>
              </div>
              <NeonButton variant="gold" className="w-full md:w-auto self-start mt-4">В Витрину</NeonButton>
            </div>
          </GlassCard>

          {/* Card 2 */}
          <GlassCard className="flex flex-col md:flex-row gap-6 p-0 overflow-hidden group">
            <div className="w-full md:w-2/5 relative min-h-[250px] md:min-h-[200px] border-b md:border-b-0 md:border-r border-white/10 overflow-hidden">
              <Image src="/images/archangel.webp" alt="АРХАНГЕЛ" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/20 to-transparent group-hover:opacity-70 transition-opacity duration-500" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-xs text-blue-400 font-bold tracking-widest mb-2">ГЕНЕРАЦИЯ</div>
                <h3 className="text-2xl font-bold mb-3">АРХАНГЕЛ</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Новейший и мощный инструмент для высококачественных генераций.
                </p>
              </div>
              <NeonButton variant="purple" className="w-full md:w-auto self-start mt-4">В Витрину</NeonButton>
            </div>
          </GlassCard>

          {/* Card 3 */}
          <GlassCard className="flex flex-col md:flex-row gap-6 p-0 overflow-hidden group">
            <div className="w-full md:w-2/5 relative min-h-[250px] md:min-h-[200px] border-b md:border-b-0 md:border-r border-white/10 overflow-hidden">
              <Image src="/images/supir-x.webp" alt="SUPIR-X" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/20 to-transparent group-hover:opacity-70 transition-opacity duration-500" />
              <div className="absolute top-4 left-4 text-[10px] font-mono text-white bg-red-600 px-2 py-1 rounded backdrop-blur-sm shadow-lg z-10">В РАЗРАБОТКЕ</div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-xs text-red-400 font-bold tracking-widest mb-2">ЭКСПЕРИМЕНТ</div>
                <h3 className="text-2xl font-bold mb-3">SUPIR-X</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Секретный проект следующего поколения. Ожидайте беспрецедентный уровень детализации.
                </p>
              </div>
              <NeonButton variant="softgray" disabled className="w-full md:w-auto self-start mt-4 opacity-50 cursor-not-allowed">Скоро</NeonButton>
            </div>
          </GlassCard>

          {/* Card 4 */}
          <GlassCard className="flex flex-col md:flex-row gap-6 p-0 overflow-hidden group">
            <div className="w-full md:w-2/5 relative min-h-[250px] md:min-h-[200px] border-b md:border-b-0 md:border-r border-white/10 overflow-hidden">
              <Image src="/images/desktop.webp" alt="MVU-Comfy-Desktop" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/20 to-transparent group-hover:opacity-70 transition-opacity duration-500" />
              <div className="absolute top-4 left-4 text-[10px] font-mono text-white bg-green-500 px-2 py-1 rounded backdrop-blur-sm shadow-lg z-10">ПОСТ-РЕЛИЗ</div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-xs text-green-400 font-bold tracking-widest mb-2">ОКРУЖЕНИЕ</div>
                <h3 className="text-2xl font-bold mb-3">MVU-Comfy-Desktop</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Полноценное десктопное окружение для комфортной кастомной работы с нейросетями.
                </p>
              </div>
              <NeonButton variant="purple" className="w-full md:w-auto self-start mt-4">В Витрину</NeonButton>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Subscriptions Section */}
      <section id="subscriptions" className="w-full py-20 px-4 container mx-auto">
        <div className="flex flex-col mb-12 items-center text-center">
          <h2 className="text-3xl font-bold mb-2">Уровни <span className="text-purple">Подписки</span></h2>
          <div className="w-20 h-1 bg-purple rounded mb-4" />
          <p className="text-gray-400 max-w-xl">
            Доступ к закрытому сообществу, техническая поддержка и уникальные материалы.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Tier 1 */}
          <GlassCard className="flex flex-col border-t-2 border-t-purple/50 p-0 overflow-hidden">
            <div className="relative w-full h-48 sm:h-40">
              <Image src="/images/tvorets.webp" alt="Творец" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,0.95)] via-[rgba(26,26,26,0.2)] to-transparent" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-2 text-gray-200">Творец</h3>
              <div className="text-3xl font-bold text-white mb-6">600 ₽<span className="text-sm text-gray-500 font-normal"> / мес</span></div>
              <ul className="space-y-3 mb-8 text-sm text-gray-300 flex-1">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple shrink-0" /> <span>Доступ к базовым постам</span></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple shrink-0" /> <span>Поддержка проекта</span></li>
              </ul>
              <NeonButton variant="softgray" className="w-full mt-auto">Оформить</NeonButton>
            </div>
          </GlassCard>

          {/* Tier 2 */}
          <GlassCard className="flex flex-col border-t-2 border-t-purple p-0 overflow-hidden">
            <div className="relative w-full h-48 sm:h-40">
              <Image src="/images/novator.webp" alt="Новатор" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,0.95)] via-[rgba(26,26,26,0.2)] to-transparent" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-2 text-purple">Новатор</h3>
              <div className="text-3xl font-bold text-white mb-6">1,000 ₽<span className="text-sm text-gray-500 font-normal"> / мес</span></div>
              <ul className="space-y-3 mb-8 text-sm text-gray-300 flex-1">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple shrink-0" /> <span>Все бонусы уровня «Творец»</span></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple shrink-0" /> <span>Новые гайды и лайфхаки</span></li>
              </ul>
              <NeonButton variant="purple" className="w-full mt-auto">Оформить</NeonButton>
            </div>
          </GlassCard>

          {/* Tier 3 */}
          <GlassCard className="flex flex-col border-2 border-gold shadow-[0_0_30px_rgba(234,179,8,0.15)] relative p-0 overflow-hidden">
            <div className="relative w-full h-48 sm:h-40">
              <Image src="/images/architector.webp" alt="Архитектор" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,0.95)] via-[rgba(26,26,26,0.2)] to-transparent" />
              <div className="absolute top-0 right-0 bg-gold text-black text-xs font-bold px-3 py-1 rounded-bl-lg z-10">ПОПУЛЯРНЫЙ</div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-2 text-gold">Архитектор</h3>
              <div className="text-3xl font-bold text-white mb-6">3,000 ₽<span className="text-sm text-gray-500 font-normal"> / мес</span></div>
              <ul className="space-y-3 mb-8 text-sm text-gray-200 flex-1">
                <li className="flex items-center gap-2"><Gem className="w-4 h-4 text-gold shrink-0" /> <span>Ранний доступ к релизам</span></li>
                <li className="flex items-center gap-2"><Gem className="w-4 h-4 text-gold shrink-0" /> <span>Эксклюзивные воркфлоу</span></li>
                <li className="flex items-center gap-2"><Gem className="w-4 h-4 text-gold shrink-0" /> <span>Доступ в закрытый чат</span></li>
              </ul>
              <NeonButton variant="gold" className="w-full mt-auto text-black font-bold">Оформить</NeonButton>
            </div>
          </GlassCard>

          {/* Tier 4 - Demiurg (Legendary) */}
          <GlassCard className="flex flex-col border-2 border-[#ff6600] shadow-[0_0_30px_rgba(255,102,0,0.3)] relative p-0 overflow-hidden group-hover:shadow-[0_0_50px_rgba(255,102,0,0.4)] transition-all duration-500">
            <div className="relative w-full h-48 sm:h-40">
              <Image src="/images/demiurg.webp" alt="Демиург" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,0.95)] via-[rgba(26,26,26,0.2)] to-transparent" />
              <div className="absolute top-0 right-0 bg-[#ff6600] text-white text-[10px] font-black px-4 py-1 rounded-bl-lg z-10 shadow-[0_0_15px_rgba(255,102,0,0.6)] tracking-widest">ТОП</div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-2 text-white drop-shadow-[0_0_5px_rgba(255,102,0,0.5)]">Демиург</h3>
              <div className="text-3xl font-bold text-white mb-6">11,500 ₽<span className="text-sm text-gray-500 font-normal"> / мес</span></div>
              <ul className="space-y-3 mb-8 text-sm text-gray-300 flex-1">
                <li className="flex items-center gap-2"><Crown className="w-4 h-4 text-[#ff6600] drop-shadow-[0_0_3px_rgba(255,102,0,0.8)] shrink-0" /> <span>VIP Техподдержка 24/7</span></li>
                <li className="flex items-center gap-2"><Crown className="w-4 h-4 text-[#ff6600] drop-shadow-[0_0_3px_rgba(255,102,0,0.8)] shrink-0" /> <span>Разработка workflow под заказ (1/мес)</span></li>
                <li className="flex items-center gap-2"><Crown className="w-4 h-4 text-[#ff6600] drop-shadow-[0_0_3px_rgba(255,102,0,0.8)] shrink-0" /> <span>Собственные ноды</span></li>
              </ul>
              <NeonButton variant="purple" className="w-full mt-auto shadow-[0_0_15px_rgba(138,43,226,0.4)]">Оформить</NeonButton>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}

// Temporary inline Crown icon since we didn't import it at the top to avoid errors on missing lucide icons
function Crown(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87l6.516 2.812a.5.5 0 0 1 .11 1.042l-5.126 1.135-.85 5.56a.5.5 0 0 1-.493.41H8.455a.5.5 0 0 1-.493-.41l-.85-5.56-5.126-1.135a.5.5 0 0 1 .11-1.043l6.516-2.811 2.952-5.604z" />
    </svg>
  );
}
