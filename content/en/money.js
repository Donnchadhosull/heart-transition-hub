/*
  MONEY, INSURANCE, AND ADULT LIFE  (NEEDS REVIEW by a social worker or financial counselor)

  UNITED STATES ONLY. Rules differ by state and change over time. Every topic tells the
  patient to check with their plan or their social worker. To adapt for another country,
  replace this file.

  How to edit:
    - "bands" lists the age groups a topic is mainly for: a = 12-14, b = 15-17, c = 18-21, d = 22+.
      Topics for the patient's age are listed first. Nothing is hidden.
    - In "body", text in quotes is a paragraph. A [ list in square brackets ] becomes bullet points.
    - "ask" is a question the patient can take to their team.
*/
HTH.content.en.money = {
  title: "Money, Insurance, and Adult Life",
  lead: "Heart care costs money, and as an adult you will be the one who keeps your insurance going. It is easier than it sounds once you know the words.",
  note: "This is general information for the United States. Rules are different in each state and they change. Your clinic's social worker can help with your own situation.",
  topics: [
    {
      id: "basics", bands: ["a", "b", "c", "d"],
      title: "How health insurance works",
      body: [
        "Health insurance helps pay for your care. You (or your family, or a job) pay every month. In return, the plan pays a big part of your bills.",
        ["Premium: what you pay every month to have the plan.",
         "Deductible: what you pay yourself each year before the plan starts paying.",
         "Copay: a set amount you pay for a visit or a medicine, like $30.",
         "Out-of-pocket maximum: the most you would pay in one year. After that, the plan pays.",
         "Network: the doctors and hospitals your plan works with. Going outside it usually costs much more."],
        "Carry your insurance card, or keep a photo of both sides on your phone."
      ],
      ask: "What insurance do I have right now, and whose name is it under?",
      links: [{ label: "Insurance words explained (HealthCare.gov glossary)", url: "https://www.healthcare.gov/glossary/" }]
    },
    {
      id: "parent", bands: ["b", "c", "d"],
      title: "Staying on a parent's plan until 26",
      body: [
        "In the United States you can usually stay on a parent's health plan until you turn 26. This is true even if you move out, get married, or are not in school.",
        "When you turn 26 that coverage ends. The exact day depends on the plan, so ask ahead of time.",
        "Losing a parent's plan lets you sign up for a new one right away, without waiting for the yearly sign-up period. There is a time limit, so start a few months before your birthday."
      ],
      ask: "On what date does my coverage on my parent's plan end?",
      links: [{ label: "Coverage for young adults under 26 (HealthCare.gov)", url: "https://www.healthcare.gov/young-adults/children-under-26/" }]
    },
    {
      id: "medicaid", bands: ["b", "c"],
      title: "Medicaid and SSI: what changes at 18",
      body: [
        "If you have Medicaid or CHIP as a child, the rules often change when you become an adult. In many states children's coverage ends around age 19, and you may need to apply again as an adult.",
        "If you get SSI (Supplemental Security Income), Social Security reviews your case when you turn 18 using the adult rules. Your parents' income no longer counts, only yours.",
        "These reviews come by mail. Open letters from Medicaid and Social Security right away and answer by the date they give. Missing a letter is the most common way people lose coverage."
      ],
      ask: "Will my Medicaid or SSI change when I turn 18 or 19, and what do I need to do?",
      links: [{ label: "Medicaid and CHIP (HealthCare.gov)", url: "https://www.healthcare.gov/medicaid-chip/getting-medicaid-chip/" }]
    },
    {
      id: "choosing", bands: ["c", "d"],
      title: "Picking a plan that covers my heart care",
      body: [
        "When you choose a plan, through a job, a school, or the Marketplace, the cheapest one each month is not always the cheapest over the year.",
        "Before you pick, check:",
        ["Is my ACHD clinic and my heart doctor in the plan's network?",
         "Is the hospital where I would have procedures in the network?",
         "Are my medicines on the plan's list of covered drugs?",
         "What is the out-of-pocket maximum? If you have a lot of care in a year, that number matters most."],
        "Your clinic can tell you which plans it accepts."
      ],
      ask: "Which insurance plans does this clinic take?"
    },
    {
      id: "costs", bands: ["c", "d"],
      title: "Copays, bills, and prior authorization",
      body: [
        "Prior authorization means your plan wants to approve a test, procedure, or medicine before you get it. Your clinic usually sends the request, but it can take days or weeks. Ask early.",
        "If a bill looks wrong, or the plan says no, you can ask them to look again. This is called an appeal, and it often works. Your clinic can help.",
        "If you cannot pay a bill, call the hospital's billing office and ask about financial assistance or a payment plan. Do this before the bill is overdue."
      ],
      ask: "Does my next test or procedure need prior authorization?"
    },
    {
      id: "lapse", bands: ["c", "d"],
      title: "If my insurance stops",
      body: [
        "Do not skip your heart care because of an insurance gap. Call your clinic and tell them. This happens a lot and they have ways to help.",
        ["Ask to talk to the clinic's social worker or financial counselor.",
         "Losing coverage usually lets you sign up for a new plan right away.",
         "Check whether you qualify for Medicaid in your state.",
         "Ask the hospital about its financial assistance program.",
         "Call 211 to find local help with health costs."]
      ],
      links: [
        { label: "Signing up outside the yearly period (HealthCare.gov)", url: "https://www.healthcare.gov/coverage-outside-open-enrollment/special-enrollment-period/" },
        { label: "Find local help (211)", url: "https://www.211.org/" }
      ]
    },
    {
      id: "school", bands: ["b", "c"],
      title: "College and my heart condition",
      body: [
        "Support plans from high school (an IEP or 504 plan) do not move to college on their own. You have to ask for support yourself.",
        ["Contact the college's disability services office before classes start.",
         "Bring a letter from your doctor that says what you need.",
         "Find out where the student health center is and whether your plan covers care near campus.",
         "If you move away, ask your team whether you need a heart clinic near school."]
      ],
      ask: "Can you write a letter for my college about what I need?"
    },
    {
      id: "work", bands: ["c", "d"],
      title: "Work and telling people about my heart",
      body: [
        "In most jobs you do not have to tell an employer about your heart condition. It is your choice.",
        "If you need a change to do your job, like a schedule that fits your appointments or less heavy lifting, you can ask for it. The law (the ADA) covers most employers with 15 or more workers. To ask, you will need to share some information about your health.",
        "When you compare jobs, compare the health insurance too. For someone with a heart condition, a good plan can be worth more than a higher salary."
      ],
      ask: "Are there kinds of work I should avoid with my heart condition?",
      links: [{ label: "Job Accommodation Network (free advice)", url: "https://askjan.org/" }, { label: "ADA.gov", url: "https://www.ada.gov/" }]
    },
    {
      id: "life", bands: ["d"],
      title: "Life insurance",
      body: [
        "Life insurance can be harder to get, or cost more, when you were born with a heart condition. It is still possible for many people.",
        ["Life insurance offered through a job often does not ask health questions. Sign up when it is first offered.",
         "If you apply on your own, a broker who works with several companies can find the ones that cover people with heart conditions.",
         "Recent clinic notes that show you are doing well can help your application."]
      ]
    }
  ]
};
