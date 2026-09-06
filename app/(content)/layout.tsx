import ButtonLink from '@/components/button-link';
import { FaX } from 'react-icons/fa6';

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="flex items-center justify-center pt-10">
        <ButtonLink className="inline-flex hover:mb-6 hover:scale-125" href="/">
          <FaX />
          <div className="sr-only">Close</div>
        </ButtonLink>
      </nav>
      {children}
    </>
  );
}
