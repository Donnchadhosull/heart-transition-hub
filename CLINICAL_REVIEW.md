# NEEDS CLINICAL REVIEW

Nothing in this tool has been reviewed by a clinician yet. The footer of every page says
"Draft. Not yet clinically reviewed." until `lastClinicalReview` is set in
`content/languages.js`.

Each item below names the file to open. Tick it off when a named reviewer has signed off.

## Safety-critical (review before any patient sees this)

- [ ] **Unmonitored self-harm question.** PHQ-9 item 9 is asked with no clinician watching.
  The tool shows crisis resources at once on any answer above "Not at all", and again at the
  top of the results. Decide whether this is acceptable for your population, especially ages
  12 to 14, or whether item 9 should be dropped (PHQ-8) for the unmonitored setting.
  `content/en/checkin.js`
- [ ] **Crisis wording and resources.** Confirm 988 (call and text), Crisis Text Line
  (HOME to 741741), "tell an adult you trust", emergency room and 911 are the right set and
  the right words. US only. `content/en/checkin.js` → `crisis`
- [ ] **Severe-score threshold.** Crisis resources are shown first when the total is 20 or
  more (`severeMin`). Confirm, or lower it. `content/en/checkin.js`
- [ ] **Confidentiality for minors.** The PDF summary can include the self-harm answer. A
  parent may see the file or the device. Confirm the wording that warns the patient, and
  whether under-18s need different handling in your state.
  `content/en/ui.js` → `share.privateNote`, `welcome.privacy`

## Screener choice and scoring

- [ ] **Which screener by age.** Patients under 18 get the PHQ-A; 18 and over get the PHQ-9.
  The cut-off is `adolescentUnder` in `content/en/checkin.js`. The PHQ-A is validated for
  ages 11 to 17, so a patient who says they are younger than 11 still gets it. Confirm.
- [ ] **PHQ-A licence.** The American Psychiatric Association's adaptation is reported to
  say the PHQ-A is in the public domain, but that document could not be opened and the NIMH
  copy carries no permission statement. Confirm the right to reproduce it before launch.
- [ ] **PHQ-A wording** was copied word for word from the NIMH copy. Check it against the
  form your clinic uses; several slightly different PHQ-A forms are in circulation.
- [ ] **Parts of the PHQ-A form left out.** Question 10 (felt depressed or sad most days in
  the past year; not scored) and the extra suicide-risk questions that some versions add
  (thoughts of ending your life in the past month, lifetime attempt, or the ASQ questions)
  are not asked. They were left out because no clinician is watching. Decide whether to add
  any of them, each with the crisis screen on a positive answer.
- [ ] **Severity bands** 0–4, 5–9, 10–14, 15–19, 20–27 are from Kroenke et al. 2001 (adult
  PHQ-9) and are used for both screeners. The same ranges are reported for the APA's PHQ-A
  adaptation, where the lowest is called "None" (this tool says "Minimal"). Confirm for
  adolescents.
- [ ] **Result messages.** Plain-language text shown for each band, including the urgency of
  the advice ("this week", "today"). `content/en/checkin.js` → `bands`
- [ ] **PHQ-9 wording** was written from memory and must match the official form word for
  word. Check against phqscreeners.com. `content/en/checkin.js` → `instruments.phq9`
- [ ] **How often to repeat.** The tool does not tell patients how often to check in. Decide
  on a cadence, or leave it open.
- [ ] **GAD-7** is not built yet (brief asked for PHQ plus GAD-7).

## Age pathways

- [ ] **Age bands** 12–14, 15–17, 18–21, 22+ and the goals in each. `content/en/pathways.js`
- [ ] **"What stays private between us"** (15–17). Minor consent and confidentiality law
  varies by state. The item only prompts the patient to ask their team.
- [ ] **Guardianship and supported decision-making** note for caregivers (18–21).
- [ ] **Insurance at 26** (22+). Stated only as a prompt to find out; no rules are given.
- [ ] **Under-12 message.** Younger users are placed on the 12–14 path with a note to use
  the tool with an adult. Confirm, or block.

## Heart Passport

- [ ] **Lesion explainers.** Twelve two-to-three-sentence descriptions, written from general
  knowledge and not copied from any guideline. Check each for accuracy and tone.
  `content/en/passport.js` → `lesions`
- [ ] **Lesion list.** Decide what is missing (for example truncus arteriosus, ccTGA, TAPVR,
  pulmonary atresia, Marfan and other aortopathies, cardiomyopathy).
- [ ] **"Most people need heart check-ups for life"** statement. `passport.js` → `lifelong`
- [ ] **Device list** and wallet card contents (what an emergency clinician needs to see).

## Sources

- [x] Every link responds and every DOI's registered title matches the paper (checked
  10 November 2026).
- [ ] **CNOC resources from the conference slide.** The QR codes could not be read from the
  photo. The links were found by title on the CNOC site. Confirm they are the documents the
  slide pointed to, in particular the school handout.
- [ ] No DOI is listed for the 2025 ACHD guideline. The link goes to the ACC announcement.
  Replace it with the guideline itself.
- [ ] Only summaries and abstracts of the statements were read while building this. Nobody
  has yet checked the tool's content against the full text.

## Not clinical, but needs a decision

- [ ] Reading level has not been measured. Run the text through a readability check, and
  ideally past a few patients.
- [ ] The PDF is not a tagged (screen-reader accessible) PDF.
- [ ] Accessibility was built to WCAG 2.1 AA patterns but has not been audited or tested
  with a screen reader.
- [ ] "Call 911" in the footer and US crisis lines make this version US-only.
