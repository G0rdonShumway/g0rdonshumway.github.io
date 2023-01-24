const firestore = require('firebase-admin').firestore();

const getDAU = async () => {
    try {
        // Get all documents in the 'dailyUsage' collection
        const docs = await firestore.collection('dailyUsage').listDocuments();
        const data = await Promise.all(docs.map(doc => {
            return doc.listCollections().then(collections => {
                return {
                    date: doc.id,
                    numSubcollections: collections.length
                }
            })
        }));
        data.forEach(({date, numSubcollections}) => {
            firestore.collection('DAU').doc(date).set({numSubcollections});
        });
    } catch (err) {
        console.log('Error getting dailyUsage documents:', err);
    }
}
