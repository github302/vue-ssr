import { createApp } from './app';

export default (context) => {
    return new Promise((resolve, reject) => {
        const { app, store, router } = createApp(context);

        router.push(context.url);
        router.onReady(() => {
            const matchComponents = router.getMatchedComponents();
            if (!matchComponents.length) {
                return reject({ code: 404 });
            }

            Promise.all(matchComponents.map((Component) => {
                if (Component.preFetch) {
                    return Component.preFetch({
                        store,
                        route: router.currentRoute,
                    })
                }
            })).then(() => {
                context.state = store.state;
                resolve(app);
            }).catch(reject);
            // resolve(app);
        })

    })
}