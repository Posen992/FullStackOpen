import { useState } from 'react'
import {
	TextField,
	Alert,
	Select,
	MenuItem,
	SelectChangeEvent,
	InputLabel,
	OutlinedInput,
} from '@mui/material'
import patientService from '../../../services/patientService'
import { Entry, Diagnosis } from '../../../types'

interface Props {
	patientId: string
	hideForm: () => void
	diagnosis: Diagnosis[]
}
const HealthCheckForm = ({ patientId, hideForm, diagnosis }: Props) => {
	const [description, setDescription] = useState('')
	const [date, setDate] = useState('')
	const [specialist, setSpecialist] = useState('')
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])
	const [healthCheckRating, setHealthCheckRating] = useState(0)

	const [alertMessage, setAlertMessage] = useState('')
	const [isError, setIsError] = useState(false)

	const style = {
		marginBottom: '10px',
		border: '1px dashed black',
		padding: '10px',
	}

	const sumbitNewEntry = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		try {
			await patientService.addEntry(patientId, {
				description,
				date,
				specialist,
				diagnosisCodes,
				healthCheckRating,
				type: 'HealthCheck',
			} as Entry)

			setIsError(false)
			setAlertMessage('Add new entry successful')

			setDescription('')
			setDate('')
			setSpecialist('')
			setDiagnosisCodes([])
			setHealthCheckRating(0)
			
		} catch (error: any) {
			setIsError(true)
			setAlertMessage(error.response.data)

			setTimeout(() => {
				setAlertMessage('')
			}, 5000)
		}
	}

	const handleDiagnosisChange = (
		event: SelectChangeEvent<typeof diagnosisCodes>
	) => {
		const {
			target: { value },
		} = event
		setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value)
		console.log(diagnosisCodes)
	}

	return (
		<div>
			{alertMessage && (
				<Alert severity={isError ? 'error' : 'success'}>{alertMessage}</Alert>
			)}
			<div style={style}>
				<form key="entryForm" onSubmit={sumbitNewEntry}>
					<h2>New HealthCheck entry</h2>
					<div>
						<TextField
							fullWidth
							id="standard-basic"
							label="Description"
							variant="standard"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div>
						<TextField
							fullWidth
							id="standard-basic"
							label="Date"
							variant="standard"
							value={date}
							InputLabelProps={{ shrink: true }}
							type="date"
							onChange={(e) => setDate(e.target.value)}
						/>
					</div>
					<div>
						<TextField
							fullWidth
							id="standard-basic"
							label="Specialist"
							variant="standard"
							value={specialist}
							onChange={(e) => setSpecialist(e.target.value)}
						/>
					</div>
					<div>
						<TextField
							fullWidth
							id="standard-basic"
							label="Healthcheck rating"
							variant="standard"
							value={healthCheckRating}
							onChange={(e) => setHealthCheckRating(Number(e.target.value))}
						/>
					</div>
					<InputLabel id="demo-multiple-name-label">Diagnosis codes</InputLabel>
					<Select
						fullWidth
						multiple
						value={diagnosisCodes}
						onChange={handleDiagnosisChange}
						input={<OutlinedInput label="Diagnosis codes" />}
					>
						{diagnosis.map((diagnose) => (
							<MenuItem key={diagnose.code} value={diagnose.code}>
								{diagnose.code}
							</MenuItem>
						))}
					</Select>
					<button type="reset" onClick={hideForm}>
						cancel
					</button>
					<button type="submit">ADD</button>
				</form>
			</div>
		</div>
	)
}

export default HealthCheckForm
