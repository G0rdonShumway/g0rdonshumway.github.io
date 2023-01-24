// Get all documents in the 'daily' collection
firestore.collection('dailyUsage').get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      // Get date from document ID
      const date = doc.id;
      // Use the `size` method to get the number of documents
      const numUsers = snapshot.size;
      // Create a new 'DAU' collection if it does not exist
      firestore.collection('DAU').doc(date).set({
        numUsers: numUsers
      });
    });
  })
  .catch(err => {
    console.log('Error getting daily documents:', err);
  });
