import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import ResumeSection from './ResumeSection'
import { experience } from '@/data/experience'
import { skills } from '@/data/skills'

describe('ResumeSection', () => {
  it('renders the Experience heading', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Experience')).toBeInTheDocument()
  })

  it('renders only the reqs/sec and fraud stats', () => {
    render(<ResumeSection />)
    expect(screen.getByText('reqs/sec handled')).toBeInTheDocument()
    expect(screen.getByText('fraud accounts caught')).toBeInTheDocument()
    // Removed stats should not appear
    expect(screen.queryByText('issues resolved')).not.toBeInTheDocument()
    expect(screen.queryByText('API endpoints shipped')).not.toBeInTheDocument()
  })

  it('renders all experience entries from data', () => {
    render(<ResumeSection />)
    for (const item of experience) {
      expect(screen.getByText(item.role)).toBeInTheDocument()
      // Use getAllByText because multiple entries can share a company name (e.g. VMware)
      const companyMatches = screen.getAllByText(item.company)
      expect(companyMatches.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('does not render a college/education entry in the timeline', () => {
    render(<ResumeSection />)
    // Education should only appear in the sidebar, not the timeline
    const timelineRoles = experience.map((e) => e.role)
    expect(timelineRoles).not.toContain(
      expect.stringContaining('B.Sc.'),
    )
  })

  it('renders the Education sidebar card', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(screen.getByText('B.Sc. Computer Science')).toBeInTheDocument()
    expect(screen.getByText('Northeastern University')).toBeInTheDocument()
    expect(screen.getByText('Graduated December 2021')).toBeInTheDocument()
  })

  it('renders all four tech stack categories', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Languages')).toBeInTheDocument()
    expect(screen.getByText('Frameworks & Libraries')).toBeInTheDocument()
    expect(screen.getByText('Cloud & Infrastructure')).toBeInTheDocument()
    expect(screen.getByText('Tools & Observability')).toBeInTheDocument()
  })

  it('renders every skill from the data', () => {
    render(<ResumeSection />)
    for (const skill of skills) {
      expect(screen.getByText(skill.name)).toBeInTheDocument()
    }
  })

  it('renders the Rising Stars award', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Rising Stars Program Award')).toBeInTheDocument()
  })

  it('renders the #1 SSE award with Trust & Safety vertical and December 2025', () => {
    render(<ResumeSection />)
    expect(
      screen.getByText('#1 Ranked Senior Software Engineer'),
    ).toBeInTheDocument()
    const awardOrg = screen.getByText(/Trust & Safety/)
    expect(awardOrg).toBeInTheDocument()
    expect(awardOrg.textContent).toContain('December 2025')
  })
})
