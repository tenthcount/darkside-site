export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'about', title: 'About Section' },
    { name: 'sections', title: 'Section Titles' },
    { name: 'stats', title: 'Stat Boxes (About Section)' },
    { name: 'contact', title: 'Contact Info' },
    { name: 'socials', title: 'Social Links' },
  ],
  fields: [
    // ─── HERO ───
    {
      name: 'heroSubline',
      title: 'Hero Subline (Above Logo)',
      type: 'string',
      description: 'Small text above the logo, e.g. "Detroit\'s Premier Boxing Promotion"',
      fieldset: 'hero',
    },
    {
      name: 'heroTagline',
      title: 'Hero Tagline (Below Logo)',
      type: 'string',
      description: 'e.g. "Fight Nights • Big Lights • Real Boxing"',
      fieldset: 'hero',
    },
    {
      name: 'mainEventLabel',
      title: 'Main Event Label',
      type: 'string',
      description: 'Text above the matchup, e.g. "COMING UP NEXT"',
      fieldset: 'hero',
    },

    // ─── ABOUT ───
    {
      name: 'aboutTag',
      title: 'About Tag',
      type: 'string',
      description: 'Small red text above title, e.g. "Who We Are"',
      fieldset: 'about',
    },
    {
      name: 'aboutTitle',
      title: 'About Title',
      type: 'string',
      description: 'e.g. "BORN IN DETROIT. BUILT FOR WAR."',
      fieldset: 'about',
    },
    {
      name: 'aboutText',
      title: 'About Text',
      type: 'array',
      of: [{ type: 'block' }],
      fieldset: 'about',
    },

    // ─── STAT BOXES ───
    {
      name: 'statBoxes',
      title: 'Stat Boxes',
      type: 'array',
      description: 'The 4 stat boxes in the About section (e.g. 10+ Years Active)',
      fieldset: 'stats',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string', description: 'e.g. "10+", "50+", "DET"' },
            { name: 'label', title: 'Label', type: 'string', description: 'e.g. "Years Active", "Fight Cards"' },
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
    },

    // ─── SECTION TITLES ───
    {
      name: 'eventSectionTag',
      title: 'Event Section Tag',
      type: 'string',
      description: 'Default: auto-generated from event date',
      fieldset: 'sections',
    },
    {
      name: 'fightersSectionTag',
      title: 'Fighters Section Tag',
      type: 'string',
      description: 'Default: "The Roster"',
      fieldset: 'sections',
    },
    {
      name: 'fightersSectionTitle',
      title: 'Fighters Section Title',
      type: 'string',
      description: 'Default: "OUR FIGHTERS"',
      fieldset: 'sections',
    },
    {
      name: 'sponsorsSectionTag',
      title: 'Sponsors Section Tag',
      type: 'string',
      description: 'Default: "Partners"',
      fieldset: 'sections',
    },
    {
      name: 'sponsorsSectionTitle',
      title: 'Sponsors Section Title',
      type: 'string',
      description: 'Default: "OUR SPONSORS"',
      fieldset: 'sections',
    },
    {
      name: 'pastEventsSectionTag',
      title: 'Past Events Section Tag',
      type: 'string',
      description: 'Default: "Track Record"',
      fieldset: 'sections',
    },
    {
      name: 'pastEventsSectionTitle',
      title: 'Past Events Section Title',
      type: 'string',
      description: 'Default: "PAST EVENTS"',
      fieldset: 'sections',
    },
    {
      name: 'contactSectionTag',
      title: 'Contact Section Tag',
      type: 'string',
      description: 'Default: "Get In Touch"',
      fieldset: 'sections',
    },
    {
      name: 'contactSectionTitle',
      title: 'Contact Section Title',
      type: 'string',
      description: 'Default: "CONTACT DARKSIDE"',
      fieldset: 'sections',
    },

    // ─── CONTACT ───
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      fieldset: 'contact',
    },
    {
      name: 'contactLocation',
      title: 'Contact Location',
      type: 'string',
      fieldset: 'contact',
    },

    // ─── SOCIALS ───
    {
      name: 'socialInstagram',
      title: 'Instagram URL',
      type: 'url',
      fieldset: 'socials',
    },
    {
      name: 'socialFacebook',
      title: 'Facebook URL',
      type: 'url',
      fieldset: 'socials',
    },
    {
      name: 'socialYoutube',
      title: 'YouTube URL',
      type: 'url',
      fieldset: 'socials',
    },
    {
      name: 'socialX',
      title: 'X / Twitter URL',
      type: 'url',
      fieldset: 'socials',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
};
