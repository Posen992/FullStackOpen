import PropTypes from 'prop-types'

import { Form, Button } from 'react-bootstrap'
import { useField } from '../hooks'

const BlogForm = ({ createBlog }) => {

  const title = useField('text', 'input the title here')
  const author = useField('text', 'input the author here')
  const url = useField('text', 'input the url here')

  const handleCreateBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    })
    title.reset()
    author.reset()
    url.reset()
  }

  const margin = {
    marginTop: '10px',
    marginBottom: '10px',
  }

  return (
    <Form onSubmit={handleCreateBlog}>
      <h2>create new</h2>
      <Form.Group>
        <Form.Label>title</Form.Label>
        <Form.Control {...title.tagProps()} />
      </Form.Group>
      <Form.Group>
        <Form.Label>author</Form.Label>
        <Form.Control {...author.tagProps()} />
      </Form.Group>
      <Form.Group>
        <Form.Label>url</Form.Label>
        <Form.Control {...url.tagProps()} />
      </Form.Group>
      <Button style={margin}  type="submit">create</Button>
    </Form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
