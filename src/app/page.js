import React from 'react';
import Dbconnection from './utils/config/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth';
import { redirect } from 'next/navigation'; // Import redirect function
import UserNavigation from './components/UserNavigation';
import Adminpage from './admin/page'; 
import ProductCollection from './components/productCollection';

const Homepage = async () => {
  const session = await getServerSession(authOptions);
  await Dbconnection();

  if (!session) {
    // Use the imported redirect function to redirect to login
    return redirect("/login");
  }

  const userName = session.username;
  console.log("rolecheck", session.role);
  console.log("check user", session.username);

  return (
    <div>
      {session.role === 'user' && (
        <>
          <UserNavigation userName={userName} />
          <h2>Welcome to my page</h2>
          <ProductCollection/>
        </>
      )}
      {session.role === 'admin' && (
        <Adminpage />
      )}
    </div>
  );
};

export default Homepage;
