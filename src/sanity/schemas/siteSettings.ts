export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
      description: 'e.g. "Fight Nights • Big Lights • Real Boxing"',
    },
    {
      name: 'heroSubline',
      title: 'Hero Subline',
      type: 'string',
    },
    {
      name: 'mainEventLabel',
      title: 'Main Event Label',
      type: 'string',
      description: 'Text above the matchup, e.g. "COMING UP NEXT"',
    },
    {
      name: 'aboutTitle',
      title: 'About Section Title',
      type: 'string',
    },
    {
      name: 'aboutText',
      title: 'About Section Text',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    },
    {
      name: 'contactLocation',
      title: 'Contact Location',
      type: 'string',
    },
    {
      name: 'socialInstagram',
      title: 'Instagram URL',
      type: 'url',
    },
    {
      name: 'socialFacebook',
      title: 'Facebook URL',
      type: 'url',
    },
    {
      name: 'socialYoutube',
      title: 'YouTube URL',
      type: 'url',
    },
    {
      name: 'socialX',
      title: 'X / Twitter URL',
      type: 'url',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
};
