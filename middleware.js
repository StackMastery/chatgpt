import { NextResponse } from "next/server";

const CUSTOM_COOKIES =
  "__Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Y8wMjUnfN8fCmjDa.gPYmzDYFYsFDPTroPB-TD8xP-seoZyDOcZcG11fn0ChhbXH38onbrneIlow0yi42CHhVyN2GenOOR_ofiyqOL7REWTYtkRtyiOFi8o-SvW1_LBarSdOO94epPu2xo0nZgizarTBeuZGeRHlhzwMa0tOm_gorw5uNNZSAHv-6zuhoY27V53edPSjF42VF7CUMJjXKKgoPJRgH9kHW9Uz97mNmkgrFXNY4fPWu_GUpHBR5bA7bn1HI42JRIek9qAukZSXvlJp73QwLR5KpeB5pqs8VGiZOTMP6ZOgFk89dfqDQSFoksxEHtYWnRGmmvP7NOX4x1pgfhfe-cyx5p88wNh4JBkqf7E0Gx99AHShdA7DN6TKBNVUalRvJKcfAT_WY3MKdqrfohp80Yqlr91BuvFdJAeweKyMZEX3I0eBhsAtoNKLhdrttTx_CyQ-g1Xc_TGyzpabOKrh6VUX5uO3l5nI6s7PO2tB-xhjuDNH_PKJz5Y_b82nD5YFaeUsYiC9V5IgBJCN4eG5EI6L5t2Y9qpq6zV_Sgs-wvOqXWCB00nxkJuDg8623gHppmtpAfRwi2LgnKE3Shl4c7xOtoht88bBbo5Ujehfs1IuTNeQPjf1sdM0Lh1nDAK57MdUxXqeUsUrsfFzqjqGACI8gM7BJpL7LNZoIFxEUlSc2Vx6IUsmu4FKqn8qr-a1NbH_43nGi4ubFGliyGqnYWxKqr0826Ib6Ketzm3_ivkkoldUPmPRBFuO2pozWJGwXaj1Tt_MU9BgQ55RY8Ee_xYDTTN9Ft0UGS3nn_PTdmdpG9b0kX5kaHJad96XmcNPlFuhYCbOC0BgMDfvSVigm2LJQtHXLcHmhfgv4xQt48LHEjX6Uxukk8_6SEppWXFud02_nx9ebHeFsFiTXKxgUvb_cOh7ueA9RDF_MmKD6fCKH2qFQ1KTVbfUcMzbzwCfVa7t0TZdpCFL6Ra4-bWByP79LcXplw3oRfycHu42xDMCjWU6eJ9pU7c_IyBB4ImUsUDi5l2UFgz78Ocew4VfmOqE1i7DOl9JoAOIc9EZHWU4GZyPY47IdnzBwiVFF3O9sC6umDPu83BHymPKcbya7llXeWXoFt7qMz0KMY_29Q0SKeBDtuu4OvVLb0CWq9-sOg7eh2O6D7TlvKB1vyIfs5GY3YoCHv5EGBciBAxjwulmtfJ3mu4hz4J96M5rsCZsFhYPUs65QHvbOBXLXcSZ8Kbh-G2SIdPcQtbGEpIgZ_H5fobQkLllsT-HTexrRY6znm3wqxwA8p5NO8ybEegJSYqcJWzLjXQHyURRxKTPEr5E27lIpfQy3EpQVTK3zj7-Z6uvKpnLlkHcdXCdXZUjJ4qco4jM0uHsTorv9HakXYhUwJZhELJbp1o-dBeXBDKpZePOpmavY6plGOQSa8cwlEprvGf1afdvOVs7KqOHvRz-WQHa1ARaCye9aEW8RJiyKhpwJG5EDgjlFYqo8GCK3NAjZdZ_cjnfADGn_EJmkQB5agC4Cvn1Wrr7DPg404Nu1kf0TR7MRZ6Typ7TRc1qIxi5pGkLWDqGcocDlix8X3PKnfDLepmhUoD3v3qFCu8fF6LVV8hRimBH-GwKTwwlj_Q43X7McmIAzKmVRWWANCtntMVaNycPFwvWk1xhjVx1dC1REOdFT7lc0jMjHP9jy922ll3xM_CErxQU9th10J69paXm_r0SlzmOeB1SKhr7b1SyQ-4st2jpL7tgBoCEA_13x75pCSV2MKUep43fQ7ln9ZtPRwPd_pKYlUcDkOT7kQJzLgKz7VJHdkcaohFt-N_4X2Ddf0Jvrn9hO25Ty3l9rDnS6w9e-B6kaE-GsefxEamQ1ltKpLiwwffoph-4wC21P7DG4CvJ9pUtSVEyaQvbRs3J7Nbaur3f0WSi7maa3mE7bgYOy417Ay9Zu-jlNc17kCoUT8G9Xn7W1Gse7MFrweuB92J1eBRrUSYUiFfvKOjBudEbli4i8g2WW0AEb1SU0jpWvskDOceGtf0LurQjUD7jKgsEG2EnlQnnQk1mKTxR15vX0JZVN5hvk18dsTDlhEn6AQqZOxc893Eh07VAJsRPbkSHnAhqGgau957-R8eEtacKy6XV8g71jY_H1s2Y1Gkqjf6V1ds9x4Sev3LWfgqhPJwXaDCkxN287ZApGlytwdCWo_xTxLrQndYY7r-l0O6Di4XD935_USyouwDjuKOb0VY3p0z5Ir4C9FpxqFLnddRbJV4U5D0IKBmBnNLkJ0ElL6T1m1Y4nN58v_emCexbTrXfSedP1jVGtKfg1fz81FaEQzCYoepZT0Py5Ar_E0JyvcDqHmYKlQauxmphAkd-ol00nH--pXv1QwMuJdSjWfTmYJo4nZwO6TVKSgGRw3GliJH0ab_jAUGNVsBaZIXUSqSjZggKgFKGg2MICjoI3i0QtJqwg30IAXoLuav_MJecVnPhXswkB5wWVfCWwee3ds83okJDqPvnUGAlhuCC34D7_2fs07YP-XDj1916OZ8PrBTMKCTYftrYGmR4Lqphpw4_Tw_MCPuOGKEJUckih7rAboHu_sk1es4H7u7WEhG9uFNN19skTEeL0eqfqMY0akLQ9rGDGCF7dpRGzaCIjFCkfvcydTSP71bDRmjZ3nrsH9_mBOegFf-3Wq7RCUK28dH4fR9ZGB79anQHGPNe4M-jGZE14lVNngXbycgEkzSQnu8vn-wybhcf9Dk0SnK_g-CqwhoNv5IXWTvxGtYhhzbavR-vXt2gBgVsreSgfksUStUf6A-xKvCE8AVgulzymlh0F4AB4a8GBoBkcr5PybDbkaMyEmAATW4HZUeS7ek0xlVo6pJMMrKinwDNT5ldQxyIVbdDM7t57tzN_imEK-kOyOLLr-RNORHbAkkVbc1c2M75nNBB4B5TRmKkh-vQBoX3db5O48kjuPZ0BfyUxNizupcMt1aaww-5BsVFW-GmybovWZGjr7YpKe5fkHYb1gce2vv5Oak1lWm-uHlHtmheFqiCrRE5XBKXNom0lkNtP9r7IhlYZQV5stdtINNF6qMVx9GG2PrS6GTId1oX3lIr55UR95I_uu8GFIdBYXxfuNNwZVG1g2JJhQc_SDNKUlfUUjVdVlXq9oPyiuWhW2TJlEBA5XorPc3eJM2wqvnDS31PnMWmClhvPxVkJd00PXXMSg6TfVX44xroPhNyhBh1Oyvz4qbiCLxMBIc5KBSqOV82ex0nkYxyjO31ktMQ1rzcjquRvCE_UgHuTf_5o-PITNXKjPIMDIy7lMH3WsWP9yp8O9qN0QZWFbVqbT0XNhs0fhXh_imPciULC-r_covfmqpmyPI2qUT66A9waRrxUEYs8U8zR2kqKijL2PS3j77cbqYjW5ZSH9K6q4-o57HlgnJLUt018LbrDtDBSABOJNgMyM3sPeLwO1k5Lcxn6-18h255LHUBbSQaiJwkhsuBk9XLLYsC51q9fv3yLLtvHme-xPKIp3qpzcTUUMyPdVFu-QP-voKvieZC3IX7Kwh_FbGYmEA0.9Jw9AI1VLhHuSLD273rYhA;_account=2fbb1478-63d3-4a5b-8e71-8ac50be66c43";

const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

function copyRequestHeaders(req, override = {}) {
  const out = new Headers();
  req.headers.forEach((value, key) => {
    const k = key.toLowerCase();
    if (HOP_BY_HOP.has(k)) return;
    if (k === "host") return;
    out.set(k, value);
  });
  for (const [k, v] of Object.entries(override)) out.set(k, v);
  return out;
}

function copyResponseHeaders(src, extra = {}) {
  const out = new Headers();
  src.headers.forEach((value, key) => {
    const k = key.toLowerCase();
    if (HOP_BY_HOP.has(k)) return;
    out.set(k, value);
  });
  for (const [k, v] of Object.entries(extra)) out.set(k, v);
  return out;
}

async function fetchFollow(targetUrl, init, maxHops = 5) {
  let url = targetUrl;
  for (let i = 0; i < maxHops; i++) {
    const res = await fetch(url, { ...init, redirect: "manual" });
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      if (!loc) return res;
      url = new URL(loc, url).toString();
      continue;
    }
    return res;
  }
  return new Response("Too many redirects from upstream", { status: 508 });
}

export async function middleware(req) {
  const url = new URL(req.url);

  const excluded = /^\/(?:_next\/|favicon\.ico$|robots\.txt$|sitemap\.xml$)/;
  if (excluded.test(url.pathname)) return NextResponse.next();

  const upstream = new URL(`https://chatgpt.com${url.pathname}`);
  upstream.search = url.search;

  const method = req.method;
  const body = method === "GET" || method === "HEAD" ? undefined : req.body;

  const headers = copyRequestHeaders(req);

  // Inject custom cookies
  if (CUSTOM_COOKIES) {
    headers.set("cookie", CUSTOM_COOKIES);
  }

  const upstreamRes = await fetchFollow(
    upstream.toString(),
    { method, headers, body },
    5
  );

  const resHeaders = copyResponseHeaders(upstreamRes, {
    "cache-control": upstreamRes.headers.get("cache-control") || "no-store",
    "access-control-allow-origin": url.origin,
    "access-control-allow-credentials": "true",
    "x-proxy-target": "chatgpt.com",
  });

  const response = new NextResponse(upstreamRes.body, {
    status: upstreamRes.status,
    headers: resHeaders,
  });

  const setCookie = upstreamRes.headers.get("set-cookie");
  if (setCookie) {
    response.headers.append("set-cookie", setCookie);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|robots.txt|sitemap.xml).*)"],
};
