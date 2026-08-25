import { FaArrowRight, FaLinkedin } from 'react-icons/fa6';
import CustomLink from '@/components/custom-link';
import Card from '@/components/card';
import { socials } from '@/config/site';

const linkedinUrl = socials.find((social) => social.name.toLowerCase() === 'linkedin')?.url;

export default function LinkedInCard() {
  return (
    <Card className="relative flex h-full flex-col items-center justify-center bg-[#0A66C2]">
      <div className="absolute bottom-3 left-3">
        <CustomLink
          className="cancel-drag"
          href={linkedinUrl ?? 'https://linkedin.com'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaArrowRight className="-rotate-45 transition-transform duration-300 group-hover:rotate-0" />
          <span className="sr-only">LinkedIn</span>
        </CustomLink>
      </div>
      <FaLinkedin size="4rem" color="white" />
    </Card>
  );
}
