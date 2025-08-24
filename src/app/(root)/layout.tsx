import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-2 min-h-screen flex flex-col text-foreground">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
