// app/page.tsx
"use client";

import Link from "next/link";
// Path impor asli dari kodemu
import { MainNavbar } from "../app/components/layout/main-navbar";
import { MainFooter } from "../app/components/layout/main-footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Brain, TrendingUp, BarChart, Download } from "lucide-react";

// --- TAMBAHAN: Impor Lottie ---
import Lottie from "lottie-react";
// Pastikan path ini benar ke file JSON kamu
import yogaAnimationData from "@/lib/animations/yoga.json";
// --- AKHIR TAMBAHAN ---

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navbar */}
      <MainNavbar />

      <main className="flex-1">
        {/* HERO */}
        <section className="container max-w-screen-xl mx-auto px-6 md:px-10 py-6 md:py-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl leading-tight">
                Wellness Tracker - Lets Care for Your Mind, Quietly
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Pantau emosimu, temukan keseimbangan. Jurnal harian dengan AI
                untuk refleksi diri lebih dalam.
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <Button
                  size="lg"
                  asChild
                  className="bg-[#8CB459] hover:bg-[#7a9d4d]"
                >
                  {/* Menggunakan Link Next.js di dalam Button asChild */}
                  <Link href="/signup">Mulai Sekarang</Link>
                </Button>
                <Button size="lg" variant="outline">
                  Customer Service
                </Button>
              </div>
            </div>

            {/* --- PERUBAHAN DI SINI: Placeholder diganti Lottie --- */}
            <div className="flex items-center justify-center">
              <Lottie
                animationData={yogaAnimationData}
                loop={true}
                className="w-full max-w-md h-auto" // Ukuran bisa disesuaikan jika perlu
              />
            </div>
            {/* --- AKHIR PERUBAHAN --- */}
          </div>
        </section>

        {/* FITUR */}
        <section className="container max-w-screen-xl mx-auto px-6 md:px-10 py-12 md:py-16 ">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 ">
            {[
              {
                icon: <Brain size={40} />,
                title: "Analyze your pattern",
                text: "Lihat pola emosi dan kebiasaan harianmu. Dapatkan wawasan berharga untuk kesejahteraan mentalmu.",
              }, // Ukuran ikon disesuaikan
              {
                icon: <TrendingUp size={40} />,
                title: "See Progress 27kg",
                text: "Before: 80 kg\nAfter: 53 kg\nTurun 27 kg dalam 3 bulan",
              },
              {
                icon: <BarChart size={40} />,
                title: "See Progress Health",
                text: "Jadwalkan harian olahraga dan pantau perkembangannya.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex h-60 flex-col justify-between rounded-lg bg-[#8CB459] p-6 text-primary-foreground transition-all hover:bg-[#7a9d4d] hover:shadow-lg hover:scale-[1.02]"
              >
                <div className="h-10 w-10 text-primary-foreground">
                  {item.icon}
                </div>{" "}
                {/* Warna ikon disesuaikan */}
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-primary-foreground/80 whitespace-pre-line">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* DASHBOARD PREVIEW */}
        <section className="container max-w-screen-xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="rounded-xl bg-gray-100 p-10 md:p-14">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div className="flex flex-col gap-5">
                <span className="text-sm font-semibold text-primary">
                  Personalized Dashboard
                </span>
                <h2 className="text-3xl font-bold text-gray-900 leading-snug">
                  With a personalized dashboard, you can easily monitor and
                  track your mind, body’s performance, and wellness goals.
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Semua data penting, mulai dari mood, durasi tidur, hingga
                  ringkasan sesi, disajikan dalam satu tempat yang mudah diakses
                  dan menenangkan.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="h-[450px] w-full max-w-[250px] rounded-3xl border-8 border-gray-800 bg-white p-2 shadow-2xl">
                  <div className="h-full w-full rounded-2xl bg-primary/10 flex items-center justify-center">
                    <p className="text-primary/50 text-sm">App Mockup</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="container max-w-screen-xl mx-auto px-6 md:px-10 py-24 md:py-32"
        >
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-gray-900">
              Frequently Ask Questions
            </h2>
            <p className="mt-4 text-muted-foreground">
              Berikut adalah jawaban dari pertanyaan yang sering diajukan oleh
              komunitas kami.
            </p>
          </div>

          <Accordion
            type="single"
            collapsible
            className="mx-auto mt-12 max-w-2xl space-y-4"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Bagaimana cara kerja aplikasi ini?
              </AccordionTrigger>
              <AccordionContent>
                Aplikasi ini membantu Anda melacak mood, sesi konseling, dan
                aktivitas harian.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Apakah benar bisa melihat kondisi kesehatanku?
              </AccordionTrigger>
              <AccordionContent>
                Aplikasi ini alat bantu (tracker), bukan alat diagnostik.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Apakah data ini berasal dari perangkat saya secara langsung?
              </AccordionTrigger>
              <AccordionContent>
                Data dikumpulkan dari input manual Anda — seperti jurnal dan
                catatan mood.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Apakah saya akan mendapatkan pesan motivasi setiap hari?
              </AccordionTrigger>
              <AccordionContent>
                Ya, pesan motivasi harian dibuat AI berdasarkan progres Anda.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32">
          <div className="container max-w-screen-xl mx-auto px-6 md:px-10">
            <div className="rounded-xl bg-primary/90 p-10 md:p-14">
              <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
                <div className="flex flex-col gap-5">
                  <h2 className="text-3xl font-bold text-white">
                    Your Health Your Journey
                  </h2>
                  <p className="text-primary-foreground/80 leading-relaxed">
                    Take a deep breath, and start your calm journey today.
                    Download the app and join thousands who choose to care for
                    their mind, quietly.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100"
                    >
                      <Download className="mr-2 h-5 w-5" /> Wellness Tracker
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100"
                    >
                      <Download className="mr-2 h-5 w-5" /> Wellness Tracker
                    </Button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="h-[300px] w-full max-w-[200px] rounded-2xl border-4 border-gray-800 bg-white p-1 shadow-2xl">
                    <div className="h-full w-full rounded-lg bg-primary/10 flex items-center justify-center">
                      <p className="text-primary/50 text-xs">App Mockup</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MainFooter />
    </div>
  );
}
