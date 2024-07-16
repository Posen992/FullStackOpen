import axios from 'axios'
import { Diary } from '../types'

const BaseUrl = 'http://localhost:3000/'

const getDiaryList = async () => {
	const { data } = await axios.get<Diary[]>(BaseUrl + 'api/diaries')
	return data
}

const addDiary = async (object: Diary) => {
	const { data } = await axios.post<Diary>(BaseUrl + 'api/diaries', object)
	return data
}

export default {
	getDiaryList,
    addDiary
}
