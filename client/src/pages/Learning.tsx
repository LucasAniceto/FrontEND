import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  TrendingUp,
  Zap,
  Shield,
  BookOpen,
  ChevronRight,
  Clock,
  Award,
  Target,
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useLocation } from "wouter"
import { ThemeToggle } from "@/components/ThemeToggle"

interface Course {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  lessons: Lesson[]
  difficulty: "iniciante" | "intermediário" | "avançado"
  duration: string
}

interface Lesson {
  id: string
  title: string
  content: string
  videoUrl?: string
}

const COURSES: Course[] = [
  {
    id: "1",
    title: "Introdução aos Investimentos",
    description: "Aprenda os conceitos básicos de investimento e como começar sua jornada financeira",
    icon: <TrendingUp className="w-8 h-8" />,
    color: "bg-blue-500/10 border-blue-500/20",
    difficulty: "iniciante",
    duration: "4 horas",
    lessons: [
      {
        id: "1-1",
        title: "O que é Investimento?",
        content:
          "Um investimento é quando você aplica seu dinheiro em diferentes ativos financeiros com o objetivo de obter lucro ao longo do tempo. Existem vários tipos de investimentos, desde os mais conservadores até os mais agressivos.",
      },
      {
        id: "1-2",
        title: "Primeiros Passos",
        content:
          "Antes de começar a investir, é importante entender suas necessidades, objetivos e quanto de risco você está disposto a tomar. Comece pequeno e vá aprendendo com a experiência.",
      },
      {
        id: "1-3",
        title: "Mitos e Realidades",
        content:
          "Muitas pessoas acreditam que só quem tem muito dinheiro pode investir. Na verdade, você pode começar com pequenas quantias e aumentar gradualmente conforme sua capacidade.",
      },
    ],
  },
  {
    id: "2",
    title: "Tipos de Investimentos",
    description: "Conheça as diferentes opções de investimento disponíveis no mercado brasileiro",
    icon: <Zap className="w-8 h-8" />,
    color: "bg-yellow-500/10 border-yellow-500/20",
    difficulty: "intermediário",
    duration: "6 horas",
    lessons: [
      {
        id: "2-1",
        title: "Renda Fixa",
        content:
          "Renda fixa são investimentos onde você sabe antecipadamente qual será o retorno. Exemplos: Tesouro Direto, CDB, Poupança. São mais seguros, mas com retornos geralmente menores.",
      },
      {
        id: "2-2",
        title: "Renda Variável",
        content:
          "Renda variável são investimentos cujo retorno não é previamente definido. Exemplos: Ações, Fundos de Renda Variável. Oferecem maior potencial de ganho, mas com maior risco.",
      },
      {
        id: "2-3",
        title: "Fundos de Investimento",
        content:
          "Fundos são uma forma de investimento onde um gestor profissional aplica seu dinheiro em uma carteira diversificada de ativos, reduzindo o risco individual.",
      },
      {
        id: "2-4",
        title: "Criptomoedas",
        content:
          "Criptomoedas são moedas digitais descentralizadas. São extremamente voláteis e recomendadas apenas para investidores experientes e com alta tolerância ao risco.",
      },
    ],
  },
  {
    id: "3",
    title: "Perfis de Risco",
    description: "Identifique qual é seu perfil de investidor e como ele influencia suas estratégias",
    icon: <Shield className="w-8 h-8" />,
    color: "bg-green-500/10 border-green-500/20",
    difficulty: "intermediário",
    duration: "3 horas",
    lessons: [
      {
        id: "3-1",
        title: "Perfil Conservador",
        content:
          "Investidores conservadores priorizam a segurança do capital e preferem investimentos com risco baixo, mesmo que o retorno seja menor. Ideal para quem precisa do dinheiro em curto prazo.",
      },
      {
        id: "3-2",
        title: "Perfil Moderado",
        content:
          "Investidores moderados buscam equilíbrio entre segurança e rentabilidade. Costumam mesclar investimentos de renda fixa e renda variável em suas carteiras.",
      },
      {
        id: "3-3",
        title: "Perfil Agressivo",
        content:
          "Investidores agressivos estão dispostos a correr mais risco em busca de maiores retornos. Têm maior capacidade financeira e horizonte de investimento mais longo.",
      },
    ],
  },
  {
    id: "4",
    title: "Liquidez e Rendimento",
    description: "Entenda a relação entre liquidez, rentabilidade e como escolher o melhor investimento",
    icon: <BookOpen className="w-8 h-8" />,
    color: "bg-purple-500/10 border-purple-500/20",
    difficulty: "intermediário",
    duration: "3 horas",
    lessons: [
      {
        id: "4-1",
        title: "O que é Liquidez?",
        content:
          "Liquidez é a facilidade e velocidade com que você consegue converter um investimento em dinheiro. Investimentos com alta liquidez podem ser sacados rapidamente, enquanto outros levam mais tempo.",
      },
      {
        id: "4-2",
        title: "Rendimento Real vs Nominal",
        content:
          "Rendimento nominal é o retorno percentual bruto. Rendimento real é o ganho descontando a inflação. É importante considerar o rendimento real para avaliar se seu investimento está realmente crescendo.",
      },
      {
        id: "4-3",
        title: "Trade-off Liquidez vs Rendimento",
        content:
          "Geralmente, investimentos com maior liquidez têm menor rendimento, e vice-versa. A chave é encontrar o equilíbrio que se adeque aos seus objetivos e necessidades.",
      },
    ],
  },
  {
    id: "5",
    title: "Planejamento Financeiro",
    description: "Aprenda a criar um plano financeiro sólido e alcançar seus objetivos",
    icon: <Target className="w-8 h-8" />,
    color: "bg-red-500/10 border-red-500/20",
    difficulty: "avançado",
    duration: "5 horas",
    lessons: [
      {
        id: "5-1",
        title: "Definindo Objetivos Financeiros",
        content:
          "O primeiro passo é definir claramente seus objetivos: aposentadoria, compra de imóvel, educação dos filhos, etc. Quanto mais específicos, melhor para planejar.",
      },
      {
        id: "5-2",
        title: "Análise de Receita e Despesa",
        content:
          "Faça um levantamento detalhado de suas receitas e despesas mensais. Isso ajuda a identificar onde seu dinheiro está indo e onde você pode economizar para investir.",
      },
      {
        id: "5-3",
        title: "Diversificação de Carteira",
        content:
          "A diversificação é essencial para reduzir riscos. Não coloque todo seu dinheiro em um único ativo. Distribua entre diferentes tipos de investimentos.",
      },
      {
        id: "5-4",
        title: "Revisão e Ajustes",
        content:
          "Revise periodicamente seu plano financeiro e sua carteira. Ajuste conforme suas circunstâncias mudem e conforme você aprende mais sobre investimentos.",
      },
    ],
  },
]

export default function Learning() {
  const { user, isAuthenticated } = useAuth()
  const [, setLocation] = useLocation()
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

  // Redirecionar se não estiver autenticado
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 light:bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold dark:text-white light:text-gray-900 mb-4">Acesso Restrito</h2>
          <p className="dark:text-gray-300 light:text-gray-700 mb-6">
            Você precisa estar logado para acessar a área de aprendizado
          </p>
          <Button
            onClick={() => setLocation("/")}
            className="bg-[#FFC107] text-black hover:bg-[#FFB800] font-semibold"
          >
            Voltar para Home
          </Button>
        </div>
      </div>
    )
  }

  // Exibir conteúdo da lição
  if (selectedLesson) {
    return (
      <div className="min-h-screen dark:bg-gray-900 light:bg-white">
        {/* Header */}
        <div className="dark:bg-gray-800 light:bg-gray-50 border-b dark:border-gray-700 light:border-gray-300 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => setSelectedLesson(null)}
              className="flex items-center gap-2 text-[#FFC107] hover:text-[#FFB800] transition"
            >
              ← Voltar
            </button>
            <h1 className="dark:text-white light:text-gray-900 font-bold">Aprendizado</h1>
            <ThemeToggle />
          </div>
        </div>

        {/* Conteúdo */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold dark:text-white light:text-gray-900 mb-2">{selectedLesson.title}</h2>
            <p className="dark:text-gray-400 light:text-gray-600 mb-8">
              {selectedCourse?.title}
            </p>

            <Card className="p-8 border-2 dark:border-gray-700 light:border-gray-300 dark:bg-gray-800 light:bg-gray-50">
              <div className="prose prose-invert max-w-none">
                <p className="dark:text-gray-300 light:text-gray-700 text-lg leading-relaxed mb-6">
                  {selectedLesson.content}
                </p>

                <div className="mt-8 p-6 dark:bg-blue-900/20 light:bg-blue-50 border dark:border-blue-700/50 light:border-blue-200 rounded-lg">
                  <h3 className="dark:text-blue-300 light:text-blue-700 font-semibold mb-2">💡 Dica Importante</h3>
                  <p className="dark:text-gray-300 light:text-gray-700">
                    Pratique os conhecimentos adquiridos! Comece com pequenos investimentos e observe como o mercado funciona. A experiência prática é fundamental.
                  </p>
                </div>
              </div>
            </Card>

            {/* Navegação de Lições */}
            <div className="mt-12">
              <h3 className="text-xl font-bold dark:text-white light:text-gray-900 mb-6">Outras Lições do Curso</h3>
              <div className="space-y-3">
                {selectedCourse?.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition ${
                      selectedLesson.id === lesson.id
                        ? "border-[#FFC107] bg-[#FFC107]/10"
                        : "dark:border-gray-700 light:border-gray-300 dark:bg-gray-800 light:bg-gray-50 dark:hover:border-gray-600 light:hover:border-gray-400"
                    }`}
                  >
                    <p className="dark:text-white light:text-gray-900 font-semibold">{lesson.title}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Exibir detalhes do curso
  if (selectedCourse) {
    return (
      <div className="min-h-screen dark:bg-gray-900 light:bg-white">
        {/* Header */}
        <div className="dark:bg-gray-800 light:bg-gray-50 border-b dark:border-gray-700 light:border-gray-300 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => setSelectedCourse(null)}
              className="flex items-center gap-2 text-[#FFC107] hover:text-[#FFB800] transition"
            >
              ← Voltar
            </button>
            <h1 className="dark:text-white light:text-gray-900 font-bold">Aprendizado</h1>
            <ThemeToggle />
          </div>
        </div>

        {/* Conteúdo */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-6 mb-8">
              <div className={`p-4 rounded-lg ${selectedCourse.color}`}>
                {selectedCourse.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-4xl font-bold dark:text-white light:text-gray-900 mb-2">
                  {selectedCourse.title}
                </h2>
                <p className="dark:text-gray-400 light:text-gray-600 text-lg mb-4">
                  {selectedCourse.description}
                </p>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center gap-2 dark:text-gray-300 light:text-gray-700">
                    <Clock className="w-5 h-5" />
                    {selectedCourse.duration}
                  </div>
                  <div className="flex items-center gap-2 dark:text-gray-300 light:text-gray-700">
                    <Award className="w-5 h-5" />
                    {selectedCourse.difficulty.charAt(0).toUpperCase() +
                      selectedCourse.difficulty.slice(1)}
                  </div>
                </div>
              </div>
            </div>

            {/* Lições */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold dark:text-white light:text-gray-900 mb-6">Lições do Curso</h3>
              {selectedCourse.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                  className="w-full p-6 rounded-lg border-2 dark:border-gray-700 light:border-gray-300 dark:bg-gray-800 light:bg-gray-50 dark:hover:border-[#FFC107] light:hover:border-[#FFC107] dark:hover:bg-gray-750 light:hover:bg-gray-100 transition flex items-center justify-between group"
                >
                  <div className="text-left">
                    <p className="dark:text-white light:text-gray-900 font-semibold group-hover:text-[#FFC107] transition">
                      {lesson.title}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 dark:text-gray-400 light:text-gray-600 group-hover:text-[#FFC107] transition" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Listagem de cursos
  return (
    <div className="min-h-screen dark:bg-gray-900 light:bg-white">
      {/* Header */}
      <nav className="sticky top-0 z-50 dark:bg-gray-900 light:bg-white border-b dark:border-gray-800 light:border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 dark:text-gray-300 light:text-gray-700 hover:text-[#FFC107] transition"
          >
            ← Home
          </button>
          <h1 className="dark:text-white light:text-gray-900 font-bold text-xl">Centro de Aprendizado</h1>
          <div className="flex items-center gap-3">
            <div className="dark:text-gray-400 light:text-gray-600 text-sm">
              Bem-vindo, <span className="text-[#FFC107]">{user?.name}</span>!
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-5xl font-bold dark:text-white light:text-gray-900 mb-4">
            Expanda Seu Conhecimento Financeiro
          </h2>
          <p className="text-xl dark:text-gray-300 light:text-gray-700 max-w-2xl">
            Explore nossos cursos e aprenda sobre tipos de investimentos, perfis de risco,
            rendimento, liquidez e planejamento financeiro.
          </p>
        </div>

        {/* Grid de Cursos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((course) => (
            <button
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className={`p-6 rounded-lg border-2 ${course.color} hover:shadow-lg transition text-left`}
            >
              <div className="dark:text-white light:text-gray-900 mb-4">{course.icon}</div>
              <h3 className="text-xl font-bold dark:text-white light:text-gray-900 mb-2">{course.title}</h3>
              <p className="dark:text-gray-300 light:text-gray-700 text-sm mb-4">{course.description}</p>
              <div className="flex items-center gap-2 dark:text-gray-400 light:text-gray-600 text-sm">
                <ChevronRight className="w-4 h-4" />
                {course.lessons.length} lições
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
