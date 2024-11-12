import React from 'react';
import { redirect } from 'next/navigation'; // Use next/navigation for server-side redirection
import { authOptions } from '../auth';
import { getServerSession } from 'next-auth/next';
import AddProduct from '../components/AddProduct';
import AdminNavbar from '../components/adminNavbar';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);

  // Server-side check for session
  if (!session) {
    redirect('/login'); // Use next/navigation's redirect for server-side redirection
  }
  
  return (
    <div>
      {session ? (
        <>
          <AdminNavbar  /> 
          <AddProduct/>
        </>
      ) : (
        "Not authorized"
      )}
    </div>
  );
};

export default AdminNavbar;

