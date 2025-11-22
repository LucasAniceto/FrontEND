import { Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLocation } from "wouter";

export default function Contact() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 light:bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gray-900 light:bg-white border-b border-gray-800 light:border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-gray-300 light:text-gray-700 hover:text-[#FFC107] transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Voltar</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FFC107] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">I</span>
            </div>
            <span className="font-bold text-xl text-white light:text-gray-900 hidden sm:inline">Investic</span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white light:text-gray-900 mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl text-gray-300 light:text-gray-700 max-w-2xl mx-auto">
            Tem dúvidas sobre o Investic? Estamos aqui para ajudar! Preencha o formulário abaixo e entraremos em contato em breve.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-16 md:py-24 bg-gray-900 light:bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Contact Info */}
            <div className="md:col-span-1 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-white light:text-gray-900 mb-4">Informações de Contato</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#FFC107]/10 rounded-lg flex items-center justify-center flex-shrink-0 text-[#FFC107]">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-white light:text-gray-900">Email</p>
                      <p className="text-gray-400 light:text-gray-600">contato@investic.com.br</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#FFC107]/10 rounded-lg flex items-center justify-center flex-shrink-0 text-[#FFC107]">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-white light:text-gray-900">Telefone</p>
                      <p className="text-gray-400 light:text-gray-600">(11) 3000-0000</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#FFC107]/10 rounded-lg flex items-center justify-center flex-shrink-0 text-[#FFC107]">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-white light:text-gray-900">Endereço</p>
                      <p className="text-gray-400 light:text-gray-600">São Paulo, SP - Brasil</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div>
                <h3 className="text-lg font-bold text-white light:text-gray-900 mb-4">Perguntas Frequentes</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-[#FFC107] font-medium hover:underline">
                      Como conectar minhas contas?
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#FFC107] font-medium hover:underline">
                      Meus dados são seguros?
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#FFC107] font-medium hover:underline">
                      Qual é o custo?
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#FFC107] font-medium hover:underline">
                      Como funciona a IA?
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-gray-800 light:bg-gray-50 p-8 md:p-12 border-2 border-gray-700 light:border-gray-300 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-white light:text-gray-900 mb-8">Envie-nos uma Mensagem</h2>
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-700 light:border-gray-300">
            <div className="bg-gray-800 light:bg-gray-50 p-8 rounded-xl border-2 border-gray-700 light:border-gray-300">
              <h3 className="text-lg font-bold text-white light:text-gray-900 mb-3">Tempo de Resposta</h3>
              <p className="text-gray-300 light:text-gray-700">
                Respondemos a todas as mensagens em até 24 horas úteis. Para assuntos urgentes, entre em contato por telefone.
              </p>
            </div>
            <div className="bg-gray-800 light:bg-gray-50 p-8 rounded-xl border-2 border-gray-700 light:border-gray-300">
              <h3 className="text-lg font-bold text-white light:text-gray-900 mb-3">Horário de Atendimento</h3>
              <p className="text-gray-300 light:text-gray-700">
                Segunda a sexta: 09h às 18h (Horário de Brasília)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 light:bg-white text-gray-400 light:text-gray-600 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#FFC107] rounded flex items-center justify-center">
                  <span className="text-black font-bold text-sm">I</span>
                </div>
                <span className="font-bold text-white light:text-gray-900">Investic</span>
              </div>
              <p className="text-sm">Seu aplicativo centralizado de investimentos.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white light:text-gray-900 mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="hover:text-[#FFC107] transition">
                    Funcionalidades
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-[#FFC107] transition">
                    Preços
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-[#FFC107] transition">
                    Segurança
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white light:text-gray-900 mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="hover:text-[#FFC107] transition">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-[#FFC107] transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#FFC107] transition">
                    Contato
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white light:text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="hover:text-[#FFC107] transition">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-[#FFC107] transition">
                    Termos
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-[#FFC107] transition">
                    LGPD
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 light:border-gray-200 pt-8 text-center text-sm">
            <p>&copy; 2025 Investic. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}