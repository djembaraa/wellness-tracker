🧘 Wellness Tracker Dashboard - EmergencyyCall

Dibuat oleh:
👨‍💻 Djembar Arafat
📍 Purwokerto – Web Developer

📖 Deskripsi Proyek

Prototipe Wellness Tracker Dashboard ini dibuat sebagai bagian dari study case frontend untuk EmergencyyCall.
Tujuannya adalah menampilkan tampilan dashboard yang ringan, fungsional, dan selaras dengan nilai emotional design khas EmergencyyCall — yaitu hangat, tenang, dan mindful.

🌐 Link

GitHub Repository: https://github.com/djembaraa/wellness-tracker.git

Link Deploy (Vercel): https://wellness-tracker-weld.vercel.app/
---

## 🚀 Memulai (Getting Started)

Berikut adalah langkah-langkah untuk menjalankan proyek ini secara lokal di komputermu.

### Prasyarat

Pastikan kamu sudah menginstal:
* **Node.js** (Versi 18 atau lebih tinggi direkomendasikan)
* **npm** atau **yarn** (npm biasanya sudah terinstal bersama Node.js)

### Instalasi

1.  **Clone Repository:**
    Buka terminalmu dan jalankan perintah berikut:
    ```bash
    git clone [https://github.com/djembaraa/wellness-tracker.git](https://github.com/djembaraa/wellness-tracker.git)
    cd wellness-tracker
    ```

2.  **Install Dependencies:**
    Install semua paket yang dibutuhkan oleh proyek:
    ```bash
    npm install
    # atau jika menggunakan yarn:
    # yarn install
    ```

3.  **Setup Environment Variables:**
    * Buat file baru di *root* proyek bernama `.env.local`.
    * Salin isi dari file `.env.example` (jika ada) atau tambahkan variabel berikut ke `.env.local`:
        ```bash
        NEXT_PUBLIC_SUPABASE_URL="URL_SUPABASE_PROJECT_KAMU"
        NEXT_PUBLIC_SUPABASE_ANON_KEY="ANON_KEY_SUPABASE_PROJECT_KAMU"
        ```
    * Ganti `URL_SUPABASE_PROJECT_KAMU` dan `ANON_KEY_SUPABASE_PROJECT_KAMU` dengan kredensial Supabase kamu. Kamu bisa mendapatkannya dari dashboard Supabase > Project Settings > API.

4.  **Jalankan Development Server:**
    Mulai aplikasi Next.js dalam mode development:
    ```bash
    npm run dev
    # atau jika menggunakan yarn:
    # yarn dev
    ```

5.  **Buka Aplikasi:**
    Buka browser kamu dan navigasi ke `http://localhost:3000`. Kamu seharusnya bisa melihat aplikasi berjalan.

---

⚙️ Framework & Tools yang Digunakan

* Framework: Next.js (App Router)
* Styling: Tailwind CSS
* Komponen UI: shadcn/ui
* Grafik: Recharts (via shadcn/ui charts)
* Animasi: Lottie-React (untuk visual yang menenangkan)
* Deployment: Vercel
* Linting & Formatting: ESLint & Prettier

---

🎨 Alasan Pemilihan Desain & Struktur Komponen
🧩 Pendekatan Desain

Tujuan utama desain adalah menerjemahkan identitas brand EmergencyyCall yang hangat dan tenang ke dalam tampilan dashboard yang tetap fungsional dan nyaman digunakan.

* **Palet Warna:** Mengadopsi warna hijau lembut dan minimalis dari main web untuk memberikan kesinambungan brand serta efek calming.
* **Visual Mindful:** Menggunakan Lottie-react untuk menampilkan animasi lembut (seperti napas atau detak jantung) yang terasa lebih manusiawi dibandingkan ikon statis.
* **Struktur Layout:**
    * Desktop: Sidebar navigasi klasik untuk pengalaman intuitif.
    * Mobile: Menggunakan shadcn/ui Sheet sebagai bottom navigation/hamburger menu agar tetap responsif dan mudah diakses.

🧱 Struktur Komponen

Proyek ini memiliki tiga komponen utama sesuai dengan requirement:

* **CounselingSummary**
    * Menggunakan `<Card>` dari shadcn/ui.
    * Menampilkan data utama seperti jumlah sesi konseling dan durasi rata-rata.
* **MoodGraph**
    * Menggunakan `<LineChart>` dari Recharts.
    * Menampilkan tren perubahan mood dalam 7 hari terakhir.
    * Warna grafik disesuaikan dengan warna primer brand.
* **DailyMotivation**
    * Mengambil pesan motivasi acak setiap kali halaman dimuat.
    * Memberikan elemen emotional engagement positif setiap kali pengguna membuka dashboard.

---

🔄 Rencana Integrasi Backend (Next Stage)

Saat ini proyek masih menggunakan dummy data dari lib/data.ts. Namun seluruh struktur sudah dirancang agar siap terhubung dengan backend di tahap berikutnya.

Rencana integrasi backend menggunakan **Supabase**, meliputi:

* **Autentikasi:** Supabase Auth (magic link atau social login).
* **API Routes:**
    * `GET /api/wellness/summary` → Mengambil data agregat dari tabel `counseling_sessions`.
    * `GET /api/wellness/mood` → Mengambil data tren mood dari tabel `mood_logs` (7 hari terakhir).
* **Client Data Fetching:** Menggunakan `fetch()` atau `useSWR` untuk mengambil data secara dinamis dari API, bukan lagi dari file lokal.

---

🎯 Tujuan Studi Kasus

Menilai kemampuan dalam membangun tampilan web yang:

* Fungsional dan efisien.
* Selaras dengan emotional design khas EmergencyyCall.
* Ringan, cepat diakses, dan responsif di semua perangkat.
* Siap diintegrasikan dengan backend di tahap pengembangan selanjutnya.
