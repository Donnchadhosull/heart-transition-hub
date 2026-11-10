/*
  LIVING WITH MY HEART  (clinical content: NEEDS CLINICAL REVIEW, see CLINICAL_REVIEW.md)

  Deliberately general. Advice that depends on the heart condition is left to the patient's
  own cardiologist, and every topic says so.

  How to edit:
    - "bands" lists the age groups a topic is mainly for: a = 12-14, b = 15-17, c = 18-21, d = 22+.
      Topics for the patient's age are listed first. Nothing is hidden.
    - In "body", text in quotes is a paragraph. A [ list in square brackets ] becomes bullet points.
    - "ask" is a question the patient can take to their team.
*/
HTH.content.en.living = {
  title: "Living With My Heart",
  lead: "Most people born with a heart condition go to school, work, travel, play sports, and have families. Here is what is worth knowing along the way.",
  note: "This is general information. What is right for you depends on your own heart. Your heart team's advice always comes first.",
  topics: [
    {
      id: "call", bands: ["a", "b", "c", "d"],
      title: "When to call my team, and when to call 911",
      body: [
        "Call your heart team soon if you notice:",
        ["You get out of breath more easily than before.",
         "Your heart races, skips, or pounds when you are resting.",
         "New swelling in your legs, ankles, or belly.",
         "You feel dizzy or nearly faint.",
         "A fever that lasts more than a few days with no clear cause.",
         "You cannot do as much as you could a few weeks ago."],
        "Call 911 or go to the emergency room if:",
        ["You faint.",
         "You have chest pain that does not go away.",
         "You are struggling to breathe.",
         "Your face droops, an arm goes weak, or your speech is slurred.",
         "Your defibrillator (ICD) shocks you more than once."],
        "Tell emergency staff that you were born with a heart condition, and show them your wallet card."
      ],
      ask: "Which symptoms should I call about with my condition, and what number do I call at night?"
    },
    {
      id: "exercise", bands: ["a", "b", "c", "d"],
      title: "Exercise and sports",
      body: [
        "Being active is good for almost everyone with a heart condition. It helps your heart, your mood, and your energy.",
        "Some people have limits, for example on very heavy lifting, contact sports, or intense competition. The limits depend on your condition, not on the fact that you have one.",
        "Stop and rest if you get chest pain, feel faint, or your heart races in a way that feels wrong. Tell your team."
      ],
      ask: "What kinds of exercise are best for me, and is there anything I should not do?"
    },
    {
      id: "teeth", bands: ["a", "b", "c", "d"],
      title: "Teeth, infections, and my heart",
      body: [
        "Germs from the mouth can get into the blood and, rarely, infect the heart. This is called endocarditis. It is serious, and people with some heart conditions are at higher risk.",
        ["Brush twice a day and clean between your teeth.",
         "See a dentist regularly, and tell them you have a heart condition.",
         "Some people need an antibiotic before dental work. Ask your heart doctor whether you do.",
         "A fever that lasts more than a few days with no clear cause needs a call to your team."]
      ],
      ask: "Do I need antibiotics before I go to the dentist?"
    },
    {
      id: "tattoos", bands: ["b", "c", "d"],
      title: "Tattoos and piercings",
      body: [
        "Tattoos and piercings break the skin, so they carry a small risk of infection. For some heart conditions an infection can reach the heart.",
        ["Ask your heart doctor before you get one.",
         "Use a licensed studio that uses new, sterile needles.",
         "Watch for redness, swelling, pus, or fever afterwards, and call your team if you see them."]
      ],
      ask: "Is it safe for me to get a tattoo or piercing?"
    },
    {
      id: "substances", bands: ["b", "c", "d"],
      title: "Alcohol, vaping, and drugs",
      body: [
        "You will make your own choices. These are the facts that matter for your heart.",
        ["Nicotine, in cigarettes or vapes, makes the heart beat faster and raises blood pressure.",
         "Stimulants such as cocaine, methamphetamine, and some pills can set off dangerous heart rhythms. So can a lot of energy drinks.",
         "Alcohol can set off rhythm problems in some people and can change how some medicines work, including blood thinners.",
         "Cannabis can make the heart race."],
        "Your team has heard it all before. Being honest with them helps them keep you safe. You can ask them what they keep private."
      ],
      ask: "Do any of my medicines react with alcohol or other drugs?"
    },
    {
      id: "pregnancy", bands: ["b", "c", "d"],
      title: "Sex, birth control, and pregnancy",
      body: [
        "Many people with heart conditions have healthy pregnancies and families. Planning ahead with your heart team makes it safer.",
        ["Not every kind of birth control is right for every heart condition. Some kinds raise the risk of blood clots. Ask which is safest for you.",
         "Pregnancy makes the heart work harder. For some conditions it carries extra risk. Talk to your ACHD team before you try to get pregnant.",
         "Some heart medicines can harm a baby. Do not stop a medicine on your own. Ask your team first.",
         "A heart condition can sometimes run in families. If you are thinking about having children, whatever your sex, you can ask about genetic counseling."]
      ],
      ask: "Which birth control is safest for me, and what would pregnancy mean for my heart?"
    },
    {
      id: "travel", bands: ["c", "d"],
      title: "Travel",
      body: [
        "Most people with a heart condition can travel. A little planning helps.",
        ["Keep your medicines in your carry-on bag, with a few extra days' supply.",
         "Carry your wallet card and a list of your medicines.",
         "Know where the nearest hospital is, and check what your insurance covers away from home.",
         "Ask your team before trips to high places, very long flights, or remote areas."]
      ],
      ask: "Is there anything I should plan for before I travel?"
    }
  ]
};
