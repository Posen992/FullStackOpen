import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useReducer } from 'react'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { getAnecdotes, voteAnecdote } from './services/anecdotes'
import { useShowNotification } from './contexts/NotificaitionContext'

const App = () => {
  const showNotification = useShowNotification()

  const queryClient = useQueryClient()
  const updateAnecdote = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldData) => {
        return oldData.map((a) =>
          a.id === updatedAnecdote.id ? updatedAnecdote : a
        );
      });
      showNotification(`You voted '${updatedAnecdote.content}'`)

    }
  })

  const handleVote = (anecdote) => {
    updateAnecdote.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>

  )
}

export default App
