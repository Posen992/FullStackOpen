import { Entry, Diagnosis } from '../../types'
import { LocalHospital } from '@mui/icons-material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const HospitalEntryCard = ({
	entry,
	diagnosis,
}: {
	entry: Entry
	diagnosis: Array<Diagnosis>
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
					<LocalHospital />
					<p>{entry.description}</p>
					{entry.diagnosisCodes?.map((code) => (
						<li key={code}>
							{code} {diagnosis.find((d) => d.code === code)?.name}
						</li>
					))}
					<p>diagnose by {entry.specialist}</p>
				</CardContent>
			</Card>
		</div>
	)
}

export default HospitalEntryCard
