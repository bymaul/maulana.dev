import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

interface Social {
  name: string;
  url: string;
  icon: IconType;
}

export const socials: Social[] = [
  {
    name: 'Github',
    url: 'https://github.com/bymaul/',
    icon: FaGithub,
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/maulaanaahmad',
    icon: FaInstagram,
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/maulana-ahmad',
    icon: FaLinkedin,
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@maulx',
    icon: FaYoutube,
  },
];

export const siteConfig = {
  title: 'Maulana Ahmad Aji Triadi',
  description: 'I am a software developer based in Yogyakarta, Indonesia.',
  url: 'https://maulana.dev',
  ogImage: '/images/og-image.png',
  author: 'Maulana',
  email: 'maulanaatriadi@gmail.com',
};
