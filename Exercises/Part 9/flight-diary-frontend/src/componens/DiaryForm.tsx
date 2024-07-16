import { Form, Button, Alert } from 'react-bootstrap'
import { useField } from '../hooks/index'
import diaryService from '../services/diaryService'
import { Diary } from '../types'
import { useState } from 'react'

const DiaryForm = () => {
	const date = useField('date')
	const visibility = useField('radio')
	const weather = useField('text')
	const comment = useField('text')
	const [errorMessage, setErrorMessage] = useState('')

	const handleCreateBlog = (event: React.SyntheticEvent) => {
		event.preventDefault()
		const newDiary = {
			date: date.value,
			visibility: visibility.value,
			weather: weather.value,
			comment: comment.value,
		} as Diary
		diaryService
			.addDiary(newDiary)
			.then(() => {
				date.reset()
				visibility.reset()
				weather.reset()
				comment.reset()
			})
			.catch((error) => {
				setErrorMessage(error.response.data)

                setTimeout(() => {
                    setErrorMessage('')
                }, 5000);
			})
	}

	return (
		<>
			<h1>Add new entry</h1>
			{errorMessage != ''? (<Alert variant="danger"> {errorMessage}</Alert>): ''}
			<Form onSubmit={handleCreateBlog}>
				<h2>create new</h2>
				<Form.Group>
					<Form.Label>date</Form.Label>
					<Form.Control {...date.tagProps()} />
				</Form.Group>
				<Form.Group>
					<Form.Label>visibility</Form.Label>
                    <Form.Check type="radio" name="visibility" value="great" label="great" checked={visibility.value == 'great'} onChange={visibility.onChange} />
                    <Form.Check type="radio" name="visibility" value="good" label="good" checked={visibility.value == 'good'} onChange={visibility.onChange} />
                    <Form.Check type="radio" name="visibility" value="ok" label="ok" checked={visibility.value == 'ok'} onChange={visibility.onChange} />
                    <Form.Check type="radio" name="visibility" value="poor" label="poor" checked={visibility.value == 'poor'} onChange={visibility.onChange} />
				</Form.Group>
				<Form.Group>
					<Form.Label>weather</Form.Label>
					<Form.Check type="radio" name="weather" value="sunny" label="sunny" checked={weather.value == 'sunny'} onChange={weather.onChange} />
                    <Form.Check type="radio" name="weather" value="rainy" label="rainy" checked={weather.value == 'rainy'} onChange={weather.onChange} />
                    <Form.Check type="radio" name="weather" value="cloudy" label="cloudy" checked={weather.value == 'cloudy'} onChange={weather.onChange} />
                    <Form.Check type="radio" name="weather" value="stormy" label="stormy" checked={weather.value == 'stormy'} onChange={weather.onChange} />
                    <Form.Check type="radio" name="weather" value="windy" label="windy" checked={weather.value == 'windy'} onChange={weather.onChange} />
				</Form.Group>
				<Form.Group>
					<Form.Label>comment</Form.Label>
					<Form.Control {...comment.tagProps()} />
				</Form.Group>
				<Button type="submit">add</Button>
			</Form>
		</>
	)
}

export default DiaryForm
