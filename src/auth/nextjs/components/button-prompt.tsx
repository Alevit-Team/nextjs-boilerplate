import { Button } from '@/components';
import Link from 'next/link';
import { Body } from '@/components/ui/typography';

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
    <Body color='muted-foreground'>
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
    </Body>
  );
};
