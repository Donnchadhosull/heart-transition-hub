/*
  LANGUAGES AND VERSION
  ---------------------
  To add a language (for example Spanish):
    1. Copy the folder  content/en  to  content/es
    2. Translate the text inside the quotes in each file, and change
       "HTH.content.en" to "HTH.content.es" at the top of each file.
       Do NOT translate the PHQ-9 yourself: use the official translation
       from phqscreeners.com.
    3. Add one line to the list below:
         { code: "es", name: "Español", files: [ the same list of files as English ] }
  No other code changes are needed.
*/
HTH.languages = [
  { code: "en", name: "English", files: ["ui", "pathways", "passport", "checkin", "ready", "learning", "money", "living", "wellbeing", "team", "transfer", "pro", "sources"] }
];

/*
  Update these when clinical content is reviewed.
  lastClinicalReview: use "YYYY-MM-DD", or null while the content is still a draft.
*/
HTH.meta = {
  version: "0.3.0",
  lastClinicalReview: null
};
