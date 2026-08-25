import { FaArrowRight } from 'react-icons/fa6';
import Container from '@/components/container';
import CustomLink from '@/components/custom-link';

export default function NotFound() {
  return (
    <Container as="main" className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="font-fraunces text-7xl md:text-9xl">404</h1>
        <h2 className="font-fraunces text-xl md:text-3xl">Page Not Found</h2>
        <p>Sorry, we couldn&apos;t find what you were looking for.</p>
        <CustomLink href="/" className="px-4 py-2">
          <FaArrowRight className="-rotate-45 transition-transform duration-300 group-hover:-rotate-180" />
          Back to Home
        </CustomLink>
      </div>
    </Container>
  );
}
