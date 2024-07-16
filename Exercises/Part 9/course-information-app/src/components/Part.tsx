import { CoursePart } from '../type'
const Part = ({ coursePart }: { coursePart: CoursePart }) => {
	switch (coursePart.kind) {
		case 'basic':
			return (
				<div>
					<h3>
						{coursePart.name} {coursePart.exerciseCount}
					</h3>
					<p>{coursePart.description}</p>
				</div>
			)
			break
		case 'background':
			return (
				<div>
					<h3>
						{coursePart.name} {coursePart.exerciseCount}
					</h3>
					<p>{coursePart.description}</p>
					<p>{coursePart.backgroundMaterial}</p>
				</div>
			)
		case 'group':
			return (
				<div>
					<h3>
						{coursePart.name} {coursePart.exerciseCount}
					</h3>
					<p>project exercises {coursePart.groupProjectCount}</p>
				</div>
			)

		case 'special':
			return (
				<div>
					<h3>
						{coursePart.name} {coursePart.exerciseCount}
					</h3>
					<p>
						Requirements : {' '}
						{coursePart.requirements.map((requirement) => {
							return requirement + ' '
						})}
					</p>
				</div>
			)
		default:
			break
	}
}
export default Part
