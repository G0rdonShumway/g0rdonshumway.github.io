// Get all documents in the 'dailyUsage' collection
function updateDAU(dbRef){
  dbRef.collection('dailyUsage').get()
    .then(snapshot => {
      snapshot.forEach(snap => {
        // Get date from document ID
        const date = snap.id;
        console.log(date)
        
        // Get subcollections
        snap.ref.listCollections()
          .then(collections => {
              // Use the `size` method to get the number of subcollections
              const numSubcollections = collections.size;
              console.log(numSubcollections)
              // Create a new 'DAU' collection if it does not exist
              dbRef.collection('DAU').doc(date).set({
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
  }
updateDAU(db)

