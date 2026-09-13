import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { LoginForm } from './login-form'

describe('LoginForm', () => {
  it('renderiza e-mail, senha e o botão Entrar', () => {
    render(<LoginForm />)

    expect(screen.getByLabelText('E-mail')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument()
  })

  it('não mostra confirmação antes do envio', () => {
    render(<LoginForm />)

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('mostra a confirmação (mock) com o e-mail após enviar dados válidos', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    await user.type(screen.getByLabelText('E-mail'), 'voce@exemplo.com')
    await user.type(screen.getByLabelText('Senha'), 'segredo123')
    await user.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(await screen.findByRole('status')).toHaveTextContent('voce@exemplo.com')
  })
})
