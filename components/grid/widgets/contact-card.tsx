import CustomLink from '@/components/custom-link';
import Card from '@/components/card';
import { siteConfig, socials } from '@/config/site';
import { FaArrowRight } from 'react-icons/fa6';

export default function ContactCard() {
  return (
    <Card className="flex flex-col justify-center gap-6 p-8">
      <h2 className="font-fraunces text-2xl font-semibold max-md:text-center">
        Have a project in mind? 👋
      </h2>
      <p className="leading-relaxed text-gray-700 max-md:hidden dark:text-dark-300">
        If you have a project that you want to get started, think you need my help with something or
        just fancy saying hey, then get in touch.
      </p>
      <div className="inline-flex flex-col items-center gap-4 lg:flex-row">
        <CustomLink className="cancel-drag group px-4 py-2" href={`mailto:${siteConfig.email}`}>
          <FaArrowRight className="-rotate-45 transition-transform duration-300 group-hover:rotate-0" />
          Contact Me
        </CustomLink>
        <div className="inline-flex gap-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              className="cancel-drag inline-flex size-8 items-center justify-center rounded-full ring ring-gray-200/45 outline-hidden transition-all duration-300 hover:ring-2 focus-visible:ring-2 focus-visible:ring-gray-200/45 focus-visible:outline-hidden dark:ring-gray-200/30"
              aria-label={`My ${social.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {<social.icon size="1rem" />}
            </a>
          ))}
        </div>
      </div>
    </Card>
  );
}
