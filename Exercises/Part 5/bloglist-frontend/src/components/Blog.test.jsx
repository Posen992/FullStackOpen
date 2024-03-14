import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('<Blog />', () => {

  let container

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Posen',
    url: 'wwww.testurl.com',
    likes: 0
  }

  const user = {
    name: 'Posen'
  }

  beforeEach(() => {
    container = render(<Blog blog={blog} user={user}></Blog>).container
    render(<BlogForm />)
  })

  test('title and author are displayed by default', () => {
    const element = screen.getByText(`${blog.title} ${blog.author}`)
    expect(element).toBeDefined()
  })

  test('component blogDetail(url and like) is hidden by default', () => {
    const blogDetail = container.querySelector('.blogDetail')
    expect(blogDetail).toHaveStyle('display: none')
  })

  test('component blogDetail(url and like) are shown when the view button has been clicked', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.viewButton')
    await user.click(button)

    const blogDetail = container.querySelector('.blogDetail')
    expect(blogDetail).not.toHaveStyle('display: none')
  })

})

test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Posen',
    url: 'wwww.testurl.com',
    likes: 0
  }

  const user = {
    name: 'Posen'
  }

  const updateBlog = vi.fn()

  const container = render(<Blog blog={blog} user={user} updateBlog={updateBlog}></Blog>).container

  const userE = userEvent.setup()
  const button = container.querySelector('.likeButton')
  await userE.click(button)
  await userE.click(button)

  expect(updateBlog.mock.calls).toHaveLength(2)

})