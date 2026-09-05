import { ArrowButtonLink } from '@/components/button-link';
import Card from '@/components/card';
import { socialUrls } from '@/config/site';
import { FaLinkedin } from 'react-icons/fa6';

export default function LinkedInCard() {
  return (
    <Card className="relative flex h-full flex-col items-center justify-center bg-[#0A66C2]">
      <div className="absolute bottom-3 left-3">
        <ArrowButtonLink href={socialUrls.linkedin} target="_blank" rel="noopener noreferrer">
          <span className="sr-only">LinkedIn</span>
        </ArrowButtonLink>
      </div>
      <FaLinkedin size="4rem" color="white" />
    </Card>
  );
}
