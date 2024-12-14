import axios from "./axios.js";

export const getAllEnquirysRequest = async () => axios.get("/api/v1/enquiry/getAllEnquiry");

export const createEnquiryRequest = async (body) => axios.post("/api/v1/enquiry/new", body);

export const updateEnquiryRequest = async (body,id) =>
  axios.put(`/api/v1/enquiry/${id}`, body);

export const deleteEnquiryRequest = async (id) => axios.delete(`/api/v1/enquiry/${id}`);

export const getEnquiryRequest = async (id) => axios.get(`/api/v1/enquiry/${id}`);
export const getEnquiryBySourceRequest = async (body) => axios.post(`/api/v1/enquiry/getEnquiryBySource`,body);