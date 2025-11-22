import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, TrendingUp, BarChart3, Zap, Shield, BookOpen, LogOut, BookMarked, BarChart2 } from "lucide-react";
import { APP_TITLE } from "@/const";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { LoginModal } from "@/components/LoginModal";
import { RegisterModal } from "@/components/RegisterModal";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, logout: handleLogout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const scrollToFeatures = () => {
    const element = document.getElementById('features');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 light:bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 dark:bg-gray-900 light:bg-white dark:border-gray-800 light:border-gray-200 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FFC107] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">I</span>
            </div>
            <span className="font-bold text-xl dark:text-white light:text-gray-900 hidden sm:inline">{APP_TITLE}</span>
          </div>
          <div className="flex gap-4 items-center">
            <button
              onClick={scrollToFeatures}
              className="dark:text-gray-300 light:text-gray-700 hover:text-[#FFC107] transition-colors font-medium"
            >
              Funcionalidades
            </button>
            <button
              onClick={() => setLocation('/contato')}
              className="dark:text-gray-300 light:text-gray-700 hover:text-[#FFC107] transition-colors font-medium hidden sm:inline"
            >
              Contato
            </button>

            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setLocation('/dashboard')}
                  className="flex items-center gap-2 dark:text-gray-300 light:text-gray-700 hover:text-[#FFC107] transition-colors font-medium"
                >
                  <BarChart2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </button>
                <button
                  onClick={() => setLocation('/aprendizado')}
                  className="flex items-center gap-2 dark:text-gray-300 light:text-gray-700 hover:text-[#FFC107] transition-colors font-medium"
                >
                  <BookMarked className="w-4 h-4" />
                  <span className="hidden sm:inline">Aprender</span>
                </button>
                <ThemeToggle />
                <Button
                  onClick={() => {
                    handleLogout()
                    setLocation('/')
                  }}
                  variant="outline"
                  className="dark:border-gray-700 light:border-gray-300 dark:text-gray-300 light:text-gray-700 dark:hover:bg-gray-800 light:hover:bg-gray-100 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sair</span>
                </Button>
              </>
            ) : (
              <>
                <ThemeToggle />
                <Button
                  onClick={() => setIsLoginOpen(true)}
                  className="bg-[#FFC107] text-black hover:bg-[#FFB800] font-semibold"
                >
                  Conectar
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black light:bg-gradient-to-br light:from-gray-50 light:via-white light:to-gray-100 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold dark:text-white light:text-gray-900 leading-tight">
                  Seu Aplicativo Centralizado de
                  <span className="text-[#FFC107] block mt-2">Investimentos</span>
                </h1>
                <p className="text-xl dark:text-gray-300 light:text-gray-700 leading-relaxed">
                  Conecte todas as suas contas financeiras e receba recomendações inteligentes de investimentos personalizadas com base no seu perfil e objetivos.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#FFC107] text-black hover:bg-[#FFB800] font-semibold text-base h-14">
                  Começar Agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="dark:border-2 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black light:border-2 light:border-gray-900 light:text-gray-900 light:hover:bg-gray-900 light:hover:text-white font-semibold text-base h-14"
                >
                  Saiba Mais
                </Button>
              </div>
              <div className="flex gap-8 pt-4">
                <div>
                  <p className="text-2xl font-bold dark:text-white light:text-gray-900">50K+</p>
                  <p className="dark:text-gray-400 light:text-gray-600">Usuários Ativos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold dark:text-white light:text-gray-900">R$ 2B+</p>
                  <p className="dark:text-gray-400 light:text-gray-600">Sob Análise</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative h-96 md:h-full min-h-96" style={{width: '450px', height: '480px'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-3xl" style={{width: '450px', height: '480px'}}></div>
              <div className="relative h-full flex items-center justify-center" style={{width: '450px', height: '480px'}}>
                <div className="space-y-4 w-full max-w-sm">
                  <Card className="p-6 border-2 dark:border-gray-700 light:border-gray-300 shadow-lg dark:bg-gray-800 light:bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold dark:text-gray-400 light:text-gray-600">Saldo Total</span>
                      <TrendingUp className="w-5 h-5 text-[#FFC107]" />
                    </div>
                    <p className="text-3xl font-bold dark:text-white light:text-gray-900">R$ 45.230</p>
                    <p className="text-sm text-green-500 font-semibold mt-2">+12.5% este mês</p>
                  </Card>
                  <Card className="p-6 border-2 dark:border-gray-700 light:border-gray-300 shadow-lg dark:bg-gray-800 light:bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold dark:text-gray-400 light:text-gray-600">Recomendações</span>
                      <Zap className="w-5 h-5 text-[#FFC107]" />
                    </div>
                    <p className="text-2xl font-bold dark:text-white light:text-gray-900">3 Novas</p>
                    <p className="text-sm dark:text-gray-400 light:text-gray-600 mt-2">Oportunidades de ganho</p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 dark:bg-gray-800 light:bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold dark:text-white light:text-gray-900 mb-4">
              Por Que Escolher o Investic?
            </h2>
            <p className="text-xl dark:text-gray-300 light:text-gray-700 max-w-2xl mx-auto">
              Funcionalidades poderosas para simplificar sua vida financeira
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Dashboard Consolidado",
                description: "Visualize todos os seus investimentos em um único lugar, com análises em tempo real."
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Recomendações Inteligentes",
                description: "Algoritmos de IA analisam seu perfil e sugerem os melhores investimentos para você."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Segurança de Dados",
                description: "Criptografia AES-256 e conformidade LGPD garantem a proteção de suas informações."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Comparação de Produtos",
                description: "Compare CDBs, fundos, Tesouro e outros produtos com melhor custo-benefício."
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Educação Financeira",
                description: "Aprenda sobre tipos de investimentos, perfis de risco e planejamento financeiro."
              },
              {
                icon: <ArrowRight className="w-8 h-8" />,
                title: "Integração Open Finance",
                description: "Conecte-se com múltiplas instituições financeiras de forma segura e rápida."
              }
            ].map((feature, idx) => (
              <Card key={idx} className="p-8 border-2 dark:border-gray-700 light:border-gray-300 hover:border-[#FFC107] hover:shadow-lg transition-all duration-300 dark:bg-gray-900 light:bg-white">
                <div className="w-12 h-12 bg-[#FFC107]/10 rounded-lg flex items-center justify-center mb-4 text-[#FFC107]">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold dark:text-white light:text-gray-900 mb-3">{feature.title}</h3>
                <p className="dark:text-gray-400 light:text-gray-700 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 md:py-32 dark:bg-gray-900 light:bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold dark:text-white light:text-gray-900 mb-4">
              Dashboard Inteligente
            </h2>
            <p className="text-xl dark:text-gray-300 light:text-gray-700 max-w-2xl mx-auto">
              Visualize sua saúde financeira com gráficos e análises em tempo real
            </p>
          </div>
          <Card className="p-8 md:p-12 border-2 dark:border-gray-700 light:border-gray-300 dark:bg-gray-800 light:bg-gray-50 shadow-xl">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold dark:text-white light:text-gray-900">Rentabilidade Real</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold dark:text-gray-300 light:text-gray-700">CDB</span>
                      <span className="text-sm font-bold dark:text-white light:text-gray-900">8.2%</span>
                    </div>
                    <div className="w-full dark:bg-gray-700 light:bg-gray-300 rounded-full h-2">
                      <div className="bg-[#FFC107] rounded-full h-2 w-4/5"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold dark:text-gray-300 light:text-gray-700">Fundo de Renda Fixa</span>
                      <span className="text-sm font-bold dark:text-white light:text-gray-900">6.5%</span>
                    </div>
                    <div className="w-full dark:bg-gray-700 light:bg-gray-300 rounded-full h-2">
                      <div className="bg-[#FFC107] rounded-full h-2 w-3/5"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold dark:text-gray-300 light:text-gray-700">Poupança</span>
                      <span className="text-sm font-bold dark:text-white light:text-gray-900">3.1%</span>
                    </div>
                    <div className="w-full dark:bg-gray-700 light:bg-gray-300 rounded-full h-2">
                      <div className="bg-[#FFC107] rounded-full h-2 w-2/5"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold dark:text-white light:text-gray-900">Recomendações</h3>
                <div className="space-y-3">
                  <div className="p-3 dark:bg-gray-900 light:bg-gray-100 border-l-4 border-[#FFC107] rounded">
                    <p className="text-sm font-semibold dark:text-white light:text-gray-900">Migre para CDB 115% CDI</p>
                    <p className="text-xs dark:text-gray-400 light:text-gray-600 mt-1">Ganho estimado: +R$ 1.200/ano</p>
                  </div>
                  <div className="p-3 dark:bg-gray-900 light:bg-gray-100 border-l-4 border-[#FFC107] rounded">
                    <p className="text-sm font-semibold dark:text-white light:text-gray-900">Tesouro IPCA+ 2035</p>
                    <p className="text-xs dark:text-gray-400 light:text-gray-600 mt-1">Proteção contra inflação</p>
                  </div>
                  <div className="p-3 dark:bg-gray-900 light:bg-gray-100 border-l-4 border-[#FFC107] rounded">
                    <p className="text-sm font-semibold dark:text-white light:text-gray-900">Fundo Multimercado</p>
                    <p className="text-xs dark:text-gray-400 light:text-gray-600 mt-1">Diversificação de carteira</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold dark:text-white light:text-gray-900">Seu Perfil</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold dark:text-gray-300 light:text-gray-700 mb-2">Perfil de Risco</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`h-2 flex-1 rounded-full ${
                            i <= 3 ? 'bg-[#FFC107]' : 'dark:bg-gray-700 light:bg-gray-300'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <p className="text-xs dark:text-gray-400 light:text-gray-600 mt-1">Moderado</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold dark:text-gray-300 light:text-gray-700 mb-2">Objetivo</p>
                    <p className="text-sm dark:text-white light:text-gray-900 font-medium">Aposentadoria</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold dark:text-gray-300 light:text-gray-700 mb-2">Horizonte</p>
                    <p className="text-sm dark:text-white light:text-gray-900 font-medium">15+ anos</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 dark:bg-gray-800 light:bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold dark:text-white light:text-gray-900 mb-4">
              O Que Nossos Clientes Dizem
            </h2>
            <p className="text-xl dark:text-gray-300 light:text-gray-700 max-w-2xl mx-auto">
              Descubra como o Investic transformou a vida financeira de milhares de investidores
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 dark:bg-black light:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white light:text-white mb-6">
            Comece a Otimizar Seus Investimentos Hoje
          </h2>
          <p className="text-xl dark:text-gray-300 light:text-gray-300 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de investidores que já estão maximizando seus retornos com o Investic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsLoginOpen(true)}
              size="lg"
              className="bg-[#FFC107] text-black hover:bg-yellow-500 font-semibold text-base h-14"
            >
              Conectar Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="dark:border-2 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black light:border-2 light:border-white light:text-white light:hover:bg-white light:hover:text-gray-900 font-semibold text-base h-14"
            >
              Fale Conosco
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dark:bg-gray-900 light:bg-gray-100 dark:text-gray-400 light:text-gray-600 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#FFC107] rounded flex items-center justify-center">
                  <span className="text-black font-bold text-sm">I</span>
                </div>
                <span className="font-bold dark:text-white light:text-gray-900">Investic</span>
              </div>
              <p className="text-sm">Seu aplicativo centralizado de investimentos.</p>
            </div>
            <div>
              <h4 className="font-semibold dark:text-white light:text-gray-900 mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-[#FFC107] transition">Funcionalidades</a></li>
                <li><a href="/" className="hover:text-[#FFC107] transition">Preços</a></li>
                <li><a href="/" className="hover:text-[#FFC107] transition">Segurança</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold dark:text-white light:text-gray-900 mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-[#FFC107] transition">Sobre</a></li>
                <li><a href="/" className="hover:text-[#FFC107] transition">Blog</a></li>
                <li><a href="#" className="hover:text-[#FFC107] transition">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold dark:text-white light:text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-[#FFC107] transition">Privacidade</a></li>
                <li><a href="/" className="hover:text-[#FFC107] transition">Termos</a></li>
                <li><a href="/" className="hover:text-[#FFC107] transition">LGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="dark:border-gray-800 light:border-gray-300 border-t pt-8 text-center text-sm">
            <p>&copy; 2025 Investic. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      {/* Register Modal */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onBackToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </div>
  );
}