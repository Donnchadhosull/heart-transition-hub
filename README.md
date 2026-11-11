# Heart Transition Hub

A free, open information website about moving from pediatric to adult congenital heart
disease (ACHD) care. It is written for young people with congenital heart disease, their
families, and the care teams who look after them.

Live site: https://donnchadhosull.github.io/heart-transition-hub/

**Status: pilot, version 0.3.0. The content has not been clinically reviewed.** Every page
shows a "Pilot version" banner until a review date is set. See
[CLINICAL_REVIEW.md](CLINICAL_REVIEW.md) for what needs checking.

## What is on the site

**For patients and families** (information pages, nothing to sign up for)

- Understanding transition: what it is, and what to expect at each age
- Heart conditions explained
- Living with a heart condition, including when to call the team and when to call 911
- Mood and wellbeing
- Learning, attention and memory
- Insurance and adult life (United States)
- Moving to adult care: finding an ACHD clinic and the first adult visit
- Your care team: who does what, and questions to ask

**For the care team** (chosen from the header menu)

- A page for each role: pediatric cardiologist, ACHD cardiologist, nurse or transition
  coordinator, social worker, pharmacist, psychologist, primary care clinician
- Program resources: the six core elements, a timeline, a transfer summary checklist, and
  how to read a patient's summary
- Share with patients: the QR code and a printable flyer

**Optional tools for patients**

- My Heart Passport and wallet card
- Am I Ready? (a self-check written for this site; not a validated instrument)
- Mood and worry check-ins (PHQ-A under 18, PHQ-9 for adults, GAD-7)
- Learning and attention self-check (a concerns list; not a neuropsychological test)
- My summary: download a PDF, share it, or email it as text

## Privacy

What a patient types is stored only in the browser on their own device. The site has no
server, no accounts and no analytics, and the page is blocked from making network requests
(`connect-src 'none'` in `index.html`).

The site itself sends nothing. A patient can choose to download a PDF, share it from their
phone, or use "Email it as text", which opens their own email app with the summary already
written so they can send it to themselves or their clinic. Regular email is less private
than a patient portal, and the site says so next to the button.

## Sharing it with patients

- QR code: `assets/qr.svg`
- Printable flyer: `assets/flyer.pdf` (made from `flyer.html`)

Both point to the live address above. If the site moves, make a new QR code for the new
address, replace `assets/qr.svg`, update the address in `flyer.html` and in
`content/en/pro.js`, and print `flyer.html` to PDF again.

## Changing the content

Wording lives in plain text files, each with notes at the top. No code changes are needed.

| File | What is in it |
|---|---|
| `content/en/ui.js` | Menus, headings, short descriptions, privacy wording |
| `content/en/pathways.js` | Understanding transition, and the goals at each age |
| `content/en/passport.js` | Heart condition explainers and the Heart Passport |
| `content/en/living.js` | Living with a heart condition |
| `content/en/wellbeing.js` | Mood and wellbeing |
| `content/en/learning.js` | Learning, attention and memory, and the self-check |
| `content/en/money.js` | Insurance and adult life (United States) |
| `content/en/transfer.js` | Moving to adult care |
| `content/en/team.js` | Your care team (patient view) |
| `content/en/pro.js` | Everything under "Care team" |
| `content/en/checkin.js` | PHQ-9, PHQ-A, GAD-7, result messages, crisis resources |
| `content/en/ready.js` | Am I Ready? |
| `content/en/sources.js` | Source list on the About page |
| `content/languages.js` | Version, last clinical review date, language list |

After a clinical review, set `lastClinicalReview` in `content/languages.js`. The banner
disappears and every page footer shows the date. When you publish a new version, change
`version` there and `CACHE` in `sw.js`.

## Running it locally

```bash
python -m http.server 8765
```

Then open the address it prints. To publish, push to the `main` branch; GitHub Pages
rebuilds the live site within a minute or two.

## Documents

- [BRIEF.md](BRIEF.md): the design brief this site was built to
- [SOURCES.md](SOURCES.md): every source and link
- [CLINICAL_REVIEW.md](CLINICAL_REVIEW.md): everything a clinician needs to check

## Licence

Code and original text: MIT (see [LICENSE](LICENSE)). The PHQ-9 and GAD-7 were developed by
Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues with an educational
grant from Pfizer Inc. and may be reproduced without permission. The wording of the PHQ-9,
PHQ-A and GAD-7 must not be changed.

This is an educational website. It is not medical advice, it is not a medical device, and
no one monitors what patients enter.
