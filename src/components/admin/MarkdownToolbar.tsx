"use client";

import { Bold, Italic, Heading1, Heading2, List, ListOrdered, Link, Quote, Code } from "lucide-react";

interface MarkdownToolbarProps {
    textareaId: string;
    onUpdate: (value: string) => void;
}

export function MarkdownToolbar({ textareaId, onUpdate }: MarkdownToolbarProps) {
    const insertStyle = (before: string, after: string = "", placeholder: string = "текст") => {
        const textarea = document.getElementById(textareaId) as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selectedText = text.substring(start, end) || placeholder;

        const beforeText = text.substring(0, start);
        const afterText = text.substring(end);

        const newText = beforeText + before + selectedText + after + afterText;
        onUpdate(newText);

        // Reset focus and selection
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
                start + before.length,
                start + before.length + selectedText.length
            );
        }, 0);
    };

    const Button = ({ icon: Icon, onClick, title }: any) => (
        <button
            type="button"
            onClick={onClick}
            title={title}
            className="p-1.5 hover:bg-white/10 rounded transition-colors text-muted hover:text-white"
        >
            <Icon size={16} />
        </button>
    );

    return (
        <div className="flex items-center gap-1 p-1 bg-black/40 border border-glass-border rounded-t-lg">
            <Button icon={Heading1} onClick={() => insertStyle("# ", "", "Заголовок 1")} title="Заголовок 1" />
            <Button icon={Heading2} onClick={() => insertStyle("## ", "", "Заголовок 2")} title="Заголовок 2" />
            <div className="w-px h-4 bg-white/10 mx-1" />
            <Button icon={Bold} onClick={() => insertStyle("**", "**")} title="Жирный" />
            <Button icon={Italic} onClick={() => insertStyle("_", "_")} title="Курсив" />
            <div className="w-px h-4 bg-white/10 mx-1" />
            <Button icon={List} onClick={() => insertStyle("- ", "", "пункт")} title="Список" />
            <Button icon={ListOrdered} onClick={() => insertStyle("1. ", "", "пункт")} title="Нумерованный список" />
            <div className="w-px h-4 bg-white/10 mx-1" />
            <Button icon={Quote} onClick={() => insertStyle("> ", "", "цитата")} title="Цитата" />
            <Button icon={Code} onClick={() => insertStyle("`", "`")} title="Код" />
            <Button icon={Link} onClick={() => insertStyle("[", "](url)")} title="Ссылка" />
        </div>
    );
}
