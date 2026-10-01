# ResumeAI --- Smart Resume Matcher & ATS Analyzer

> **Analyze. Improve. Match. Get Resume-Ready.**

## 1. Problem Statement

Job seekers often struggle to understand whether their resume matches a
particular job description, why an Applicant Tracking System (ATS) may
reject their resume, and what they should improve. Manually comparing a
resume with a job description and checking formatting is time-consuming
and error-prone.

## 2. Solution Overview

**ResumeAI** is a web-based resume analysis tool that helps job seekers
compare a resume with a target job description and identify areas for
improvement.

The application: - Accepts a resume in PDF format. - Extracts text from
the uploaded resume. - Accepts a target job description. - Extracts
relevant skills and requirements. - Calculates a resume-to-job match
score. - Calculates an ATS compatibility score. - Identifies matched,
missing, and weak skills/keywords. - Checks important resume sections
and basic formatting signals. - Provides actionable improvement
suggestions. - Provides a resume-builder interface for creating an
ATS-friendly resume.

## 3. Key Features

### Resume Upload & Parsing

-   PDF resume upload.
-   Text extraction using PDF.js.
-   File validation before analysis.

### Job Description Analysis

-   Paste a target job description.
-   Identify relevant skills and requirements.

### Resume Match Analysis

-   Compare resume content with job requirements.
-   Display match percentage.
-   Show matched skills.
-   Show missing skills.
-   Identify weak or missing keywords.

### ATS Score Checker

-   Generate an ATS score from 0--100.
-   Check important sections such as Contact Information, Summary,
    Education, Experience, Skills, and Projects.
-   Check basic formatting and text-quality signals.
-   Provide suggestions for improvement.

### Results Dashboard

-   Match score.
-   ATS score.
-   Resume skills.
-   Job requirements.
-   Matched skills.
-   Missing skills.
-   Improvement suggestions.

### Resume Builder

-   Enter resume information.
-   Organize education, experience, skills, and projects.
-   Follow a clean ATS-friendly resume structure.

## 4. User Flow

``` text
Upload Resume
      ↓
Paste Job Description
      ↓
Extract Resume Text
      ↓
Analyze Resume + Job Requirements
      ↓
Calculate Match Score
      ↓
Calculate ATS Score
      ↓
Show Missing Skills & Suggestions
      ↓
Improve Resume Using Builder
```

## 5. Technology Stack

-   **Frontend:** React, TypeScript, Vite, Tailwind CSS
-   **PDF Processing:** PDF.js (`pdfjs-dist`)
-   **Analysis:** TypeScript parsing, skill/keyword extraction,
    requirement matching, and deterministic scoring logic
-   **Database Integration:** Supabase

## 6. Project Structure

``` text
ResumeAI/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   │   ├── resumeParser.ts
│   │   └── analysisEngine.ts
│   ├── lib/
│   │   └── supabase.ts
│   └── ...
├── package.json
├── package-lock.json
├── vite.config.ts
└── README.md
```

## 7. Main Routes

-   `/` --- Landing page
-   `/analyze` --- Resume and job-description analysis
-   `/results` --- Match and ATS results
-   `/builder` --- Resume builder

## 8. Scoring Logic

### Match Score

The match score is calculated from the overlap between job requirements
identified from the job description and skills/content identified from
the resume.

``` text
Match Score =
Matched Job Requirements / Total Job Requirements × 100
```

### ATS Score

The ATS score combines checks including: - Important resume sections -
Contact information - Job-keyword coverage - Basic text-quality signals

The score is displayed on a **0--100** scale together with improvement
suggestions.

> The score is practical guidance and does not guarantee how a specific
> company's ATS will rank a resume.

## 9. Installation

### Requirements

-   Node.js
-   npm

### Install dependencies

``` bash
npm install
```

### Start the development server

``` bash
npm run dev
```

Open the local URL shown by Vite in the terminal, normally similar to:

``` text
http://localhost:5173
```

## 10. Environment Variables

If Supabase functionality is enabled, create a local `.env` file:

``` env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_or_anon_key
```

Do **not** include private keys, passwords, or other secrets in the
submission.

## 11. How to Use

1.  Open the application.
2.  Go to **Analyze**.
3.  Upload a PDF resume.
4.  Paste the target job description.
5.  Start the analysis.
6.  Review the match score.
7.  Review the ATS score.
8.  Check matched and missing skills.
9.  Read the improvement suggestions.
10. Use the Resume Builder to improve the resume.

## 12. Limitations

-   PDF resume text extraction is currently supported.
-   DOCX text extraction is not currently implemented.
-   The current analysis uses deterministic parsing, skill/keyword
    extraction, and scoring logic.
-   ATS scoring is an estimate; real ATS platforms may use different
    rules.
-   Automatic job applications are not part of the current project.

## 13. Testing Checklist

-   [ ] Application starts with `npm run dev`
-   [ ] Landing page loads
-   [ ] Navigation works
-   [ ] PDF upload works
-   [ ] Resume text extraction works
-   [ ] Job description input works
-   [ ] Analysis produces scores
-   [ ] Matched skills are displayed
-   [ ] Missing skills are displayed
-   [ ] Suggestions are displayed
-   [ ] Results page loads
-   [ ] Resume Builder opens
-   [ ] Refresh works correctly
-   [ ] Desktop and mobile layouts work
-   [ ] No major browser console errors
-   [ ] No secrets are included

## 14. Hackathon Relevance

ResumeAI addresses the resume-matching and ATS-analysis workflow through
one integrated web application combining:

-   Resume parsing
-   Job-description requirement extraction
-   Resume/job matching
-   ATS-oriented checks
-   Score breakdown
-   Missing-skill identification
-   Actionable suggestions
-   Resume-building workflow

## 15. Future Improvements

-   DOCX resume parsing
-   Advanced semantic/embedding-based matching
-   More detailed ATS formatting detection
-   Additional resume templates
-   PDF/DOCX export
-   Improved skill and job-title recognition
-   Secure user accounts and saved analysis history

## 16. Team

**Project:** ResumeAI --- Smart Resume Matcher & ATS Analyzer

**Team Name:** `Innovexa`

**Members:** - `[MEMBER NAME]` --- `[MEMBER ID]` - `[MEMBER NAME]` ---
`[MEMBER ID]`

## 17. Links

**Live Demo:** `[ADD LIVE DEMO URL IF AVAILABLE]`

**GitHub:** `[ADD GITHUB URL IF AVAILABLE]`

## Conclusion

ResumeAI helps job seekers understand how their resume aligns with a
target job description, identify ATS-related improvement areas, and make
their resume more targeted and structured.

**Analyze. Improve. Match. Get Resume-Ready.**
