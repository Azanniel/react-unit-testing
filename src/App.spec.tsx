import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App component', () => {
  it('should render list items', () => {
    const { getByText } = render(<App />)

    expect(getByText('Leandro')).toBeInTheDocument()
    expect(getByText('Matheus')).toBeInTheDocument()
    expect(getByText('Kleyson')).toBeInTheDocument()
    expect(getByText('Bruce')).toBeInTheDocument()
  })

  it('should be able to add new item to the list', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<App />)

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
    const { getByText, getAllByText, queryByText } = render(<App />)

    const removeButtons = getAllByText('Remover')

    userEvent.click(removeButtons[0])

    // await waitForElementToBeRemoved(() => {
    //   return getByText('Leandro')
    // })

    // Or

    await waitFor(() => {
      expect(queryByText('Novo')).not.toBeInTheDocument()
    })
  })
})