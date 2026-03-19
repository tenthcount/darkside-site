export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Event Name',
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
      name: 'date',
      title: 'Event Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'doorsOpen',
      title: 'Doors Open Time',
      type: 'string',
      description: 'e.g. "6:00 PM"',
    },
    {
      name: 'venue',
      title: 'Venue Name',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Venue Address',
      type: 'string',
    },
    {
      name: 'ticketLink',
      title: 'Ticket Link',
      type: 'url',
      description: 'Eventbrite, TicketLeap, etc.',
    },
    {
      name: 'flyer',
      title: 'Event Flyer (Portrait)',
      type: 'image',
      options: { hotspot: true },
      description: '4:5 ratio, main event poster',
    },
    {
      name: 'gallery',
      title: 'Event Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Additional event images — weigh-ins, behind the scenes, alternate posters, etc.',
    },
    {
      name: 'featured',
      title: 'Featured (Next Event)',
      type: 'boolean',
      description: 'Toggle ON for the current/upcoming event. Only one should be featured at a time.',
      initialValue: false,
    },
    {
      name: 'fightCard',
      title: 'Fight Card',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string', description: 'e.g. "Main Event", "Undercard"' },
            { name: 'fighterA', title: 'Fighter A', type: 'string' },
            { name: 'fighterB', title: 'Fighter B', type: 'string' },
            { name: 'records', title: 'Records', type: 'string', description: 'e.g. "14-1 vs 20-4-1"' },
            { name: 'isMainEvent', title: 'Main Event?', type: 'boolean', initialValue: false },
          ],
        },
      ],
    },
    {
      name: 'mainEventResult',
      title: 'Main Event Result (Post-Event)',
      type: 'string',
      description: 'Fill this in after the event, e.g. "Mashhadi def. Garcia — KO R3"',
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'venue', media: 'flyer' },
  },
};
