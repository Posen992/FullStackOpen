import { useState } from 'react'
import HealthCheckForm from './forms/HealthCheckForm'
import OccupationalHealthcareEntryForm from './forms/OccupationalHealthcareEntryForm'
import HospitalEntryForm from './forms/HospitalEntryForm'
import { Diagnosis } from '../../types'

interface Props {
	patientId: string
	diagnosis: Diagnosis[]
}

const EntryForm = ({ patientId, diagnosis }: Props) => {
	const [isShowHealthChekcForm, setIsShowHealthCheckForm] = useState(false)
	const [isShowHospitalForm, setIsShowHospitalForm] = useState(false)
	const [isShowOccupationForm, setIsShowOccupationForm] = useState(false)

	const showHealthCheckForm = () => {
		setIsShowHealthCheckForm(true)
	}

	const showHospitalForm = () => {
		setIsShowHospitalForm(true)
	}

	const showOccupationForm = () => {
		setIsShowOccupationForm(true)
	}

	const hideHealthCheckForm = () => {
		setIsShowHealthCheckForm(false)
	}

	const hideHospitalForm = () => {
		setIsShowHospitalForm(false)
	}

	const hideOccupationForm = () => {
		setIsShowOccupationForm(false)
	}

	return (
		<div>
			{isShowHealthChekcForm ? (
				<HealthCheckForm
					patientId={patientId}
					hideForm={hideHealthCheckForm}
					diagnosis={diagnosis}
				/>
			) : isShowHospitalForm ? (
				<HospitalEntryForm
					patientId={patientId}
					hideForm={hideHospitalForm}
					diagnosis={diagnosis}
				/>
			) : isShowOccupationForm ? (
				<OccupationalHealthcareEntryForm
					patientId={patientId}
					hideForm={hideOccupationForm}
					diagnosis={diagnosis}
				/>
			) : (
				<div>
					<button onClick={showHealthCheckForm}>Add HealthCheck</button>
					<button onClick={showHospitalForm}>Add Hospital</button>
					<button onClick={showOccupationForm}>Add OccupationalHealthcare</button>
				</div>
			)}
		</div>
	)
}

export default EntryForm
