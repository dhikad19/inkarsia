"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageCircle } from "lucide-react";
import { getBotReply } from "@/lib/chatResponse";

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Halo! Ada yang bisa saya bantu? 😊" },
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const suggestions = ["Halo", "Ceritakan lelucon", "Siapa namamu?"];

  const handleSend = (text?: string) => {
    const userInput = text || input.trim();
    if (!userInput) return;

    const newMessages = [...messages, { role: "user", text: userInput }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      const reply = getBotReply(userInput);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    }, 500);
  };

  return (
    <>
      {/* 🔵 Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className="rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </div>

      {/* 💬 Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80"
          >
            <Card className="shadow-2xl rounded-2xl border border-gray-200">
              <CardContent className="p-3 flex flex-col h-[400px]">
                {/* 🧾 Daftar chat */}
                <ScrollArea className="flex-1 pr-2">
                  <div className="space-y-3">
                    {messages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`rounded-2xl px-3 py-2 max-w-[80%] text-sm ${
                            msg.role === "user"
                              ? "bg-blue-600 text-white rounded-br-none"
                              : "bg-gray-100 text-gray-800 rounded-bl-none"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {/* ⬇️ Auto-scroll target */}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* 💡 Suggestion buttons */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {suggestions.map((s, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleSend(s)}
                    >
                      {s}
                    </Button>
                  ))}
                </div>

                {/* ⌨️ Input area */}
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Ketik pesan..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                  <Button
                    size="icon"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleSend()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
