"use client";

import { useState, useEffect } from "react";
import {
    Home,
    Newspaper,
    ShieldCheck,
    Save,
    LayoutDashboard,
    ExternalLink,
    ChevronRight,
    Plus,
    Trash2,
    Check
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { cn } from "@/lib/utils";
import { HomepageEditor } from "@/components/admin/HomepageEditor";
import { MarkdownToolbar } from "@/components/admin/MarkdownToolbar";

type Collection = "homepage" | "posts" | "pages" | "legal";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<Collection>("homepage");
    const [items, setItems] = useState<any[]>([]);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchItems();
    }, [activeTab]);

    const fetchItems = async () => {
        setLoading(true);
        try {
            if (activeTab === "homepage") {
                const res = await fetch(`/api/admin/content`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action: 'read', collection: 'homepage', slug: 'home' })
                });
                const data = await res.json();
                setEditingItem(data);
                setItems([]);
            } else {
                const res = await fetch(`/api/admin/content`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action: 'read', collection: activeTab })
                });
                const data = await res.json();
                setItems(data);
                setEditingItem(null);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (slug: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/content`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: 'read', collection: activeTab, slug })
            });
            const data = await res.json();
            setEditingItem({ ...data, slug });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/admin/content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: 'save',
                    collection: activeTab,
                    slug: editingItem.slug || "home",
                    ...editingItem
                }),
            });
            if (res.ok) {
                setLastSaved(new Date());
                setTimeout(() => setLastSaved(null), 3000);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    const updateField = (field: string, value: any) => {
        setEditingItem((prev: any) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-glass-border bg-[#111] flex flex-col pt-8">
                <div className="px-6 mb-10 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple to-cyan flex items-center justify-center font-bold text-black shadow-[0_0_15px_rgba(138,43,226,0.3)]">
                        M
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-white">MVU CMS</h1>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <SidebarItem
                        icon={<Home size={18} />}
                        label="Главная"
                        active={activeTab === "homepage"}
                        onClick={() => setActiveTab("homepage")}
                    />
                    <SidebarItem
                        icon={<Newspaper size={18} />}
                        label="Новости"
                        active={activeTab === "posts"}
                        onClick={() => setActiveTab("posts")}
                    />
                    <SidebarItem
                        icon={<ShieldCheck size={18} />}
                        label="Юридическая"
                        active={activeTab === "legal"}
                        onClick={() => setActiveTab("legal")}
                    />
                </nav>

                <div className="p-4 border-t border-glass-border">
                    <a href="/" target="_blank" className="flex items-center gap-2 text-xs text-muted hover:text-cyan transition-colors px-4 py-2">
                        <ExternalLink size={14} />
                        Вернуться на сайт
                    </a>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(138,43,226,0.05),transparent_40%)]">
                {/* Header */}
                <header className="h-16 border-b border-glass-border flex items-center justify-between px-8 bg-[#0d0d0d]">
                    <div className="flex items-center gap-2 text-sm text-muted">
                        <LayoutDashboard size={14} />
                        <ChevronRight size={14} />
                        <span className="text-white font-bold tracking-tight">
                            {activeTab === "homepage" ? "Главная страница" : activeTab === "posts" ? "Новости" : activeTab === "legal" ? "Юридическая информация" : "Прочее"}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        {lastSaved && (
                            <span className="text-xs text-green-400 flex items-center gap-1 animate-in fade-in slide-in-from-right-2">
                                <Check size={14} /> Сохранено
                            </span>
                        )}
                        <NeonButton
                            variant="purple"
                            className="h-9 px-6 text-sm flex items-center gap-2"
                            onClick={handleSave}
                            disabled={isSaving || !editingItem}
                        >
                            <Save size={16} />
                            {isSaving ? "Сохранение..." : "Сохранить"}
                        </NeonButton>
                    </div>
                </header>

                {/* Workspace */}
                <div className="flex-1 overflow-y-auto p-8">
                    {loading ? (
                        <div className="flex items-center justify-center h-64 text-muted animate-pulse">
                            Загрузка данных...
                        </div>
                    ) : editingItem ? (
                        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <GlassCard className="p-8 border-glass-border" hoverEffect={false}>
                                <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                                    {activeTab === "homepage" ? "Редактирование сайта" : `Контент: ${editingItem.title || "Без названия"}`}
                                </h2>

                                <div className="space-y-6">
                                    {activeTab === "homepage" ? (
                                        <HomepageEditor data={editingItem} updateField={updateField} />
                                    ) : (
                                        <div className="space-y-6">
                                            <Field label="Заголовок" value={editingItem.title} onChange={(v) => updateField('title', v)} />
                                            <Field label="Slug (URL)" value={editingItem.slug} onChange={(v) => updateField('slug', v)} />
                                            <Field label="Описание (SEO)" value={editingItem.description} onChange={(v) => updateField('description', v)} multiLine />
                                            <div className="flex flex-col">
                                                <label className="text-[10px] font-bold text-muted uppercase tracking-wider mb-2">Основной текст (Markdown)</label>
                                                <MarkdownToolbar textareaId="markdown-editor" onUpdate={(v) => updateField('content', v)} />
                                                <textarea
                                                    id="markdown-editor"
                                                    className="w-full h-96 bg-black/60 border border-t-0 border-glass-border rounded-b-lg p-4 font-mono text-sm text-white focus:border-purple/50 focus:outline-none transition-colors relative z-20 pointer-events-auto"
                                                    value={editingItem.content || ''}
                                                    onChange={(e) => updateField('content', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </GlassCard>
                        </div>
                    ) : (
                        <div className="max-w-4xl mx-auto space-y-4">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white">Список записей</h2>
                                <NeonButton variant="purple" className="h-9 px-4 text-xs flex items-center gap-2" onClick={() => setEditingItem({ title: "Новая запись", content: "", status: "draft", slug: "new-post-" + Date.now() })}>
                                    <Plus size={14} />
                                    Создать
                                </NeonButton>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {items.length > 0 ? items.map((item) => (
                                    <GlassCard
                                        key={item.slug}
                                        className="p-4 flex items-center justify-between group hover:border-purple/30 transition-all cursor-pointer"
                                        onClick={() => handleEdit(item.slug)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded bg-[#1a1a1a] flex items-center justify-center text-muted">
                                                <Newspaper size={18} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">{item.title}</h4>
                                                <p className="text-xs text-muted">{item.slug}.md</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={cn(
                                                "text-[10px] uppercase font-bold px-2 py-0.5 rounded",
                                                item.status === "published" ? "bg-green-500/10 text-green-400" : "bg-gold/10 text-gold"
                                            )}>
                                                {item.status}
                                            </span>
                                            <ChevronRight size={16} className="text-muted group-hover:text-purple group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </GlassCard>
                                )) : (
                                    <div className="text-center py-20 text-muted border-2 border-dashed border-glass-border rounded-xl">
                                        Записей не найдено. Нажмите "Создать", чтобы начать.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

function SidebarItem({ icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group",
                active
                    ? "bg-purple font-bold text-white shadow-[0_4px_15px_rgba(138,43,226,0.4)]"
                    : "text-muted hover:text-white hover:bg-white/5"
            )}
        >
            <span className={cn("transition-colors", active ? "text-white" : "text-purple group-hover:text-purple")}>
                {icon}
            </span>
            <span className="text-sm">{label}</span>
            {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
        </button>
    );
}

function Field({ label, value, onChange, multiLine }: { label: string, value: string, onChange: (v: string) => void, multiLine?: boolean }) {
    return (
        <div className="flex flex-col gap-2 group/field">
            <label className="text-[10px] font-bold text-muted uppercase tracking-wider group-focus-within/field:text-purple transition-colors">
                {label}
            </label>
            {multiLine ? (
                <textarea
                    className="w-full h-24 bg-black/40 border border-glass-border rounded-lg p-3 text-sm text-white focus:border-purple/50 focus:outline-none transition-all resize-none relative z-20 pointer-events-auto"
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <input
                    type="text"
                    className="w-full bg-black/40 border border-glass-border rounded-lg p-3 text-sm text-white focus:border-purple/50 focus:outline-none transition-all relative z-20 pointer-events-auto"
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
        </div>
    );
}
