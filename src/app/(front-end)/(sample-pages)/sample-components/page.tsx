import { Container, Section, Separator } from '@/components';

export default function Page() {
  return (
    <>
      {/* Header (sticky) using standalone Container */}
      <header className='bg-background/80 sticky top-0 z-50 border-b backdrop-blur'>
        <Container fullWidth className='flex h-14 items-center justify-between'>
          <div className='font-semibold'>Brand</div>
          <nav className='hidden gap-6 text-sm md:flex'>
            <a href='#' className='text-muted-foreground hover:text-foreground'>
              Features
            </a>
            <a href='#' className='text-muted-foreground hover:text-foreground'>
              Pricing
            </a>
            <a href='#' className='text-muted-foreground hover:text-foreground'>
              Docs
            </a>
          </nav>
          <div className='flex items-center gap-3'>
            <a href='#' className='text-primary text-sm'>
              Sign in
            </a>
            <a
              href='#'
              className='bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-sm'
            >
              Sign up
            </a>
          </div>
        </Container>
      </header>
      <Separator label='Default Section' className='my-8' />
      <Section>
        <Container>
          <h2 className='text-xl font-semibold'>
            Default Section (constrained)
          </h2>
          <p className='text-muted-foreground'>
            Content is wrapped by Container.
          </p>
        </Container>
      </Section>

      <Separator label='Default Section with background' className='my-8' />
      <Section>
        <Container>
          <h2 className='text-xl font-semibold'>
            Default Section (constrained)
          </h2>
          <p className='text-muted-foreground'>
            Content is wrapped by Container.
          </p>
        </Container>
      </Section>

      <Separator label='Inline vertical separator example' className='my-8' />
      <Section>
        <Container>
          <div className='text-muted-foreground flex items-center text-sm'>
            <span>Item A</span>
            <Separator
              orientation='vertical'
              className='mx-4 data-[orientation=vertical]:h-4'
            />
            <span>Item B</span>
            <Separator
              orientation='vertical'
              className='mx-4 data-[orientation=vertical]:h-4'
            />
            <span>Item C</span>
          </div>
        </Container>
      </Section>

      <Separator label='Wider inner Container' className='my-8' />

      <Section>
        <Container className='max-w-7xl'>
          <h2 className='text-xl font-semibold'>
            Section with wider inner Container
          </h2>
          <p className='text-muted-foreground'>
            Overrides max-width for this Section only.
          </p>
        </Container>
      </Section>
      <Separator label='Full width Section' className='my-8' />

      <Section className='bg-secondary'>
        <div className='py-12 text-center'>
          <h2 className='text-xl font-semibold'>Full width Section</h2>
          <p className='text-muted-foreground'>
            No horizontal padding or constraint.
          </p>
        </div>
      </Section>
      <Separator label='Standalone Container band' className='my-8' />

      <Section className='bg-muted/40'>
        <Container className='py-12'>
          <h2 className='text-xl font-semibold'>
            Full width background with constrained content
          </h2>
          <p className='text-muted-foreground'>
            Manually add Container inside a fullWidth Section.
          </p>
        </Container>
      </Section>

      <div className='border-y'>
        <Container className='py-6'>
          <div className='flex items-center justify-between'>
            <span className='font-medium'>Standalone Container band</span>
            <nav className='flex gap-4 text-sm'>
              <a href='#' className='text-primary'>
                Link A
              </a>
              <a href='#' className='text-primary'>
                Link B
              </a>
            </nav>
          </div>
        </Container>
      </div>

      {/* Hero (gradient background) full-bleed with constrained content */}
      <Section className='from-primary/10 bg-gradient-to-b to-transparent'>
        <Container className='py-16 text-center'>
          <h1 className='text-3xl font-semibold'>Gradient Hero</h1>
          <p className='text-muted-foreground mt-2'>
            Full width background, inner content constrained with Container.
          </p>
        </Container>
      </Section>
      <Separator label='Two-column Content' className='my-8' />

      {/* Two-column content inside a default Section */}
      <Section>
        <Container>
          <div className='grid items-start gap-8 md:grid-cols-2'>
            <div>
              <h3 className='text-lg font-semibold'>Column A</h3>
              <p className='text-muted-foreground mt-2'>
                Uses the default Container padding and max-width.
              </p>
            </div>
            <div className='rounded-xl border p-6'>Card content</div>
          </div>
        </Container>
      </Section>
      <Separator label='Full-bleed Gallery' className='my-8' />

      {/* Full-bleed gallery (no padding) */}
      <Section className='bg-primary/60'>
        <Container className='max-w-full'>
          <div className='grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4'>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className='bg-muted/90 h-32' />
            ))}
          </div>
        </Container>
      </Section>

      <Separator label='CTA Band' className='my-8' />

      {/* CTA band with inverted colors */}
      <Section className='bg-foreground text-background'>
        <Container className='flex flex-col items-center gap-4 py-12 text-center sm:flex-row sm:justify-between sm:text-left'>
          <div>
            <h3 className='text-xl font-semibold'>Ready to get started?</h3>
            <p className='text-sm opacity-80'>
              Sign up and build with consistent layout primitives.
            </p>
          </div>
          <div className='flex gap-3'>
            <a
              href='#'
              className='bg-background text-foreground rounded-md px-4 py-2 text-sm'
            >
              Learn more
            </a>
            <a
              href='#'
              className='bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm'
            >
              Create account
            </a>
          </div>
        </Container>
      </Section>

      <Separator label='Footer' className='my-8' />

      {/* Footer using standalone Container */}
      <footer className='border-t'>
        <Container className='flex flex-col items-center justify-between gap-4 py-8 sm:flex-row'>
          <span className='text-muted-foreground text-sm'>
            © {new Date().getFullYear()} Brand Inc.
          </span>
          <nav className='flex gap-4 text-sm'>
            <a href='#' className='text-muted-foreground hover:text-foreground'>
              Privacy
            </a>
            <a href='#' className='text-muted-foreground hover:text-foreground'>
              Terms
            </a>
            <a href='#' className='text-muted-foreground hover:text-foreground'>
              Contact
            </a>
          </nav>
        </Container>
      </footer>
      <Separator label='Accessible Section' className='my-8' />

      <Section id='features' aria-labelledby='features-heading'>
        <Container>
          <h2 id='features-heading' className='text-xl font-semibold'>
            Accessible Section
          </h2>
          <div className='mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            <div className='rounded-xl border p-6'>Card 1</div>
            <div className='rounded-xl border p-6'>Card 2</div>
            <div className='rounded-xl border p-6'>Card 3</div>
          </div>
        </Container>
      </Section>
    </>
  );
}
