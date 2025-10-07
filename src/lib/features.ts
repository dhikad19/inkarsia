// lib/features.ts
export type Feature = {
  name: string;
  category: string;
  supported: boolean;
  note?: string;
};

function isClient() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

const trySyntax = (code: string) => {
  try {
    // new Function will throw if the syntax is not supported
    new Function(code);
    return true;
  } catch {
    return false;
  }
};

const supportsCSSProp = (propOrCondition: string, value?: string) => {
  try {
    if (typeof CSS === "undefined" || typeof CSS.supports !== "function")
      return false;
    // If only one argument, treat it as condition text
    if (typeof value === "undefined") return CSS.supports(propOrCondition);
    return CSS.supports(propOrCondition, value);
  } catch {
    return false;
  }
};

const supportsSelector = (sel: string) => {
  try {
    // If browser doesn't understand selector, querySelector will throw
    document.querySelector(sel);
    return true;
  } catch {
    return false;
  }
};

const supportsWebGL2 = () => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext && c.getContext("webgl2"));
  } catch {
    return false;
  }
};

export function detectFeatures(): Feature[] {
  if (!isClient()) return [];

  const nav: any = window.navigator || {};
  const features: Feature[] = [
    // CSS Layout
    {
      name: "CSS Grid",
      category: "CSS Layout",
      supported: supportsCSSProp("display", "grid"),
    },
    {
      name: "CSS Flexbox",
      category: "CSS Layout",
      supported: supportsCSSProp("display", "flex"),
    },
    {
      name: "Subgrid",
      category: "CSS Layout",
      supported: supportsCSSProp("grid-template-columns", "subgrid"),
    },
    {
      name: "Container Queries",
      category: "CSS Layout",
      supported: supportsCSSProp("container-type", "size"),
    },
    {
      name: "aspect-ratio",
      category: "CSS Layout",
      supported: supportsCSSProp("aspect-ratio", "1/1"),
    },

    // CSS Selectors & Functions
    {
      name: ":has() selector",
      category: "CSS Features",
      supported: supportsSelector(":has(*)"),
    },
    {
      name: ":is() / :where()",
      category: "CSS Features",
      supported: supportsSelector(":is(*)"),
    },
    {
      name: "CSS variables (custom properties)",
      category: "CSS Features",
      supported: supportsCSSProp("--x", "0"),
    },
    {
      name: "calc()",
      category: "CSS Features",
      supported: supportsCSSProp("width", "calc(100% - 10px)"),
    },
    {
      name: "clamp()",
      category: "CSS Features",
      supported: supportsCSSProp("width", "clamp(10px, 5vw, 100px)"),
    },
    {
      name: "min()/max()",
      category: "CSS Features",
      supported: supportsCSSProp("width", "min(10px, 5vw)"),
    },
    {
      name: "color-mix()",
      category: "CSS Features",
      supported: supportsCSSProp("color-mix(in srgb, red 50%, blue 50%)"),
    },
    {
      name: "backdrop-filter",
      category: "CSS Features",
      supported: supportsCSSProp("backdrop-filter", "blur(1px)"),
    },

    // CSS Animations / Transitions / View APIs
    {
      name: "CSS Animations",
      category: "CSS Animations",
      supported: supportsCSSProp("animation-name", "none"),
    },
    {
      name: "CSS Transitions",
      category: "CSS Animations",
      supported: supportsCSSProp("transition", "all 0.2s"),
    },
    {
      name: "view transitions (startViewTransition)",
      category: "CSS Animations",
      supported: typeof (document as any).startViewTransition === "function",
    },

    // Scroll / Timeline / Motion
    {
      name: "scroll-behavior",
      category: "CSS Animations",
      supported: supportsCSSProp("scroll-behavior", "smooth"),
    },
    {
      name: "Scroll Timeline (Scroll-driven animations)",
      category: "CSS Animations",
      supported: supportsCSSProp("scroll-timeline-name", "none"),
    },

    // JavaScript (syntax / ES6+)
    {
      name: "Arrow functions",
      category: "JavaScript ES6+",
      supported: trySyntax("return (() => 1);"),
    },
    {
      name: "Classes",
      category: "JavaScript ES6+",
      supported: trySyntax("return (class X{});"),
    },
    {
      name: "let / const",
      category: "JavaScript ES6+",
      supported: trySyntax("let a = 1; const b = 2; return a + b;"),
    },
    {
      name: "Template literals",
      category: "JavaScript ES6+",
      supported: trySyntax("return `template`"),
    },
    {
      name: "Default parameters",
      category: "JavaScript ES6+",
      supported: trySyntax("return (function(a = 1){return a})();"),
    },
    {
      name: "Destructuring",
      category: "JavaScript ES6+",
      supported: trySyntax(
        "return (function(){var [a,b]=[1,2]; return a+b})();"
      ),
    },
    {
      name: "Spread operator",
      category: "JavaScript ES6+",
      supported: trySyntax("return [...[1,2]];"),
    },
    {
      name: "Optional chaining",
      category: "JavaScript ES6+",
      supported: trySyntax("return ({}?.a);"),
    },
    {
      name: "Nullish coalescing (??)",
      category: "JavaScript ES6+",
      supported: trySyntax("return (null ?? 'x');"),
    },
    {
      name: "Async / await",
      category: "JavaScript ES6+",
      supported: trySyntax("return (async()=>{})"),
    },

    // Web APIs
    {
      name: "Fetch API",
      category: "Web APIs",
      supported: typeof window.fetch === "function",
    },
    {
      name: "Service Worker",
      category: "Web APIs",
      supported: "serviceWorker" in navigator,
    },
    {
      name: "WebSockets",
      category: "Web APIs",
      supported: typeof window.WebSocket !== "undefined",
    },
    {
      name: "WebRTC (RTCPeerConnection)",
      category: "Web APIs",
      supported: typeof (window as any).RTCPeerConnection !== "undefined",
    },
    {
      name: "BroadcastChannel",
      category: "Web APIs",
      supported: typeof (window as any).BroadcastChannel !== "undefined",
    },
    {
      name: "SharedWorker",
      category: "Web APIs",
      supported: typeof (window as any).SharedWorker !== "undefined",
    },
    {
      name: "Web Workers",
      category: "Web APIs",
      supported: typeof (window as any).Worker !== "undefined",
    },
    {
      name: "WebSockets",
      category: "Web APIs",
      supported: typeof (window as any).WebSocket !== "undefined",
    },
    {
      name: "WebGPU (navigator.gpu)",
      category: "Web APIs",
      supported: typeof (navigator as any).gpu !== "undefined",
    },

    // Storage & offline
    {
      name: "localStorage",
      category: "Storage",
      supported: (() => {
        try {
          return typeof window.localStorage !== "undefined";
        } catch {
          return false;
        }
      })(),
    },
    {
      name: "sessionStorage",
      category: "Storage",
      supported: (() => {
        try {
          return typeof window.sessionStorage !== "undefined";
        } catch {
          return false;
        }
      })(),
    },
    {
      name: "IndexedDB",
      category: "Storage",
      supported: typeof (window as any).indexedDB !== "undefined",
    },
    {
      name: "Cache API",
      category: "Storage",
      supported: typeof (window as any).caches !== "undefined",
    },
    {
      name: "StorageManager (estimate/quota)",
      category: "Storage",
      supported: typeof (navigator as any).storage !== "undefined",
    },

    // Media & Graphics
    {
      name: "WebGL",
      category: "Media & Graphics",
      supported: (() => {
        try {
          const c = document.createElement("canvas");
          return !!(c.getContext && c.getContext("webgl"));
        } catch {
          return false;
        }
      })(),
    },
    {
      name: "WebGL2",
      category: "Media & Graphics",
      supported: supportsWebGL2(),
    },
    {
      name: "OffscreenCanvas",
      category: "Media & Graphics",
      supported: typeof (window as any).OffscreenCanvas !== "undefined",
    },
    {
      name: "Canvas 2D",
      category: "Media & Graphics",
      supported: (() => {
        try {
          const c = document.createElement("canvas");
          return !!(c.getContext && c.getContext("2d"));
        } catch {
          return false;
        }
      })(),
    },
    {
      name: "WebAudio API",
      category: "Media & Graphics",
      supported:
        typeof (window as any).AudioContext !== "undefined" ||
        typeof (window as any).webkitAudioContext !== "undefined",
    },
    {
      name: "getUserMedia (camera/mic)",
      category: "Media & Graphics",
      supported: !!(
        navigator.mediaDevices && navigator.mediaDevices.getUserMedia
      ),
    },
    {
      name: "WebP (basic)",
      category: "Media & Graphics",
      supported: (() => {
        try {
          const c = document.createElement("canvas");
          return (
            c.toDataURL &&
            c.toDataURL("image/webp").indexOf("data:image/webp") === 0
          );
        } catch {
          return false;
        }
      })(),
    },

    // Security / credentials
    {
      name: "WebAuthn (PublicKeyCredential)",
      category: "Security",
      supported: typeof (window as any).PublicKeyCredential !== "undefined",
    },
    {
      name: "Credential Management API",
      category: "Security",
      supported: typeof (navigator as any).credentials !== "undefined",
    },

    // Utilities & misc
    {
      name: "IntersectionObserver",
      category: "Utilities",
      supported: typeof (window as any).IntersectionObserver !== "undefined",
    },
    {
      name: "ResizeObserver",
      category: "Utilities",
      supported: typeof (window as any).ResizeObserver !== "undefined",
    },
    {
      name: "Notifications API",
      category: "Utilities",
      supported: typeof (window as any).Notification !== "undefined",
    },
    {
      name: "Clipboard (writeText)",
      category: "Utilities",
      supported: !!(
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ),
    },
    {
      name: "Permissions API",
      category: "Utilities",
      supported: typeof (navigator as any).permissions !== "undefined",
    },

    // Misc / legacy-fallback hints
    {
      name: "WebAssembly",
      category: "Misc",
      supported: typeof (window as any).WebAssembly !== "undefined",
    },
    {
      name: "SpeechSynthesis",
      category: "Misc",
      supported: typeof (window as any).speechSynthesis !== "undefined",
    },
  ];

  return features;
}
