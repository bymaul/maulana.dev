import { FaArrowRight, FaLinkedin } from 'react-icons/fa6';
import CustomLink from '@/components/ui/custom-link';
import Card from '@/components/ui/card';

export default function LinkedInCard() {
  return (
    <Card className="relative flex h-full flex-col items-center justify-center bg-[#0A66C2] dark:bg-[#0A66C2]">
      <div className="absolute bottom-3 left-3">
        <CustomLink
          className="cancel-drag"
          href="https://linkedin.com/in/maulana-ahmad"
          target="_blank"
        >
          <FaArrowRight className="-rotate-45 transition-transform duration-300 group-hover:rotate-0" />
          <span className="sr-only">LinkedIn</span>
        </CustomLink>
      </div>
      <FaLinkedin size="4rem" color="white" />
    </Card>
  );
}
