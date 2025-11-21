import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme as "dark" | "light")
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="border-gray-700 text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-800 light:hover:bg-gray-100"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </Button>
  )
}
