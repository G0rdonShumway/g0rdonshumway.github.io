const getDAU = async () => {
    try {
        // Get all documents in the 'dailyUsage' collection
        const docs = await db.collection('dailyUsage').listDocuments();
        const data = await Promise.all(docs.map(doc => {
            return doc.listCollections().then(collections => {
                return {
                    date: doc.id,
                    numSubcollections: collections.length
                }
            })
        }));
        data.forEach(({date, numSubcollections}) => {
            db.collection('DAU').doc(date).set({numSubcollections});
        });
    } catch (err) {
        console.log('Error getting dailyUsage documents:', err);
    }
}
