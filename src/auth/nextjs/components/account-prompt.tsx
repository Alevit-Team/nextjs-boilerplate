import { Button } from '@/components';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AccountPromptProps {
  text: string;
  linkText: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export const AccountPrompt = ({
  text,
  linkText,
  href,
  className = '',
  onClick,
}: AccountPromptProps) => {
  return (
    <p
      className={cn(
        `text-muted-foreground my-5 text-center text-sm ${className}`
      )}
    >
      {text}
      {href && (
        <Button variant='link' asChild onClick={onClick}>
          <Link href={href}>{linkText}</Link>
        </Button>
      )}
      {onClick && (
        <Button variant='link' onClick={onClick}>
          {linkText}
        </Button>
      )}
    </p>
  );
};
