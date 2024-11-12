import { useEffect, useState } from 'react';
import axios from 'axios';
import TicketStatistics from '@/components/EmployeeDashboard/TicketStatistics'; // Assuming a TicketStatistics component

const AdminDashboard = () => {
  const [resortData, setResortData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/admin/tickets');
        setResortData(response.data);
      } catch (error) {
        console.error('Error fetching resort data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <section>
        <h2>Resort Details</h2>
        <p>Name: {resortData?.name || 'Resort Name'}</p>
        <p>Location: {resortData?.location || 'Resort Location'}</p>
        <p>Description: {resortData?.description || 'A brief description of the resort.'}</p>
      </section>
      <TicketStatistics tickets={resortData?.tickets || []} />
    </div>
  );
};

export default AdminDashboard;
