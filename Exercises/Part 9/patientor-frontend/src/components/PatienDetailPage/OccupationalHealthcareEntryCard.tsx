import { AccountBalance } from '@mui/icons-material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { OccupationalHealthcareEntry } from '../../types'

const OccupationalHealthcareEntryCard = ({
	entry,
}: {
	entry: OccupationalHealthcareEntry
}) => {

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
					<AccountBalance />
					<span>{entry.employerName}</span>
					<p>{entry.description}</p>
					<p>diagnose by {entry.specialist}</p>
				</CardContent>
			</Card>
		</div>
	)
}

export default OccupationalHealthcareEntryCard
