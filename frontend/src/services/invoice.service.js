import api from "./api";

export const getInvoices = () => api.get("/invoices");
export const createInvoice = (data) => api.post("/invoices", data);
