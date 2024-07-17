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
const HospitalEntryForm = ({ patientId, hideForm, diagnosis }: Props) => {
	const [description, setDescription] = useState('')
	const [date, setDate] = useState('')
	const [specialist, setSpecialist] = useState('')
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])
	const [dischargeDate, setDischargeDate] = useState('')
	const [criteria, setCriteria] = useState('')

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
				discharge: {
					criteria,
					date: dischargeDate,
				},
				type: 'Hospital',
			} as Entry)

			setIsError(false)
			setAlertMessage('Add new entry successful')

			setDescription('')
			setDate('')
			setSpecialist('')
			setDiagnosisCodes([])
			setDischargeDate('')
			setCriteria('')
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
					<p>Discharge</p>
					<div>
						<TextField
							fullWidth
							id="standard-basic"
							label="date"
							variant="standard"
							value={dischargeDate}
							InputLabelProps={{ shrink: true }}
							type="date"
							onChange={(e) => setDischargeDate(e.target.value)}
						/>
					</div>
					<div>
						<TextField
							fullWidth
							id="standard-basic"
							label="criteria"
							variant="standard"
							value={criteria}
							onChange={(e) => setCriteria(e.target.value)}
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

export default HospitalEntryForm
