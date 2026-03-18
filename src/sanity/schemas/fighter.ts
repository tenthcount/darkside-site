export default {
  name: 'fighter',
  title: 'Fighter',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
    },
    {
      name: 'nickname',
      title: 'Nickname',
      type: 'string',
      description: 'e.g. "Lionheart"',
    },
    {
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'record',
      title: 'Record',
      type: 'string',
      description: 'e.g. "14-1-0"',
    },
    {
      name: 'weightClass',
      title: 'Weight Class',
      type: 'string',
      description: 'e.g. "Middleweight — 160 lbs"',
    },
    {
      name: 'knockouts',
      title: 'Knockouts',
      type: 'number',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Fighter biography — supports rich text',
    },
    {
      name: 'isMainEvent',
      title: 'Featured / Main Event Fighter',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'twitter', title: 'X / Twitter URL', type: 'url' },
      ],
    },
    {
      name: 'fights',
      title: 'Fight History',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'opponent', title: 'Opponent', type: 'string' },
            { name: 'result', title: 'Result', type: 'string', description: 'W / L / D' },
            { name: 'method', title: 'Method', type: 'string', description: 'e.g. "KO R3", "Unanimous Decision"' },
            { name: 'eventName', title: 'Event Name', type: 'string' },
            { name: 'date', title: 'Date', type: 'date' },
          ],
        },
      ],
    },
    {
      name: 'orderRank',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = shows first on the website',
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'record', media: 'photo' },
  },
};
