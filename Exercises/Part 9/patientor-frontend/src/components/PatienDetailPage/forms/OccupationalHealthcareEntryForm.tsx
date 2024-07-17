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
const OccupationalHealthcareEntryForm = ({
	patientId,
	hideForm,
	diagnosis,
}: Props) => {
	const [description, setDescription] = useState('')
	const [date, setDate] = useState('')
	const [specialist, setSpecialist] = useState('')
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')
	const [employerName, setEmployerName] = useState('')

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
				employerName,
				sickLeave: {
					startDate,
					endDate,
				},
				type: 'OccupationalHealthcare',
			} as Entry)

			setIsError(false)
			setAlertMessage('Add new entry successful')

			setDescription('')
			setDate('')
			setSpecialist('')
			setDiagnosisCodes([])
			setEmployerName('')
			setStartDate('')
			setEndDate('')
		} catch (error: any) {
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
							label="Description"
							variant="standard"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div>
						<TextField
							fullWidth
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
							label="Specialist"
							variant="standard"
							value={specialist}
							onChange={(e) => setSpecialist(e.target.value)}
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
					<div>
						<TextField
							fullWidth
							label="EmployerName"
							variant="standard"
							value={employerName}
							onChange={(e) => setEmployerName(e.target.value)}
						/>
					</div>

					<p>SickLeave</p>
					<div>
						<TextField
							fullWidth
							label="date"
							variant="standard"
							value={startDate}
							type="date"
							InputLabelProps={{ shrink: true }}
							onChange={(e) => setStartDate(e.target.value)}
						/>
					</div>
					<div>
						<TextField
							fullWidth
							label="criteria"
							variant="standard"
							value={endDate}
							type="date"
							InputLabelProps={{ shrink: true }}
							onChange={(e) => setEndDate(e.target.value)}
						/>
					</div>
					<button type="reset" onClick={hideForm}>
						cancel
					</button>
					<button type="submit">ADD</button>
				</form>
			</div>
		</div>
	)
}

export default OccupationalHealthcareEntryForm
