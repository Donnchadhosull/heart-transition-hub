/*
  MY TEAM  (NEEDS CLINICAL REVIEW, see CLINICAL_REVIEW.md)

  One entry per team member. Each has:
    what       what this person does for the patient
    ask        questions the patient can ask them
    checklist  short list the patient and that team member tick off together at a visit.
               Its status appears in the PDF summary.
    optional   true lets the patient hide the role if their clinic does not have one.
  Each checklist item needs a unique id. Do not change ids once patients are using the tool.
*/
HTH.content.en.team = {
  title: "My Team",
  lead: "Moving to adult care takes a team. Here is who they are, what to ask them, and a short list to tick off with each one.",
  askTitle: "Questions I can ask",
  checkTitle: "Tick these off together at a visit",
  status: "{done} of {total} done",
  hide: "My clinic does not have one. Hide this.",
  hiddenTitle: "Hidden",
  show: "Show {name}",
  back: "Back to My Team",
  roles: [
    {
      id: "peds", name: "Pediatric cardiologist",
      what: "The heart doctor you have known since you were young. They get you ready to move on and pass your story to the adult team.",
      ask: [
        "When will I move to adult care, and why then?",
        "Which adult clinic do you recommend for my condition?",
        "What are the most important things the adult team should know about me?"
      ],
      checklist: [
        { id: "peds1", text: "I can say the name of my heart condition." },
        { id: "peds2", text: "I know why I need heart check-ups for life." },
        { id: "peds3", text: "I have a copy of my medical summary." },
        { id: "peds4", text: "I have the name of my adult (ACHD) clinic." },
        { id: "peds5", text: "I know who to call until my first adult visit." }
      ]
    },
    {
      id: "achd", name: "Adult congenital (ACHD) cardiologist",
      what: "A heart doctor with extra training in adults who were born with heart conditions. This is who looks after your heart from now on.",
      ask: [
        "How often do I need to see you, and which tests will I have?",
        "What should I watch for with my condition as I get older?",
        "How do I reach the clinic between visits, and at night?"
      ],
      checklist: [
        { id: "achd1", text: "I have had my first adult visit." },
        { id: "achd2", text: "I know when my next visit is." },
        { id: "achd3", text: "I know how to reach the adult clinic." },
        { id: "achd4", text: "My adult team has my records." }
      ]
    },
    {
      id: "nurse", name: "Nurse or transition coordinator",
      what: "The person who helps you learn the skills, keeps track of your steps, and is often the easiest one to call with a question.",
      ask: [
        "What should I be able to do on my own before I move?",
        "Can you show me how to use the patient portal?",
        "Who do I call if I am not sure whether something is serious?"
      ],
      checklist: [
        { id: "nurse1", text: "We went through my Am I Ready? list together." },
        { id: "nurse2", text: "I can log in to the patient portal myself." },
        { id: "nurse3", text: "I have practiced making my own appointment." }
      ]
    },
    {
      id: "sw", name: "Social worker",
      what: "Helps with the life side of health: insurance, money, school, work, transport, and stress at home.",
      ask: [
        "What happens to my insurance when I turn 18, 19, and 26?",
        "Is there help with the cost of my care or my medicines?",
        "What support can I get at school or at work?"
      ],
      checklist: [
        { id: "sw1", text: "I know what insurance I have and when it might change." },
        { id: "sw2", text: "I know who can see my health information after I turn 18." },
        { id: "sw3", text: "I know who to call if I lose my insurance." }
      ]
    },
    {
      id: "pharm", name: "Pharmacist", optional: true,
      what: "The expert on your medicines: what they do, how to take them, and what not to mix them with.",
      ask: [
        "What does each of my medicines do?",
        "What should I do if I miss a dose?",
        "Is there anything I should not take with these, including things from a store?"
      ],
      checklist: [
        { id: "pharm1", text: "I can name my medicines and what each is for." },
        { id: "pharm2", text: "I know how to order a refill myself." },
        { id: "pharm3", text: "I know what to do if I miss a dose." }
      ]
    },
    {
      id: "psych", name: "Psychologist or counselor", optional: true,
      what: "Helps with mood, worry, stress, and how you learn. Seeing one is common for people with heart conditions and is a sign of looking after yourself.",
      ask: [
        "Is what I am feeling common for people with a heart condition?",
        "Should I have an evaluation of my learning, attention, or memory?",
        "What can I do when I feel very worried or low?"
      ],
      checklist: [
        { id: "psych1", text: "I have shared my check-in results." },
        { id: "psych2", text: "I know who to talk to when I am struggling." },
        { id: "psych3", text: "I have asked about a learning and attention evaluation." }
      ]
    },
    {
      id: "pcp", name: "Primary care doctor",
      what: "Your regular doctor for everything that is not your heart: colds, vaccines, check-ups, and forms. As an adult you need one of your own.",
      ask: [
        "Do you know about my heart condition and who my heart team is?",
        "Which vaccines do I need?",
        "When should I come to you, and when should I call my heart team?"
      ],
      checklist: [
        { id: "pcp1", text: "I have a primary care doctor who sees adults." },
        { id: "pcp2", text: "They know about my heart condition." },
        { id: "pcp3", text: "They have the name of my heart clinic." }
      ]
    }
  ]
};
