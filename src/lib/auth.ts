import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./db";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // your Google & GitHub providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
