import type { Project, ExperienceItem, Skill, SocialLink, SectionId } from '@/types'

/**
 * Single source of truth for every user-facing string on the site.
 *
 * Edit content here — it propagates everywhere automatically.
 * The old per-topic data files (siteConfig, projects, etc.) re-export
 * slices of this object for backwards compatibility.
 */
export const content = {
  meta: {
    name: 'Genevieve Epstein',
    email: 'genevieve.epstein@gmail.com',
    location: 'Atlanta, GA',
    hometown: 'San Francisco, CA',
    resumeUrl: '#',
  },

  hero: {
    greeting: "Hello, I'm",
    taglines: [
      'Senior Software Engineer',
      'Mentor and Leader',
      'Cloud-Native Engineer',
      'Backend Systems Builder',
    ],
    ctaPrimary: 'View My Work',
    ctaSecondary: 'Get In Touch',
    photoAlt: 'Genevieve Epstein',
  },

  about: {
    heading: 'About Me',
    bio: [
      'Senior Software Engineer specializing in large-scale backend systems and cloud-native infrastructure, with a proven record of delivering high-impact features on AWS that reduce fraud, cost, and operational overhead.',
      "When I'm not building or optimizing systems, nor busy on-call, you can find me playing cello, snowboarding, travelling, or deep in a tournament of Texas Hold 'Em.",
    ],
    interestsHeading: "When I'm not coding",
    interests: [
      { emoji: '\u{1F3BB}', label: 'Cello & Viola' },
      { emoji: '\u{1F3C2}', label: 'Snowboarding' },
      { emoji: '\u{1F5A8}\uFE0F', label: '3D Printing' },
      { emoji: '\u{1F6B4}', label: 'SoulCycle' },
      { emoji: '\u{1F0CF}', label: "Texas Hold 'Em" },
      { emoji: '\u{1F3AE}', label: 'PC Gaming' },
      { emoji: '\u{1F9E0}', label: 'Trivia' },
      { emoji: '\u{1F1EB}\u{1F1F7}', label: 'Fluent in French' },
    ],
  },

  projects: {
    heading: 'Projects',
    githubUrl: 'https://github.com/gepstein23?tab=repositories',
    githubLinkText: 'See more!',
    items: [
      {
        id: 'poker-high-hand',
        title: 'Poker High Hand Simulator',
        description:
          'Researching the optimization of High Hand promotions using Monte Carlo Tree Search. A memory-efficient Java app performing adjustable simulations with custom card-playing mechanics, React UI, animations, and ML capabilities — hosted on AWS EC2 and AWS Amplify.',
        techStack: ['Java', 'React', 'AWS EC2', 'AWS Amplify', 'MCTS'],
        sourceUrl: 'https://github.com/gepstein23/PokerHighHandSimulator',
        liveUrl: '/wip.html',
        liveLabel: 'Try it out!',
        imageAlt: 'Poker High Hand Simulator screenshot',
      },
      {
        id: 'portfolio-site',
        title: 'Portfolio Website',
        description:
          'This very site! A creative, interactive portfolio built with React and tsParticles. Features a custom cursor, 3D card effects, glassmorphism, and scroll-triggered animations.',
        techStack: ['React', 'TypeScript', 'Claude AI'],
        sourceUrl: 'https://github.com/gepstein23/GenevieveEpsteinDotCom',
        imageAlt: 'Portfolio website screenshot',
      },
    ] satisfies Project[],
  },

  resume: {
    heading: 'Experience',
    stats: [
      { end: 3000, suffix: '+', label: 'reqs/sec handled' },
      { end: 51000, suffix: '+', label: 'fraud accounts caught' },
      { end: 3450000, suffix: '+', label: 'hours of potential fraud prevented' },
    ],
    categories: [
      { key: 'languages', label: 'Languages', color: 'var(--color-text-secondary)' },
      { key: 'frameworks', label: 'Frameworks & Libraries', color: 'var(--color-accent-purple)' },
      { key: 'cloud', label: 'Cloud & Infrastructure', color: 'var(--color-accent-pink)' },
      { key: 'tools', label: 'Tools & Observability', color: 'var(--color-accent-cyan)' },
    ] as const,
    techStackHeading: 'Tech Stack',
    education: {
      heading: 'Education',
      degree: 'B.Sc. Computer Science',
      school: 'Northeastern University',
      college: 'Khoury College of Computer Sciences',
      concentration: 'Concentration in Systems, Minor in Music',
      graduationDate: 'Graduated December 2021',
    },
    awards: {
      heading: 'Awards',
      items: [
        { title: 'Rising Stars Program Award', org: 'FanDuel \u00B7 July 2025' },
       // { title: '#1 Ranked Senior Software Engineer', org: 'FanDuel Trust & Safety \u00B7 2025' },
      ],
    },
    experience: [
      {
        id: 'exp-1',
        role: 'Senior Software Engineer (L4)',
        company: 'FanDuel',
        companyUrl: 'https://www.fanduel.com',
        period: 'Jul 2024 — Present',
        description: [
          'Led design and delivery of fraud mitigation features on AWS and Confluent using event-driven architectures, resulting in 51,000+ fraudulent account suspensions and 3.45M+ hours of potential fraud prevented.',
          'Drove process and operational improvements, including abstracting 3 algorithms into shared libraries and redesigning a Flink feature to cut cost by 98%.',
          'Emerged as de facto technical lead by aligning cross-team work, coordinating with external vendors, and executing 9 emergency releases for time-sensitive requests.',
          'Supported mission-critical, high-throughput services (withdrawals and login flows up to 3,000 reqs/sec) and delivered multiple external vendor integrations.',
        ],
      },
      {
        id: 'exp-2',
        role: 'Senior Software Engineer (ICB 3)',
        company: 'VMware by Broadcom',
        companyUrl: 'https://www.broadcom.com/vmware',
        period: 'Feb 2023 — Jul 2024',
        description: [
          'Developed 2 of 4 core VM cloning methods, improving performance by ~80%, reducing process time from days to hours.',
          'Introduced 2 of 4 supported VM types, including one driving a cross-team rearchitecture of backup/failover management.',
          'Designed and launched a log parsing/querying tool adopted across teams, significantly reducing debugging time.',
          'Supported cross-functional teams by triaging 5,000+ test failures and mentoring peers.',
        ],
      },
      {
        id: 'exp-3',
        role: 'Software Engineer 2',
        company: 'VMware by Broadcom',
        companyUrl: 'https://www.broadcom.com/vmware',
        period: 'Dec 2021 — Feb 2023',
        description: [
          'Resolved 400+ product issues, found and filed 350+ bugs, implemented 10+ RESTful API endpoints.',
          'Led integration of team workflows into new service environments, enabling a successful SaaS product launch.',
          'Acted as subject matter expert for several key features, ensuring prioritization and delivery across environments.',
        ],
      },
      {
        id: 'exp-4',
        role: 'Student Cooperative Engineer',
        company: 'VMware by Broadcom',
        companyUrl: 'https://www.broadcom.com/vmware',
        period: 'Jul 2019 — Dec 2021',
        description: [
          'Full-time and part-time intern across multiple teams, contributing to core product development.',
        ],
      },
    ] satisfies ExperienceItem[],
  },

  skills: [
    // Languages
    { name: 'Java', category: 'languages', highlighted: true },
    { name: 'Terraform', category: 'languages', highlighted: true },
    { name: 'Python', category: 'languages' },
    { name: 'TypeScript', category: 'languages' },
    { name: 'SQL', category: 'languages' },
    { name: 'C#', category: 'languages' },
    { name: 'C++', category: 'languages' },
    { name: 'Bash', category: 'languages' },

    // Frameworks & Libraries
    { name: 'Spring', category: 'frameworks' },
    { name: 'Hibernate', category: 'frameworks' },
    { name: 'React', category: 'frameworks' },
    { name: 'Kafka', category: 'frameworks' },
    { name: 'Flink', category: 'frameworks' },
    { name: 'Confluent', category: 'frameworks' },
    { name: 'REST APIs', category: 'frameworks' },
    { name: 'Maven', category: 'frameworks' },
    { name: 'Gradle', category: 'frameworks' },

    // Cloud & Infrastructure
    { name: 'AWS', category: 'cloud' },
    { name: 'EC2', category: 'cloud' },
    { name: 'Amplify', category: 'cloud' },
    { name: 'Lambda', category: 'cloud' },
    { name: 'Docker', category: 'cloud' },
    { name: 'CI/CD', category: 'cloud' },

    // Tools & Observability
    { name: 'DataDog', category: 'tools' },
    { name: 'BuildKite', category: 'tools' },
    { name: 'PagerDuty', category: 'tools' },
    { name: 'Git', category: 'tools' },
    { name: 'IntelliJ', category: 'tools' },
    { name: 'HTML/CSS', category: 'tools' },
  ] satisfies Skill[],

  contact: {
    heading: 'Get In Touch',
    subtext:
      "Have a project in mind, want to collaborate, or just want to say hi? I'd love to hear from you.",
    form: {
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      messageLabel: 'Message',
      messagePlaceholder: "What's on your mind?",
      submitText: 'Send Message →',
    },
    statusSent: 'Opening your email client\u2026 Thanks for reaching out!',
    statusRateLimited: 'Please wait a moment before sending another message.',
    emailSubject: 'Hello from your portfolio!',
    emailBodyTemplate: (name: string, message: string) =>
      `Hi Genevieve,\n\nMy name is ${name}.\n\n${message}`,
  },

  navigation: {
    items: [
      { id: 'hero' as SectionId, label: 'Home' },
      { id: 'about' as SectionId, label: 'About' },
      { id: 'projects' as SectionId, label: 'Projects' },
      { id: 'resume' as SectionId, label: 'Resume' },
      { id: 'contact' as SectionId, label: 'Contact' },
    ],
    hamburgerOpen: 'Close menu',
    hamburgerClosed: 'Open menu',
  },

  footer: {
    tagline: 'Built with curiosity & code',
    photoAlts: [
      'Genevieve Epstein — professional photo 1',
      'Genevieve Epstein — professional photo 2',
    ],
  },

  projectCard: {
    liveDemoLabel: 'Live Demo',
    sourceCodeLabel: 'Source Code',
  },

  logo: {
    ariaLabel: 'GE logo',
  },

  socialLinks: [
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com/gepstein23',
      icon: 'github',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/genevieveepstein',
      icon: 'linkedin',
    },
    {
      id: 'email',
      label: 'Email',
      url: 'mailto:genevieve.epstein@gmail.com',
      icon: 'email',
    },
  ] satisfies SocialLink[],
} as const
