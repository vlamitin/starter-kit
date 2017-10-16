export const routeHandlers = {
    main: {
        importComponent: (nextState, callback) => {
            return handleImportPromise(import("../components/main/main"), callback);
        }
    },
    customPage: {
        importComponent: (nextState, callback) => {
            return handleImportPromise(import("../components/custom-page/custom-page"), callback);
        }
    }
};

function handleImportPromise(importPromise, callback) {
    importPromise
        .then(module => {
            return callback(null, module.default);
        })
        .catch(err => console.error('Dynamic page loading failed', err));
}
