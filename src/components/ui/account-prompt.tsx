import { Button } from './button';
import Link from 'next/link';

interface AccountPromptProps {
  /** The main text to display */
  text: string;
  /** The text for the link button */
  linkText: string;
  /** The href for the link */
  href: string;
  /** Additional CSS classes for the container */
  className?: string;
}

export const AccountPrompt = ({
  text,
  linkText,
  href,
  className = '',
}: AccountPromptProps) => {
  return (
    <p
      className={`text-muted-foreground my-5 text-center text-sm ${className}`}
    >
      {text}
      <Button variant='link' asChild>
        <Link href={href}>{linkText}</Link>
      </Button>
    </p>
  );
};
