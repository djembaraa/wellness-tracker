# Proyek: Wellness Tracker Dashboard - EmergencyyCall

Prototipe web dashboard untuk study case frontend di EmergencyyCall.

**Link Deploy:** [https://nama-proyek-kamu.vercel.app/](https://nama-proyek-kamu.vercel.app/)

---

## Framework & Tools yang Digunakan

* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Komponen UI:** shadcn/ui
* **Grafik:** Recharts (via shadcn/ui charts)
* **Visual:** Lottie-React (untuk animasi yang menenangkan)
* **Deployment:** Vercel
* **Linting/Formatting:** ESLint & Prettier

---

## Alasan Pemilihan Desain & Struktur Komponen

### Pendekatan Desain

Tujuan utamanya adalah menerjemahkan identitas brand "EmergencyyCall" yang **hangat dan tenang** (dari desain main web) ke dalam sebuah dashboard yang fungsional.

1.  **Palet Warna:** Saya mengadopsi palet warna hijau lembut dan minimalis dari *main web* untuk menciptakan kesinambungan brand dan memberikan efek *calming* pada pengguna saat melihat data mereka.
2.  **Visual "Mindful":** Saya sengaja menggunakan `lottie-react` untuk beberapa ikon kunci. Animasi yang halus (seperti napas atau detak jantung) lebih "manusiawi" dan *mindful* dibandingkan ikon statis, sejalan dengan nilai *emotional design*.
3.  **Struktur:** Layout mengadopsi *sidebar* navigasi standar untuk *desktop* (intuitif) dan *bottom navigation* atau *hamburger menu* (menggunakan shadcn/ui Sheet) di *mobile* agar tetap responsif dan *accessible*.

### Struktur Komponen

Proyek ini dibangun dengan 3 komponen utama (sesuai requirement):

1.  **CounselingSummary:** Menggunakan `<Card>` dari shadcn untuk menyajikan data kunci (KPI) secara jelas dan ringkas.
2.  **MoodGraph:** Menggunakan `<LineChart>` dari Recharts untuk visualisasi tren. Warna garis grafik disesuaikan dengan warna primer brand.
3.  **DailyMotivation:** Komponen ini mengambil pesan acak saat *load* untuk memberikan *engagement* emosional positif setiap kali pengguna membuka dashboard.

---

## Rencana Integrasi dengan Backend (Next Stage)

Aplikasi ini dibangun "siap-backend". Saat ini, semua komponen mengambil data dari file *dummy* lokal (`lib/data.ts`).

Rencana integrasi selanjutnya (menggunakan **Supabase** seperti yang disarankan):

1.  **Autentikasi:** Mengganti *mock login* dengan Supabase Auth (misal: *magic link* atau *social auth*).
2.  **API Routes:** Data dummy akan diganti dengan *API route* Next.js (misal: `app/api/wellness/route.ts`).
3.  **Koneksi Supabase:** *API route* tersebut akan bertindak sebagai *server* yang aman untuk berkomunikasi dengan *database* Supabase.
    * `GET /api/wellness/summary`: Akan mem-fetch data agregat dari tabel `counseling_sessions`.
    * `GET /api/wellness/mood`: Akan mem-fetch data dari tabel `mood_logs` untuk 7 hari terakhir.
4.  **Data Fetching di Client:** Komponen *client* akan menggunakan `fetch` (atau `useSWR`/`react-query`) untuk memanggil *API route* tersebut, bukan lagi mengimpor dari `lib/data.ts`.