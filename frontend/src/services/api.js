import axios from "axios";

const API_URL =
"https://employee-api-a-badr-dev.apps.rm3.7wse.p1.openshiftapps.com";

export const getEmployees = async () => {
    const response = await axios.get(`${API_URL}/employees`);
    return response.data;
};

export const createEmployee = async (employee) => {
    const response = await axios.post(
        `${API_URL}/employees`,
        employee
    );
    return response.data;
};

export const updateEmployee = async (id, employee) => {
    const response = await axios.put(
        `${API_URL}/employees/${id}`,
        employee
    );
    return response.data;
};

export const deleteEmployee = async (id) => {
    const response = await axios.delete(
        `${API_URL}/employees/${id}`
    );
    return response.data;
};
