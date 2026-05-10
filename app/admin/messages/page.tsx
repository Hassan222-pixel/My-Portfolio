"use client";

import { useEffect, useState } from "react";
import { Trash2, Loader2, Mail, MailOpen, Calendar, X } from "lucide-react";

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages", { cache: "no-store" });
      const data = await res.json();
      if (data.success) setMessages(data.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const openMessage = async (msg: Message) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      // Mark as read in UI instantly
      setMessages(
        messages.map((m) => (m._id === msg._id ? { ...m, isRead: true } : m)),
      );
      // Update Database
      await fetch(`/api/messages/${msg._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });
    }
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Prevent opening the modal if clicking delete
    if (!confirm("Permanently delete this message?")) return;

    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    setMessages(messages.filter((m) => m._id !== id));
    if (selectedMessage?._id === id) setSelectedMessage(null);
  };

  if (isLoading)
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="w-full max-w-[1200px] pb-16">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md pb-4 pt-4 border-b border-border flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-textMain tracking-tight">
            Inbox
          </h1>
          <p className="text-sm text-textDim mt-1">
            You have {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}.
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-12 text-center text-textDim">
            Your inbox is empty.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {messages.map((msg) => (
              <div
                key={msg._id}
                onClick={() => openMessage(msg)}
                className={`p-5 flex items-center justify-between cursor-pointer transition-colors hover:bg-background/50 group ${!msg.isRead ? "bg-primary/5" : ""}`}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {msg.isRead ? (
                    <MailOpen size={20} className="text-textDim shrink-0" />
                  ) : (
                    <Mail
                      size={20}
                      className="text-primary shrink-0 fill-primary/20"
                    />
                  )}
                  <div className="truncate pr-4">
                    <p
                      className={`text-sm truncate ${!msg.isRead ? "font-bold text-textMain" : "font-medium text-textMain"}`}
                    >
                      {msg.name}{" "}
                      <span className="text-textDim font-normal ml-2">
                        ({msg.email})
                      </span>
                    </p>
                    <p
                      className={`text-sm truncate mt-0.5 ${!msg.isRead ? "text-textMain font-semibold" : "text-textDim"}`}
                    >
                      {msg.subject}{" "}
                      <span className="text-textDim font-normal mx-2">-</span>
                      <span className="text-textDim font-normal">
                        {msg.message.substring(0, 50)}...
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs text-textDim flex items-center gap-1">
                    <Calendar size={12} />{" "}
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={(e) => handleDelete(msg._id, e)}
                    className="p-2 text-textDim hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Reading Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-border flex items-center justify-between bg-background/50">
              <h3 className="font-bold text-textMain">Message Details</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDelete(selectedMessage._id)}
                  className="p-2 text-textDim hover:text-danger rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 text-textDim hover:text-textMain rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <div className="mb-6 pb-6 border-b border-border">
                <h2 className="text-2xl font-bold text-textMain mb-2">
                  {selectedMessage.subject}
                </h2>
                <p className="text-sm text-textDim flex items-center gap-2">
                  From:{" "}
                  <strong className="text-textMain">
                    {selectedMessage.name}
                  </strong>{" "}
                  ({selectedMessage.email})
                </p>
                <p className="text-xs text-textDim mt-1">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="text-textMain leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
              <div className="mt-8 pt-6 border-t border-border">
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-md"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
