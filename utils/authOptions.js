import connectDB from '@/config/database';
import User from '@/models/User';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sign-in
    async signIn({ profile }) {
      try {
        // Connect to the database
        await connectDB();

        console.log('Profile received:', profile);

        // Check if the user already exists
        const userExist = await User.findOne({ email: profile.email });

        // If the user doesn't exist, create a new user
        if (!userExist) {
          const userName = profile.name.slice(0, 20); // Truncate user name if too long
          await User.create({
            userName: userName,
            email: profile.email,
            image: profile.picture,
          });

          console.log('New user created:', userName);
        }

        // Return true to indicate successful sign-in
        return true;

      } catch (error) {
        console.error('Error during sign-in:', error);
        // Return false or throw the error to prevent the sign-in process
        throw new Error('Sign-in failed. Please try again later.');
      }
    },

    // Invoked when the session is being created
    async session({ session }) {
      try {
        // Ensure the database is connected
        await connectDB();

        // Get the user from the database by email
        const user = await User.findOne({ email: session.user.email });

        // If user is found, assign user ID to the session
        if (user) {
          session.user.id = user._id.toString();
          console.log('Session updated with user ID:', session.user.id);
        } else {
          // Handle case when user is not found (this shouldn't usually happen)
          console.warn('User not found in database during session creation:', session.user.email);
        }

        // Return the updated session object
        return session;

      } catch (error) {
        console.error('Error during session creation:', error);
        // Return the session object even if an error occurs
        return session; // You can return an empty session if required, but it's better to keep the session
      }
    },
  },
};
