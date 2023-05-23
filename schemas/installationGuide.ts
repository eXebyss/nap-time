export default {
    name: 'installationGuide',
    title: 'Installation Guide',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'steps',
            title: 'Installation Steps',
            type: 'array',
            of: [{ type: 'installationStep' }],
        },
    ],
};
