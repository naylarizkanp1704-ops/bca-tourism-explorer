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
      <h1 className="text-xl font-bold text-bca-ink mt-3">This page wandered off the map</h1>
      <p className="text-sm text-bca-sub mt-2 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to exploring Indonesia&apos;s
        domestic tourism story.
      </p>
      <Link
        to="/"
        className="mt-7 bg-bca-primary text-white font-semibold text-sm px-6 py-3 rounded-full hover:opacity-90 transition-opacity duration-200 flex items-center gap-2"
      >
        Return Home <ArrowRight size={15} />
      </Link>
    </motion.main>
  );
}
