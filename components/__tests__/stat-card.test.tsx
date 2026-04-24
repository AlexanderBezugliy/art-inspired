import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { StatCard } from '../stat-card'
import { Eye } from 'lucide-react'

describe('StatCard', () => {
  it('renders label and value correctly', () => {
    render(<StatCard icon={Eye} label="Views" value="1,000" />)
    
    expect(screen.getByText('Views')).toBeInTheDocument()
    expect(screen.getByText('1,000')).toBeInTheDocument()
  })

  it('has correct aria-label', () => {
    render(<StatCard icon={Eye} label="Views" value="1,000" />)
    
    const card = screen.getByRole('group')
    expect(card).toHaveAttribute('aria-label', 'Views: 1,000')
  })
})
