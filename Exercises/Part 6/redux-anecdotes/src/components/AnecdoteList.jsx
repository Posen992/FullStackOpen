import { useDispatch, useSelector} from 'react-redux'
import  { voteOf } from '../reducers/anecdoteReducer'
import { setNotificaition } from '../reducers/notificationReducer'
import anecdoteService from '../../services/anecdotes'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })
  const sortedAnceotdes = anecdotes.sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = async (id) => {
    const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
    await anecdoteService.vote(votedAnecdote)

    dispatch(voteOf(id))
    dispatch(setNotificaition(`you voted '${votedAnecdote.content}'`, 10))
  }
  return (
    <div>
      
      {sortedAnceotdes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList