// This is a mock function that pretends to connect to MongoDB
// In a development environment, we don't need an actual connection
async function dbConnect() {
  console.log('Using mock MongoDB connection for development');
  return {
    connection: {
      isConnected: true
    }
  };
}

export default dbConnect; 