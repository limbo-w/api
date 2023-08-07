export interface CategoryData {
    name: string;
    icon?: string;
}
export interface BrandData {
    name: string;
    logo: string;
}

export interface StoreData {
    name: string;
    script: string;
}

export const categories: CategoryData[] = [
    {
        name: 'New',
        icon: 'https://api.iconify.design/carbon:assembly-cluster.svg',
    },
    {
        name: 'Fashion & Clothing',
        icon: 'https://api.iconify.design/carbon:ai-results-low.svg',
    },
    {
        name: 'Beauty',
        icon: 'https://api.iconify.design/carbon:3d-mpr-toggle.svg',
    },
    {
        name: 'Electronics',
        icon: 'https://api.iconify.design/carbon:account.svg',
    },
    {
        name: 'Teenager/College Students',
        icon: 'https://api.iconify.design/carbon:baggage-claim.svg',
    },
    {
        name: 'Kids & Babies',
        icon: 'https://api.iconify.design/carbon:airport-01.svg',
    },
    {
        name: 'Home',
        icon: 'https://api.iconify.design/carbon:block-storage.svg',
    },
    {
        name: 'Others',
        icon: 'https://api.iconify.design/carbon:bottles-container.svg',
    },
];

export const brands: BrandData[] = [
    {
        name: 'nick',
        logo: 'nick.jpg',
    },
];

export const stores: StoreData[] = [
    {
        name: 'test',
        script: 'https://test.com/api',
    },
];
