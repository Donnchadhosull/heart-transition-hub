/*
  AGE PATHWAYS  (clinical content: NEEDS CLINICAL REVIEW, see CLINICAL_REVIEW.md)
  Timeline follows Got Transition's Six Core Elements and the AHA transition statements.
  Each "focus" item needs a unique id. Do not reuse or change ids once patients are using the tool.
*/
HTH.content.en.pathways = {
  young: "You are a bit younger than most people who use this tool. That is OK. It works best if you go through it with a grown-up you trust.",
  bands: {
    a: {
      label: "Ages 12 to 14",
      title: "Getting to know my heart",
      intro: "Right now the goal is simple: learn about your own heart and start speaking up at visits.",
      focus: [
        { id: "a1", text: "I can say the name of my heart condition." },
        { id: "a2", text: "I can name my medicines and what each one is for." },
        { id: "a3", text: "I ask or answer at least one question myself at each visit." },
        { id: "a4", text: "I know who to tell if I do not feel well." }
      ],
      caregiver: [
        "Let your child answer the doctor's questions first. Fill in the gaps after.",
        "Help them learn the name of their condition and their medicines.",
        "Start talking about the fact that they will move to an adult heart clinic one day."
      ]
    },
    b: {
      label: "Ages 15 to 17",
      title: "Doing more on my own",
      intro: "You are getting ready to run your own health care. Practice now, while your family and your team are right there to help.",
      focus: [
        { id: "b1", text: "I spend part of each visit alone with my doctor or nurse." },
        { id: "b2", text: "I can make or change my own appointment." },
        { id: "b3", text: "I know how to get a refill of my medicine." },
        { id: "b4", text: "I have asked my team what stays private between us." },
        { id: "b5", text: "I know what changes when I turn 18." }
      ],
      caregiver: [
        "Step out for part of each visit so your teen can talk to the team alone.",
        "Let your teen make the next appointment and call in the next refill, with you nearby.",
        "Ask the team when the move to adult care will happen and which clinic it will be."
      ]
    },
    c: {
      label: "Ages 18 to 21",
      title: "Moving to my adult heart team",
      intro: "This is when most people move to an adult congenital heart disease (ACHD) clinic. The goal is to get to that first adult visit without a gap in care.",
      focus: [
        { id: "c1", text: "I know the name of my adult congenital heart (ACHD) clinic." },
        { id: "c2", text: "I have a date for my first adult visit." },
        { id: "c3", text: "I have a copy of my medical summary." },
        { id: "c4", text: "I know what health insurance I have, and I carry my card." },
        { id: "c5", text: "I have decided who is allowed to see my health information." }
      ],
      caregiver: [
        "At 18, your child makes their own health decisions. The team needs their permission to share information with you.",
        "Offer help with insurance and records, but let them lead.",
        "If your child will need ongoing help making decisions, ask the social worker about supported decision-making or guardianship before they turn 18."
      ]
    },
    d: {
      label: "Ages 22 and up",
      title: "Staying in care for life",
      intro: "Most people born with a heart condition need heart check-ups for life, even when they feel well. The goal now is to stay connected.",
      focus: [
        { id: "d1", text: "I see an ACHD heart doctor as often as my team advises." },
        { id: "d2", text: "I know what happens to my health insurance when I turn 26." },
        { id: "d3", text: "I talk to my team before big changes, like a pregnancy, a new job, or a move." },
        { id: "d4", text: "I keep my Heart Passport up to date." }
      ],
      caregiver: [
        "Your role now is support, not management. Ask how you can help.",
        "Know who their ACHD clinic is in case of an emergency.",
        "Encourage them to keep going to check-ups, even when they feel fine."
      ]
    }
  }
};
