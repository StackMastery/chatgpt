// middleware.js
import { NextResponse } from "next/server";

const UPSTREAM = "https://www.freepik.com";

const FREEPIK_COOKIE =
  "GR_REFRESH=AMf-vBzWzADDwNceDaV7XpYTV_W0w0aWxRA1uq6S1R07DKAZ9_bETonl1G1XvXaun-QDodUGlF2jcd7Lw0XVuprr40fquBjdDv_uv26pOknvm0gXEcR7Fzb9XINP-noIjnrsVrXPvy50MLuoeUyI79t6n7wCBZv82cElA6F_0aYMyKu5FbV67bzLy7Roe2sEoDrAn75NcWS2;GR_TOKEN=eyJhbGciOiJSUzI1NiIsImtpZCI6IjA1NTc3MjZmYWIxMjMxZmEyZGNjNTcyMWExMDgzZGE2ODBjNGE3M2YiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiamFoaWR1bCBJc2xhbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BRWRGVHA1Q2U3MG0zcnJmLWI2QkdrYWVLN1QwMjR0TERTeEx6RjdvRWVtMj1zOTYtYyIsImFjY291bnRzX3VzZXJfaWQiOjg4NzAzNTU2LCJzY29wZXMiOiJmcmVlcGlrL2ltYWdlcyBmcmVlcGlrL3ZpZGVvcyBmbGF0aWNvbi9wbmciLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmMtcHJvZmlsZS1wcm8tcmV2MSIsImF1ZCI6ImZjLXByb2ZpbGUtcHJvLXJldjEiLCJhdXRoX3RpbWUiOjE3NTkwNDAxOTAsInVzZXJfaWQiOiJUUEVZWWZGU3RCV043UWY1cVgyT1BzQWhjM3UxIiwic3ViIjoiVFBFWVlmRlN0QldON1FmNXFYMk9Qc0FoYzN1MSIsImlhdCI6MTc1OTA0MDE5MCwiZXhwIjoxNzU5MDQzNzkwLCJlbWFpbCI6ImphaGlkdWxpc2xhbWphaGlkNDQ3NEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExMTEyMDA3MTEyMzA4NDE3NDk4MSJdLCJlbWFpbCI6WyJqYWhpZHVsaXNsYW1qYWhpZDQ0NzRAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiY3VzdG9tIn19.QMm1eRLZuj96cMOphWcBitGq9G8mDpULkXvIJLhUClkhuTOahbnuVgB2Q42D8ZvDO9Vm-C8zGL7eAhkwCap7Ma_EpeL_E9Rj94kYz_mQqj4FW0Nr0AkXge8Re2WUFhzdFNb7D0hlQLP--9sn151wOcicx1eFsA8sPF0bK-YYmATK66MUXL0fqU1c4HeucQIu_3nSZYbH7PmQTVdr5EmRQMxTcGCA6B4dgWLvqOmS6ht7nN-3qJyCuqn1iXW90O_X412Yt09E-jlTX4_FTKwYcM_EvTfyTY1norRIxUy5EE-gzO4evQ0jntsKITxorO1bXot2fz9cu7olPdVVMKcj6w;UID=88703556";

const EXCLUDE_PREFIXES = [
  "/_next",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
  "/assets",
  "/static",
];

/* =========================
 * Injection config (global)
 * ========================= */

// JS injections (inline or external)
const INJECT_JS = [
  {
    id: "__auto-click-download",
    inline: `
    (function () {
      const SELECTOR = 'button[data-cy="download-button"]';
      const STORAGE_KEY = '__auto_download_clicked_v1'; // session-only (per tab)
      const OBS_TIMEOUT_MS = 8000;
      try {
        if (sessionStorage.getItem(STORAGE_KEY) === '1') {
          console.debug('[inject] auto-click skipped: already clicked this session');
          return;
        }
      } catch (e) {
        console.warn('[inject] sessionStorage not available', e);
      }
      function tryClick() {
        const btn = document.querySelector(SELECTOR);
        if (!btn) return false;
        try {
          if (!btn.dataset.__autoClicked) {
            btn.dataset.__autoClicked = '1';
          } else {
            setClickedFlag();
            return true;
          }
          console.debug('[inject] dispatching click to download button');
          btn.click();
          setClickedFlag();
          return true;
        } catch (err) {
          console.error('[inject] auto-click failed', err);
          return false;
        }
      }
      function setClickedFlag() {
        try {
          sessionStorage.setItem(STORAGE_KEY, '1');
        } catch (e) {}
        cleanup();
      }
      let mo = null;
      let iv = null;
      function cleanup() {
        try { if (mo) { mo.disconnect(); mo = null; } } catch (e) {}
        try { if (iv) { clearInterval(iv); iv = null; } } catch (e) {}
      }
      function onDomReady(cb) {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => cb(), { once: true });
        } else {
          cb();
        }
      }
      onDomReady(() => {
        if (tryClick()) return;
        const startObserve = (root) => {
          if (!root || !(root instanceof Node)) {
            console.warn('[inject] no valid root to observe');
            return;
          }
          iv = setInterval(() => {
            if (tryClick()) { /* cleanup will be invoked */ }
          }, 250);
          try {
            mo = new MutationObserver(() => {
              if (tryClick()) { /* cleanup via setClickedFlag */ }
            });
            mo.observe(root, { childList: true, subtree: true });
          } catch (e) {
            console.error('[inject] MutationObserver failed', e);
          }
          setTimeout(() => {
            if (mo) mo.disconnect();
            if (iv) { clearInterval(iv); iv = null; }
          }, OBS_TIMEOUT_MS);
        };
        if (document.body) {
          startObserve(document.body);
        } else {
          const bodyPoll = setInterval(() => {
            if (document.body) {
              clearInterval(bodyPoll);
              startObserve(document.body);
            }
          }, 50);
          setTimeout(() => clearInterval(bodyPoll), 5000);
        }
      });
    })();
    
  `,
    place: "bodyEnd",
  },
];

// CSS injections (inline or external)
const INJECT_CSS = [
  {
    id: "__custom-theme",
    inline: `
      div#onetrust-banner-sdk { display: none !important; }
    `,
    place: "headEnd",
  },
];

/* =========================
 * Injection engine
 * ========================= */

function tagOnce(html, marker) {
  return html.includes(marker);
}

function insertAt(html, where, snippet) {
  switch (where) {
    case "headStart":
      if (/(<head[^>]*>)/i.test(html))
        return html.replace(/(<head[^>]*>)/i, `$1${snippet}`);
      return snippet + html;
    case "headEnd":
      if (/(<\/head\s*>)/i.test(html))
        return html.replace(/<\/head\s*>/i, `${snippet}</head>`);
      return html + snippet;
    case "bodyStart":
      if (/(<body[^>]*>)/i.test(html))
        return html.replace(/(<body[^>]*>)/i, `$1${snippet}`);
      return html + snippet;
    case "bodyEnd":
    default:
      if (/(<\/body\s*>)/i.test(html))
        return html.replace(/<\/body\s*>/i, `${snippet}</body>`);
      return html + snippet;
  }
}

function buildJSTag(def) {
  const marker = `id="${def.id}"`;
  if (def.inline) {
    return [
      `<script ${marker}>(function(){\n${def.inline}\n})();</script>`,
      marker,
    ];
  }
  const attrs = [
    `id="${def.id}"`,
    `src="${def.src}"`,
    def.async ? "async" : "",
    def.defer ? "defer" : "",
    'crossorigin="anonymous"',
  ]
    .filter(Boolean)
    .join(" ");
  return [`<script ${attrs}></script>`, marker];
}

function buildCSSTag(def) {
  const marker = `id="${def.id}"`;
  if (def.inline) {
    return [`<style ${marker}>\n${def.inline}\n</style>`, marker];
  }
  const rel = def.rel || "stylesheet";
  const attrs = [`id="${def.id}"`, `rel="${rel}"`, `href="${def.href}"`].join(
    " "
  );
  return [`<link ${attrs} />`, marker];
}

function routeInjections(pathname) {
  const routeJS = [];
  const routeCSS = [];
  if (pathname.startsWith("/premium")) {
    routeCSS.push({
      id: "__premium-glow",
      inline: `.premium-badge { box-shadow: 0 0 16px rgba(255,215,0,.75); }`,
      place: "headEnd",
    });
  }
  return { routeJS, routeCSS };
}

function applyInjections(html, pathname) {
  let out = html;
  out = out.replace(
    /<meta[^>]*http-equiv=["']content-security-policy["'][^>]*>/gi,
    ""
  );
  const { routeJS, routeCSS } = routeInjections(pathname);
  const cssList = [...INJECT_CSS, ...routeCSS];
  const jsList = [...INJECT_JS, ...routeJS];

  for (const def of cssList) {
    const [tag, marker] = buildCSSTag(def);
    if (!tagOnce(out, marker)) out = insertAt(out, def.place || "headEnd", tag);
  }

  for (const def of jsList) {
    const [tag, marker] = buildJSTag(def);
    if (!tagOnce(out, marker)) out = insertAt(out, def.place || "bodyEnd", tag);
  }

  return out;
}

export async function middleware(req) {
  const { pathname, search } = req.nextUrl;

  const BLOCKED_PATHS = ["/api/user/downloads/limit"];

  if (BLOCKED_PATHS.includes(pathname)) {
    return NextResponse.json(
      { error: "blocked", reason: "endpoint not allowed" },
      { status: 404 }
    );
  }

  if (pathname === "/api/user/downloads/limit") {
    return NextResponse.json({
      current: 0,
      limit: 1000000000000000,
    });
  }

  if (pathname === "/api/user/session") {
    // Proxy request to upstream
    const upstreamRes = await fetch(`${UPSTREAM}${pathname}`, {
      headers: {
        cookie: FREEPIK_COOKIE, // send server-side cookie
        "user-agent": req.headers.get("user-agent") || "",
      },
    });

    const data = await upstreamRes.json();
    const modified = {
      ...data,
      data: {
        ...data.data,
        downloads: 1,
        limit_downloads: 1000000000000000,
        premium: true,
      },
    };

    return NextResponse.json(modified);
  }

  if (pathname.startsWith("/api/")) {
    const upstreamPath = pathname + search;
    const target = new URL(upstreamPath, UPSTREAM);

    const h = new Headers(req.headers);
    if (FREEPIK_COOKIE) h.set("cookie", FREEPIK_COOKIE);
    h.delete("host");
    h.delete("accept-encoding");
    if (!h.get("user-agent")) h.set("user-agent", "Mozilla/5.0");

    if (req.method === "GET" || req.method === "HEAD") {
      const upstreamResp = await fetch(target.toString(), {
        method: req.method,
        headers: h,
        redirect: "manual",
      });

      const out = new Headers(upstreamResp.headers);

      // Keep redirects on our origin
      const loc = out.get("location");
      if (loc) {
        try {
          const locURL = new URL(loc, UPSTREAM);
          if (locURL.origin === new URL(UPSTREAM).origin) {
            out.set("location", locURL.pathname + (locURL.search || ""));
          }
        } catch {}
      }

      // Normalize Set-Cookie
      const setCookie = upstreamResp.headers.get("set-cookie");
      if (setCookie) {
        const parts = setCookie
          .split(/,(?=[^;]+?=)/g)
          .map((c) =>
            c
              .replace(/;\s*domain=[^;]+/gi, "")
              .replace(/;\s*samesite=lax/gi, "; SameSite=None; Secure")
          );
        out.delete("set-cookie");
        parts.forEach((p) => out.append("set-cookie", p));
      }

      return new Response(upstreamResp.body, {
        status: upstreamResp.status,
        headers: out,
      });
    }

    // Other methods: rewrite (preserve method+body)
    return NextResponse.rewrite(target, { request: { headers: h } });
  }

  // Pages (proxy & inject)

  const upstreamPath = pathname + search;
  const target = new URL(upstreamPath || "/", UPSTREAM);

  const incoming = new Headers(req.headers);
  if (FREEPIK_COOKIE) incoming.set("cookie", FREEPIK_COOKIE);
  incoming.delete("host");
  incoming.delete("accept-encoding");
  if (!incoming.get("user-agent")) incoming.set("user-agent", "Mozilla/5.0");

  const upstreamResp = await fetch(target.toString(), {
    method: req.method,
    headers: incoming,
    redirect: "manual",
  });

  const out = new Headers(upstreamResp.headers);

  // Keep redirects on our origin
  const loc = out.get("location");
  if (loc) {
    try {
      const locURL = new URL(loc, UPSTREAM);
      if (locURL.origin === new URL(UPSTREAM).origin) {
        out.set("location", locURL.pathname + (locURL.search || ""));
      }
    } catch {}
  }

  // Relax breakage-inducing headers
  out.delete("content-security-policy");
  out.delete("x-frame-options");

  // Normalize Set-Cookie
  const setCookie2 = upstreamResp.headers.get("set-cookie");

  if (setCookie2) {
    const parts = setCookie2
      .split(/,(?=[^;]+?=)/g)
      .map((c) =>
        c
          .replace(/;\s*domain=[^;]+/gi, "")
          .replace(/;\s*samesite=lax/gi, "; SameSite=None; Secure")
      );
    out.delete("set-cookie");
    parts.forEach((p) => out.append("set-cookie", p));
  }
  // out.delete("set-cookie");

  // HTML only: rewrite origins + inject JS/CSS
  // HTML only: rewrite origins + inject JS/CSS
  const ct = upstreamResp.headers.get("content-type") || "";
  if (ct.includes("text/html")) {
    const originalHTML = await upstreamResp.text();
    const originStripped = originalHTML.replaceAll(
      /https?:\/\/(www\.)?freepik\.com/gi,
      ""
    );

    // >>> NEW: nullify all img/video/source src attributes
    const mediaNullified = nullifyMediaSrc(originStripped);

    const injected = applyInjections(mediaNullified, pathname);
    const bytes = new TextEncoder().encode(injected).length;
    out.set("content-length", String(bytes));
    return new Response(injected, {
      status: upstreamResp.status,
      headers: out,
    });
  }
}

/* =========================
 * Media src nullifier
 * ========================= */
function nullifyMediaSrc(html) {
  // Normalize src attributes on <img>, <video>, and <source> tags to "null"
  const replacer = (match, before, quote) =>
    `${before}src=${quote}null${quote}`;

  return (
    html
      // <img ... src="...">
      .replace(/(<img\b[^>]*?\bsrc\s*=\s*)(['"])([\s\S]*?)(\2)/gi, (m, p1, q) =>
        replacer(m, p1, q)
      )
      // <video ... src="...">
      .replace(
        /(<video\b[^>]*?\bsrc\s*=\s*)(['"])([\s\S]*?)(\2)/gi,
        (m, p1, q) => replacer(m, p1, q)
      )
      // <source ... src="..."> (covers <video>/<audio>/<picture> sources)
      .replace(
        /(<source\b[^>]*?\bsrc\s*=\s*)(['"])([\s\S]*?)(\2)/gi,
        (m, p1, q) => replacer(m, p1, q)
      )
  );
}

export const config = { matcher: ["/:path*"] };
