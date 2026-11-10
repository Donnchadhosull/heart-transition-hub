/*
  INTERFACE TEXT (buttons, headings, explanations).
  Edit the text inside the quotes. Leave anything in {curly brackets} as it is:
  those are filled in by the tool (for example {name} or {date}).
  Aim for a 6th-grade reading level and speak to the patient directly.
*/
HTH.content.en.ui = {
  appName: "Heart Transition Hub",
  skip: "Skip to main content",
  helpNow: "Need help now?",
  /* Shown at the top of every page until lastClinicalReview is set in content/languages.js. */
  draftBanner: "Draft for clinician review. Not for patient use yet.",
  memoryOnly: "This browser is not saving your answers (it may be in private mode). Download your summary before you close this page.",

  nav: { home: "Home", passport: "Passport", checkin: "Check-in", share: "Summary" },
  common: { next: "Next", back: "Back", remove: "Remove", saved: "Your answers save on this device as you type.", language: "Language" },

  footer: {
    disclaimer: "This is a learning tool. It is not medical advice and it does not replace your care team. No one is watching your answers. In an emergency, call 911.",
    version: "Version {v}",
    reviewed: "Last clinically reviewed: {date}",
    notReviewed: "Draft. Not yet clinically reviewed.",
    about: "About and privacy",
    erase: "Erase my data"
  },
  erase: { confirm: "Erase everything you typed into this tool on this device? This cannot be undone." },

  welcome: {
    title: "Welcome to Heart Transition Hub",
    intro: "Moving from a children's heart clinic to an adult one is a big step. This tool helps you get ready, a little at a time. It is yours to keep and come back to.",
    whoQ: "Who is using this today?",
    whoPatient: "Me. I am the one with the heart condition.",
    whoCaregiver: "I am a parent or caregiver.",
    whoErr: "Choose one to go on.",
    ageQPatient: "How old are you?",
    ageQCaregiver: "How old is the young person?",
    ageHint: "We use this to show the steps that fit your age.",
    ageErr: "Type an age as a number, like 16.",
    privacyTitle: "Before you start: your privacy",
    privacy: [
      "What you type stays on this phone or computer. It is not sent to your hospital, to us, or to anyone else.",
      "There is no account and no password.",
      "You choose what to share, by downloading a summary and giving it to your team.",
      "If other people use this device, they could open this tool and see your answers. You can erase everything at any time with \"Erase my data\" at the bottom of every page."
    ],
    start: "Start"
  },

  home: {
    title: "My dashboard",
    titleName: "Hi {name}",
    pathway: "My path right now",
    focusTitle: "Things to work on",
    focusHint: "Tick these off as you get there. There is no rush.",
    caregiverTitle: "How you can help at this stage",
    todoTitle: "Before my next visit",
    todoPassport: "Finish my Heart Passport ({done} of {total} parts done)",
    todoCheckin: "Do a check-in on how I'm doing",
    todoQuestions: "Write down my questions for my team",
    todoShare: "Download my summary to bring or upload",
    sectionsTitle: "My sections",
    passportProgress: "{done} of {total} parts done",
    checkinNone: "Not done yet",
    checkinLast: "Last done {date}",
    shareDesc: "My questions, my summary, and my wallet card",
    soonTitle: "Coming soon",
    soonNote: "These sections are being written and reviewed by heart teams.",
    soon: [
      "Am I Ready? (readiness check)",
      "Learning, Attention, and Memory",
      "Money, Insurance, and Adult Life",
      "Living With My Heart",
      "My Team",
      "The Transfer"
    ],
    exportBtn: "Get my summary"
  },

  share: {
    title: "My summary",
    intro: "Make a short PDF to give to your team. You decide what goes in it and who gets it.",
    questionsTitle: "My questions for my team",
    questionsHint: "Write them down as you think of them, so you do not forget at the visit.",
    questionLabel: "Question {n}",
    addQuestion: "Add a question",
    includeTitle: "What to put in my summary",
    incPassport: "My Heart Passport",
    incCheckin: "My latest check-in result ({date})",
    incCheckinNone: "My latest check-in result (none yet)",
    download: "Download my summary (PDF)",
    share: "Share my summary",
    wallet: "Download my wallet card (PDF)",
    walletTitle: "My wallet card",
    walletHint: "Print it, cut it out, fold it, and keep it with your ID.",
    portalNote: "The safest way to send this to your team is through your patient portal (such as MyChart), or by bringing it to your visit. Regular email is less private.",
    privateNote: "Your summary only includes your check-in answers if that box is ticked. Once you share the file, the people you share it with can read it.",
    fileTitle: "My heart summary",
    made: "Your PDF is ready. Look in your downloads."
  },

  pdf: {
    title: "Heart Transition Hub: My Summary",
    completed: "Completed {date}",
    name: "Name",
    dob: "Date of birth",
    notice: "This summary was filled in by the patient or caregiver using Heart Transition Hub, a free educational tool. It has not been reviewed by a clinician. Screening results are not a diagnosis.",
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
    checkin: "Mood check-in (self-report screener)",
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
    questions: "My questions for my team",
    noQuestions: "None written yet.",
    footer: "Heart Transition Hub v{v}. Patient-entered. Educational tool, not medical advice.   Page {page} of {pages}",
    card: {
      title: "MY HEART CARD",
      cut: "Cut along the outer line, then fold down the middle.",
      statement: "I was born with a heart condition (congenital heart disease).",
      meds: "Medicines",
      cardiologist: "Heart doctor",
      emergency: "Emergency contact"
    }
  },

  about: {
    title: "About and privacy",
    whatTitle: "What this is",
    what: "Heart Transition Hub is a free, open tool for young people with congenital heart disease who are moving from children's heart care to adult heart care. It is for learning and getting organized. It is not medical advice, and no one is watching what you type.",
    privacyTitle: "Your privacy",
    privacy: [
      "Everything you type is stored only in the browser on this device.",
      "Nothing is sent over the internet. There is no account, no tracking of your answers, and no server holding your information.",
      "Clearing your browser data, or using \"Erase my data\", deletes it for good. Download your summary first if you want to keep a copy.",
      "Once you download or share a summary, that file is yours to look after."
    ],
    sourcesTitle: "Where the information comes from",
    sourcesNote: "The content is based on these sources and is written in plain language. Your own team's advice always comes first.",
    eraseTitle: "Erase my data",
    eraseText: "This deletes everything you typed into this tool on this device."
  },

  help: { title: "Need help now?" }
};
