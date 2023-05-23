import sanityClient from '@/lib/sanity.client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);

export default function imageUrl(source: {}) {
    return builder.image(source);
}
