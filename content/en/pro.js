/*
  FOR THE CARE TEAM  (NEEDS CLINICAL REVIEW, see CLINICAL_REVIEW.md)

  Written for clinicians, so the reading level is higher than the patient pages.
  It is a practical summary in our own words, not a copy of any guideline. The timeline
  and the six elements follow Got Transition's Six Core Elements of Health Care Transition.
  Always defer to the source documents listed under "references" and on the About page.

  Each role has:
    summary   one line shown on cards
    role      paragraph: this professional's part in transition
    actions   what to do
    cover     what to cover with the patient
    pages     patient pages on this site that support this role ("route" must match a page)
*/
HTH.content.en.pro = {
  title: "For the care team",
  lead: "A shared reference for everyone who looks after a young person with congenital heart disease during the move from pediatric to adult congenital care.",
  howTitle: "How to use this site",
  how: [
    "Give patients the QR code or the web address in clinic. There is nothing to install and no account.",
    "Point them to the pages that match what you covered in the visit. Each role page below lists them.",
    "Patients may bring or send you a PDF summary from the optional tools. It is patient-entered and has not been reviewed by anyone.",
    "Nothing a patient types reaches this site or your institution. The site has no server, so it cannot hold patient data."
  ],
  rolesTitle: "Choose your role",
  resourcesTitle: "Program resources",
  roleTitle: "Your part in transition",
  actionsTitle: "What to do",
  coverTitle: "What to cover with the patient",
  pagesTitle: "Patient pages to point to",
  refsTitle: "Key references",
  back: "All roles",

  roles: [
    {
      id: "peds", name: "Pediatric cardiologist",
      summary: "Start early, build self-management, and hand over without a gap.",
      role: "You own the start of the process. Transition is a planned, years-long preparation that begins in early adolescence; transfer is the single event at the end of it. Patients are most often lost to follow-up between the last pediatric visit and the first adult one.",
      actions: [
        "Introduce the idea of lifelong congenital cardiac care, and your program's transition policy, from about age 12.",
        "See the adolescent alone for part of each visit, and direct your questions to the patient first.",
        "Assess readiness at regular intervals and record it. Work on the gaps it shows.",
        "Name the receiving ACHD program early, and prefer an accredited ACHD center where one is within reach.",
        "Prepare a transfer summary and send it before the first adult visit. Give the patient a copy.",
        "State who is responsible for the patient's care until the first adult visit has taken place, and confirm that it did."
      ],
      cover: [
        "The name of the diagnosis and of each operation or intervention, in words the patient can repeat.",
        "Why follow-up is lifelong, including when they feel well.",
        "Symptoms that need a call, and how to reach the clinic.",
        "Activity, contraception and pregnancy, and endocarditis prevention as they apply to this lesion.",
        "What changes at 18: consent, confidentiality, and who can access information."
      ],
      pages: [
        { route: "transition", label: "Understanding transition" },
        { route: "heart", label: "Heart conditions explained" },
        { route: "transfer", label: "Moving to adult care" },
        { route: "passport", label: "Heart Passport (optional tool)" }
      ]
    },
    {
      id: "achd", name: "Adult congenital (ACHD) cardiologist",
      summary: "Receive the patient, confirm the handover, and establish lifelong follow-up.",
      role: "You complete the transfer. The first adult visit sets whether a young adult stays in care, so it is as much about engagement as about anatomy and physiology.",
      actions: [
        "Agree a referral pathway with the pediatric program, including who books the first visit and how records arrive.",
        "Allow extra time for the first visit and explain how the adult clinic works.",
        "Confirm receipt of the transfer summary and tell the referring team the visit took place.",
        "Follow up actively on missed first appointments. A missed first visit is the highest-risk point for loss to follow-up.",
        "Set the follow-up interval and the next appointment before the patient leaves.",
        "Review reproductive health, mental health and neurocognitive concerns, which the current ACHD guideline asks adult programs to address."
      ],
      cover: [
        "Your follow-up plan and which tests to expect.",
        "Long-term issues for their lesion and repair.",
        "How to reach the adult clinic in and out of hours.",
        "Pregnancy planning and contraception, before they are needed.",
        "Insurance changes at 26 and how to avoid a lapse in care."
      ],
      pages: [
        { route: "transfer", label: "Moving to adult care" },
        { route: "living", label: "Living with a heart condition" },
        { route: "money", label: "Insurance and adult life" },
        { route: "share", label: "My summary (what patients may bring)" }
      ]
    },
    {
      id: "nurse", name: "Nurse or transition coordinator",
      summary: "Teach the skills, track each patient, and close the loop on transfer.",
      role: "You are usually the person who makes transition happen in practice: tracking who is due, teaching self-management, and making sure no one is lost between clinics.",
      actions: [
        "Keep a register of patients of transition age and where each one is in the process.",
        "Run a readiness assessment about once a year from early adolescence, and agree one or two goals each time.",
        "Teach practical skills: booking appointments, refills, using the patient portal, describing their condition.",
        "Coordinate the transfer packet and the first adult appointment.",
        "Contact the patient after the planned first adult visit to confirm it happened, and ask how it went."
      ],
      cover: [
        "How to contact the clinic and what to do out of hours.",
        "Their medicines: names, purpose, and how to refill.",
        "What an adult clinic expects of them compared with pediatrics.",
        "What to bring to the first adult visit."
      ],
      pages: [
        { route: "ready", label: "Am I Ready? (optional self-check)" },
        { route: "transition", label: "Understanding transition" },
        { route: "transfer", label: "Moving to adult care" },
        { route: "team", label: "Your care team" }
      ]
    },
    {
      id: "sw", name: "Social worker",
      summary: "Insurance continuity, legal changes at 18, and practical barriers to care.",
      role: "Loss of insurance and practical barriers are among the most common reasons young adults with congenital heart disease drop out of care. Your work on coverage, consent and support is what keeps the clinical plan possible.",
      actions: [
        "Review coverage well before 18, 19 and 26, and plan for each change.",
        "Explain consent, privacy and release of information at 18, and complete the forms the family wants in place.",
        "Where the patient will need ongoing help with decisions, raise supported decision-making or guardianship well before the 18th birthday.",
        "Screen for barriers: transport, housing, food, family stress, school or work problems.",
        "Connect patients with benefits, school and workplace accommodations, and community support."
      ],
      cover: [
        "What insurance they have now, and what will change and when.",
        "Who may see their health information after 18.",
        "What to do if coverage lapses, and who to call.",
        "Accommodations at school, college and work."
      ],
      pages: [
        { route: "money", label: "Insurance and adult life" },
        { route: "learning", label: "Learning, attention and memory" },
        { route: "wellbeing", label: "Mood and wellbeing" }
      ]
    },
    {
      id: "pharm", name: "Pharmacist",
      summary: "Medication knowledge, adherence, interactions, and independent refills.",
      role: "Adolescence is when responsibility for medicines moves from parent to patient. A short, direct conversation with a pharmacist often does more for adherence than repeated reminders.",
      actions: [
        "Reconcile the medication list with the patient, not only the parent.",
        "Check understanding of each medicine's purpose, dose and timing.",
        "Review interactions, including over-the-counter products, alcohol and recreational drugs.",
        "For patients who could become pregnant, flag medicines with known fetal risk to the cardiology team.",
        "Set up a refill method the patient can manage alone."
      ],
      cover: [
        "What each medicine is for.",
        "What to do about a missed dose.",
        "What not to combine with their medicines.",
        "How to order a refill, and how far ahead."
      ],
      pages: [
        { route: "passport/medicines", label: "Heart Passport: My medicines" },
        { route: "living/substances", label: "Alcohol, vaping, and drugs" },
        { route: "living/pregnancy", label: "Sex, birth control, and pregnancy" }
      ]
    },
    {
      id: "psych", name: "Psychologist or counselor",
      summary: "Mood, anxiety, neurodevelopmental needs, and adjustment to adult care.",
      role: "Anxiety, depression and neurodevelopmental differences are all more common in congenital heart disease than in the general population, and each one makes self-management harder. The American Heart Association statements on psychological and neurodevelopmental outcomes both call for these needs to be identified and addressed as part of cardiac care.",
      actions: [
        "Offer routine screening for depression and anxiety, with a clear local pathway for positive screens and for suicide risk.",
        "Identify patients who should have, or should repeat, a neurodevelopmental or neuropsychological evaluation in adolescence.",
        "Translate evaluation findings into practical recommendations for school, college, work and self-care.",
        "Support adjustment to the adult model of care, and work with families on stepping back.",
        "Advise the team on how to adapt teaching for patients with executive function or learning difficulties."
      ],
      cover: [
        "That mood and worry are common with a heart condition and treatable.",
        "How their own learning profile affects managing appointments and medicines.",
        "Who to contact in a crisis.",
        "What support they can ask for at school or work."
      ],
      pages: [
        { route: "wellbeing", label: "Mood and wellbeing" },
        { route: "checkin", label: "Private check-ins (PHQ-A or PHQ-9, GAD-7)" },
        { route: "learning", label: "Learning, attention and memory" }
      ]
    },
    {
      id: "pcp", name: "Primary care clinician",
      summary: "The adult medical home alongside lifelong ACHD follow-up.",
      role: "Adults with congenital heart disease need a primary care clinician as well as an ACHD cardiologist. You are often the first to see a patient who has fallen out of specialist follow-up, and the best placed to send them back.",
      actions: [
        "Ask every adult with a history of congenital heart disease when they last saw an ACHD cardiologist, and re-refer if it has lapsed.",
        "Keep the ACHD clinic's contact details in the record.",
        "Check with the ACHD team before non-cardiac surgery, pregnancy, or starting medicines with cardiac effects.",
        "Keep routine prevention and vaccinations up to date.",
        "Ask about mood, anxiety and learning needs."
      ],
      cover: [
        "That a repaired heart still needs specialist follow-up for life.",
        "Which problems to bring to you and which to take to the heart team.",
        "Dental care and endocarditis prevention.",
        "Contraception and pregnancy planning with the ACHD team."
      ],
      pages: [
        { route: "transition", label: "Understanding transition" },
        { route: "living/call", label: "When to call the team, and when to call 911" },
        { route: "transfer", label: "Moving to adult care" }
      ]
    }
  ],

  program: {
    title: "Program resources",
    lead: "The structure behind a transition program, in brief.",
    coreTitle: "The six core elements",
    coreIntro: "Got Transition's Six Core Elements of Health Care Transition is the framework recommended in the AAP, AAFP and ACP clinical report on transition. In summary:",
    core: [
      { name: "1. Policy or guide", text: "A written statement of your practice's approach to transition, shared with patients and families from early adolescence." },
      { name: "2. Tracking and monitoring", text: "A register of transition-age patients and where each one is in the process." },
      { name: "3. Readiness", text: "Regular assessment of self-care skills, with goals agreed with the patient." },
      { name: "4. Planning", text: "A plan for each patient: a medical summary, an emergency plan, legal changes at 18, and the timing of transfer." },
      { name: "5. Transfer of care", text: "A complete transfer package sent to an identified adult clinician, with clear responsibility until the first adult visit." },
      { name: "6. Transfer completion", text: "Confirmation that the first adult visit happened, and feedback from the patient." }
    ],
    timelineTitle: "Suggested timeline",
    timelineIntro: "Ages are a guide. Developmental stage and medical stability matter more than the birthday.",
    timeline: [
      { age: "12 to 13", text: "Make the patient and family aware of the transition policy. Begin talking to the patient directly." },
      { age: "14 to 15", text: "Start transition planning. Begin readiness assessment and time alone with the clinician." },
      { age: "16 to 17", text: "Prepare for the adult model of care. Discuss transfer, name the adult clinic, and address consent and privacy at 18." },
      { age: "18 to 21", text: "Move to an adult model of care and transfer to the ACHD program with a complete summary." },
      { age: "22 and over", text: "Confirm the patient is established in adult care, and plan for insurance change at 26." }
    ],
    packetTitle: "What a transfer summary should include",
    packet: [
      "Diagnosis in full, with anatomy",
      "Every operation and catheter intervention, with dates and operative notes",
      "Most recent echo, ECG, and any MRI, CT, exercise test, Holter or catheterization reports",
      "Current medicines and allergies",
      "Devices: type, model, implant date, last check",
      "Arrhythmia history and any anticoagulation plan",
      "Non-cardiac diagnoses, including genetic syndromes",
      "Neurodevelopmental and mental health history, and any evaluations done",
      "Functional status and activity recommendations",
      "Reproductive health counselling already given",
      "Social situation, insurance, and decision-making arrangements",
      "Outstanding issues and the recommended timing of the first adult visit"
    ],
    pdfTitle: "Reading a patient's summary from this site",
    pdf: [
      "The summary is entered by the patient or a caregiver. Nobody has checked it against the record.",
      "Mood check-in: PHQ-A for patients who say they are under 18, PHQ-9 for adults. Any answer above \"Not at all\" on question 9 is printed in bold as a flagged item.",
      "Worry check-in: GAD-7.",
      "\"Am I Ready?\" is a self-check written for this site. It is not a validated readiness instrument and has no cut-off.",
      "The learning, attention and memory list is a set of self-reported concerns. It is not a test and has no score.",
      "No one monitors answers in real time. The site shows crisis resources itself, but a flagged item on a summary may be days or weeks old when you see it."
    ],
    backLabel: "For the care team"
  },

  share: {
    title: "Share with patients",
    lead: "Print the flyer for clinic rooms and waiting areas, or show the QR code on a screen.",
    qrAlt: "QR code that opens Heart Transition Hub",
    address: "Web address",
    url: "donnchadhosull.github.io/heart-transition-hub",
    flyer: "Open the printable flyer (PDF)",
    flyerPage: "Open the flyer as a web page",
    tipsTitle: "Suggested wording in clinic",
    tips: [
      "\"This is a website about moving to adult heart care. Scan it with your phone camera. You can read it at home.\"",
      "\"There are some optional tools on it. What you type stays on your own phone.\"",
      "\"If you fill in the summary, send it to us through the portal or bring it next time.\""
    ],
    noteTitle: "If the web address changes",
    note: "The QR code points to the address shown above. If your institution hosts its own copy, make a new code for that address and replace the image file assets/qr.svg."
  }
};
