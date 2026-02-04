import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import MagneticButton from './MagneticButton'

describe('MagneticButton', () => {
  it('renders children', () => {
    render(<MagneticButton>Click me</MagneticButton>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('renders as a button by default', () => {
    render(<MagneticButton>Button</MagneticButton>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders as an anchor when href is provided', () => {
    render(<MagneticButton href="#projects">Link</MagneticButton>)
    expect(screen.getByRole('link')).toHaveAttribute('href', '#projects')
  })

  it('calls onClick handler', async () => {
    const handleClick = vi.fn()
    render(<MagneticButton onClick={handleClick}>Click</MagneticButton>)
    await userEvent.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalledOnce()
  })
})
