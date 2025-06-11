import { render } from '@testing-library/react'
import BridgePanel from '../BridgePanel'

describe('BridgePanel', () => {
  it('renders form', () => {
    const { getByText } = render(<BridgePanel />)
    expect(getByText('From Chain')).toBeInTheDocument()
    expect(getByText('To Chain')).toBeInTheDocument()
  })
})
