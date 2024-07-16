import { useEffect, useState } from 'react'

import { Diary } from './types'

import diaryService from './services/diaryService'

import DiaryList from './componens/DiaryList'
import DiaryForm from './componens/DiaryForm'

function App() {
	const [diaries, setDiaries] = useState<Diary[]>([])

	useEffect(() => {
		fetchDiaryList()
	}, [])

	const fetchDiaryList = async () => {
		const diaryList: Diary[] = await diaryService.getDiaryList()
		setDiaries(diaryList as Diary[])
	}

	return (
		<>
			<DiaryForm />
			<h1>Diary entries</h1>
			<DiaryList diaryList={diaries} />
		</>
	)
}

export default App
