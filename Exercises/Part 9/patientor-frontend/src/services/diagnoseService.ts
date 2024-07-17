import axios from "axios";

import { apiBaseUrl } from '../constants'

const getDiagnoseList = async () => {
	const { data } = await axios.get(`${apiBaseUrl}/diagnoses`);
	return data;
};

export default {
	getDiagnoseList,
};