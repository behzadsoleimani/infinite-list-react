import { getHttpClient } from "src/api/client";

export const fetchData: any = async (page: number, items: any, filters: any, notChangeFilter?: boolean) => {
    try {
        const response = await getHttpClient().get("https://snappfood.ir/mobile/v3/restaurant/vendors-list", {
            params: {
                page,
                page_size: 10,
                lat: 35.754,
                long: 51.328,
                filters: filters ? { "filters": [...filters] } : null
            }
        })
        if (response && response.data && response.data.status) {
            return {
                items: notChangeFilter ? [...items, ...response.data.data.finalResult] : [...response.data.data.finalResult],
                filters: response.data.data.extra_sections.filters.sections[0].data
            }
        } else {
            return { items: [], filters: [] };
        }
    } catch (e) {
        return { items: [],filters: [] };
    }
};