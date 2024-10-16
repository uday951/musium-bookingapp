// src/app/api/auth/[...nextauth]/route.js
import NextAuth from '@/app/auth';  // Correctly import the default export

const handler = NextAuth;

export { handler as GET, handler as POST };
