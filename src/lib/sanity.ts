import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ─── QUERIES ───

export async function getEvents() {
  return client.fetch(`
    *[_type == "event"] | order(date desc) {
      _id,
      name,
      slug,
      date,
      doorsOpen,
      venue,
      address,
      ticketLink,
      flyer,
      banner,
      featured,
      fightCard[] {
        label,
        fighterA,
        fighterB,
        records,
        isMainEvent
      }
    }
  `);
}

export async function getFeaturedEvent() {
  return client.fetch(`
    *[_type == "event" && featured == true][0] {
      _id,
      name,
      slug,
      date,
      doorsOpen,
      venue,
      address,
      ticketLink,
      flyer,
      banner,
      featured,
      fightCard[] {
        label,
        fighterA,
        fighterB,
        records,
        isMainEvent
      }
    }
  `);
}

export async function getFighters() {
  return client.fetch(`
    *[_type == "fighter"] | order(orderRank asc) {
      _id,
      name,
      slug,
      nickname,
      photo,
      record,
      weightClass,
      knockouts,
      bio,
      isMainEvent,
      socialLinks
    }
  `);
}

export async function getFighter(slug: string) {
  return client.fetch(`
    *[_type == "fighter" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      nickname,
      photo,
      record,
      weightClass,
      knockouts,
      bio,
      isMainEvent,
      socialLinks,
      fights[] {
        opponent,
        result,
        method,
        eventName,
        date
      }
    }
  `, { slug });
}

export async function getSponsors() {
  return client.fetch(`
    *[_type == "sponsor"] | order(orderRank asc) {
      _id,
      name,
      logo,
      website
    }
  `);
}

export async function getGallery() {
  return client.fetch(`
    *[_type == "galleryItem"] | order(date desc) {
      _id,
      title,
      type,
      image,
      videoUrl,
      event,
      date,
      tags
    }
  `);
}

export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      heroTagline,
      heroSubline,
      mainEventLabel,
      aboutTitle,
      aboutText,
      contactEmail,
      contactLocation,
      socialInstagram,
      socialFacebook,
      socialYoutube,
      socialX
    }
  `);
}

export async function getPastEvents() {
  return client.fetch(`
    *[_type == "event" && featured != true] | order(date desc) {
      _id,
      name,
      slug,
      date,
      venue,
      address,
      mainEventResult,
      flyer
    }
  `);
}
