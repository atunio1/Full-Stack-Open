import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog

  beforeEach(() => {
    blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Asra',
      url: 'test.com'
    }
  })

  test('renders title and author only', async () => {
    const { container } = render(
      <Blog blog={blog}/>
    )
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    ) // title
    expect(div).toHaveTextContent(
      'Asra'
    ) // author
    const hiddenDiv = container.querySelector('.togglableContent')
    expect(hiddenDiv).toHaveStyle('display: none')
    expect(hiddenDiv).toHaveTextContent(
      'test.com'
    )
    expect(div).toHaveTextContent(
      'likes'
    )
  })

  test('clicking view button shows blog URL and likes'), async () => {
    const { container } = render(
      <Blog blog={blog}/>
    )
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const visibleDiv = container.querySelector('.togglableContent')
    expect(visibleDiv).not.toHaveStyle('display: none')
  }

  test('clicking like button twice calls event handler twice', async () => {

    const mockHandler = vi.fn()
    render(
      <Blog blog={blog} handleLikes={mockHandler}/>
    )
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})