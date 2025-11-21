import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Carlos Silva",
    role: "Investidor Iniciante",
    company: "São Paulo, SP",
    content:
      "O Investic mudou completamente minha forma de investir. As recomendações são precisas e me ajudaram a aumentar meus retornos em 25% no primeiro ano. Recomendo para todos!",
    rating: 5,
    avatar: "CS",
  },
  {
    id: 2,
    name: "Marina Costa",
    role: "Gerente Financeira",
    company: "Rio de Janeiro, RJ",
    content:
      "Finalmente encontrei uma plataforma que centraliza tudo que preciso. A interface é intuitiva e o dashboard mostra exatamente o que preciso saber sobre meus investimentos.",
    rating: 5,
    avatar: "MC",
  },
  {
    id: 3,
    name: "Roberto Oliveira",
    role: "Empresário",
    company: "Belo Horizonte, MG",
    content:
      "A segurança e conformidade com LGPD me deram total confiança. Conectei todas as minhas contas e agora tenho uma visão consolidada do meu patrimônio.",
    rating: 5,
    avatar: "RO",
  },
  {
    id: 4,
    name: "Ana Ferreira",
    role: "Analista de Investimentos",
    company: "Curitiba, PR",
    content:
      "Como profissional, aprecio a qualidade das análises. O Investic oferece insights que levam tempo para descobrir manualmente. Excelente ferramenta!",
    rating: 5,
    avatar: "AF",
  },
  {
    id: 5,
    name: "Paulo Mendes",
    role: "Aposentado",
    company: "Salvador, BA",
    content:
      "Não sou muito tech-savvy, mas o Investic é tão fácil de usar que consegui conectar todas as minhas contas em minutos. Adorei!",
    rating: 5,
    avatar: "PM",
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="w-full">
      {/* Carrossel Principal */}
      <div className="relative dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black light:bg-gradient-to-br light:from-white light:via-gray-50 light:to-gray-100 rounded-2xl p-8 md:p-12 border-2 dark:border-gray-700 light:border-gray-300 shadow-2xl min-h-96 flex flex-col justify-between overflow-hidden">
        {/* Efeito de fundo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC107] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFC107] rounded-full blur-3xl"></div>
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 space-y-6">
          {/* Rating */}
          <div className="flex gap-1">
            {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-[#FFC107] text-[#FFC107]"
              />
            ))}
          </div>

          {/* Depoimento */}
          <blockquote className="text-lg md:text-xl dark:text-gray-100 light:text-gray-800 leading-relaxed italic">
            "{currentTestimonial.content}"
          </blockquote>

          {/* Autor */}
          <div className="flex items-center gap-4 pt-4">
            <div className="w-14 h-14 bg-[#FFC107] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-black font-bold text-lg">
                {currentTestimonial.avatar}
              </span>
            </div>
            <div>
              <p className="font-bold dark:text-white light:text-gray-900">{currentTestimonial.name}</p>
              <p className="text-sm dark:text-gray-400 light:text-gray-600">
                {currentTestimonial.role} • {currentTestimonial.company}
              </p>
            </div>
          </div>
        </div>

        {/* Botões de Navegação */}
        <div className="absolute inset-y-0 left-0 flex items-center z-20">
          <button
            onClick={goToPrevious}
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
            className="ml-4 p-2 bg-[#FFC107]/20 hover:bg-[#FFC107]/40 text-[#FFC107] rounded-full transition-all duration-300 transform hover:scale-110"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center z-20">
          <button
            onClick={goToNext}
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
            className="mr-4 p-2 bg-[#FFC107]/20 hover:bg-[#FFC107]/40 text-[#FFC107] rounded-full transition-all duration-300 transform hover:scale-110"
            aria-label="Próximo depoimento"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Indicadores (Dots) */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-[#FFC107] w-8"
                : "dark:bg-gray-600 light:bg-gray-400 dark:hover:bg-gray-500 light:hover:bg-gray-300 w-3"
            }`}
            aria-label={`Ir para depoimento ${index + 1}`}
          />
        ))}
      </div>

      {/* Miniaturas (Thumbnails) */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.id}
            onClick={() => goToSlide(index)}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              index === currentIndex
                ? "bg-[#FFC107]/20 border-[#FFC107]"
                : "dark:bg-gray-800 light:bg-gray-100 dark:border-gray-700 light:border-gray-300 dark:hover:border-gray-600 light:hover:border-gray-400"
            }`}
          >
            <div className="w-10 h-10 bg-[#FFC107] rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-black font-bold text-sm">
                {testimonial.avatar}
              </span>
            </div>
            <p className="text-xs font-semibold dark:text-white light:text-gray-900 text-center line-clamp-2">
              {testimonial.name}
            </p>
            <p className="text-xs dark:text-gray-400 light:text-gray-600 text-center">
              {testimonial.role}
            </p>
          </button>
        ))}
      </div>

      {/* Contador */}
      <div className="text-center mt-8">
        <p className="text-sm dark:text-gray-400 light:text-gray-600">
          <span className="text-[#FFC107] font-bold">{currentIndex + 1}</span> de{" "}
          <span className="text-[#FFC107] font-bold">{testimonials.length}</span>
        </p>
      </div>
    </div>
  );
}