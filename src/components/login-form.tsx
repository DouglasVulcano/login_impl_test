import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState<{ email: string } | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Placeholder: aqui entraria a chamada de autenticação real.
    setSubmitted({ email })
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Entrar</CardTitle>
        <CardDescription>Informe seu e-mail e senha para acessar sua conta.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="voce@exemplo.com"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <a
                href="#"
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Esqueceu a senha?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {submitted && (
            <p className="text-sm text-muted-foreground" role="status">
              Formulário enviado para <strong>{submitted.email}</strong> (mock).
            </p>
          )}
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button type="submit" className="w-full">
            Entrar
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Não tem conta?{' '}
            <a href="#" className="text-foreground underline underline-offset-4">
              Cadastre-se
            </a>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
