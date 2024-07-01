import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('Create a new blog', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Posen',
    url: 'wwww.testurl.com',
    likes: 0,
  }

  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('input the title here')
  const inputAuthor = screen.getByPlaceholderText('input the author here')
  const inputUrl = screen.getByPlaceholderText('input the url here')
  const createButton = screen.getByText('create')

  await user.type(inputTitle, blog.title)
  await user.type(inputAuthor, blog.author)
  await user.type(inputUrl, blog.url)
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(
    'Component testing is done with react-testing-library',
  )
  expect(createBlog.mock.calls[0][0].author).toBe('Posen')
  expect(createBlog.mock.calls[0][0].url).toBe('wwww.testurl.com')
})
