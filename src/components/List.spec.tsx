import { render, waitFor, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { List } from './List'

describe('App component', () => {
  it('should render list items', () => {
    const { getByText, rerender, unmount, queryByText } = render(<List initialItems={['Leandro', 'Azanniel']} />)

    expect(getByText('Leandro')).toBeInTheDocument()
    expect(getByText('Azanniel')).toBeInTheDocument()

    unmount()
    rerender(<List initialItems={['Azanniel']} />)

    expect(getByText('Azanniel')).toBeInTheDocument()
    expect(queryByText('Leandro')).not.toBeInTheDocument()
  })

  it('should be able to add new item to the list', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<List initialItems={[]} />)

    const inputElement = getByPlaceholderText('Novo Item')
    const addButton = getByText('Adicionar')

    userEvent.type(inputElement, 'Novo')
    userEvent.click(addButton)

    // expect(await findByText('Novo')).toBeInTheDocument()

    await waitFor(() => {
      expect(getByText('Novo')).toBeInTheDocument()
    })
  })

  it('should be able to remove item from the list', async () => {
    const { getByText, getAllByText, queryByText } = render(<List initialItems={['Leandro']} />)

    const removeButtons = getAllByText('Remover')

    userEvent.click(removeButtons[0])

    // await waitForElementToBeRemoved(() => {
    //   return getByText('Leandro')
    // })

    // Or

    await waitFor(() => {
      expect(queryByText('Leandro')).not.toBeInTheDocument()
    })
  })
})