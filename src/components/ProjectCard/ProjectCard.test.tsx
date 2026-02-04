import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/test-utils'
import ProjectCard from './ProjectCard'
import type { Project } from '@/types'

/* Mock vanilla-tilt — it needs real DOM measurements not available in jsdom */
vi.mock('vanilla-tilt', () => ({
  default: {
    init: vi.fn(),
  },
}))

const mockProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  description: 'A test project description.',
  techStack: ['React', 'TypeScript'],
  liveUrl: 'https://example.com',
  sourceUrl: 'https://github.com/example',
  imageAlt: 'Test project screenshot',
}

describe('ProjectCard', () => {
  it('renders project title and description', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('A test project description.')).toBeInTheDocument()
  })

  it('renders tech stack tags', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders project links with correct hrefs', () => {
    render(<ProjectCard project={mockProject} />)
    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', 'https://example.com')
    expect(links[1]).toHaveAttribute('href', 'https://github.com/example')
  })

  it('omits live demo link when liveUrl is not provided', () => {
    const projectNoLive = { ...mockProject, liveUrl: undefined }
    render(<ProjectCard project={projectNoLive} />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(1)
  })
})
