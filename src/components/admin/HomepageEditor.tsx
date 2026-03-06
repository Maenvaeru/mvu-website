"use client";

import { useState, useEffect } from "react";
import {
    Sparkles,
    Zap,
    DollarSign,
    Layers,
    Plus,
    Trash2,
    ChevronUp,
    ChevronDown,
    Type,
    Newspaper,
    Image as ImageIcon,
    Upload,
    Check
} from "lucide-react";
import { cn, getAssetPath } from "@/lib/utils";

const BLOCK_TYPES = [
    { type: 'hero', label: 'Герой (Hero)', icon: Layers },
    { type: 'services', label: 'Услуги', icon: Sparkles },
    { type: 'news', label: 'Новости', icon: Newspaper },
    { type: 'workflows', label: 'Воркфлоу', icon: Zap },
    { type: 'subscriptions', label: 'Подписки', icon: DollarSign },
];

export function HomepageEditor({ data, updateField }: { data: any, updateField: (f: string, v: any) => void }) {
    const [activeLang, setActiveLang] = useState<"ru" | "en">("ru");
    const [images, setImages] = useState<string[]>([]);
    const [isRefreshingImages, setIsRefreshingImages] = useState(false);

    useEffect(() => {
        refreshImages();
    }, []);

    const refreshImages = async () => {
        setIsRefreshingImages(true);
        try {
            const res = await fetch('/api/admin/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'list_images' })
            });
            const data = await res.json();
            if (Array.isArray(data)) setImages(data);
        } catch (e) {
            console.error("Failed to fetch images", e);
        } finally {
            setIsRefreshingImages(false);
        }
    };

    let blocks = [];
    try {
        if (data.blocksData) {
            blocks = JSON.parse(data.blocksData);
        }
    } catch (e) {
        console.error("Failed to parse blocks", e);
    }

    // Default if empty
    if (blocks.length === 0) {
        blocks = [
            { id: 'b1', type: 'hero', data: {} },
            { id: 'b2', type: 'services', data: {} },
            { id: 'b3', type: 'news', data: {} },
            { id: 'b4', type: 'workflows', data: {} },
            { id: 'b5', type: 'subscriptions', data: {} }
        ];
    }

    const saveBlocks = (newBlocks: any[]) => {
        updateField('blocksData', JSON.stringify(newBlocks));
    };

    const addBlock = (type: string) => {
        const newBlock = {
            id: 'b' + Date.now(),
            type,
            data: {}
        };
        saveBlocks([...blocks, newBlock]);
    };

    const removeBlock = (id: string) => {
        saveBlocks(blocks.filter((b: any) => b.id !== id));
    };

    const moveBlock = (index: number, direction: 'up' | 'down') => {
        const newBlocks = [...blocks];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex >= 0 && targetIndex < newBlocks.length) {
            [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
            saveBlocks(newBlocks);
        }
    };

    const updateBlockData = (id: string, field: string, value: any) => {
        const newBlocks = blocks.map((b: any) => {
            if (b.id === id) {
                return { ...b, data: { ...b.data, [field]: value } };
            }
            return b;
        });
        saveBlocks(newBlocks);
    };

    const LangSwitcher = () => (
        <div className="flex gap-2 mb-6 bg-black/40 p-1 rounded-lg w-fit border border-glass-border">
            <button
                type="button"
                onClick={() => setActiveLang("ru")}
                className={cn(
                    "px-4 py-1.5 rounded-md text-xs font-bold transition-all",
                    activeLang === "ru" ? "bg-purple text-white shadow-lg" : "text-muted hover:text-white"
                )}
            >
                RU
            </button>
            <button
                type="button"
                onClick={() => setActiveLang("en")}
                className={cn(
                    "px-4 py-1.5 rounded-md text-xs font-bold transition-all",
                    activeLang === "en" ? "bg-purple text-white shadow-lg" : "text-muted hover:text-white"
                )}
            >
                EN
            </button>
        </div>
    );

    return (
        <div className="space-y-8 pb-20">
            <LangSwitcher />

            <div className="space-y-6">
                {blocks.map((block: any, index: number) => (
                    <div key={block.id} className="relative group/block bg-black/30 border border-glass-border rounded-xl overflow-hidden">
                        {/* Block Header */}
                        <div className="bg-white/5 px-6 py-3 flex items-center justify-between border-b border-glass-border">
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded bg-purple/20 text-purple">
                                    {BLOCK_TYPES.find(t => t.type === block.type)?.icon &&
                                        (() => {
                                            const Icon = BLOCK_TYPES.find(t => t.type === block.type)!.icon;
                                            return <Icon size={16} />;
                                        })()
                                    }
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-white">
                                    {BLOCK_TYPES.find(t => t.type === block.type)?.label || block.type}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover/block:opacity-100 transition-opacity">
                                <button type="button" onClick={() => moveBlock(index, 'up')} className="p-1.5 text-muted hover:text-white"><ChevronUp size={16} /></button>
                                <button type="button" onClick={() => moveBlock(index, 'down')} className="p-1.5 text-muted hover:text-white"><ChevronDown size={16} /></button>
                                <button type="button" onClick={() => removeBlock(block.id)} className="p-1.5 text-muted hover:text-red-400"><Trash2 size={16} /></button>
                            </div>
                        </div>

                        {/* Block Content */}
                        <div className="p-6 space-y-4">
                            {renderBlockEditor(block, activeLang, updateBlockData, images, refreshImages)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Block */}
            <div className="pt-8 border-t border-glass-border">
                <h4 className="text-xs font-bold text-muted uppercase tracking-widest mb-4">Добавить блок</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {BLOCK_TYPES.map(bt => (
                        <button
                            key={bt.type}
                            type="button"
                            onClick={() => addBlock(bt.type)}
                            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-glass-border bg-black/20 hover:bg-purple/10 hover:border-purple/30 transition-all group"
                        >
                            <bt.icon size={20} className="text-muted group-hover:text-purple" />
                            <span className="text-[10px] font-bold uppercase">{bt.label.split(' ')[0]}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function renderBlockEditor(block: any, lang: "ru" | "en", update: (id: string, f: string, v: any) => void, images: string[], onUpload: () => void) {
    const isRu = lang === "ru";

    switch (block.type) {
        case 'hero':
            return (
                <div className="grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-2 gap-4">
                        <ImageField label="Фон (Cover)" value={block.data?.coverImg} onChange={(v) => update(block.id, 'coverImg', v)} images={images} onUpload={onUpload} />
                        <ImageField label="Аватар" value={block.data?.avatarImg} onChange={(v) => update(block.id, 'avatarImg', v)} images={images} onUpload={onUpload} />
                    </div>
                    <Field
                        label="Заголовок (HTML)"
                        value={block.data?.title}
                        onChange={(v) => update(block.id, 'title', v)}
                        multiLine
                    />
                    <Field
                        label={`Подзаголовок (${lang.toUpperCase()})`}
                        value={isRu ? block.data?.subtitleRu : block.data?.subtitleEn}
                        onChange={(v) => update(block.id, isRu ? 'subtitleRu' : 'subtitleEn', v)}
                        multiLine
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Field
                            label={`Кнопка 1 (${lang.toUpperCase()})`}
                            value={isRu ? block.data?.btnShowcaseRu : block.data?.btnShowcaseEn}
                            onChange={(v) => update(block.id, isRu ? 'btnShowcaseRu' : 'btnShowcaseEn', v)}
                        />
                        <Field
                            label={`Кнопка 2 (${lang.toUpperCase()})`}
                            value={isRu ? block.data?.btnSubscribeRu : block.data?.btnSubscribeEn}
                            onChange={(v) => update(block.id, isRu ? 'btnSubscribeRu' : 'btnSubscribeEn', v)}
                        />
                    </div>
                </div>
            );
        case 'services':
            return (
                <div className="space-y-6">
                    <Field
                        label={`Заголовок секции (${lang.toUpperCase()})`}
                        value={isRu ? block.data?.titleRu : block.data?.titleEn}
                        onChange={(v) => update(block.id, isRu ? 'titleRu' : 'titleEn', v)}
                    />
                    {[1, 2, 3].map(n => (
                        <div key={n} className="p-4 bg-black/20 border border-white/5 rounded-lg space-y-3">
                            <p className="text-[10px] font-bold text-muted">УСЛУГА {n}</p>
                            {n === 2 && <ImageField label="Картинка услуги" value={block.data?.s2Img} onChange={(v) => update(block.id, 's2Img', v)} images={images} onUpload={onUpload} />}
                            <Field
                                label="Название"
                                value={isRu ? block.data?.[`s${n}TitleRu`] : block.data?.[`s${n}TitleEn`]}
                                onChange={(v) => update(block.id, isRu ? `s${n}TitleRu` : `s${n}TitleEn`, v)}
                            />
                            <Field
                                label="Описание"
                                value={isRu ? block.data?.[`s${n}DescRu`] : block.data?.[`s${n}DescEn`]}
                                onChange={(v) => update(block.id, isRu ? `s${n}DescRu` : `s${n}DescEn`, v)}
                                multiLine
                            />
                            <Field
                                label={n === 3 ? "Статус" : "Цена"}
                                value={isRu ? (n === 3 ? block.data?.s3StatusRu : block.data?.[`s${n}PriceRu`]) : (n === 3 ? block.data?.s3StatusEn : block.data?.[`s${n}PriceEn`])}
                                onChange={(v) => update(block.id, isRu ? (n === 3 ? 's3StatusRu' : `s${n}PriceRu`) : (n === 3 ? 's3StatusEn' : `s${n}PriceEn`), v)}
                            />
                        </div>
                    ))}
                </div>
            );
        case 'news':
            return (
                <p className="text-xs text-muted italic">Блок новостей отображает последние записи из коллекции "Новости". Настройки не требуются.</p>
            );
        case 'workflows':
            return (
                <div className="space-y-6">
                    <Field
                        label={`Заголовок (${lang.toUpperCase()})`}
                        value={isRu ? block.data?.titleRu : block.data?.titleEn}
                        onChange={(v) => update(block.id, isRu ? 'titleRu' : 'titleEn', v)}
                    />
                    <Field
                        label={`Описание (${lang.toUpperCase()})`}
                        value={isRu ? block.data?.descRu : block.data?.descEn}
                        onChange={(v) => update(block.id, isRu ? 'descRu' : 'descEn', v)}
                        multiLine
                    />
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map(n => (
                            <div key={n} className="p-3 bg-black/20 border border-white/5 rounded-lg space-y-2">
                                <p className="text-[10px] font-bold text-muted">ВОРКФЛОУ {n}</p>
                                <ImageField label="Превью" value={block.data?.[`w${n}Img`]} onChange={(v) => update(block.id, `w${n}Img`, v)} images={images} onUpload={onUpload} />
                                <div className="grid grid-cols-2 gap-2">
                                    <Field label="Имя" value={block.data?.[`w${n}Name`]} onChange={(v) => update(block.id, `w${n}Name`, v)} />
                                    <Field label="Тег" value={isRu ? block.data?.[`w${n}TagRu`] : block.data?.[`w${n}TagEn`]} onChange={(v) => update(block.id, isRu ? `w${n}TagRu` : `w${n}TagEn`, v)} />
                                </div>
                                <Field label="Описание" value={isRu ? block.data?.[`w${n}DescRu`] : block.data?.[`w${n}DescEn`]} onChange={(v) => update(block.id, isRu ? `w${n}DescRu` : `w${n}DescEn`, v)} multiLine />
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'subscriptions':
            return (
                <div className="space-y-6">
                    <Field
                        label={`Заголовок секции (${lang.toUpperCase()})`}
                        value={isRu ? block.data?.titleRu : block.data?.titleEn}
                        onChange={(v) => update(block.id, isRu ? 'titleRu' : 'titleEn', v)}
                    />
                    <Field
                        label={`Описание (${lang.toUpperCase()})`}
                        value={isRu ? block.data?.descRu : block.data?.descEn}
                        onChange={(v) => update(block.id, isRu ? 'descRu' : 'descEn', v)}
                        multiLine
                    />
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map(n => (
                            <div key={n} className="p-3 bg-black/20 border border-white/5 rounded-lg space-y-2">
                                <p className="text-[10px] font-bold text-muted">ТИР {n}</p>
                                <ImageField label="Картинка тира" value={block.data?.[`t${n}Img`]} onChange={(v) => update(block.id, `t${n}Img`, v)} images={images} onUpload={onUpload} />
                                <Field
                                    label="Имя"
                                    value={isRu ? block.data?.[`t${n}NameRu`] : block.data?.[`t${n}NameEn`]}
                                    onChange={(v) => update(block.id, isRu ? `t${n}NameRu` : `t${n}NameEn`, v)}
                                />
                                <Field
                                    label="Цена"
                                    value={isRu ? block.data?.[`t${n}PriceRu`] : block.data?.[`t${n}PriceEn`]}
                                    onChange={(v) => update(block.id, isRu ? `t${n}PriceRu` : `t${n}PriceEn`, v)}
                                />
                                <Field
                                    label="Возможности (по одной на строке)"
                                    value={isRu ? block.data?.[`t${n}FeaturesRu`] : block.data?.[`t${n}FeaturesEn`]}
                                    onChange={(v) => update(block.id, isRu ? `t${n}FeaturesRu` : `t${n}FeaturesEn`, v)}
                                    multiLine
                                />
                            </div>
                        ))}
                    </div>
                </div>
            );
        default:
            return null;
    }
}

function ImageField({ label, value, onChange, images, onUpload }: { label: string, value: string, onChange: (v: string) => void, images: string[], onUpload: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const reader = new FileReader();
        reader.onloadend = async () => {
            try {
                const res = await fetch('/api/admin/content', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'upload_image',
                        fileName: file.name,
                        base64: reader.result
                    })
                });
                const data = await res.json();
                if (data.url) {
                    onChange(data.url);
                    onUpload();
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsUploading(false);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex flex-col gap-2 relative z-30 pointer-events-auto">
            <label className="text-[10px] font-bold text-muted uppercase tracking-wider">{label}</label>
            <div className="flex gap-2">
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex-1 bg-black/60 border border-glass-border rounded-lg p-2 flex items-center gap-3 cursor-pointer hover:border-purple/30 transition-all overflow-hidden"
                >
                    <div className="w-10 h-10 rounded bg-[#1a1a1a] flex-shrink-0 flex items-center justify-center border border-white/5 overflow-hidden">
                        {value ? <img src={getAssetPath(value)} alt="Preview" className="w-full h-full object-cover" /> : <ImageIcon size={16} className="text-muted" />}
                    </div>
                    <span className="text-xs text-muted truncate flex-1">{value ? value.split('/').pop() : 'Выбрать...'}</span>
                </div>

                <label className="w-10 h-10 flex-shrink-0 bg-purple/10 border border-purple/30 rounded-lg flex items-center justify-center cursor-pointer hover:bg-purple/20 transition-all">
                    {isUploading ? <div className="w-4 h-4 border-2 border-purple border-t-transparent rounded-full animate-spin" /> : <Upload size={16} className="text-purple" />}
                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                </label>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-[#111] border border-glass-border rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                    <div className="grid grid-cols-4 gap-2">
                        {images.map(img => (
                            <div
                                key={img}
                                onClick={() => { onChange(img); setIsOpen(false); }}
                                className={cn(
                                    "aspect-square rounded-lg border-2 cursor-pointer transition-all overflow-hidden relative group",
                                    value === img ? "border-purple shadow-[0_0_10px_rgba(138,43,226,0.3)]" : "border-transparent hover:border-white/20"
                                )}
                            >
                                <img src={getAssetPath(img)} alt="" className="w-full h-full object-cover" />
                                {value === img && <div className="absolute inset-0 bg-purple/20 flex items-center justify-center"><Check size={20} className="text-white drop-shadow-md" /></div>}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[8px] text-white font-bold p-1 text-center transition-opacity break-all">
                                    {img.split('/').pop()}
                                </div>
                            </div>
                        ))}
                    </div>
                    {images.length === 0 && <p className="text-center py-4 text-xs text-muted">Изображений пока нет</p>}
                </div>
            )}
        </div>
    );
}

function Field({ label, value, onChange, multiLine }: { label: string, value: string, onChange: (v: string) => void, multiLine?: boolean }) {
    return (
        <div className="flex flex-col gap-2 group/field relative z-20 pointer-events-auto">
            <label className="text-[10px] font-bold text-muted uppercase tracking-wider group-focus-within/field:text-purple transition-colors">
                {label}
            </label>
            {multiLine ? (
                <textarea
                    className="w-full h-24 bg-black/60 border border-glass-border rounded-lg p-3 text-sm text-white focus:border-purple/50 focus:outline-none transition-all resize-none font-medium"
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <input
                    type="text"
                    className="w-full bg-black/60 border border-glass-border rounded-lg p-3 text-sm text-white focus:border-purple/50 focus:outline-none transition-all font-medium"
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
        </div>
    );
}
