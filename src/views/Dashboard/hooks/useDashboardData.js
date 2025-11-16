import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import {
  fetchDashboardOverview,
  fetchMedicinesDashboard,
  fetchOrdersDashboard,
  fetchComplaintsDashboard,
  fetchAlertsDashboard,
} from "../../../apis/Dashboard/dashboard";

export const useDashboardOverview = () => {
  const { getToken } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        const response = await fetchDashboardOverview(token);
        setData(response?.data || null);
      } catch (err) {
        setError(err);
        console.error("Error fetching dashboard overview:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getToken]);

  return { data, loading, error };
};

export const useMedicinesDashboard = () => {
  const { getToken } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        const response = await fetchMedicinesDashboard(token);
        setData(response?.data || null);
      } catch (err) {
        setError(err);
        console.error("Error fetching medicines dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getToken]);

  return { data, loading, error };
};

export const useOrdersDashboard = () => {
  const { getToken } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        const response = await fetchOrdersDashboard(token);
        setData(response?.data || null);
      } catch (err) {
        setError(err);
        console.error("Error fetching orders dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getToken]);

  return { data, loading, error };
};

export const useComplaintsDashboard = () => {
  const { getToken } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        const response = await fetchComplaintsDashboard(token);
        setData(response?.data || null);
      } catch (err) {
        setError(err);
        console.error("Error fetching complaints dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getToken]);

  return { data, loading, error };
};

export const useAlertsDashboard = () => {
  const { getToken } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        const response = await fetchAlertsDashboard(token);
        setData(response?.data || null);
      } catch (err) {
        setError(err);
        console.error("Error fetching alerts dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getToken]);

  return { data, loading, error };
};

