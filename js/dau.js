// Get all documents in the 'dailyUsage' collection
db.collection('dailyUsage').get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      // Get date from document ID
      const date = doc.id;
      
      // Get subcollections
      doc.ref.listCollections()
        .then(collections => {
            // Use the `size` method to get the number of subcollections
            const numSubcollections = collections.size;
            // Create a new 'DAU' collection if it does not exist
            db.collection('DAU').doc(date).set({
              DAU: numSubcollections
            });
        })
        .catch(err => {
          console.log('Error getting subcollections:', err);
        });
    });
  })
  .catch(err => {
    console.log('Error getting dailyUsage documents:', err);
  });
