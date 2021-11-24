import FirebaseKeys from './config';
import firebase from 'firebase';

class Fire {
    constructor() {
        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(FirebaseKeys);
        } else {
            firebase.app(); // if already initialized, use that one
        }

    }

    addPost = async ({ title, ingredients, preparation, localUri }) => {
        const remoteUri = await this.uploadPhotoAsync(localUri)

        return new Promise((res, rej) => {
            this.firestore.collection('posts')
                .add({
                    title,
                    ingredients,
                    preparation,
                    uid: this.uid,
                    timestamp: this.timestamp,
                    image: remoteUri
                })

                .then(ref => {
                    // ref.update({ 'id': ref.id })
                    res(ref)
                })
                .catch(error => {
                    rej(error)
                })
        })
    }


    // addLike = async ({ post }) => {

    //     return new Promise((res, rej) => {
    //         this.firestore.collection('likes')
    //             .add({
    //                 uid: this.uid,
    //                 post: post.id

    //             })

    //             .then(ref => {
    //                 res(ref)
    //             })
    //             .catch(error => {
    //                 rej(error)
    //             })
    //     })
    // }

    uploadPhotoAsync = async uri => {
        const path = `photos/${this.uid}/${Date.now()}.jpg`

        return new Promise(async (res, rej) => {
            const response = await fetch(uri)
            const file = await response.blob()

            let upload = firebase
                .storage()
                .ref(path)
                .put(file)

            upload.on(
                'state_changed',
                err => {
                    rej(err)
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL()
                    res(url)
                }
            )

        })
    }

    get firestore() {
        return firebase.firestore()
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }

    get timestamp() {
        return Date.now()

    }
}

Fire.shared = new Fire()
export default Fire