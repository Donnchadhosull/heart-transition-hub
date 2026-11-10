/*
  LEARNING, ATTENTION, AND MEMORY  (NEEDS CLINICAL REVIEW, see CLINICAL_REVIEW.md)

  This is a concerns checklist, NOT a neuropsychological test and NOT a validated screener.
  It produces no score. Its only result is whether to ask the team about a formal
  neurodevelopmental or neuropsychological evaluation.
  Background: AHA scientific statement on neurodevelopmental outcomes in CHD (2024).
  Do not copy items from copyrighted questionnaires into this list.
*/
HTH.content.en.learning = {
  title: "Learning, Attention, and Memory",
  lead: "Many people born with a heart condition learn, focus, or remember a bit differently. Knowing that about yourself helps you get the right support.",
  whyTitle: "Why this is common",
  why: [
    "The heart and the brain grow together before birth. Heart conditions, early surgeries, and long hospital stays can all affect how the brain develops.",
    "This has nothing to do with how smart you are or how hard you try. Many people only notice it when school or work gets more demanding.",
    "Heart experts recommend that people at higher risk get checked at different ages, including the teen years."
  ],
  question: "Tick any that are true for you",
  hint: "Think about the last few months.",
  items: [
    { id: "l1", text: "It is hard for me to pay attention or stay focused." },
    { id: "l2", text: "I often forget things, like instructions, appointments, or my medicine." },
    { id: "l3", text: "It is hard for me to plan, get organized, or finish tasks." },
    { id: "l4", text: "School or work feels harder for me than it seems to be for other people." },
    { id: "l5", text: "Reading, writing, or math is hard for me." },
    { id: "l6", text: "My mind gets tired quickly." },
    { id: "l7", text: "It is hard for me to make friends or to know what people mean." },
    { id: "l8", text: "I get overwhelmed when a lot is going on." },
    { id: "l9", text: "I had extra help at school before, or someone has said I should be tested." }
  ],
  see: "See what this means",
  change: "Change my answers",
  result: {
    title: "What this means",
    someLead: "You ticked {n}. That is worth talking about.",
    ask: "Should I have a neurodevelopmental or neuropsychological evaluation?",
    some: "Ask your heart team: \"Should I have a neurodevelopmental or neuropsychological evaluation?\" You can show them this list.",
    none: "You did not tick any. That is good to know. If things change, for example when school or work gets harder, come back to this list.",
    notDiagnosis: "This list cannot tell you whether you have a learning or attention problem. Only an evaluation can do that.",
    evalTitle: "What is an evaluation?",
    eval: "You spend a few hours with a psychologist doing puzzles, questions, and tasks. It does not hurt and you cannot fail. At the end you get a report that explains your strengths and what kind of support helps you most.",
    saved: "Saved on this device on {date}.",
    toShare: "Add to my summary",
    lastDone: "Last done {date}",
    never: "Not done yet"
  },
  supportTitle: "Support you can ask for",
  support: [
    "At school (up to grade 12): an IEP or a 504 plan can give you things like extra time, a quiet place for tests, or help with notes.",
    "At college: these plans do not carry over on their own. You have to contact the disability services office yourself and ask.",
    "At work: the law (the ADA) lets you ask for reasonable changes that help you do your job. You choose whether to tell your employer about your health."
  ],
  linksTitle: "Read more",
  links: [
    { label: "For Patients and Families (CNOC)", url: "https://cardiacneuro.org/for-patients-and-families/" },
    { label: "The Science, Simplified, including school supports (CNOC)", url: "https://cardiacneuro.org/for-patients-and-families/the-science-simplified/" },
    { label: "Resources for high school age (CNOC)", url: "https://cardiacneuro.org/library/high-school-age/" },
    { label: "Resources for adults living with CHD (CNOC)", url: "https://cardiacneuro.org/library/adults-living-with-congenital-heart-disease/" }
  ]
};
