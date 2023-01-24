const getDAU = async () => {
    console.log('in')
    try {
        // Get all documents in the 'dailyUsage' collection
        const snapshot = await db.collection('dailyUsage').get();
        console.log('snapshot')
        const data = await Promise.all(snapshot.docs.map(async doc => {
            const collections = await doc.ref.listCollections();
            console.log('collections')
            return {
                date: doc.id,
                numSubcollections: collections.size
            }
        }));
        data.forEach(({date, numSubcollections}) => {
            db.collection('DAU').doc(date).set({numSubcollections});
            console.log('DAU')
        });
    } catch (err) {
        console.log('Error getting dailyUsage documents:', err);
    }
}
