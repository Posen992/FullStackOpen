import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import commentService from '../services/commentService'
import { useParams } from 'react-router-dom'
import { useField } from '../hooks'
import { setComments, addComment } from '../reducers/commentListReducer'
import { Button, Form, ListGroup } from 'react-bootstrap'

const CommentList = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const comment = useField('text')
  const commentList = useSelector((state) => state.commentList)

  commentService.setToken(user.token)

  const blogId = useParams().blogId

  useEffect(() => {
    commentService.getComments(blogId).then((data) => {
      dispatch(setComments(data))
    })
  }, [])

  const handleAddComment = async (event) => {
    const newComment = {
      content: comment.value,
      author: user.username,
    }
    await commentService.createComment(blogId, newComment).then((data) => {
      dispatch(addComment(data))
      comment.reset()
    })
  }

  const margin = {
    marginTop: '10px',
    marginBottom: '10px',
  }
  
  return (
    <>
      <h2>comments</h2>
      <Form onSubmit={handleAddComment}>
        <Form.Group>
          <Form.Control {...comment.tagProps()} />

        </Form.Group>
        <Button style={margin} type='submit'>add comment</Button>
      </Form>
      <h2>added blogs</h2>
      <ListGroup>
        {commentList.map((comment) => (
          <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}

export default CommentList
