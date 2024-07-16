import { CoursePart } from '../type'
import Part from './Part'

const Content = ({ contents }: { contents: CoursePart[] }): JSX.Element => {
	return (
		<div>
			{contents.map((content) => (
				<Part coursePart={content}/>
				// <p key={content.name}>
				// 	{content.name} {content.exerciseCount}
				// </p>
			))}
		</div>
	)
}

export default Content