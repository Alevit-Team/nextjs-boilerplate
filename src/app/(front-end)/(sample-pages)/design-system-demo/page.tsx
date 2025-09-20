import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import {
  Typography,
  Display,
  Headline,
  Title,
  Body,
  Label,
  Caption,
  Overline,
} from '@/components/ui/typography';

export default function DesignSystemDemo() {
  return (
    <div className='bg-background min-h-screen'>
      {/* Hero Section */}
      <Section className='from-primary/5 to-accent/5 bg-gradient-to-br'>
        <Container>
          <div className='space-y-6 text-center'>
            <Display size='lg'>Design System Demo</Display>
            <Body size='xl' className='text-muted-foreground mx-auto max-w-2xl'>
              A comprehensive showcase of our typography, components, and design
              tokens built with Tailwind CSS v4 and modern design principles.
            </Body>
            <div className='flex justify-center gap-4'>
              <Button className='interactive'>Get Started</Button>
              <Button variant='outline' className='interactive'>
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Typography Section */}
      <Section>
        <Container>
          <div className='space-y-12'>
            <div className='text-center'>
              <Headline size='xl' className='mb-4'>
                Fluid Responsive Typography
              </Headline>
              <Body size='lg' className='text-muted-foreground'>
                Modern fluid typography system that scales automatically across
                all screen sizes
              </Body>
              <Caption size='md' className='mt-4 block'>
                ✨ Resize your browser to see the magic in action
              </Caption>
            </div>

            {/* Fluid Typography Demo */}
            <Card className='card-elevated from-primary/5 to-accent/5 bg-gradient-to-br p-8'>
              <div className='space-y-8 text-center'>
                <Overline>Live Fluid Typography Demo</Overline>
                <div className='space-y-6'>
                  <Display size='2xl'>Fluid Display</Display>
                  <Headline size='lg'>Scales Perfectly</Headline>
                  <Title size='md'>Across All Devices</Title>
                  <Body size='md' className='mx-auto max-w-2xl'>
                    This text automatically adjusts its size, line height, and
                    letter spacing based on your screen size using modern CSS
                    clamp() functions. Try resizing your browser window to see
                    the smooth scaling in action.
                  </Body>
                  <Caption size='md'>
                    From mobile (320px) to ultra-wide (2560px+)
                  </Caption>
                </div>
              </div>
            </Card>

            <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
              {/* Display Typography */}
              <Card className='card-elevated p-8'>
                <div className='space-y-6'>
                  <Overline>Display Typography - For Heroes</Overline>
                  <div className='space-y-4'>
                    <Display size='2xl'>Display 2XL</Display>
                    <Display size='xl'>Display XL</Display>
                    <Display size='lg'>Display Large</Display>
                    <Display size='md'>Display Medium</Display>
                    <Display size='sm'>Display Small</Display>
                  </div>
                  <div className='bg-muted/50 rounded-md p-4'>
                    <Caption size='sm' className='mb-2'>
                      Fluid Scaling Range:
                    </Caption>
                    <div className='text-muted-foreground space-y-1 text-xs'>
                      <div>Mobile: 32px → Desktop: 72px</div>
                      <div>Line height: 0.9 → 1.1 (adaptive)</div>
                      <div>Uses: clamp(2rem, 6vw, 4.5rem)</div>
                    </div>
                    <Caption size='sm' className='mt-2 mb-1'>
                      Code Example:
                    </Caption>
                    <code className='text-muted-foreground text-xs'>
                      {`<Display size="lg">Hero Title</Display>`}
                    </code>
                  </div>
                </div>
              </Card>

              {/* Headlines */}
              <Card className='card-elevated p-8'>
                <div className='space-y-6'>
                  <Overline>Headlines - For Sections</Overline>
                  <div className='space-y-4'>
                    <Headline size='xl'>Headline XL</Headline>
                    <Headline size='lg'>Headline Large</Headline>
                    <Headline size='md'>Headline Medium</Headline>
                    <Headline size='sm'>Headline Small</Headline>
                  </div>
                  <div className='bg-muted/50 rounded-md p-4'>
                    <Caption size='sm' className='mb-2'>
                      Responsive Features:
                    </Caption>
                    <div className='text-muted-foreground space-y-1 text-xs'>
                      <div>• Fluid font scaling: 24px → 30px</div>
                      <div>• Adaptive line height & tracking</div>
                      <div>• text-balance for better wrapping</div>
                    </div>
                    <Caption size='sm' className='mt-2 mb-1'>
                      Code Example:
                    </Caption>
                    <code className='text-muted-foreground text-xs'>
                      {`<Headline size="lg">Section Title</Headline>`}
                    </code>
                  </div>
                </div>
              </Card>

              {/* Titles */}
              <Card className='card-elevated p-8'>
                <div className='space-y-6'>
                  <Overline>Titles - For Cards & Components</Overline>
                  <div className='space-y-4'>
                    <Title size='xl'>Title Extra Large</Title>
                    <Title size='lg'>Title Large</Title>
                    <Title size='md'>Title Medium</Title>
                    <Title size='sm'>Title Small</Title>
                  </div>
                  <div className='bg-muted/50 rounded-md p-4'>
                    <Caption size='sm' className='mb-2'>
                      Code Example:
                    </Caption>
                    <code className='text-muted-foreground text-xs'>
                      {`<Title size="md">Card Title</Title>`}
                    </code>
                  </div>
                </div>
              </Card>

              {/* Body Text */}
              <Card className='card-elevated p-8'>
                <div className='space-y-6'>
                  <Overline>Body Text - For Content</Overline>
                  <div className='space-y-4'>
                    <Body size='xl'>
                      Body XL - Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Perfect for large content areas.
                    </Body>
                    <Body size='lg'>
                      Body Large - Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Great for prominent text.
                    </Body>
                    <Body size='md'>
                      Body Medium - Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. The default body text size.
                    </Body>
                    <Body size='sm'>
                      Body Small - Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. For smaller content areas.
                    </Body>
                  </div>
                  <div className='bg-muted/50 rounded-md p-4'>
                    <Caption size='sm' className='mb-2'>
                      Code Example:
                    </Caption>
                    <code className='text-muted-foreground text-xs'>
                      {`<Body size="md">Main content</Body>`}
                    </code>
                  </div>
                </div>
              </Card>

              {/* Labels & Captions */}
              <Card className='card-elevated p-8'>
                <div className='space-y-6'>
                  <Overline>Labels & Captions</Overline>
                  <div className='space-y-4'>
                    <div>
                      <Label size='lg'>Large Label</Label>
                      <Body size='sm'>
                        Used for form labels and UI elements
                      </Body>
                    </div>
                    <div>
                      <Label size='md'>Medium Label (Default)</Label>
                      <Body size='sm'>Standard form label size</Body>
                    </div>
                    <div>
                      <Label size='sm'>Small Label</Label>
                      <Body size='sm'>Compact form elements</Body>
                    </div>
                    <div className='border-t pt-2'>
                      <Caption size='lg'>Large Caption Text</Caption>
                      <Caption size='md'>Medium Caption Text</Caption>
                      <Caption size='sm'>Small Caption Text</Caption>
                    </div>
                  </div>
                  <div className='bg-muted/50 rounded-md p-4'>
                    <Caption size='sm' className='mb-2'>
                      Code Example:
                    </Caption>
                    <code className='text-muted-foreground text-xs'>
                      {`<Label size="md">Email Address</Label>`}
                    </code>
                  </div>
                </div>
              </Card>

              {/* Generic Typography */}
              <Card className='card-elevated p-8'>
                <div className='space-y-6'>
                  <Overline>Generic Typography Component</Overline>
                  <div className='space-y-4'>
                    <Typography variant='headline-lg'>
                      Using Typography Component Directly
                    </Typography>
                    <Typography
                      variant='body-md'
                      className='text-muted-foreground'
                    >
                      The Typography component provides flexibility when you
                      need runtime control over text styles, perfect for CMS
                      content or dynamic interfaces.
                    </Typography>
                    <Typography variant='caption-md'>
                      Great for dynamic content systems
                    </Typography>
                  </div>
                  <div className='bg-muted/50 rounded-md p-4'>
                    <Caption size='sm' className='mb-2'>
                      Code Example:
                    </Caption>
                    <code className='text-muted-foreground mb-2 block text-xs'>
                      {`<Typography variant="headline-lg">Dynamic Text</Typography>`}
                    </code>
                    <code className='text-muted-foreground text-xs'>
                      {`<Typography variant="body-md" as="span">Custom Element</Typography>`}
                    </code>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Color System */}
      <Section className='bg-muted/30'>
        <Container>
          <div className='space-y-12'>
            <div className='text-center'>
              <Headline size='xl' className='mb-4'>
                Color System
              </Headline>
              <Body size='lg' className='text-muted-foreground'>
                OKLCH-based colors with automatic dark mode support
              </Body>
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
              {/* Semantic Colors */}
              <Card className='card-elevated p-6'>
                <div className='space-y-4'>
                  <Title size='md'>Semantic Colors</Title>
                  <div className='space-y-2'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-primary h-8 w-8 rounded shadow-sm'></div>
                      <div className='flex-1'>
                        <Body size='sm' className='font-medium'>
                          Primary
                        </Body>
                        <Caption size='sm'>Brand purple</Caption>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='bg-secondary h-8 w-8 rounded shadow-sm'></div>
                      <div className='flex-1'>
                        <Body size='sm' className='font-medium'>
                          Secondary
                        </Body>
                        <Caption size='sm'>Neutral gray</Caption>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='bg-accent h-8 w-8 rounded shadow-sm'></div>
                      <div className='flex-1'>
                        <Body size='sm' className='font-medium'>
                          Accent
                        </Body>
                        <Caption size='sm'>Subtle highlight</Caption>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='bg-muted h-8 w-8 rounded shadow-sm'></div>
                      <div className='flex-1'>
                        <Body size='sm' className='font-medium'>
                          Muted
                        </Body>
                        <Caption size='sm'>Background tint</Caption>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Status Colors */}
              <Card className='card-elevated p-6'>
                <div className='space-y-4'>
                  <Title size='md'>Status Colors</Title>
                  <div className='space-y-2'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-success h-8 w-8 rounded shadow-sm'></div>
                      <div className='flex-1'>
                        <Body size='sm' className='font-medium'>
                          Success
                        </Body>
                        <Caption size='sm'>Positive actions</Caption>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='bg-warning h-8 w-8 rounded shadow-sm'></div>
                      <div className='flex-1'>
                        <Body size='sm' className='font-medium'>
                          Warning
                        </Body>
                        <Caption size='sm'>Caution states</Caption>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='bg-destructive h-8 w-8 rounded shadow-sm'></div>
                      <div className='flex-1'>
                        <Body size='sm' className='font-medium'>
                          Destructive
                        </Body>
                        <Caption size='sm'>Error & danger</Caption>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='bg-info h-8 w-8 rounded shadow-sm'></div>
                      <div className='flex-1'>
                        <Body size='sm' className='font-medium'>
                          Info
                        </Body>
                        <Caption size='sm'>Informational</Caption>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Surface Colors */}
              <Card className='card-elevated p-6'>
                <div className='space-y-4'>
                  <Title size='md'>Surface Colors</Title>
                  <div className='space-y-2'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-background h-8 w-8 rounded border shadow-sm'></div>
                      <div className='flex-1'>
                        <Body size='sm' className='font-medium'>
                          Background
                        </Body>
                        <Caption size='sm'>Page background</Caption>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='bg-card h-8 w-8 rounded border shadow-sm'></div>
                      <div className='flex-1'>
                        <Body size='sm' className='font-medium'>
                          Card
                        </Body>
                        <Caption size='sm'>Card surfaces</Caption>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='bg-popover h-8 w-8 rounded border shadow-sm'></div>
                      <div className='flex-1'>
                        <Body size='sm' className='font-medium'>
                          Popover
                        </Body>
                        <Caption size='sm'>Overlay content</Caption>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='bg-border h-8 w-8 rounded shadow-sm'></div>
                      <div className='flex-1'>
                        <Body size='sm' className='font-medium'>
                          Border
                        </Body>
                        <Caption size='sm'>Element borders</Caption>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Chart Colors */}
              <Card className='card-elevated p-6'>
                <div className='space-y-4'>
                  <Title size='md'>Chart Colors</Title>
                  <Caption size='sm' className='mb-3'>
                    Accessible color palette for data visualization
                  </Caption>
                  <div className='space-y-2'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-chart-1 h-8 w-8 rounded shadow-sm'></div>
                      <div className='flex-1'>
                        <Body size='sm' className='font-medium'>
                          Chart 1
                        </Body>
                        <Caption size='sm'>Primary data series</Caption>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='bg-chart-2 h-8 w-8 rounded shadow-sm'></div>
                      <div className='flex-1'>
                        <Body size='sm' className='font-medium'>
                          Chart 2
                        </Body>
                        <Caption size='sm'>Secondary series</Caption>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='bg-chart-3 h-8 w-8 rounded shadow-sm'></div>
                      <div className='flex-1'>
                        <Body size='sm' className='font-medium'>
                          Chart 3
                        </Body>
                        <Caption size='sm'>Tertiary series</Caption>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='bg-chart-4 h-8 w-8 rounded shadow-sm'></div>
                      <div className='flex-1'>
                        <Body size='sm' className='font-medium'>
                          Chart 4
                        </Body>
                        <Caption size='sm'>Additional data</Caption>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* shadcn/ui Integration */}
      <Section>
        <Container>
          <div className='space-y-12'>
            <div className='text-center'>
              <Headline size='xl' className='mb-4'>
                shadcn/ui Integration
              </Headline>
              <Body size='lg' className='text-muted-foreground'>
                All shadcn/ui components work seamlessly with our design system
              </Body>
            </div>

            <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
              {/* Button Variants */}
              <Card className='card-elevated p-6'>
                <div className='space-y-6'>
                  <Title size='md'>Button Variants</Title>
                  <Caption size='sm'>
                    shadcn/ui buttons automatically use our design tokens
                  </Caption>
                  <div className='space-y-4'>
                    <div className='flex flex-wrap gap-3'>
                      <Button>Primary</Button>
                      <Button variant='secondary'>Secondary</Button>
                      <Button variant='outline'>Outline</Button>
                      <Button variant='ghost'>Ghost</Button>
                    </div>
                    <div className='flex flex-wrap gap-3'>
                      <Button variant='destructive'>Destructive</Button>
                      <Button variant='link'>Link</Button>
                      <Button size='sm'>Small</Button>
                      <Button size='lg'>Large</Button>
                    </div>
                  </div>
                  <div className='bg-muted/50 rounded-md p-4'>
                    <Caption size='sm' className='mb-2'>
                      Code Example:
                    </Caption>
                    <code className='text-muted-foreground text-xs'>
                      {`<Button variant="outline">Button</Button>`}
                    </code>
                  </div>
                </div>
              </Card>

              {/* Color Token Usage */}
              <Card className='card-elevated p-6'>
                <div className='space-y-6'>
                  <Title size='md'>Automatic Color Integration</Title>
                  <Caption size='sm'>
                    Components automatically inherit our color system
                  </Caption>
                  <div className='space-y-3'>
                    <div className='bg-primary flex items-center justify-between rounded-md p-3'>
                      <Body
                        size='sm'
                        className='text-primary-foreground font-medium'
                      >
                        Primary Background
                      </Body>
                      <code className='text-primary-foreground/80 text-xs'>
                        bg-primary
                      </code>
                    </div>
                    <div className='bg-secondary flex items-center justify-between rounded-md p-3'>
                      <Body
                        size='sm'
                        className='text-secondary-foreground font-medium'
                      >
                        Secondary Background
                      </Body>
                      <code className='text-secondary-foreground/80 text-xs'>
                        bg-secondary
                      </code>
                    </div>
                    <div className='bg-accent flex items-center justify-between rounded-md p-3'>
                      <Body
                        size='sm'
                        className='text-accent-foreground font-medium'
                      >
                        Accent Background
                      </Body>
                      <code className='text-accent-foreground/80 text-xs'>
                        bg-accent
                      </code>
                    </div>
                    <div className='bg-muted flex items-center justify-between rounded-md p-3'>
                      <Body
                        size='sm'
                        className='text-muted-foreground font-medium'
                      >
                        Muted Background
                      </Body>
                      <code className='text-muted-foreground/80 text-xs'>
                        bg-muted
                      </code>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Component Variations */}
      <Section>
        <Container>
          <div className='space-y-12'>
            <div className='text-center'>
              <Headline size='xl' className='mb-4'>
                Custom Component Variations
              </Headline>
              <Body size='lg' className='text-muted-foreground'>
                Different styles and interactive states for custom components
              </Body>
            </div>

            <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
              {/* Card Variations */}
              <div className='space-y-6'>
                <Title size='lg'>Card Styles</Title>

                <Card className='card-elevated p-6'>
                  <Title size='md' className='mb-2'>
                    Elevated Card
                  </Title>
                  <Body size='sm' className='text-muted-foreground'>
                    Card with shadow that increases on hover
                  </Body>
                </Card>

                <Card className='card-flat p-6'>
                  <Title size='md' className='mb-2'>
                    Flat Card
                  </Title>
                  <Body size='sm' className='text-muted-foreground'>
                    Simple card with border, no shadow
                  </Body>
                </Card>

                <Card className='card-ghost p-6'>
                  <Title size='md' className='mb-2'>
                    Ghost Card
                  </Title>
                  <Body size='sm' className='text-muted-foreground'>
                    Transparent card with hover effect
                  </Body>
                </Card>
              </div>

              {/* Glass Effects */}
              <div className='space-y-6'>
                <Title size='lg'>Glass Effects</Title>

                <div className='glass rounded-lg p-6'>
                  <Title size='md' className='mb-2'>
                    Glass Effect
                  </Title>
                  <Body size='sm' className='text-muted-foreground'>
                    Modern glass morphism with backdrop blur
                  </Body>
                </div>

                <div className='glass-dark rounded-lg p-6'>
                  <Title size='md' className='mb-2'>
                    Dark Glass
                  </Title>
                  <Body size='sm' className='text-muted-foreground'>
                    Darker variant with stronger blur
                  </Body>
                </div>
              </div>

              {/* Interactive Elements */}
              <div className='space-y-6'>
                <Title size='lg'>Interactive States</Title>

                <Card className='interactive card-elevated cursor-pointer p-6'>
                  <Title size='md' className='mb-2'>
                    Interactive Card
                  </Title>
                  <Body size='sm' className='text-muted-foreground'>
                    Hover and click for scale effects
                  </Body>
                </Card>

                <div className='space-y-3'>
                  <Button className='interactive w-full'>Primary Button</Button>
                  <Button variant='outline' className='interactive w-full'>
                    Outline Button
                  </Button>
                  <Button variant='ghost' className='interactive w-full'>
                    Ghost Button
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Animation Examples */}
      <Section className='bg-muted/30'>
        <Container>
          <div className='space-y-12'>
            <div className='text-center'>
              <Headline size='xl' className='mb-4'>
                Animation Examples
              </Headline>
              <Body size='lg' className='text-muted-foreground'>
                Smooth animations using CSS custom properties
              </Body>
            </div>

            <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
              <Card className='card-elevated fade-in p-6'>
                <Title size='md' className='mb-4'>
                  Fade In
                </Title>
                <Body size='sm' className='text-muted-foreground'>
                  This card fades in when loaded
                </Body>
              </Card>

              <Card className='card-elevated slide-in-up p-6'>
                <Title size='md' className='mb-4'>
                  Slide Up
                </Title>
                <Body size='sm' className='text-muted-foreground'>
                  This card slides up from bottom
                </Body>
              </Card>

              <Card className='card-elevated scale-in p-6'>
                <Title size='md' className='mb-4'>
                  Scale In
                </Title>
                <Body size='sm' className='text-muted-foreground'>
                  This card scales in from 95%
                </Body>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Layout Utilities */}
      <Section>
        <Container>
          <div className='space-y-12'>
            <div className='text-center'>
              <Headline size='xl' className='mb-4'>
                Layout Utilities
              </Headline>
              <Body size='lg' className='text-muted-foreground'>
                Flexible layout patterns for common use cases
              </Body>
            </div>

            <div className='space-y-8'>
              {/* Flex Utilities */}
              <Card className='card-flat p-6'>
                <Title size='lg' className='mb-4'>
                  Flex Utilities
                </Title>
                <div className='space-y-4'>
                  <div className='flex-between bg-muted rounded p-4'>
                    <Body size='sm'>flex-between</Body>
                    <Body size='sm'>→</Body>
                  </div>
                  <div className='flex-center bg-muted rounded p-4'>
                    <Body size='sm'>flex-center</Body>
                  </div>
                  <div className='flex-evenly bg-muted rounded p-4'>
                    <Body size='sm'>Item 1</Body>
                    <Body size='sm'>Item 2</Body>
                    <Body size='sm'>Item 3</Body>
                  </div>
                </div>
              </Card>

              {/* Grid Auto-fit */}
              <Card className='card-flat p-6'>
                <Title size='lg' className='mb-4'>
                  Auto-fit Grid
                </Title>
                <div className='grid-auto-fit grid gap-4'>
                  {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className='bg-muted rounded p-4 text-center'>
                      <Body size='sm'>Item {i + 1}</Body>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Design Tokens Reference */}
      <Section className='border-t'>
        <Container>
          <div className='space-y-6 text-center'>
            <Headline size='xl'>Ready to Build?</Headline>
            <Body size='lg' className='text-muted-foreground mx-auto max-w-2xl'>
              This design system provides everything you need to create
              consistent, accessible, and beautiful user interfaces with full
              IntelliSense support and type safety.
            </Body>
            <div className='bg-muted/50 mx-auto max-w-4xl rounded-lg p-6'>
              <Overline className='mb-4'>Quick Start Examples</Overline>
              <div className='grid grid-cols-1 gap-6 text-left md:grid-cols-2'>
                <div>
                  <Caption size='sm' className='mb-2'>
                    Import Typography Components:
                  </Caption>
                  <code className='bg-background block rounded p-2 text-xs'>
                    {`import { Display, Headline, Title, Body } from '@/components';`}
                  </code>
                </div>
                <div>
                  <Caption size='sm' className='mb-2'>
                    Use with Full IntelliSense:
                  </Caption>
                  <code className='bg-background block rounded p-2 text-xs'>
                    {`<Display size="lg">Hero Title</Display>`}
                  </code>
                </div>
                <div>
                  <Caption size='sm' className='mb-2'>
                    Flexible Typography Component:
                  </Caption>
                  <code className='bg-background block rounded p-2 text-xs'>
                    {`<Typography variant="headline-xl">Dynamic</Typography>`}
                  </code>
                </div>
                <div>
                  <Caption size='sm' className='mb-2'>
                    Custom Element Support:
                  </Caption>
                  <code className='bg-background block rounded p-2 text-xs'>
                    {`<Title as="span" size="md">Custom</Title>`}
                  </code>
                </div>
              </div>
            </div>
            <div className='flex justify-center gap-4'>
              <Button className='interactive'>View Documentation</Button>
              <Button variant='outline' className='interactive'>
                Browse Components
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
