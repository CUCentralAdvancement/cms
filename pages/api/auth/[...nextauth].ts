import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import prisma from '../../../prisma/prisma';

const options = {
  providers: [
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.AUTH0_COOKIE_SECRET,
  events: {
    // signIn: async (message) => {
    //   /* on successful sign in */
    // },
    // signOut: async (message) => {
    //   /* on signout */
    // },
    createUser: async (message) => {
      console.log(message);
    },
    // linkAccount: async (message) => {
    //   /* account linked to a user */
    // },
    // session: async (message) => {
    //   /* session is active */
    // },
    // error: async (message) => {
    //   /* error in authentication flow */
    // },
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
