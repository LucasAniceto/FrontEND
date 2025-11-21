import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Página não encontrada</h2>
        <p className="text-gray-400 mb-8">
          A página que você está procurando não existe ou foi removida.
        </p>
        <Button
          onClick={() => setLocation("/")}
          className="bg-accent text-black hover:bg-yellow-500 font-semibold"
        >
          Voltar ao Início
        </Button>
      </div>
    </div>
  );
}