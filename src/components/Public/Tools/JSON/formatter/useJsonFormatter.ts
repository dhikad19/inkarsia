import { useEffect, useState } from "react";

export function useJsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  const formatInternal = (value: string) => {
    if (!value.trim()) {
      setOutput("");
      setError(null);
      setIsLive(false); // ⛔ stop live kalau kosong
      return;
    }

    try {
      const parsed = JSON.parse(value);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  // 🔘 Dipanggil dari tombol Format
  const format = () => {
    formatInternal(input);
    setIsLive(true); // ✅ AKTIFKAN LIVE SEKALI SAJA
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setInput(minified);
      setOutput(minified);
      setError(null);
      setIsLive(true);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setIsLive(false);
  };

  // ⚡ AUTO FORMAT SETELAH FORMAT PERTAMA
  useEffect(() => {
    if (!isLive) return;

    const t = setTimeout(() => {
      formatInternal(input);
    }, 300); // debounce

    return () => clearTimeout(t);
  }, [input, isLive]);

  return {
    input,
    setInput,
    output,
    setOutput,
    error,
    format,
    minify,
    clear,
    stats: {
      chars: input.length,
      lines: input ? input.split("\n").length : 0,
      valid: !error && !!output,
    },
  };
}
