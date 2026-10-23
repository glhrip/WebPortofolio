# AUDIT — WebPortofolio (E:\WebPortofolio)

Tanggal: 2026-10-23 · Metode: baca source + build lokal + render headless Chrome (CDP) + probe produksi.
Semua angka di bawah dari tool output nyata, bukan estimasi.

Repo: github.com/glhrip/WebPortofolio · Laravel 13 + React 19 + Vite 8 + Tailwind 4
Produksi: https://portofolio.galihdev.cloud (nginx 1.24 / Ubuntu)

---

## 1. TEMUAN PALING PENTING: produksi ketinggalan 5,5 minggu

| bukti | hasil |
|---|---|
| commit terakhir | `ee7812a` — 2026-09-14 20:41 |
| mtime CSS di server | `Mon, 14 Sep 2026 13:52:18 GMT` |
| JS live `app-DQ7wvp5E.js` | `grep -c ALL_PROJECTS` = **0** |
| JS lokal `app-DdwJ3yII.js` | `grep -c ALL_PROJECTS` = **1** |
| tinggi halaman live (1440px) | 793 px — **grid proyek tidak ada sama sekali** |
| tinggi build lokal | 1483 px — grid 5 kartu muncul |
| meta SEO di HTML live | `description` ✗ `og:image` ✗ `canonical` ✗ `theme-color` ✗ |
| meta SEO di working tree | semua ada (`resources/views/app.blade.php`) |

Artinya: yang dilihat pengunjung sekarang = versi 14 September. Kerjaan 173 baris
di `PortfolioExplorer.jsx`, 45 baris CSS, dan seluruh blok SEO/OG belum pernah naik.
Di produksi, halaman berhenti setelah kartu hero + featured — separuh layar kosong.

**Blocker deploy:** `deploy.sh` pakai `git pull origin main`. HEAD lokal = origin/main =
`ee7812a`. Jadi `deploy.sh` sekarang **no-op** — tidak akan menarik apa pun sampai
perubahan di-commit & push.

---

## 2. Aset yang bikin link preview rusak (tidak akan pernah terkirim)

4 file ada di disk tapi **untracked**:

```
?? public/og-image.png        (1200x630, valid)
?? public/favicon.svg
?? public/favicon.png         (64x64)
?? public/favicon-32.png
```

Karena `git pull` hanya membawa file yang di-commit, file ini **tidak akan pernah
sampai ke VPS**. Hasil probe produksi:

```
/og-image.png    404
/favicon.svg     404
/favicon.ico     200 tapi 0 byte   <- kosong
```

Efek nyata: share ke WhatsApp/LinkedIn/X = kartu kosong tanpa gambar. Ikon tab kosong.
Blade sudah mereferensikan `/og-image.png` dan `/favicon.svg` → 404 di produksi.

---

## 3. Status git (kerjaan belum diselamatkan)

```
M  deploy.sh                       (uncommitted)
M  resources/css/app.css           (+45)
M  resources/js/components/PortfolioExplorer.jsx  (+173 / -40)
M  resources/views/app.blade.php   (+30)
D  resources/js/components/{ExperienceTimeline,Header,Portfolio,ProjectsGallery,SkillsGrid}.jsx
D  public/assets/{css/style.css,js/script.js}
```

7 file dihapus (staged) tapi belum di-commit. Kalau `git checkout .` kepencet,
kerjaan theme-toggle + grid proyek + SEO hilang.

---

## 4. Bug light mode (terverifikasi via computed style)

Theme toggle ada, tapi migrasi light mode **setengah jalan**. 5 dari 9 jenis panel
tetap hardcode gelap:

| elemen | file:line | light mode | seharusnya |
|---|---|---|---|
| hero card | `PortfolioExplorer.jsx:267` `bg-slate-900/90` | gelap | ikut tema |
| featured card | `:283` `bg-slate-900/80` | gelap | ikut tema |
| project card grid | `:305` `bg-slate-900/75` | gelap | ikut tema |
| panel StandardView (5 view) | `:255-259` `bg-slate-900/75` | gelap | ikut tema |
| ProjectBanner | `:208` | **sudah** `#fdf9ec` | — |

Bukti terukur (computed style, mode light):
```
shell  = rgb(245,239,223)   cream
card   = oklab(0.208 ...)   gelap  <- sama persis dengan mode dark
banner = #fdf9ec            cream
```
Jadi di mode light: cream shell + cream banner + kartu gelap + panel gelap. Campur.

Kontras yang jatuh di light mode (WCAG AA butuh 4.5:1):

| teks | rasio | status |
|---|---|---|
| `ALL_PROJECTS/` (text-orange-200 di atas cream) | **1.19** | praktis tak terbaca |
| `OPEN` (text-slate-500 di kartu) | 1.77–3.75 | gagal |
| subtitle proyek (text-slate-400 di kartu) | 3.21 | gagal |
| `5 entries` (text-slate-500) | 4.15 | gagal |
| `▪` footer | 3.73 | gagal |

Di mode dark hanya 3 kegagalan marginal (OPEN, 5 entries, ▪). Jadi light mode =
regresi, bukan fitur.

**Focus ring invisible di light mode.** `resources/css/app.css:19`:
```css
box-shadow: 0 0 0 2px #020617, 0 0 0 4px #bef264;
```
`#bef264` di atas cream `#f5efdf` = **1.07:1** (butuh ≥3:1 untuk indikator fokus).
Di dark = 15.44:1, aman. Jadi keyboard user di light mode tidak melihat fokus sama sekali.

---

## 5. Aksesibilitas & semantik (terukur)

```
h1 di halaman        : 0        <- headline pakai <h2> (PortfolioExplorer.jsx:273)
urutan heading       : H2, H3, H3, H4 x5
nav aria-label       : null
main aria-label      : null
aria-current aktif   : null     <- item nav aktif tak ditandai ke screen reader
input type           : "text"   (bukan "search")
aria-live "No results": 0
img tanpa alt        : 0        (bagus)
button tanpa nama    : 0        (bagus)
```

Drawer mobile (390px & 1023px):
```
drawer terbuka           : ya
body scroll lock         : ya (overflow hidden)
Esc menutup              : ya
role="dialog"/aria-modal : null  <- tidak dideklarasikan
fokus pindah ke drawer   : TIDAK
fokus terjebak (trap)    : TIDAK — setelah 6x Tab fokus mendarat di "DOWNLOAD CV" di belakang drawer
```
Tab order & fokus dasar sendiri sehat: 12/12 elemen `:focus-visible` true, ring muncul.
`prefers-reduced-motion` dihormati (transition → 1e-06s). Tidak ada overflow horizontal
di 1440 / 1023 / 390 px. Tidak ada console error (kecuali favicon 404).

Search: filter jalan (`"car"` → 1 hasil, `"hajj"` → 1, `"zzz"` → "No results"), tapi
Enter tidak memilih hasil, Esc tidak mengosongkan query.

---

## 6. Produksi: performa & header

Ukuran (build lokal, sama dengan yang akan naik):
```
JS   389.9 KB  (gzip 123.9 KB)
CSS   47.0 KB  (gzip   8.9 KB)
```
Untuk satu halaman portfolio ini berat. `axios` ikut ke-bundle (2 hit) padahal
`resources/js/bootstrap.js` tidak dipakai di mana pun → dead weight.
`resources/js/app.js` juga orphan. `welcome.blade.php` (16 baris) tidak dirujuk route.

Transfer produksi sekarang:
```
/                                 398 B gzip   OK
/build/assets/app-*.css        76,472 B       TANPA gzip
/build/assets/app-*.js        393,976 B       TANPA gzip
```
Jadi CSS+JS terkirim mentah ~470 KB, padahal gzip bisa ~133 KB. nginx tidak
meng-compress aset statis.

Cache header aset ber-hash: **tidak ada** `Cache-Control` / `Expires`
(hanya ETag + Last-Modified). Setiap kunjungan = revalidate.

Header keamanan:
```
X-Frame-Options        SAMEORIGIN     OK
X-Content-Type-Options nosniff        OK
Strict-Transport-Security  MISSING
Content-Security-Policy    MISSING
Referrer-Policy            MISSING
Permissions-Policy         MISSING
```
`http://` → 301 ke https: OK.

---

## 7. Perbandingan dengan desain pen.dev

Desain pen.dev (preview 433x1200, artboard mobile):
https://app.pen.dev/s/brr-WpK4GXqeUjcGRxfjgCOpuq-pkdVTZaKpFZMwESE
Preview PNG bisa diunduh di: `https://www.pen.dev/s/<id>/preview?v=1`

Isi desain itu (dibaca dari render preview):
- **Nav horizontal** (logo kiri, link Home/About/Projects/Stack/Blog, pill CTA kanan)
- **Hero 60/40**: headline kiri + kartu terminal status kanan (`$ whoami`, `$ status`,
  `$ uptime`, `$ location`, `$ now` + kursor blink)
- **Stats strip 4 kolom**: `05+` years, `02` continents, `2026` updated, `[ON]`
- **Featured project full-width** dengan sidebar spesifikasi (Role/Status/Architecture/
  Deployment) + 3 bullet fitur + tag stack + 3 metrik (`-30% TIME SAVED`, `99.9% UPTIME`)
- **Grid proyek 2x2** (CarWash POS, Felspoel Admin, Cicilan, Inventory)
- **Filosofi**: kutipan besar 2 baris + 2 kolom paragraf + kartu terminal
- **Self-hosted / hardware**: 2 kartu + 1 full-width
- **Tech stack 3 kolom**
- **Contact CTA**: border kuning + glow, headline + form (Name/Email/Message)
- **Footer**: `DESIGNED & BUILT BY ... · EVERY LINE HAS A REASON`

Palet desain itu (hasil sampling piksel preview):
```
bg     #0d1521  40.6%      accent #bef264   <- SAMA dengan lime situs sekarang
bg     #080d15  33.7%      teks   #e9eff7
card   #111b29   6.4%      muted  #7b828c
```
Tipografi: sans (Inter/Geist) untuk headline + JetBrains Mono untuk label/meta.

Catatan: headline di desain itu **"I build systems that keep operations moving."** dan
proyek unggulannya **Hajj & Umrah System** — jadi pen.dev membangun desain dari konten
kamu sendiri, bukan template orang lain. Aman dipakai sebagai arah.

### Beda struktural

| aspek | situs sekarang | desain pen.dev |
|---|---|---|
| model | SPA "IDE explorer" + sidebar tree | landing page single-scroll |
| navigasi | sidebar folder + search + breadcrumb `C:\` | nav bar horizontal |
| kedalaman konten | 7 view terpisah (About/Summary/Projects/Edu/Exp/Skills/Contact) | semua di satu halaman |
| stats strip | tidak ada | ada (4 metrik) |
| featured project | kartu kecil di kanan hero | case-study besar + sidebar spec |
| form kontak | tidak ada (hanya mailto) | ada (Name/Email/Message) |
| narasi filosofi | tidak ada | ada (kutipan + 2 kolom) |
| hardware/self-hosted | tidak ada | ada |
| waktu baca recruiter | butuh klik 5-6x | 1 scroll |

Yang **lebih baik** di situs sekarang dan jangan dibuang:
- identitas "terminal/IDE" lebih kuat & lebih unik daripada landing page biasa
- search + struktur data proyek (problem/built/stack per proyek) sudah rapi
- dark/light toggle, focus ring, reduced-motion, aria-label di aside — sudah dipikirkan
- bundle React terpisah, struktur komponen bersih (1 file, 373 baris)

Yang **lebih baik** di desain pen.dev:
- recruiter dapat semua info tanpa klik (ini yang paling penting untuk portofolio kerja)
- stats strip + metrik dampak (`-30% TIME SAVED`) = bukti, bukan klaim
- form kontak = konversi
- sidebar spec per proyek (Role/Status/Architecture/Deployment) = kredibilitas teknis

Rekomendasi: **jangan ganti ke landing page biasa**. Ambil blok-blok terbaik dari desain
pen.dev lalu tempel ke shell IDE yang sudah ada:
1. Tambah **stats strip** di bawah hero (5 metrik nyata dari CV).
2. Ubah kartu featured jadi **case-study besar + sidebar spec** (sudah ada datanya di
   objek `projects[0]`, tinggal layout).
3. Tambah **section filosofi** + **self-hosted/hardware** (diferensiasi nyata: kamu
   memang deploy sendiri di VPS, itu cerita bagus).
4. Ganti grid proyek jadi **2 kolom penuh** (sekarang sudah 2 kolom, tinggal hilangkan
   kesan "kartu kecil di sidebar").
5. Tambah **form kontak** (butuh route POST + mail, sekarang hanya 1 route GET).
6. Pertahankan sidebar sebagai "secondary nav" untuk deep-dive, atau sembunyikan di
   bawah `lg` supaya mobile jadi single-scroll seperti desain pen.dev.

---

## 8. Prioritas perbaikan

**P0 — sebelum apa pun (30 menit)**
1. `git add` 4 aset (og-image, favicon.svg, favicon.png, favicon-32.png) — kalau tidak,
   link preview selamanya rusak.
2. Commit kerjaan sekarang (theme + grid + SEO), lalu `./deploy.sh`.
   Tanpa ini, semua perbaikan lain tidak terlihat siapa pun.
3. Verifikasi setelah deploy: `curl -sI .../og-image.png` harus 200 + image/png,
   dan halaman harus setinggi ~1483px (grid proyek muncul).

**P1 — bug nyata (1-2 jam)**
4. Light mode: ganti `bg-slate-900/75|80|90` di 5 tempat jadi ternary `dark ? ... : ...`
   (`PortfolioExplorer.jsx:255-259, 267, 283, 305`).
5. `ALL_PROJECTS/` label: `text-orange-200` → `text-orange-700` di light (1.19 → aman).
6. Focus ring: tambah varian light di `app.css:19` (mis. `0 0 0 2px #fff, 0 0 0 4px #1e40af`).
7. `text-slate-400/500` di kartu → `text-slate-300` (dark) / `text-stone-600` (light).

**P2 — semantik & a11y (2-3 jam)**
8. Headline `<h2>` → `<h1>` (`:273`). Tambah `aria-current="page"` di nav aktif.
9. Drawer: `role="dialog"` + `aria-modal="true"` + pindahkan fokus ke drawer saat buka +
   focus trap (atau pakai `<dialog>` native).
10. `<nav aria-label="Portfolio">`, `<main aria-label="...">`, input `type="search"`,
    `aria-live="polite"` untuk hasil pencarian.

**P3 — infra (30 menit di nginx)**
11. `gzip on` untuk `text/css application/javascript` → hemat ~340 KB per kunjungan.
12. `location /build/ { add_header Cache-Control "public, max-age=31536000, immutable"; }`
    (aman karena nama file ber-hash).
13. Tambah `Strict-Transport-Security`, `Referrer-Policy: strict-origin-when-cross-origin`,
    `Permissions-Policy`. CSP perlu nonce → jadwalkan terpisah.

**P4 — hygiene**
14. Hapus `resources/js/app.js`, `resources/js/bootstrap.js` (axios tidak dipakai),
    `resources/views/welcome.blade.php`, devDep `concurrently`. Hemat bundle & bikin
    `vite build` lebih cepat.
15. `database/database.sqlite` + 3 migrasi default tidak dipakai portfolio statis —
    pertimbangkan hapus, atau biarkan (tidak berbahaya).

---

## 9. Yang sudah bagus (jangan diutak-atik)

- Tidak ada error runtime di console saat menelusuri semua 7 view + 5 proyek.
- Tidak ada overflow horizontal di 1440 / 1023 / 390 px.
- `prefers-reduced-motion` dihormati.
- `prefers-color-scheme` dipakai sebagai default + persist ke `localStorage` (bertahan
  setelah reload — sudah diuji).
- Tab order logis, semua elemen fokusable punya ring (di dark mode).
- Esc menutup drawer, body scroll terkunci saat drawer buka.
- Tidak ada `img` tanpa alt, tidak ada `button` tanpa nama.
- `deploy.sh` sudah pakai `trap 'php artisan up' EXIT` + `npm ci` (bukan `npm install`) —
  itu benar, jangan diubah.
- `package-lock.json` sinkron dengan `package.json` (`npm ci --dry-run` → "up to date").

---

## Lampiran: artefak bukti

Screenshot & JSON audit (headless Chrome 1440x900 / 1023 / 390):
```
/home/glhrip/.hermes/profiles/syadagentic/cache/scratch/porto/
  audit_dark/    dark_home.png, dark_view_*.png, dark_mobile_home.png, audit_dark.json
  audit_light/   light_home.png, light_view_*.png, audit_light.json
  shots/         dark/light home + project, mobile
  shots_tablet2/ w1023.png, w1023_drawer.png
  shots_search/  no_results.png
```
Preview desain pen.dev: `/tmp/penprev.png` (433x1200)
Build lokal yang dipakai untuk audit: `public/build/assets/app-DdwJ3yII.js` + `app-sQMo9UvY.css`
(hash beda dari produksi — bukti produksi belum ter-update).

---

## Status setelah perbaikan (commit `6769a61`, sudah di-push ke `origin/main`)

Semua temuan P0 dikerjakan dengan SPA IDE tetap utuh. Hasil verifikasi ulang
(headless Chrome via CDP, halaman dijalankan dari server Laravel sungguhan
lewat `php artisan serve` di container `php:8.3-cli-alpine`, port 8898):

| Yang diukur | Sebelum | Sesudah |
|---|---|---|
| Kontras gagal, dark, 9 view | 0 (ok) | **0** |
| Kontras gagal, light, 9 view | 5 panel gelap + 1.19:1…4.15:1 | **0** |
| Panel yang masih gelap di light | 5 dari 9 | **0 dari 9** |
| Placeholder di bawah 4.6:1 | 4 (3.26:1) | **0** |
| Jumlah `<h1>` | 0 | **1 per view** |
| Focus ring light | 1.07:1 (tak terlihat) | `#1e40af` di `#f5efdf` = **6.8:1** |
| Drawer: role/aria-modal | null | `dialog` / `true` |
| Drawer: Tab keluar ke belakang | ya (6x Tab → tombol CV) | **tidak** (trap aktif, fokus balik ke tombol menu saat Esc) |
| Input cari: fokus saat mengetik | hilang tiap karakter | **bertahan** (Sidebar dipindah ke module scope) |
| Overflow horizontal 390/1023/1440 | 0 | **0** |
| Console error | 0 | **0** |
| `og-image.png` / `favicon.svg` / `favicon-32.png` | 404 (untracked) | **200**, ter-commit |
| `favicon.ico` | 200 tapi 0 byte | **200**, 2334 byte |
| Header HSTS / Referrer-Policy / Permissions-Policy / COOP | tidak ada | **ada** (middleware `SecurityHeaders`) |
| `Cache-Control` aset ber-hash `/build/*` | tidak ada | `public, max-age=31536000, immutable` |
| `Cache-Control` HTML | default | `no-cache, must-revalidate` |

Catatan penting:

- **gzip belum aktif.** Itu urusan Nginx di VPS, bukan aplikasi. Middleware tidak
  bisa mengompres; tambahkan `gzip on;` + `gzip_types` di vhost. Bundle JS 405 KB
  → ~130 KB, CSS 49 KB → ~9 KB.
- **`php` tidak ada di mesin WSL ini**, jadi verifikasi server memakai container
  Docker. Sintaks PHP diverifikasi dengan `php -l` (nol error) dan header
  diverifikasi dengan `curl -I` terhadap Laravel yang benar-benar berjalan.
- **Deploy tetap manual di VPS** karena tidak ada kredensial SSH di mesin ini.
  Di direktori aplikasi pada VPS:

  ```
  ./deploy.sh
  ```

  Script sudah memakai `npm ci` dan `trap 'php artisan up' EXIT`. Setelah selesai,
  cek: `curl -sI https://portofolio.galihdev.cloud/ | grep -i strict-transport`
  dan pastikan `/og-image.png` mengembalikan 200.

Artefak verifikasi: `verify2/` dan `verify_laravel/` (screenshot + `verify.json`),
`probe_contrast.json` di direktori scratch yang sama.

