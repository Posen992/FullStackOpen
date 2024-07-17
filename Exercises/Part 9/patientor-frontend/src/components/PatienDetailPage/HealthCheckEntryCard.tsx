import { SafetyCheck, Favorite } from '@mui/icons-material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { HealthCheckEntry, HealthCheckRating } from '../../types'

const HealthCheckEntryCard = ({ entry }: { entry: HealthCheckEntry }) => {
	const HealthIcon = (health: HealthCheckRating) => {
		switch (health) {
			case 0:
				return <Favorite color="success" />
			case 1:
				return <Favorite color="info" />
			case 2:
				return <Favorite color="warning" />
			case 3:
				return <Favorite color="error" />
		}
	}

	const style = {
		minWidth: 275,
		marginBottom: '10px',
		border: '1px solid black',
	}

	return (
		<div>
			<Card sx={style}>
				<CardContent>
					<span>{entry.date}</span>
					<SafetyCheck />
					<p>{entry.description}</p>
					{HealthIcon(entry.healthCheckRating)}
					<p>diagnose by {entry.specialist}</p>
				</CardContent>
			</Card>
		</div>
	)
}

export default HealthCheckEntryCard
