export function nextPage(store) {

        let category = store.category_id ? `&category=${store.category_id}` : false;

        if (category)
                return store.nextPage(`?company=${store.company_id}${category}`);
        return store.nextPage(`?company=${store.company_id}`);
}
export function prevPage(store) {

        let category = store.category_id ? `&category=${store.category_id}` : false;

        if (category)
                return store.prevPage(`?company=${store.company_id}${category}`);
        return store.nextPage(`?company=${store.company_id}`);
}