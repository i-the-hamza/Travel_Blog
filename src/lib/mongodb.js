import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // Mock MongoDB client for development
  const mockClient = {
    db: () => ({
      collection: () => ({
        findOne: async () => null,
        find: async () => ({ toArray: async () => [] }),
        insertOne: async () => ({ insertedId: 'mock-id' }),
        updateOne: async () => ({ modifiedCount: 1 }),
        deleteOne: async () => ({ deletedCount: 1 }),
      }),
    }),
  };

  // This is a mock client promise that doesn't actually connect to MongoDB
  clientPromise = Promise.resolve(mockClient);
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise; 