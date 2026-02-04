import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import ContactSection from './ContactSection'

describe('ContactSection', () => {
  it('renders the Get In Touch heading', () => {
    render(<ContactSection />)
    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
  })

  it('renders the contact form with name, email, and message fields', () => {
    const { container } = render(<ContactSection />)
    expect(container.querySelector('#contact-name')).toBeInTheDocument()
    expect(container.querySelector('#contact-email')).toBeInTheDocument()
    expect(container.querySelector('#contact-message')).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    render(<ContactSection />)
    const button = screen.getByRole('button', { name: /send message/i })
    expect(button).toBeInTheDocument()
  })

  it('includes a honeypot field that is hidden', () => {
    const { container } = render(<ContactSection />)
    const honeypot = container.querySelector('input[name="website"]')
    expect(honeypot).toBeInTheDocument()
    expect(honeypot).toHaveAttribute('aria-hidden', 'true')
    expect(honeypot).toHaveAttribute('tabindex', '-1')
  })

  it('renders social links', () => {
    render(<ContactSection />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThanOrEqual(1)
  })
})
