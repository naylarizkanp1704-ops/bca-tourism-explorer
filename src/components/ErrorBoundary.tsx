import React from "react";

interface Props {
  children: React.ReactNode;
}
interface State {
  hasError: boolean;
  message?: string;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("Unexpected application error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-bca-soft px-6 text-center">
          <img src={`${import.meta.env.BASE_URL}logo/bca-logo.svg`} alt="BCA" className="h-8 mb-6 opacity-80" />
          <h1 className="text-xl font-bold text-bca-ink">Terjadi kesalahan tak terduga</h1>
          <p className="text-sm text-bca-sub mt-2 max-w-md">
            {this.state.message || "Terjadi kesalahan tak terduga saat me-render aplikasi."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-bca-primary text-white text-sm font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Muat Ulang
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
