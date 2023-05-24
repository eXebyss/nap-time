import sanityClient from '@/lib/sanity.client';

export default async function getSanityData(query: string) {
    const res = await sanityClient.fetch(query);

    if (!res) {
        throw new Error('Failed to fetch data');
    }

    return res;
}
