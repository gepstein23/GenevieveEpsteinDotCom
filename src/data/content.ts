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
      'Technical Leader',
      'Event-Driven Architecture',
      'Fraud Detection Infrastructure',
    ],
    ctaPrimary: 'View My Work',
    ctaSecondary: 'Get In Touch',
    photoAlt: 'Genevieve Epstein',
  },

  about: {
    heading: 'About Me',
    bio: [
      'Senior Software Engineer with 5+ years of experience designing and delivering high-throughput, event-driven systems on AWS. Proven track record in fraud detection infrastructure, real-time data pipelines, and cross-team technical leadership — reducing fraud, cost, and operational overhead at scale.',
      "When I'm not building or optimizing systems, nor busy on-call, you can find me playing cello, snowboarding, travelling, or deep in a tournament of Texas Hold 'Em.",
    ],
    interestsHeading: "When I'm not coding",
    interests: [
      { emoji: '\u{1F3BB}', label: 'Orchestra (Cello & Viola)' },
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
          'Optimizing High Hand poker promotions using Monte Carlo Tree Search. A memory-efficient Java simulation engine with a React UI, CI/CD pipeline via GitHub Actions, and WAF-secured AWS hosting on EC2 and Amplify.',
        techStack: ['Java', 'React', 'AWS EC2', 'AWS Amplify', 'MCTS'],
        sourceUrl: 'https://github.com/gepstein23/PokerHighHandSimulator',
        liveUrl: 'https://pokersim.genevieveepstein.com',
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
      { end: 51000, suffix: '+', label: 'fraudsters suspended' },
      { end: 3450000, suffix: '+', label: 'hours of potential fraud prevented' },
      { end: 1500, suffix: '+', label: 'analyst hours saved annually' },
    ],
    categories: [
      { key: 'languages', label: 'Languages', color: 'var(--color-text-secondary)' },
      { key: 'tools-platforms', label: 'Tools & Platforms', color: 'var(--color-accent-cyan)' },
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
          'Designed and delivered real-time fraud detection pipelines on AWS and Confluent Kafka, resulting in 51,000+ fraudulent account suspensions and 3.45M+ hours of potential fraud prevented.',
          'Built ML-powered decisioning services that automated analyst workflows, saving 1,500+ analyst hours annually while improving detection accuracy.',
          'Executed 10+ emergency releases for time-sensitive fraud vectors, coordinating cross-team response and external vendor integrations under tight deadlines.',
          'Redesigned a Flink streaming feature to cut costs by 98% and led microservices migration from monolith, improving deployment velocity and system resilience.',
        ],
      },
      {
        id: 'exp-2',
        role: 'Senior Software Engineer (ICB 3)',
        company: 'VMware by Broadcom',
        companyUrl: 'https://www.broadcom.com/vmware',
        period: 'Feb 2023 — Jul 2024',
        description: [
          'Delivered multi-product rearchitecture spanning 3 teams, introducing 2 of 4 supported VM types and driving cross-team redesign of backup/failover management.',
          'Built and launched an internal log parsing/querying tool adopted org-wide, significantly reducing debugging time across engineering.',
          'Founded the API design guild and mentored 2 interns through full project lifecycles, establishing patterns adopted across the organization.',
          'Developed 2 of 4 core VM cloning methods, improving performance by ~80% and reducing process time from days to hours.',
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
    { name: 'Python', category: 'languages' },
    { name: 'Bash', category: 'languages' },
    { name: 'SQL', category: 'languages' },
    { name: 'C#', category: 'languages' },
    { name: 'C++', category: 'languages' },

    // Tools & Platforms
    { name: 'Terraform/HCL', category: 'tools-platforms', highlighted: true },
    { name: 'AWS', category: 'tools-platforms' },
    { name: 'Lambda', category: 'tools-platforms' },
    { name: 'API Gateway', category: 'tools-platforms' },
    { name: 'SQS', category: 'tools-platforms' },
    { name: 'SNS', category: 'tools-platforms' },
    { name: 'EventBridge', category: 'tools-platforms' },
    { name: 'CloudWatch', category: 'tools-platforms' },
    { name: 'EC2', category: 'tools-platforms' },
    { name: 'ECR', category: 'tools-platforms' },
    { name: 'ECS', category: 'tools-platforms' },
    { name: 'S3', category: 'tools-platforms' },
    { name: 'Confluent Kafka', category: 'tools-platforms' },
    { name: 'Flink', category: 'tools-platforms' },
    { name: 'Docker', category: 'tools-platforms' },
    { name: 'Datadog', category: 'tools-platforms' },
    { name: 'Maven', category: 'tools-platforms' },
    { name: 'Gradle', category: 'tools-platforms' },
    { name: 'Spring', category: 'tools-platforms' },
    { name: 'Hibernate', category: 'tools-platforms' },
    { name: 'PagerDuty', category: 'tools-platforms' },
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
    pokerSim: {
      label: 'Poker Sim',
      url: 'https://pokersim.genevieveepstein.com',
      badge: 'Live',
    },
    hamburgerOpen: 'Close menu',
    hamburgerClosed: 'Open menu',
  },

  footer: {
    tagline: 'Built with curiosity & code',
    photoAlts: [
      'Genevieve Epstein — professional photo 1',
      'Genevieve Epstein — professional photo 2',
      'Genevieve Epstein — professional photo 3',
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
