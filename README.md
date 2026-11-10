# Heart Transition Hub (working title)

A free, open tool that pediatric and adult congenital heart disease (ACHD) cardiologists can
hand to patients who are starting the move from pediatric to adult congenital care. The
patient opens a link or scans a QR code. There is no account, no install, and nothing for the
hospital to set up.

**Status: first working draft, version 0.1.0. Not clinically reviewed. Do not give this to
patients until the items in [CLINICAL_REVIEW.md](CLINICAL_REVIEW.md) are signed off.**

## What works today

- **Start:** asks who is using it (patient or caregiver) and the patient's age, then explains
  privacy in plain words.
- **Dashboard:** the goals for the patient's age group (12–14, 15–17, 18–21, 22+), a "before
  my next visit" list, and progress.
- **My Heart Passport:** diagnosis with plain-language explainers, surgeries, medicines,
  allergies, devices, heart doctors, and emergency contacts.
- **Check-in:** the PHQ-A for patients under 18 and the PHQ-9 for 18 and over, one question
  per screen. Any answer above "Not at all" on the
  self-harm question shows crisis resources straight away. Crisis resources appear on every
  results page, and "Need help now?" is at the top of every page.
- **My summary:** the patient writes questions for the team and downloads a one-to-two page
  PDF, plus a fold-up wallet card. On phones that support it, a Share button hands the PDF to
  the phone's share sheet.

Not built yet: readiness check, learning/attention/memory checklist, money and insurance,
living with my heart, my team, the transfer tracker, GAD-7, Spanish.

## Privacy

Everything the patient types stays in the browser on their own device. The tool has no
server, no accounts and no analytics, and the page is locked so that it cannot make network
requests (`connect-src 'none'` in `index.html`). Sharing happens only when the patient
downloads the PDF and gives it to someone, ideally through the patient portal or on paper for
staff to scan into the record. No research data is collected.

Two things to tell patients: anyone who uses the same device can open the tool and see their
answers, and "Erase my data" at the bottom of every page deletes everything.

## Trying it

Open a terminal in this folder and run a small local web server, then visit the address it
prints:

```bash
python -m http.server 8765
```

## Putting it online

Copy the whole folder to any static web host (GitHub Pages, Netlify, Cloudflare Pages, or a
folder on a hospital web server). It must be served over HTTPS. Link to it or make a QR code
of the address. After the first visit it works without a connection.

## Changing the content

Clinicians can edit the wording without touching code. Each file is plain text with notes at
the top:

| File | What is in it |
|---|---|
| `content/en/pathways.js` | Age groups, goals for each, caregiver tips |
| `content/en/passport.js` | Passport questions and heart condition explainers |
| `content/en/checkin.js` | PHQ-9 and PHQ-A, score ranges, result messages, crisis resources |
| `content/en/ui.js` | Buttons, headings, privacy wording, PDF labels |
| `content/en/sources.js` | Source list shown on the About page |
| `content/languages.js` | Version number, last clinical review date, language list |

After a clinical review, set `lastClinicalReview` in `content/languages.js`. Every page
footer shows that date, and the "Draft for clinician review. Not for patient use yet."
banner at the top of every page disappears. When you publish a new version, also change `version` there and
`CACHE` in `sw.js`.

To add Spanish, follow the steps at the top of `content/languages.js`.

## Sources and review

- [SOURCES.md](SOURCES.md): every source, with its link and whether the link was confirmed.
- [CLINICAL_REVIEW.md](CLINICAL_REVIEW.md): everything a clinician needs to check.

## Licence

Code and original text: MIT (see [LICENSE](LICENSE)). The PHQ-9 was developed by Drs. Robert
L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues with an educational grant from
Pfizer Inc. and may be reproduced without permission; its wording must not be changed.

This is an educational tool. It is not medical advice, it is not a medical device, and no one
monitors what patients enter.
