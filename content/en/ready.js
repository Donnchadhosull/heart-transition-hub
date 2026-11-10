/*
  AM I READY?  (NEEDS CLINICAL REVIEW, see CLINICAL_REVIEW.md)

  IMPORTANT: this is NOT a validated instrument. It is a plain self-check written for this
  tool, covering the same areas as published readiness tools (knowing my condition,
  medicines, visits, insurance). It gives no score cut-off.
  If your program has permission to use a validated tool (for example the TRAQ, or Got
  Transition's readiness assessment with attribution), replace the items below with it.

  Each item needs a unique id. Do not reuse or change ids once patients are using the tool.
*/
HTH.content.en.ready = {
  title: "Am I Ready?",
  lead: "This is a quick look at the skills you need to run your own heart care. Nobody has all of them at first. That is the point of practicing.",
  how: "For each one, choose what is true for you today. There are no wrong answers. Do it again every few months and watch your list grow.",
  notScored: "This is a self-check, not a test. There is no pass or fail.",
  start: "Start",
  again: "Update my answers",
  partOf: "Part {n} of {total}",
  answerAll: "Choose an answer for each one to go on.",
  options: [
    { value: 0, label: "Not yet" },
    { value: 1, label: "Learning" },
    { value: 2, label: "Yes" }
  ],
  groups: [
    {
      title: "Knowing my heart",
      items: [
        { id: "r1", text: "I can explain my heart condition in a few words." },
        { id: "r2", text: "I know what surgeries or procedures I have had." },
        { id: "r3", text: "I know which symptoms mean I should call my team." },
        { id: "r4", text: "I know why I need heart check-ups for life." }
      ]
    },
    {
      title: "My medicines",
      items: [
        { id: "r5", text: "I know the names of my medicines and what each one is for." },
        { id: "r6", text: "I take my medicines on my own, without being reminded." },
        { id: "r7", text: "I know how to get a refill before I run out." },
        { id: "r8", text: "I know what I am allergic to." }
      ]
    },
    {
      title: "My visits",
      items: [
        { id: "r9", text: "I make my own appointments." },
        { id: "r10", text: "I talk to my doctor or nurse myself and ask my own questions." },
        { id: "r11", text: "I spend part of my visit alone with my doctor or nurse." },
        { id: "r12", text: "I know how to reach my clinic between visits." },
        { id: "r13", text: "I have a way to get to my visits." }
      ]
    },
    {
      title: "Adult life",
      items: [
        { id: "r14", text: "I know what health insurance I have, and I carry my card." },
        { id: "r15", text: "I know the name of the adult heart (ACHD) clinic I will go to." },
        { id: "r16", text: "I know what changes about my health care when I turn 18." },
        { id: "r17", text: "I keep a record of my health information, like my Heart Passport." }
      ]
    }
  ],
  result: {
    title: "Where I am today",
    summary: "You said \"Yes\" to {yes} of {total}.",
    learning: "You are learning {n} more.",
    better: "That is {n} more \"Yes\" than last time. Nice work.",
    same: "Last time you had {n}.",
    nextTitle: "Good next steps",
    nextIntro: "Pick one or two of these to work on before your next visit. Your team can help.",
    allYes: "You said \"Yes\" to everything. Keep your Heart Passport up to date and keep going to your check-ups.",
    saved: "Saved on this device on {date}.",
    toShare: "Add to my summary",
    lastDone: "Last done {date}: \"Yes\" to {yes} of {total}",
    never: "Not done yet"
  }
};
