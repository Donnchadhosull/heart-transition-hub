/*
  CHECK-IN ON HOW I'M DOING  (clinical content: NEEDS CLINICAL REVIEW, see CLINICAL_REVIEW.md)

  Two instruments. The tool picks one by the patient's age:
    younger than "adolescentUnder"  ->  PHQ-A (PHQ-9 modified for Adolescents)
    that age or older               ->  PHQ-9

  IMPORTANT: the "stem", "items", "options" and "difficulty" wording inside each instrument
  is the validated form. Do NOT reword it, even to make it easier to read.
  For other languages use official translations, not your own.

  For each instrument:
    "selfHarmItem" is the question number that triggers the crisis screen on any answer above 0.
    "severeMin" is the total score at which crisis resources are shown first on the results page.
*/
HTH.content.en.checkin = {
  adolescentUnder: 18,

  instruments: {
    /*
      PHQ-9 (Patient Health Questionnaire-9).
      Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues,
      with an educational grant from Pfizer Inc. No permission required to reproduce,
      translate, display or distribute. Source: phqscreeners.com
    */
    phq9: {
      id: "phq9",
      short: "PHQ-9",
      name: "PHQ-9 (Patient Health Questionnaire-9)",
      maxScore: 27,
      selfHarmItem: 9,
      severeMin: 20,
      stem: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" }
      ],
      items: [
        "Little interest or pleasure in doing things",
        "Feeling down, depressed, or hopeless",
        "Trouble falling or staying asleep, or sleeping too much",
        "Feeling tired or having little energy",
        "Poor appetite or overeating",
        "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
        "Trouble concentrating on things, such as reading the newspaper or watching television",
        "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
        "Thoughts that you would be better off dead or of hurting yourself in some way"
      ],
      difficulty: {
        question: "If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?",
        options: ["Not difficult at all", "Somewhat difficult", "Very difficult", "Extremely difficult"]
      }
    },

    /*
      PHQ-A (PHQ-9 modified for Adolescents), ages 11 to 17.
      Johnson JG, Harris ES, Spitzer RL, Williams JBW. J Adolesc Health. 2002;30(3):196-204.
      Wording below is taken word for word from the copy published by the U.S. National
      Institute of Mental Health (ASQ Toolkit). Note the question order differs from the PHQ-9.

      Left out on purpose, pending clinical review (see CLINICAL_REVIEW.md):
        - question 10 on that form (felt depressed or sad most days in the past year), which is not scored
        - the separate suicide-risk questions that some versions of the form add
        - the paper-form instruction to put an "X" in a box
    */
    phqa: {
      id: "phqa",
      short: "PHQ-A",
      name: "PHQ-A (PHQ-9 modified for Adolescents)",
      maxScore: 27,
      selfHarmItem: 9,
      severeMin: 20,
      stem: "How often have you been bothered by each of the following symptoms during the past two weeks?",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" }
      ],
      items: [
        "Feeling down, depressed, irritable, or hopeless?",
        "Little interest or pleasure in doing things?",
        "Trouble falling asleep, staying asleep, or sleeping too much?",
        "Poor appetite, weight loss, or overeating?",
        "Feeling tired, or having little energy?",
        "Feeling bad about yourself – or feeling that you are a failure, or that you have let yourself or your family down?",
        "Trouble concentrating on things like school work, reading, or watching TV?",
        "Moving or speaking so slowly that other people could have noticed? Or the opposite – being so fidgety or restless that you were moving around a lot more than usual?",
        "Thoughts that you would be better off dead, or of hurting yourself in some way?"
      ],
      difficulty: {
        question: "If you are experiencing any of the problems on this form, how difficult have these problems made it for you to do your work, take care of things at home or get along with other people?",
        options: ["Not difficult at all", "Somewhat difficult", "Very difficult", "Extremely difficult"]
      }
    }
  },

  /*
    Score ranges, used for both instruments.
    PHQ-9: Kroenke, Spitzer & Williams, J Gen Intern Med 2001;16:606-613.
    PHQ-A: the same cut-points are printed on the American Psychiatric Association's
    DSM-5-TR adaptation of the PHQ-A (which calls the lowest range "None").
  */
  bands: [
    { min: 0, label: "Minimal", text: "Your answers suggest few or no signs of low mood right now. If that does not match how you feel, trust yourself and talk to your team anyway." },
    { min: 5, label: "Mild", text: "Your answers suggest some signs of low mood. This is common, and it is worth bringing up at your next visit." },
    { min: 10, label: "Moderate", text: "Your answers suggest low mood that is getting in the way. Please share this with your heart team or your regular doctor soon. They can help." },
    { min: 15, label: "Moderately severe", text: "Your answers suggest low mood that is affecting your life a lot. Please contact your heart team or your regular doctor this week. You do not have to wait for your next visit." },
    { min: 20, label: "Severe", text: "Your answers suggest you are having a very hard time. Please reach out today, to your doctor or to one of the free services on this page. You deserve support." }
  ],

  /* Text around the questionnaire (this part can be reworded). */
  intro: {
    title: "Check-in on how I'm doing",
    lead: "Living with a heart condition can be hard on your mood, not just your body. That is common, and help works.",
    what: "This check-in has 9 short questions about the last 2 weeks. It takes about 3 minutes.",
    notDiagnosis: "This is not a test and not a diagnosis. It is a way to notice how you are doing and to share it with your team if you choose to.",
    notWatched: "No one sees your answers unless you show them. No one is watching this tool, so it cannot send help.",
    caregiver: "This check-in is for the young person to answer for themselves, in private if they want.",
    start: "Start the check-in",
    again: "Do the check-in again",
    history: "My past check-ins",
    historyRow: "{date}: {score} out of {max} ({label}) · {tool}"
  },
  progress: "Question {n} of {total}",
  pickOne: "Choose an answer to go on.",
  result: {
    title: "My check-in result",
    score: "Your score is {score} out of {max}.",
    range: "On this questionnaire, that range is called \"{label}\".",
    notDiagnosis: "A score is not a diagnosis. Only a health professional who talks with you can say what it means.",
    shareTitle: "What to do next",
    share: "Add this result to your summary and show it to your team. You can upload it to your patient portal or bring it to your next visit.",
    toShare: "Go to my summary",
    saved: "This result was saved on this device."
  },

  crisis: {
    title: "You are not alone. Help is here right now.",
    lead: "If you are thinking about hurting yourself, or you feel unsafe, please reach out to one of these now. They are free, private, and open 24 hours a day.",
    always: "If you ever feel unsafe or think about hurting yourself, these are free, private, and open 24 hours a day.",
    alwaysTitle: "Help at any time",
    items: [
      { label: "Call 988", detail: "988 Suicide & Crisis Lifeline", href: "tel:988" },
      { label: "Text 988", detail: "988 Suicide & Crisis Lifeline", href: "sms:988" },
      { label: "Text HOME to 741741", detail: "Crisis Text Line", href: "sms:741741" }
    ],
    also: "You can also tell an adult you trust, or go to the nearest emergency room. If you are in danger right now, call 911.",
    interstitialNote: "This tool is not watched by anyone, so it cannot call for help for you. You can keep going with the check-in when you are ready.",
    cont: "I have seen this. Continue."
  }
};
