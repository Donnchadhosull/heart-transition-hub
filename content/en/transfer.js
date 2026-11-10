/*
  THE TRANSFER  (NEEDS CLINICAL REVIEW, see CLINICAL_REVIEW.md)

  Step-by-step tracker from the first conversation to the first adult visit.
  Each step needs a unique id. Do not change ids once patients are using the tool.
*/
HTH.content.en.transfer = {
  title: "The Transfer",
  lead: "\"Transfer\" is the actual move from your children's heart clinic to an adult one. The risk is falling through the gap in between. These steps keep that from happening.",
  stepsTitle: "My steps",
  status: "{done} of {total} steps done",
  steps: [
    { id: "t1", title: "We have talked about moving to adult care", text: "My pediatric team and I have talked about when and why I will move." },
    { id: "t2", title: "I know which adult clinic I am going to", text: "I have the name of an adult congenital heart (ACHD) clinic, and I have added it to my Heart Passport." },
    { id: "t3", title: "My insurance works at the adult clinic", text: "I, or someone helping me, have checked that the adult clinic takes my insurance." },
    { id: "t4", title: "My records are on their way", text: "My pediatric team has sent my medical summary to the adult clinic, and I have my own copy." },
    { id: "t5", title: "My first adult visit is booked", text: "I have a date and time, and I know how I will get there." },
    { id: "t6", title: "I know who to call in between", text: "Until my first adult visit, I know which clinic to call if I have a problem." },
    { id: "t7", title: "I went to my first adult visit", text: "I have met my adult heart team." },
    { id: "t8", title: "My next visit is booked", text: "I left with a date for my next check-up. I am in adult care now." }
  ],
  dateLabel: "Date of my first adult visit",
  dateHint: "Leave this blank until you have one.",
  findTitle: "Finding an adult congenital heart (ACHD) clinic",
  find: [
    "Adults who were born with a heart condition do best when they see heart doctors trained in it. These are called ACHD cardiologists. A general adult heart doctor has usually not had this training.",
    "Your pediatric team will usually suggest a clinic. You can also look one up yourself in the Adult Congenital Heart Association (ACHA) clinic directory.",
    "Some clinics are \"ACHA accredited\". That means the Adult Congenital Heart Association has checked that they have the staff and services that adults with congenital heart disease need."
  ],
  findLinks: [
    { label: "ACHA clinic directory", url: "https://www.achaheart.org/your-heart/resources/clinic-directory/" },
    { label: "About ACHA accreditation", url: "https://www.achaheart.org/your-heart/programs/accreditation/" }
  ],
  firstTitle: "What my first adult visit is like",
  first: [
    "It is often longer than you are used to. The team is getting to know you.",
    "They will talk mostly to you, not to your parent. You can still bring someone with you.",
    "You may have tests, such as an ECG or a heart ultrasound (echo).",
    "The waiting room and the staff will feel different. That is normal, and it gets familiar quickly."
  ],
  bringTitle: "What to bring",
  bring: [
    "My Heart Passport summary and wallet card",
    "My insurance card and a photo ID",
    "My medicines, or a list of them",
    "My questions"
  ]
};
