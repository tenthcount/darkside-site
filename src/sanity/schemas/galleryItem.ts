export default {
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Photo', value: 'photo' },
          { title: 'Video', value: 'video' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }: any) => parent?.type === 'video',
    },
    {
      name: 'videoUrl',
      title: 'YouTube / Video URL',
      type: 'url',
      hidden: ({ parent }: any) => parent?.type === 'photo',
      description: 'Paste full YouTube URL — e.g. https://www.youtube.com/watch?v=...',
    },
    {
      name: 'event',
      title: 'Related Event',
      type: 'string',
      description: 'Which event is this from?',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'type', media: 'image' },
  },
};
