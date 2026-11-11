/*
  MY HEART PASSPORT
  The lesion explainers below are clinical content: NEEDS CLINICAL REVIEW (see CLINICAL_REVIEW.md).
  Keep each explainer to two or three short sentences at about a 6th-grade reading level.
  Do not change the "id" values once patients are using the tool.
*/
HTH.content.en.passport = {
  title: "My Heart Passport",
  intro: "This is your own record of your heart. Fill in what you know. If you are not sure about something, leave it blank and ask your team at your next visit.",
  lifelong: "Good to know: even after a great repair, most people born with a heart condition need heart check-ups for life.",
  partOf: "Part {n} of {total}",
  statusDone: "Done",
  statusTodo: "To do",
  backToList: "Back to Passport",
  nextPart: "Next part",
  finish: "Finish",
  noneLabel: "I have none",
  addRow: "Add another",
  parts: {
    about: { title: "About me", intro: "This goes at the top of your summary so your team knows it is yours." },
    heart: { title: "My heart condition", intro: "Tick the ones you have. A short explanation will show up under each one you tick." },
    surgeries: { title: "Surgeries and procedures", intro: "List heart surgeries and catheter procedures. A rough year is fine." },
    medicines: { title: "My medicines", intro: "List what you take now. You can copy this from the labels." },
    allergies: { title: "Allergies", intro: "Medicines, foods, latex, or anything else you react to." },
    devices: { title: "Devices in my heart", intro: "Things that were put in to help your heart." },
    team: { title: "My heart doctors", intro: "Who looks after your heart now, and who will look after it in adult care." },
    emergency: { title: "Emergency contacts", intro: "Who should be called if you are very sick." }
  },
  fields: {
    name: { label: "My full name" },
    dob: { label: "My date of birth" },
    lesions: { label: "My heart condition" },
    diagnosis: { label: "In my own words, or anything not on the list", hint: "For example: \"I was born with a hole in my heart and had it fixed when I was 2.\"" },
    surgeries: { label: "Surgeries and procedures", item: "Surgery or procedure {n}", cols: { what: "What was done", year: "Year", where: "Hospital" } },
    medicines: { label: "Medicines", item: "Medicine {n}", cols: { name: "Name", dose: "How much (dose)", when: "When I take it", why: "What it is for" } },
    allergies: { label: "My allergies", hint: "Write \"none\" if you do not have any." },
    devices: { label: "I have" },
    deviceDetails: { label: "Details, if you know them", hint: "For example the brand, the year it was put in, or the clinic that checks it." },
    pedsName: { label: "Children's heart doctor (pediatric cardiologist)" },
    pedsClinic: { label: "Clinic or hospital" },
    pedsPhone: { label: "Clinic phone" },
    achdName: { label: "Adult congenital heart doctor (ACHD cardiologist)", hint: "Leave blank if you do not have one yet." },
    achdClinic: { label: "Adult clinic or hospital" },
    achdPhone: { label: "Adult clinic phone" },
    emergency: { label: "Emergency contacts", item: "Contact {n}", cols: { name: "Name", relation: "Who they are to me", phone: "Phone" } }
  },
  /* The "Heart conditions explained" information page uses the lesions list below. */
  conditions: {
    title: "Heart conditions explained",
    lead: "Short explanations of common congenital heart conditions. Choose yours to read more.",
    note: "These are general descriptions. Your own heart may be different, and many people have more than one condition. Ask your heart doctor to write down the name of yours.",
    askTitle: "Questions to ask about my condition",
    ask: [
      "What is the name of my heart condition, and can you write it down for me?",
      "What surgeries or procedures have I had, and what did they do?",
      "What should I watch for as I get older?",
      "How often do I need a heart check-up?"
    ],
    passport: "Save my condition in my Heart Passport"
  },
  lesions: [
    { id: "asd", name: "Atrial septal defect (ASD)", explain: "A hole in the wall between the two top chambers of the heart. Some close on their own. Others are closed with a small device or with surgery." },
    { id: "vsd", name: "Ventricular septal defect (VSD)", explain: "A hole in the wall between the two bottom chambers of the heart. Small ones may close on their own. Larger ones are closed with surgery." },
    { id: "avsd", name: "Atrioventricular septal defect (AV canal)", explain: "A hole in the center of the heart, along with valves that did not form in the usual way. It is repaired with surgery, and the valves are checked over time because they can leak." },
    { id: "pda", name: "Patent ductus arteriosus (PDA)", explain: "A blood vessel near the heart that should close soon after birth stayed open. It can be closed with a small device or with surgery." },
    { id: "tof", name: "Tetralogy of Fallot", explain: "A group of heart problems that happen together. The main ones are a hole between the bottom chambers and a narrow path to the lungs. Most people have surgery as a baby, and many need a valve procedure later in life." },
    { id: "coa", name: "Coarctation of the aorta", explain: "A narrow spot in the aorta, the large blood vessel that carries blood to your body. After it is fixed, your team keeps checking your blood pressure and the repaired area." },
    { id: "tga", name: "Transposition of the great arteries (TGA)", explain: "The two large blood vessels leaving the heart are switched. It is fixed with surgery early in life. The kind of surgery you had matters for your care, so it is good to know which one it was (for example arterial switch, Mustard, or Senning)." },
    { id: "sv", name: "Single ventricle (for example after a Fontan)", explain: "Only one of the two bottom chambers works well as a pump. Many people have a series of surgeries that ends with the Fontan. People with a Fontan need regular checks of the heart and of other organs, such as the liver." },
    { id: "bav", name: "Bicuspid aortic valve or aortic valve disease", explain: "The aortic valve usually has three flaps. A bicuspid valve has two. Over time the valve can become narrow or leaky, and the aorta can widen, so both are checked regularly." },
    { id: "ps", name: "Pulmonary valve stenosis", explain: "The valve between the heart and the lungs is narrow, so the heart works harder to push blood through. It can be opened with a balloon or with surgery." },
    { id: "ebstein", name: "Ebstein anomaly", explain: "The valve on the right side of the heart (the tricuspid valve) sits lower than usual and can leak. Some people need medicine or surgery, and some have heart rhythm problems." },
    { id: "unsure", name: "I am not sure", explain: "That is OK, and it is common. Ask your heart doctor to write the name down for you at your next visit. Knowing the name is one of the most useful things you can do." }
  ],
  devices: [
    { id: "pacemaker", name: "Pacemaker" },
    { id: "icd", name: "Defibrillator (ICD)" },
    { id: "valve", name: "Replacement heart valve" },
    { id: "stent", name: "Stent" },
    { id: "closure", name: "Closure device (for a hole or a vessel)" },
    { id: "none", name: "None of these" },
    { id: "unsure", name: "I am not sure" }
  ]
};
