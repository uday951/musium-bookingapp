import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import UserModel from './utils/models/user';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" }
      },
      async authorize(credentials) {
        const user = await UserModel.findOne({ email: credentials?.email });

        if (!user) {
          return null;
        }

        // Assuming plain-text passwords (use hashing in production!)
        if (credentials?.password !== user.password) {
          return null;
        }

        return { id: user._id, name: user.username, email: user.email, role: user.role };
      }
    })
  ],
  secret: process.env.SECRET_KEY,
  callbacks:{
    async jwt({token,user}){
      if(user){
        token.userId=user.id
        token.username=user.name
        token.email=user.email
        token.role=user.role
      }
      return token

    },
    async session({session,token}){
      session.userId=token.userId
      session.username=token.name
      session.email=token.email
      session.role=token.role
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',  // Custom sign-in page
    error: '/auth/error'    // Error handling page
  }
};

// Default export for NextAuth
export default NextAuth(authOptions);
