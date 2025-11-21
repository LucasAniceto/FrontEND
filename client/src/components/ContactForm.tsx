import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, AlertCircle, CheckCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  // Validação de email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar formulário
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validar nome
    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Nome deve ter pelo menos 3 caracteres";
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }

    // Validar mensagem
    if (!formData.message.trim()) {
      newErrors.message = "Mensagem é obrigatória";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Mensagem deve ter pelo menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Lidar com mudanças nos campos
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Lidar com envio do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simular envio para servidor
      // Em produção, isso seria uma chamada real para uma API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Sucesso
      setSubmitStatus("success");
      setSubmitMessage("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      setFormData({ name: "", email: "", message: "" });

      // Limpar mensagem de sucesso após 5 segundos
      setTimeout(() => {
        setSubmitStatus("idle");
        setSubmitMessage("");
      }, 5000);
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo Nome */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-black mb-2">
            Nome Completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu nome completo"
            className={`w-full px-4 py-3 border-2 rounded-lg font-medium transition-all focus:outline-none ${
              errors.name
                ? "border-red-500 bg-red-50 focus:border-red-600"
                : "border-gray-300 bg-white focus:border-[#FFC107]"
            }`}
          />
          {errors.name && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.name}</span>
            </div>
          )}
        </div>

        {/* Campo Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu.email@exemplo.com"
              className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg font-medium transition-all focus:outline-none ${
                errors.email
                  ? "border-red-500 bg-red-50 focus:border-red-600"
                  : "border-gray-300 bg-white focus:border-[#FFC107]"
              }`}
            />
          </div>
          {errors.email && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        {/* Campo Mensagem */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-black mb-2">
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Sua mensagem aqui... (mínimo 10 caracteres)"
            rows={5}
            className={`w-full px-4 py-3 border-2 rounded-lg font-medium transition-all focus:outline-none resize-none ${
              errors.message
                ? "border-red-500 bg-red-50 focus:border-red-600"
                : "border-gray-300 bg-white focus:border-[#FFC107]"
            }`}
          />
          <div className="flex justify-between items-center mt-2">
            <div>
              {errors.message && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.message}</span>
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500">
              {formData.message.length}/10 caracteres mínimos
            </span>
          </div>
        </div>

        {/* Mensagem de Status */}
        {submitStatus === "success" && (
          <div className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">{submitMessage}</span>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-700 font-medium">{submitMessage}</span>
          </div>
        )}

        {/* Botão de Envio */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent text-black hover:bg-yellow-500 font-semibold text-base h-12 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Enviando...
            </div>
          ) : (
            "Enviar Mensagem"
          )}
        </Button>

        {/* Texto de Privacidade */}
        <p className="text-xs text-gray-600 text-center">
          Seus dados serão tratados conforme nossa{" "}
          <a href="#" className="text-accent font-semibold hover:underline">
            Política de Privacidade
          </a>
          . Respeitamos a LGPD.
        </p>
      </form>
    </div>
  );
}