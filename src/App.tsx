import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Instagram,
  Mail,
  MoveDown,
} from 'lucide-react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'

const portraitUrl = '/hero/avatar-demi.png'

const marqueeImages = [
  // Row 1
  'marquee/next-js.png',
  'marquee/ai.png',
  'marquee/github.png',
  'marquee/docker.jpg',
  'marquee/linux.png',
  'marquee/fast-api.png',

  // Row 2
  'marquee/aws.png',
  'marquee/redis.png',
  'marquee/python.png',
  'marquee/git.png',
  'marquee/go.png',
  'marquee/db.png',
]

const decorativeImages = {
  docker: '/about/docker.png',
  postgresql: '/about/postgresql.png',
  aws: '/about/aws.png',
  python: '/about/python.png',
}

const projects = [
{
number: '01',
category: 'Personal',
name: 'RAGnarok',
url: 'https://demi-ragnarok.vercel.app/',
images: [
'projects/rag/1.png',
'projects/rag/2.png',
'projects/rag/3.png',
],
},
{
number: '02',
category: 'Backend',
name: 'Payment Infrastructure',
url: 'https://github.com/th-demi/payments_infrastructure',
images: [
'projects/payment-infrastructure/1.png',
'projects/payment-infrastructure/2.png',
'projects/payment-infrastructure/3.png',
],
},
{
number: '03',
category: 'Client',
name: 'GSIM Website',
url: 'https://www.goodshepherdim.com/',
images: [
'projects/gsim-website/1.png',
'projects/gsim-website/2.png',
'projects/gsim-website/3.png',
],
},
]


const services = [
['01', 'Backend Development', 'Building scalable and reliable backend systems using Python, Django, FastAPI, and PostgreSQL, tailored for high-performance applications and products.'],
['02', 'API Development', 'Designing secure, well-structured REST and real-time APIs that connect applications, services, databases, and third-party platforms seamlessly.'],
['03', 'Full-Stack Development', 'Developing modern, responsive web applications with Next.js, React, and powerful backend systems to deliver complete end-to-end digital experiences.'],
['04', 'Cloud & DevOps', 'Deploying and maintaining production systems with Docker, AWS, Nginx, CI/CD, and scalable infrastructure built for reliability and performance.'],
['05', 'AI & RAG Solutions', 'Building intelligent applications with LLMs, RAG, vector search, embeddings, and document processing to turn complex data into useful insights.'],
]

type FadeInProps = {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  x?: number
  y?: number
}

function FadeIn({ children, className, delay = 0, duration = 0.7, x = 0, y = 30 }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

function ContactButton() {
  return (
    <a
      href="mailto:mariademetrius6@gmail.com"
      className="contact-button inline-flex items-center justify-center rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white transition-transform duration-300 hover:-translate-y-1 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
    >
      Contact me <ArrowUpRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.2} />
    </a>
  )
}

function LiveProjectButton({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center justify-center rounded-full border-2 border-[#D7E2EA] px-2.5 py-2 text-[8px] font-medium uppercase tracking-[0.12em] text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10 sm:px-6 sm:py-2.5 sm:text-xs md:px-8 md:py-3 md:text-sm"
    >
      Live project <ArrowUpRight className="ml-1 h-3 w-3 sm:ml-1.5 sm:h-3.5 sm:w-3.5" strokeWidth={2.2} />
    </a>
  )
}

function Magnet({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - (box.left + box.width / 2)
    const y = event.clientY - (box.top + box.height / 2)
    setPosition({ x: x / 3, y: y / 3 })
    setActive(true)
  }

  const reset = () => {
    setActive(false)
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div
      className={`-m-[150px] p-[150px] ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <div
        className="will-change-transform"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: active ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
        }}
      >
        {children}
      </div>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-[640px] flex-col overflow-x-clip bg-[#0C0C0C]" id="top">
      <FadeIn y={-20} className="relative z-30 px-6 pt-6 sm:px-10 sm:pt-8">
        <nav aria-label="Main navigation" className="mx-auto flex max-w-[1700px] items-center justify-between gap-3">
          {[
            ['About', '#about'],
            ['Price', '#services'],
            ['Projects', '#projects'],
            ['Contact', '#contact'],
          ].map(([label, href]) => (
            <a key={label} href={href} className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]">
              {label}
            </a>
          ))}
        </nav>
      </FadeIn>

      <FadeIn delay={0.15} y={40} className="relative z-0 mt-6 overflow-hidden sm:mt-4 md:-mt-5">
        <h1 className="hero-heading w-full whitespace-nowrap text-center text-[14vw] font-black uppercase leading-none tracking-tight sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
          Hi, i&apos;m Demi
        </h1>
      </FadeIn>

      <FadeIn delay={0.6} y={30} className="absolute left-0 right-0 top-1/2 z-10 mx-auto w-[280px] sm:top-auto sm:bottom-8 sm:w-[360px] md:w-[440px] lg:w-[520px]">
        <Magnet>
          <img src={portraitUrl} alt="Demi, Software Developer" className="block w-full select-none -translate-y-1/2 sm:translate-y-0" draggable="false" />
        </Magnet>
      </FadeIn>

      <div className="relative z-20 mt-auto flex items-end justify-between gap-4 px-6 pb-7 sm:px-10 sm:pb-8 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]">
            A Software developer driven by building powerful digital products
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}

function MarqueeRow({ images, direction }: { images: string[]; direction: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const [sectionTop, setSectionTop] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (ref.current) setSectionTop(ref.current.getBoundingClientRect().top + window.scrollY)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const baseOffset = useTransform(scrollY, (value) => (value - sectionTop + window.innerHeight) * 0.15)
  const x = useTransform(baseOffset, (value) => (direction === 'right' ? -value : value))
  const springX = useSpring(x, { stiffness: 120, damping: 30, mass: 0.2 })
  const tiles = [...images, ...images, ...images, ...images]

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div className="flex w-max gap-3 will-change-transform" style={{ x: springX }}>
        {tiles.map((src, index) => (
          <img 
            key={`${src}-${index}`} 
            src={src} 
            alt="Selected work preview" 
            loading="lazy" 
            className="marquee-image h-[270px] w-[420px] shrink-0 rounded-2xl object-cover select-none" 
            draggable="false"
          />
        ))}
      </motion.div>
    </div>
  )
}

function MarqueeSection() {
  const row1 = marqueeImages.slice(0, 6)
  const row2 = marqueeImages.slice(6, 12)

  return (
    <section aria-label="Motion work previews" className="overflow-hidden bg-[#0C0C0C] pt-24 pb-10 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        <MarqueeRow images={row1} direction="right" />
        <MarqueeRow images={row2} direction="left" />
      </div>
    </section>
  )
}

function AnimatedCharacter({ character, progress, index, total }: { character: string; progress: MotionValue<number>; index: number; total: number }) {
  const start = Math.max(0, (index / total) * 0.7 - 0.08)
  const end = Math.min(1, start + 0.25)
  const opacity = useTransform(progress, [start, end], [0.2, 1])
  return (
    <span className="relative inline-block">
      <span className="invisible">{character === ' ' ? '\u00A0' : character}</span>
      <motion.span className="absolute inset-0" style={{ opacity }} aria-hidden="true">
        {character === ' ' ? '\u00A0' : character}
      </motion.span>
    </span>
  )
}

function AnimatedText({ children }: { children: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] })
  const words = children.split(/(\s+)/)
  let characterIndex = 0
  return (
    <p ref={ref} className="max-w-[560px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]">
      {words.map((word, wordIndex) => {
        if (/^\s+$/.test(word)) {
          characterIndex += word.length
          return ' '
        }
        const offset = characterIndex
        characterIndex += word.length
        return (
          <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
            {Array.from(word).map((character, index) => (
              <AnimatedCharacter key={`${character}-${index}`} character={character} progress={scrollYProgress} index={offset + index} total={children.length} />
            ))}
          </span>
        )
      })}
    </p>
  )
}

function AboutSection() {
  const aboutCopy = "With experience in backend and full-stack development, I focus on building scalable systems, APIs, and intelligent products. I truly enjoy solving complex problems and turning ideas into reliable, high-performance software. Let’s build something incredible together!"
  return (
    <section id="about" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10">
      <FadeIn delay={0.1} duration={0.9} x={-80} y={0} className="pointer-events-none absolute top-[4%] left-[1%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]">
        <img src={decorativeImages.python} alt="" className="w-full" />
      </FadeIn>
      <FadeIn delay={0.25} duration={0.9} x={-80} y={0} className="pointer-events-none absolute bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]">
        <img src={decorativeImages.postgresql} alt="" className="w-full" />
      </FadeIn>
      <FadeIn delay={0.15} duration={0.9} x={80} y={0} className="pointer-events-none absolute top-[4%] right-[1%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]">
        <img src={decorativeImages.aws} alt="" className="w-full" />
      </FadeIn>
      <FadeIn delay={0.3} duration={0.9} x={80} y={0} className="pointer-events-none absolute right-[3%] bottom-[8%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]">
        <img src={decorativeImages.docker} alt="" className="w-full" />
      </FadeIn>

      <div className="relative z-10 flex max-w-5xl flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">About me</h2>
        </FadeIn>
        <AnimatedText>{aboutCopy}</AnimatedText>
        <div id="contact" className="pt-6 sm:pt-8 md:pt-10">
          <ContactButton />
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section id="services" className="relative z-10 rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <h2 className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">Services</h2>
      <div className="mx-auto max-w-5xl">
        {services.map(([number, title, description], index) => (
          <FadeIn key={number} delay={index * 0.1} y={22}>
            <article className="grid grid-cols-[minmax(74px,20%)_1fr] gap-3 border-t border-[rgba(12,12,12,0.15)] py-8 sm:grid-cols-[minmax(120px,20%)_1fr] sm:gap-6 sm:py-10 md:py-12">
              <span className="text-[clamp(3rem,10vw,140px)] font-black leading-[0.78] tracking-tight">{number}</span>
              <div className="pt-1 sm:pt-2 md:pt-3">
                <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase leading-none">{title}</h3>
                <p className="mt-3 max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60 sm:mt-4">{description}</p>
              </div>
            </article>
          </FadeIn>
        ))}
        <div className="border-t border-[rgba(12,12,12,0.15)]" />
      </div>
    </section>
  )
}

type Project = (typeof projects)[number]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  const targetScale = 1 - (projects.length - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div ref={cardRef} className="h-[85vh] min-h-[550px]">
      <motion.article
        style={{ scale, top: `calc(6rem + ${index * 28}px)` }}
        className="sticky origin-top overflow-hidden rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:top-32 md:rounded-[60px] md:p-8"
      >
        <div className="mb-4 flex items-start justify-between gap-3 sm:mb-6">
          <div className="flex min-w-0 items-start gap-3 sm:gap-5 md:gap-7">
            <span className="text-[clamp(3rem,8vw,110px)] font-black leading-[0.75] tracking-tight text-[#D7E2EA]">{project.number}</span>
            <div className="pt-0.5 sm:pt-1 md:pt-2">
              <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/60 sm:mb-2 sm:text-xs">{project.category}</p>
              <h3 className="project-card-title text-[clamp(0.95rem,2.2vw,2rem)] font-medium uppercase leading-none text-[#D7E2EA]">{project.name}</h3>
            </div>
          </div>
          <LiveProjectButton url={project.url} />
        </div>

        <div className="grid grid-cols-[40%_1fr] gap-2 sm:gap-3 md:gap-4">
          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
            <img src={project.images[0]} alt={`${project.name} preview one`} className="h-[clamp(130px,16vw,230px)] w-full rounded-[30px] object-cover sm:rounded-[40px] md:rounded-[50px]" />
            <img src={project.images[1]} alt={`${project.name} preview two`} className="h-[clamp(160px,22vw,340px)] w-full rounded-[30px] object-cover sm:rounded-[40px] md:rounded-[50px]" />
          </div>
          <img src={project.images[2]} alt={`${project.name} main preview`} className="h-full min-h-[298px] w-full rounded-[30px] object-cover sm:min-h-[380px] sm:rounded-[40px] md:min-h-[586px] md:rounded-[50px]" />
        </div>
      </motion.article>
    </div>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative z-20 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pt-20 pb-12 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32 md:pb-20">
      <div className="mx-auto max-w-7xl">
        <FadeIn y={40}>
          <h2 className="hero-heading mb-12 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-16 md:mb-20">Project</h2>
        </FadeIn>
        {projects.map((project, index) => <ProjectCard key={project.number} project={project} index={index} />)}
      </div>
      <footer className="mx-auto mt-4 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-[#D7E2EA]/20 pt-6 text-xs uppercase tracking-widest text-[#D7E2EA]/50 sm:flex-row">
        <span>Demi © 2026</span>
        <div className="flex items-center gap-4">
          <a href="mailto:mariademetrius6@gmail.com" className="transition-colors hover:text-[#D7E2EA]" aria-label="Email Demi"><Mail className="h-4 w-4" /></a>
          <a href="#top" className="transition-colors hover:text-[#D7E2EA]" aria-label="Back to top"><MoveDown className="h-4 w-4 rotate-180" /></a>
          <a href="https://www.instagram.com/th_demi/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#D7E2EA]" aria-label="Demi on Instagram"><Instagram className="h-4 w-4" /></a>
        </div>
      </footer>
    </section>
  )
}

export default function App() {
  return (
    <main className="overflow-x-clip bg-[#0C0C0C] font-kanit">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  )
}
