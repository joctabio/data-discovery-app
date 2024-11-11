import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../page'
 
describe('Landing Page', () => {
  it('renders an image', () => {
    render(<Page />)
 
    const header = screen.getByRole('heading', { level: 1});
 
    expect(header).toBeInTheDocument()
  })
})