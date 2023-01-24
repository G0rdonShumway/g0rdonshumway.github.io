const getDAU = async () => {
    try {
        // Get all documents in the 'dailyUsage' collection
        const snapshot = await db.collection('dailyUsage').get();
        const data = await Promise.all(snapshot.docs.map(async doc => {
            const collections = await doc.ref.listCollections();
            return {
                date: doc.id,
                numSubcollections: collections.size
            }
        }));
        data.forEach(({date, numSubcollections}) => {
            db.collection('DAU').doc(date).set({numSubcollections});
        });
    } catch (err) {
        console.log('Error getting dailyUsage documents:', err);
    }
}
