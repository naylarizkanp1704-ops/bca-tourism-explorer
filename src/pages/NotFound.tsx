import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-bca-soft"
    >
      <img src={`${import.meta.env.BASE_URL}logo/bca-logo.svg`} alt="BCA" className="h-7 mb-8 opacity-80" />
      <p className="text-6xl font-bold text-bca-primary tracking-tight">404</p>
      <h1 className="text-xl font-bold text-bca-ink mt-3">Halaman ini tersesat dari peta</h1>
      <p className="text-sm text-bca-sub mt-2 max-w-sm">
        Halaman yang kamu cari tidak ditemukan. Yuk kembali menjelajahi cerita pariwisata domestik Indonesia.
      </p>
      <Link
        to="/"
        className="mt-7 bg-bca-primary text-white font-semibold text-sm px-6 py-3 rounded-full hover:opacity-90 transition-opacity duration-200 flex items-center gap-2"
      >
        Kembali ke Beranda <ArrowRight size={15} />
      </Link>
    </motion.main>
  );
}
