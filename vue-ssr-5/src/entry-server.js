import { createApp } from './app';

export default (context) => {
    return new Promise((resolve, reject) => {
        const { app, store, router } = createApp();

        router.push(context.url);
        router.onReady(() => {
            const matchedComponent = router.getMatchedComponents();
            if (!matchedComponent.length) {
                return reject({ code : 404 });
            }
            resolve(app);
        })
    })
}