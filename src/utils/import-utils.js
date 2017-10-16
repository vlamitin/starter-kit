import i18next from "i18next";

export function prepareLocale(locale) {
    return import(`../locale/${locale}/${locale}`)
        .then((langBundle) => {
            return i18next.init({
                lng: locale,
                resources: {
                    en: locale === 'en' ? langBundle : null,
                    ru: locale === 'ru' ? langBundle : null
                }
            }, (err) => {
                if (err) {
                    console.error('i18next err:', err);
                }
            });
        })
        .catch((error) => {
            console.error('import bundle err:', error);
        });
}
