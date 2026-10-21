export type Locale = 'en' | 'ar';

export interface Translations {
  nav: {
    home: string;
    about: string;
    projects: string;
    contact: string;
    admin: string;
    whatsApp: string;
    openMenu: string;
  };
  hero: {
    name: string;
    available: string;
    defaultTitle: string;
    defaultHeadline: string;
    defaultDescription: string;
    viewProjects: string;
    contactMe: string;
    chatWhatsApp: string;
  };
  about: {
    badge: string;
    greeting: string;
    defaultBio: string;
    modernStackTitle: string;
    modernStackDesc: string;
    performanceTitle: string;
    performanceDesc: string;
    cleanArchTitle: string;
    cleanArchDesc: string;
    coreHighlights: string;
    highlight1: string;
    highlight2: string;
    highlight3: string;
    downloadResume: string;
    viewProjects: string;
    contactMe: string;
    availableBadge: string;
  };
  projects: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allCategories: string;
    featured: string;
    published: string;
    draft: string;
    liveDemo: string;
    sourceCode: string;
    viewDetails: string;
    noProjectsFound: string;
    backToProjects: string;
    keyFeatures: string;
    challenges: string;
    technologies: string;
    viewAll: string;
    featuredHeading: string;
    featuredSubtitle: string;
  };
  skills: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    subject: string;
    subjectPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    sendMessage: string;
    sending: string;
    successMessage: string;
    directContact: string;
    orReachDirectly: string;
  };
  footer: {
    quickLinks: string;
    connect: string;
    allRightsReserved: string;
    defaultFooterText: string;
  };
  admin: {
    panelTitle: string;
    dashboard: string;
    projects: string;
    newProject: string;
    skills: string;
    settings: string;
    logout: string;
    loggingOut: string;
    backToSite: string;
    totalProjects: string;
    publishedProjects: string;
    draftProjects: string;
    featuredProjects: string;
    recentProjects: string;
    noProjectsYet: string;
    createFirstProject: string;
    saveSettings: string;
    saving: string;
    settingsSaved: string;
    loginTitle: string;
    loginSubtitle: string;
    signIn: string;
    signingIn: string;
    email: string;
    password: string;
    welcomeBack: string;
    overview: string;
    whatsAppNotConfigured: string;
    whatsAppReminder: string;
    configure: string;
    edit: string;
    delete: string;
    addSkill: string;
    skillCategory: string;
    skillName: string;
    order: string;
    visible: string;
    actions: string;
    confirmDelete: string;
  };
  common: {
    loading: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    close: string;
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      admin: 'Admin',
      whatsApp: 'WhatsApp',
      openMenu: 'Open navigation menu',
    },
    hero: {
      name: 'Ahmed Zaki',
      available: 'Available for new opportunities',
      defaultTitle: 'Frontend Engineer | React Developer',
      defaultHeadline: 'Building Modern, Responsive, and User-Focused Web Experiences.',
      defaultDescription:
        'A passionate Frontend Engineer specializing in React and modern web technologies. I build responsive, accessible, and performant web applications with clean code and thoughtful user experiences.',
      viewProjects: 'View My Projects',
      contactMe: 'Contact Me',
      chatWhatsApp: 'Chat on WhatsApp',
    },
    about: {
      badge: 'About Me',
      greeting: "Hi, I'm",
      defaultBio:
        'I am a Frontend Engineer focused on building modern web applications using React, TypeScript, and the latest web technologies. My journey in web development is driven by a passion for creating intuitive, accessible, and performant user interfaces.\n\nI specialize in React ecosystem tools including Next.js, Tailwind CSS, and component libraries like shadcn/ui. I follow best practices for code quality, version control with Git and GitFlow, and continuously expand my technical skills.',
      modernStackTitle: 'Modern Stack',
      modernStackDesc: 'React 19, Next.js, TypeScript & Tailwind CSS v4.',
      performanceTitle: 'Performance',
      performanceDesc: 'Fast loading, accessible (a11y), responsive across all devices.',
      cleanArchTitle: 'Clean Architecture',
      cleanArchDesc: 'Maintainable components, GitFlow, and thoughtful UX.',
      coreHighlights: 'Core Highlights',
      highlight1: 'Specialized in building scalable, component-driven web applications',
      highlight2: 'Translating complex Figma designs into pixel-perfect interactive code',
      highlight3: 'Full integration with Supabase backend, authentication & APIs',
      downloadResume: 'Download Resume',
      viewProjects: 'View My Projects',
      contactMe: 'Contact Me',
      availableBadge: 'Available',
    },
    projects: {
      title: 'Projects',
      subtitle: 'A showcase of my recent web development work',
      searchPlaceholder: 'Search projects by title, tech...',
      allCategories: 'All',
      featured: 'Featured',
      published: 'Published',
      draft: 'Draft',
      liveDemo: 'Live Demo',
      sourceCode: 'Source Code',
      viewDetails: 'View Details',
      noProjectsFound: 'No projects found matching your criteria.',
      backToProjects: 'Back to Projects',
      keyFeatures: 'Key Features',
      challenges: 'Challenges & Solutions',
      technologies: 'Technologies Used',
      viewAll: 'View All',
      featuredHeading: 'Featured Projects',
      featuredSubtitle: 'Hand-picked projects that reflect my passion for clean UI and performant web apps.',
    },
    skills: {
      title: 'Skills & Technologies',
      subtitle: 'Technologies and tools I work with',
    },
    contact: {
      title: 'Get In Touch',
      subtitle:
        'Have a project in mind or want to discuss opportunities? Feel free to reach out.',
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@example.com',
      subject: 'Subject',
      subjectPlaceholder: 'What is this regarding?',
      message: 'Message',
      messagePlaceholder: 'Your message...',
      sendMessage: 'Send Message',
      sending: 'Sending...',
      successMessage: 'Message sent successfully! I will get back to you soon.',
      directContact: 'Direct Contact',
      orReachDirectly: 'Or reach out directly via:',
    },
    footer: {
      quickLinks: 'Quick Links',
      connect: 'Connect',
      allRightsReserved: 'All rights reserved.',
      defaultFooterText: 'Crafted with passion and modern web technologies.',
    },
    admin: {
      panelTitle: 'Admin Panel',
      dashboard: 'Dashboard',
      projects: 'Projects',
      newProject: 'New Project',
      skills: 'Skills',
      settings: 'Settings',
      logout: 'Logout',
      loggingOut: 'Logging out...',
      backToSite: 'View Site',
      totalProjects: 'Total Projects',
      publishedProjects: 'Published',
      draftProjects: 'Drafts',
      featuredProjects: 'Featured',
      recentProjects: 'Recent Projects',
      noProjectsYet: 'No projects yet',
      createFirstProject: 'Create your first project',
      saveSettings: 'Save Settings',
      saving: 'Saving...',
      settingsSaved: 'Settings saved successfully',
      loginTitle: 'Sign In',
      loginSubtitle: 'Sign in to manage your portfolio',
      signIn: 'Sign In',
      signingIn: 'Signing in...',
      email: 'Email',
      password: 'Password',
      welcomeBack: 'Welcome back! Here is an overview of your portfolio.',
      overview: 'Overview',
      whatsAppNotConfigured: 'WhatsApp number not configured',
      whatsAppReminder: 'Add your WhatsApp number in Settings to enable the contact button on your portfolio.',
      configure: 'Configure',
      edit: 'Edit',
      delete: 'Delete',
      addSkill: 'Add Skill',
      skillCategory: 'Category',
      skillName: 'Skill Name',
      order: 'Order',
      visible: 'Visible',
      actions: 'Actions',
      confirmDelete: 'Are you sure you want to delete this item?',
    },
    common: {
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من أنا',
      projects: 'المشاريع',
      contact: 'تواصل معي',
      admin: 'لوحة التحكم',
      whatsApp: 'واتساب',
      openMenu: 'فتح القائمة الرئيسية',
    },
    hero: {
      name: 'أحمد زكي',
      available: 'متاح لفرص العمل والمشاريع الجديدة',
      defaultTitle: 'مهندس واجهات أمامية | مطور React',
      defaultHeadline: 'بناء تجارب ويب عصرية وسريعة تركز على راحة المستخدم.',
      defaultDescription:
        'مهندس واجهات أمامية شغوف متخصص في React وأحدث تقنيات الويب. أبني تطبيقات تفاعلية فائقة السرعة ومتوافقة مع مختلف الشاشات بكود نظيف وتجربة مستخدم مدروسة.',
      viewProjects: 'تصفح مشاريعي',
      contactMe: 'تواصل معي',
      chatWhatsApp: 'محادثة عبر واتساب',
    },
    about: {
      badge: 'نبذة عني',
      greeting: 'مرحباً، أنا',
      defaultBio:
        'أنا مهندس واجهات أمامية أركز على تطوير تطبيقات الويب الحديثة باستخدام React و TypeScript وأحدث تقنيات الويب. دافعي وشغفي الأساسي هو ابتكار واجهات مستخدم ممتعة وسلسة وذات أداء فائق.\n\nأتخصص في منظومة أدوات React بما في ذلك Next.js و Tailwind CSS ومكتبات المكونات الاحترافية مثل shadcn/ui. ألتزم بأفضل معايير جودة الكود، وإدارة الإصدارات عبر Git و GitFlow، ومواكبة كل جديد في عالم الويب.',
      modernStackTitle: 'أحدث التقنيات',
      modernStackDesc: 'React 19 و Next.js و TypeScript و Tailwind CSS v4.',
      performanceTitle: 'أداء وسرعة',
      performanceDesc: 'تحميل فائق السرعة، متوافق مع كافة الشاشات والمعايير القياسية.',
      cleanArchTitle: 'هيكلية نظيفة',
      cleanArchDesc: 'مكونات قابلة للتوسع والصيانة، GitFlow وتجربة مستخدم مدروسة.',
      coreHighlights: 'أبرز الخبرات والمهارات',
      highlight1: 'متخصص في بناء تطبيقات ويب متكاملة وقابلة للتوسع تعتمد على المكونات',
      highlight2: 'تحويل تصاميم Figma المعقدة إلى كود تفاعلي دقيق ومطابق للتصميم',
      highlight3: 'ربط متكامل مع خلفيات Supabase والمصادقة وإدارة قواعد البيانات',
      downloadResume: 'تحميل السيرة الذاتية',
      viewProjects: 'تصفح مشاريعي',
      contactMe: 'تواصل معي',
      availableBadge: 'متاح للعمل',
    },
    projects: {
      title: 'المشاريع',
      subtitle: 'مجموعة مختارة من أبرز مشاريع وتطبيقات الويب التي قمت بتطويرها',
      searchPlaceholder: 'ابحث في المشاريع بالاسم أو التقنية...',
      allCategories: 'الكل',
      featured: 'مميز',
      published: 'منشور',
      draft: 'مسودة',
      liveDemo: 'معاينة حية',
      sourceCode: 'الكود المصدري',
      viewDetails: 'عرض التفاصيل',
      noProjectsFound: 'لم يتم العثور على أي مشاريع مطابقة لبحثك.',
      backToProjects: 'العودة للمشاريع',
      keyFeatures: 'أهم المميزات',
      challenges: 'التحديات والحلول',
      technologies: 'التقنيات المستخدمة',
      viewAll: 'عرض الكل',
      featuredHeading: 'المشاريع المميزة',
      featuredSubtitle: 'مشاريع مختارة تعكس الشغف بالكود النظيف والأداء العالي والتصميم المتقن.',
    },
    skills: {
      title: 'المهارات والتقنيات',
      subtitle: 'الأدوات والتقنيات التي أعتمد عليها في بناء المشاريع',
    },
    contact: {
      title: 'تواصل معي',
      subtitle:
        'هل لديك فكرة مشروع أو فرصة عمل تود مناقشتها؟ يسعدني ويشرفني تواصلك معي في أي وقت.',
      name: 'الاسم',
      namePlaceholder: 'اسمك الكريم',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'you@example.com',
      subject: 'الموضوع',
      subjectPlaceholder: 'ما موضوع رسالتك؟',
      message: 'الرسالة',
      messagePlaceholder: 'اكتب تفاصيل رسالتك هنا...',
      sendMessage: 'إرسال الرسالة',
      sending: 'جاري الإرسال...',
      successMessage: 'تم إرسال رسالتك بنجاح! سأتواصل معك في أقرب فرصة ممكنة.',
      directContact: 'قنوات التواصل المباشر',
      orReachDirectly: 'أو تواصل معي مباشرة عبر:',
    },
    footer: {
      quickLinks: 'روابط سريعة',
      connect: 'تواصل واجتماعي',
      allRightsReserved: 'جميع الحقوق محفوظة.',
      defaultFooterText: 'صُنع بشغف باستخدام أحدث تقنيات الويب العصرية.',
    },
    admin: {
      panelTitle: 'لوحة التحكم',
      dashboard: 'الرئيسية',
      projects: 'المشاريع',
      newProject: 'مشروع جديد',
      skills: 'المهارات',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج',
      loggingOut: 'جاري الخروج...',
      backToSite: 'زيارة الموقع',
      totalProjects: 'إجمالي المشاريع',
      publishedProjects: 'المشاريع المنشورة',
      draftProjects: 'المسودات',
      featuredProjects: 'المشاريع المميزة',
      recentProjects: 'أحدث المشاريع',
      noProjectsYet: 'لا توجد مشاريع حتى الآن',
      createFirstProject: 'أضف أول مشروع لك',
      saveSettings: 'حفظ الإعدادات',
      saving: 'جاري الحفظ...',
      settingsSaved: 'تم حفظ الإعدادات بنجاح',
      loginTitle: 'تسجيل الدخول',
      loginSubtitle: 'سجل الدخول لإدارة الموقع والمشاريع',
      signIn: 'دخول',
      signingIn: 'جاري التحقق والدخول...',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      welcomeBack: 'مرحباً بعودتك! إليك نظرة عامة على حالة موقعك ومشاريعك.',
      overview: 'نظرة عامة',
      whatsAppNotConfigured: 'رقم الواتساب غير محدد',
      whatsAppReminder: 'أضف رقم الواتساب في الإعدادات لتفعيل زر التواصل في موقعك.',
      configure: 'ضبط الآن',
      edit: 'تعديل',
      delete: 'حذف',
      addSkill: 'إضافة مهارة',
      skillCategory: 'التصنيف',
      skillName: 'اسم المهارة',
      order: 'الترتيب',
      visible: 'ظاهر',
      actions: 'إجراءات',
      confirmDelete: 'هل أنت متأكد من رغبتك في حذف هذا العنصر؟',
    },
    common: {
      loading: 'جاري التحميل...',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
      close: 'إغلاق',
    },
  },
};
