import { Button } from '@/components';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonPromptProps {
  text: string;
  linkText: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export const ButtonPrompt = ({
  text,
  linkText,
  href,
  className = '',
  onClick,
}: ButtonPromptProps) => {
  return (
    <p className={cn(`text-muted-foreground text-center text-sm ${className}`)}>
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
