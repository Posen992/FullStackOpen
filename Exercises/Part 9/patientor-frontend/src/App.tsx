import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patientService";
import diagnoseService from "./services/diagnoseService";

import PatientListPage from "./components/PatientListPage";
import PatientDetailPage from "./components/PatienDetailPage/PatientDetailPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

  const fetchPatientList = async () => {
    const patients = await patientService.getAll();
    setPatients(patients);
  };

  const fetchDiagnoseList = async () => {
    const diagnoseList = await diagnoseService.getDiagnoseList();
    setDiagnosis(diagnoseList);
  };

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    void fetchPatientList();
    void fetchDiagnoseList();
  }, []);
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientDetailPage diagnosis={diagnosis} />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
