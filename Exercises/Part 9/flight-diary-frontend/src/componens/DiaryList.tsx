import { Diary } from '../types'
import DiaryItem from './DiaryItem'

const DiaryList = ({ diaryList }: { diaryList: Diary[] }) => {
	return (
		<>
			{diaryList.map((diary) => (
				<DiaryItem key={diary.id} diary={diary} />
			))}
		</>
	)
}

export default DiaryList
