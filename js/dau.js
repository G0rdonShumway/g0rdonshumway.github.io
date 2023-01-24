const getDAU = async (data) => {
    console.log('in')
    try {
        // Get all documents in the 'dailyUsage' collection
        const snapshot = await data.collection('dailyUsage').get();
        console.log(snapshot.docs);
        const dataRef = await Promise.all(snapshot.docs.map(async doc => {
            const collections = await doc.ref.listCollections().catch(err => console.log(err));
            console.log('collections')
            return {
                date: doc.id,
                numSubcollections: collections.size
            }
        }));
        dataRef.forEach(({date, numSubcollections}) => {
            data.collection('DAU').doc(date).set({numSubcollections});
            console.log('DAU')
        });
    } catch (err) {
        console.log('Error getting dailyUsage documents:', err);
    }
}
getDAU(firebaseApp.firestore())
