import type { IconType } from 'react-icons';
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa6';

interface Social {
  name: string;
  url: string;
  icon: IconType;
}

export const socialUrls = {
  github: 'https://github.com/bymaul/',
  instagram: 'https://instagram.com/maulaanaahmad',
  linkedin: 'https://linkedin.com/in/maulana-ahmad',
  youtube: 'https://youtube.com/@maulx',
} as const;

export const socials: Social[] = [
  {
    name: 'GitHub',
    url: socialUrls.github,
    icon: FaGithub,
  },
  {
    name: 'Instagram',
    url: socialUrls.instagram,
    icon: FaInstagram,
  },
  {
    name: 'LinkedIn',
    url: socialUrls.linkedin,
    icon: FaLinkedin,
  },
  {
    name: 'YouTube',
    url: socialUrls.youtube,
    icon: FaYoutube,
  },
];

export const siteConfig = {
  title: 'Maulana Ahmad Aji Triadi',
  description: 'I am a software engineer based in Yogyakarta, Indonesia.',
  url: 'https://maulana.dev',
  ogImage: '/images/og-image.png',
  author: 'Maulana',
  email: 'maulanaatriadi@gmail.com',
  role: 'a software engineer from Yogyakarta, Indonesia.',
  tagline: 'I love building reliable software and learning new things.',
};
