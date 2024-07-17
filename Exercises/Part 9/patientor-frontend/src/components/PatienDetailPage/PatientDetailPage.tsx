import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import patientService from '../../services/patientService'
import { Patient, Diagnosis, Entry } from '../../types'

import { Male, Female, Transgender } from '@mui/icons-material'

import HospitalEntryCard from './HospitalEntryCard'
import HealthCheckEntryCard from './HealthCheckEntryCard'
import OccupationalHealthcareEntryCard from './OccupationalHealthcareEntryCard'
import EntryForm from './EntryFrom'

interface Props {
	diagnosis: Diagnosis[]
}

const PatientDetailPage = ({ diagnosis }: Props) => {
	const patientId = useParams().id
	const [patient, setPatient] = useState<Patient>()

	const fetchPatient = async () => {
		if (patientId) {
			const fetchedPatient = (await patientService.getPatientById(
				patientId
			)) as Patient

			console.log(fetchedPatient)
			setPatient(fetchedPatient)
		}
	}

	useEffect(() => {
		fetchPatient()
	}, [])

	if (!patient) {
		return <div>loading...</div>
	}

	const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
		switch (entry.type) {
			case 'Hospital':
				return <HospitalEntryCard entry={entry} diagnosis={diagnosis} />
			case 'HealthCheck':
				return <HealthCheckEntryCard entry={entry} />
			case 'OccupationalHealthcare':
				return <OccupationalHealthcareEntryCard entry={entry} />
		}
	}

	return (
		<div>
			<h1>
				{patient.name}{' '}
				{patient.gender === 'male' ? (
					<Male />
				) : patient.gender === 'female' ? (
					<Female />
				) : (
					<Transgender />
				)}
			</h1>
			<p>ssh: {patient.ssn}</p>
			<p>occupation: {patient.occupation}</p>
			<EntryForm patientId={patient.id} diagnosis={diagnosis}/>
			<h2>entries</h2>
			{patient.entries.map((entry) => (
				<EntryDetails key={entry.id} entry={entry} />
			))}
		</div>
	)
}

export default PatientDetailPage
