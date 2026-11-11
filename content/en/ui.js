/*
  INTERFACE TEXT (menus, headings, buttons, short descriptions).
  Edit the text inside the quotes. Leave anything in {curly brackets} as it is:
  those are filled in by the site (for example {name} or {date}).
  Patient-facing text aims for a 6th-grade reading level.
*/
HTH.content.en.ui = {
  appName: "Heart Transition Hub",
  tagline: "Congenital heart disease: moving to adult care",
  skip: "Skip to main content",
  helpNow: "Need help now?",
  /* Shown at the top of every page until lastClinicalReview is set in content/languages.js. */
  draftBanner: "Pilot version. Content is awaiting clinical review.",
  memoryOnly: "This browser is not saving what you type (it may be in private mode). Download your summary before you close this page.",
  menu: "Menu",
  homeLabel: "Home",

  nav: {
    patients: "Patients and families",
    pro: "Care team",
    tools: "My tools",
    about: "About",
    patientsAll: "Overview",
    proAll: "Overview for the care team",
    proProgram: "Program resources",
    proShare: "Share with patients (QR code)",
    toolsAll: "All tools"
  },
  common: { next: "Next", back: "Back", remove: "Remove", saved: "What you type saves on this device as you go.", language: "Language", open: "Open" },

  /* Patient information sections: title and one-line description, used in menus and cards. */
  sections: {
    transition: { title: "Understanding transition", desc: "What moving to adult care means, and what to expect at each age." },
    heart: { title: "Heart conditions explained", desc: "Plain-language explanations of common congenital heart conditions." },
    living: { title: "Living with a heart condition", desc: "Exercise, dental care, travel, pregnancy, and when to call for help." },
    wellbeing: { title: "Mood and wellbeing", desc: "Why low mood and worry are common, what helps, and where to get support." },
    learning: { title: "Learning, attention and memory", desc: "Why these can be affected, and the support you can ask for." },
    money: { title: "Insurance and adult life", desc: "Health insurance, college, work, and what changes at 18 and 26." },
    transfer: { title: "Moving to adult care", desc: "Finding an adult congenital heart clinic and getting to the first visit." },
    team: { title: "Your care team", desc: "Who does what, and questions you can ask each of them." }
  },
  /* Optional tools. */
  toolItems: {
    passport: { title: "My Heart Passport", desc: "Your own record of your condition, medicines, and contacts, with a wallet card." },
    ready: { title: "Am I Ready?", desc: "A self-check of the skills you need to manage your own heart care." },
    checkin: { title: "Mood and worry check-ins", desc: "Two short questionnaires doctors use. Private to you." },
    learncheck: { title: "Learning and attention self-check", desc: "A short list to help you decide whether to ask about an evaluation." },
    share: { title: "My summary", desc: "Download, share, or email what you have entered, and write questions for your team." }
  },

  footer: {
    disclaimer: "This website gives general information. It is not medical advice and does not replace your care team. Nothing you type here is monitored. In an emergency, call 911.",
    version: "Version {v}",
    reviewed: "Last clinically reviewed: {date}",
    notReviewed: "Content awaiting clinical review.",
    about: "About and privacy",
    sources: "Sources",
    erase: "Erase my data"
  },
  erase: { confirm: "Erase everything you typed into this site on this device? This cannot be undone." },

  home: {
    eyebrow: "Congenital heart disease",
    title: "Moving from pediatric to adult congenital heart care",
    lead: "Clear, trusted information for young people born with a heart condition, their families, and the teams who care for them.",
    ctaPatient: "I am a patient or family member",
    ctaPro: "I am on the care team",
    glanceTitle: "The path to adult care",
    glanceLink: "See what to expect at each age",
    patientsTitle: "For patients and families",
    patientsLead: "Read as much or as little as you like. There is nothing to sign up for.",
    proTitle: "For the care team",
    proLead: "Role-by-role guidance, a transition timeline, a transfer summary checklist, and a QR code flyer to hand to patients.",
    proAll: "Care team overview",
    toolsTitle: "Optional tools",
    toolsLead: "If you want to go further, these tools help you get organized for your visits.",
    privacy: "Private by design: what you type stays on your own device. There is no account, and this site does not collect your information."
  },

  patients: {
    title: "For patients and families",
    lead: "Most people born with a heart condition need heart care for life. Around your late teens, that care moves from a children's heart team to an adult one. These pages explain what to expect and how to get ready.",
    toolsTitle: "Optional tools",
    toolsLead: "Get organized for your visits. What you type stays on your device."
  },

  tools: {
    title: "My tools",
    lead: "These are optional. Use them to get organized, then bring or send a summary to your team if you choose.",
    privacyTitle: "Your privacy",
    privacy: [
      "What you type is stored only in the browser on this phone or computer.",
      "This site does not send it anywhere. You decide whether to download, share, or email a summary.",
      "If other people use this device, they could open this site and see what you typed. \"Erase my data\" removes it for good."
    ]
  },

  share: {
    title: "My summary",
    intro: "Make a short summary to give to your team. You decide what goes in it and who gets it.",
    questionsTitle: "My questions for my team",
    questionsHint: "Write them down as you think of them, so you do not forget at the visit.",
    questionLabel: "Question {n}",
    addQuestion: "Add a question",
    includeTitle: "What to put in my summary",
    incPassport: "My Heart Passport",
    incCheckin: "My latest check-in results (mood and worry)",
    incCheckinNone: "My check-in results (none yet)",
    incReady: "My Am I Ready? answers",
    incLearning: "My learning and attention self-check",
    incProgress: "My transfer steps and team checklists",
    download: "Download as PDF",
    share: "Share the PDF",
    email: "Email it as text",
    emailSubject: "My heart summary",
    emailNote: "\"Email it as text\" opens your own email app with the summary written in the message. You choose who to send it to, such as yourself or your clinic. To send the PDF instead, download it and attach it.",
    walletTitle: "My wallet card",
    wallet: "Download my wallet card (PDF)",
    walletHint: "Print it, cut it out, fold it, and keep it with your ID.",
    portalNote: "The most private way to send this to your team is through your patient portal (such as MyChart), or by bringing it to your visit. Regular email is less private, so only use it if you are comfortable with that.",
    privateNote: "Your summary only includes what is ticked here. Once you send it, the people you send it to can read it.",
    fileTitle: "My heart summary",
    made: "Your PDF is ready. Look in your downloads."
  },

  pdf: {
    title: "Heart Transition Hub: My Summary",
    completed: "Completed {date}",
    name: "Name",
    dob: "Date of birth",
    notice: "This summary was filled in by the patient or caregiver using Heart Transition Hub, a free educational website. It has not been reviewed by a clinician. Screening results are not a diagnosis.",
    passport: "My Heart Passport",
    diagnosis: "Heart condition",
    surgeries: "Surgeries and procedures",
    medicines: "Medicines",
    allergies: "Allergies",
    devices: "Devices",
    peds: "Pediatric cardiologist",
    achd: "ACHD cardiologist",
    emergency: "Emergency contacts",
    none: "None",
    blank: "Not filled in",
    screener: "self-report screener",
    instrument: "Instrument",
    date: "Date completed",
    total: "Total score",
    totalValue: "{score} out of {max}",
    range: "Severity range",
    flag: "Flagged item",
    flagYes: "Question {n} (thoughts of being better off dead or of self-harm) was answered \"{answer}\". Please follow up with the patient.",
    flagNo: "Question {n} (thoughts of self-harm) was answered \"{answer}\".",
    difficulty: "Functional difficulty",
    answers: "Answers to each question",
    ready: "Readiness self-check (written for this site; not a validated instrument)",
    readyResult: "Answers",
    readySummary: "Yes: {yes}. Learning: {learning}. Not yet: {notYet}. ({total} items)",
    readyNotYet: "Not yet",
    learning: "Learning, attention and memory (self-reported concerns; not a test)",
    concerns: "Concerns ticked",
    learningAsk: "The patient ticked {n} and may want to discuss a neurodevelopmental or neuropsychological evaluation.",
    learningNone: "No concerns ticked.",
    progress: "Transition progress",
    transferSteps: "Transfer steps",
    firstVisit: "First adult visit",
    teamChecklists: "Team checklists",
    stepsDone: "{done} of {total} done",
    questions: "My questions for my team",
    noQuestions: "None written yet.",
    footer: "Heart Transition Hub v{v}. Patient-entered. Educational website, not medical advice.   Page {page} of {pages}",
    card: {
      title: "MY HEART CARD",
      cut: "Cut along the outer line, then fold down the middle.",
      statement: "I was born with a heart condition (congenital heart disease).",
      meds: "Medicines",
      cardiologist: "Heart doctor",
      emergency: "Emergency contact"
    }
  },

  topics: {
    ask: "A question for my team",
    addQuestion: "Add to my questions",
    added: "Added to my questions",
    back: "All topics",
    next: "Next topic",
    done: "Done"
  },

  about: {
    title: "About and privacy",
    whatTitle: "About this website",
    what: "Heart Transition Hub is a free, open website for young people with congenital heart disease who are moving from pediatric to adult heart care, their families, and their care teams. It gives general information and optional tools for getting organized. It is not medical advice, and nothing typed here is monitored.",
    privacyTitle: "Privacy",
    privacy: [
      "Everything typed into the optional tools is stored only in the browser on that device.",
      "The website has no accounts, no tracking of answers, and no server that holds personal information.",
      "The website itself sends nothing. If you choose to share or email a summary, your own device's apps send it, to the people you choose.",
      "Clearing your browser data, or using \"Erase my data\", deletes what you typed for good."
    ],
    sourcesTitle: "Sources",
    sourcesNote: "The information here is based on these sources and written in plain language. Your own team's advice always comes first.",
    eraseTitle: "Erase my data",
    eraseText: "This deletes everything you typed into this website on this device."
  },

  help: { title: "Need help now?" }
};
