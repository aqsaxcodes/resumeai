import { Link } from 'react-router-dom';
import {
  Target,
  FileCheck,
  AlertCircle,
  FileText,
  Upload,
  ClipboardList,
  ScanSearch,
  Download,
  Check,
  X,
  Lightbulb,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import SectionHeader from '@/components/ui/SectionHeader';
import ProductPreviewCard from '@/components/ProductPreviewCard';

const capabilities = [
  {
    icon: Target,
    title: 'Resume Match',
    description: 'Semantic comparison of your resume against the job description to measure alignment.',
  },
  {
    icon: FileCheck,
    title: 'ATS Score',
    description: 'Check how well your resume passes Applicant Tracking Systems with detailed breakdowns.',
  },
  {
    icon: AlertCircle,
    title: 'Missing Skills',
    description: 'Identify skills and keywords present in the job description but missing from your resume.',
  },
  {
    icon: FileText,
    title: 'Resume Builder',
    description: 'Build an ATS-friendly resume with a live preview and export-ready formatting.',
  },
];

const steps = [
  { num: '01', icon: Upload, title: 'Upload Resume', description: 'Upload your resume as a PDF or DOCX file. Drag and drop or browse.' },
  { num: '02', icon: ClipboardList, title: 'Add Job Description', description: 'Paste the job description you want to match your resume against.' },
  { num: '03', icon: ScanSearch, title: 'Analyze', description: 'Get match scores, ATS compatibility, missing skills, and AI-powered suggestions.' },
  { num: '04', icon: Download, title: 'Improve & Export', description: 'Use the resume builder to improve and export an ATS-friendly resume.' },
];

export default function HomePage() {
  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column */}
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                <Sparkles className="h-3.5 w-3.5" />
                AI Resume Analysis
              </span>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                Know Exactly How Your Resume Matches the Job.
              </h1>

              <p className="mt-5 text-lg text-slate-500 leading-relaxed">
                Compare your resume with a job description, identify missing skills,
                check ATS compatibility, and improve your resume — all in one place.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button to="/analyze" size="lg">
                  Analyze My Resume
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button to="/builder" variant="secondary" size="lg">
                  Build My Resume
                </Button>
              </div>
            </div>

            {/* Right column — product preview */}
            <div className="lg:pl-4">
              <ProductPreviewCard />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CAPABILITIES ===== */}
      <section className="py-16 lg:py-20 bg-white border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Product Capabilities"
            title="Everything you need to get resume-ready"
            description="Four core tools that take you from raw resume to job-ready, ATS-friendly document."
            center
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {capabilities.map((cap) => (
              <Card key={cap.title} hover className="p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 border border-brand-100">
                  <cap.icon className="h-5 w-5 text-brand-600" strokeWidth={2} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{cap.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{cap.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-16 lg:py-24 bg-slate-50 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="How It Works"
            title="Four steps to a better resume"
            description="From upload to export, the process is straightforward and designed for results."
            center
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, idx) => (
              <div key={step.num} className="relative">
                <Card className="p-6 h-full">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-slate-200">{step.num}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600">
                      <step.icon className="h-5 w-5 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">{step.description}</p>
                </Card>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                    <ArrowRight className="h-5 w-5 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESUME vs JOB COMPARISON ===== */}
      <section className="py-16 lg:py-24 bg-white border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Resume vs Job Comparison"
            title="See exactly where you match — and where you don't"
            description="A side-by-side comparison of your resume skills and job requirements, with matched and missing skills clearly highlighted."
          />

          <div className="mt-12 grid lg:grid-cols-3 gap-5">
            {/* Resume skills */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-brand-500" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Resume Skills</h3>
              </div>
              <div className="space-y-2">
                {['React', 'Python', 'SQL', 'REST APIs', 'Git'].map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-slate-700">{skill}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Job requirements */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Job Requirements</h3>
              </div>
              <div className="space-y-2">
                {['React', 'Python', 'SQL', 'AWS', 'Docker', 'CI/CD'].map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-slate-700">{skill}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Missing skills */}
            <Card className="p-6 border-red-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Missing Skills</h3>
              </div>
              <div className="space-y-2">
                {['AWS', 'Docker', 'CI/CD'].map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-sm">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-slate-700">{skill}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <Badge variant="red">3 skills to add</Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== ATS ANALYSIS PREVIEW ===== */}
      <section id="ats-preview" className="py-16 lg:py-24 bg-slate-50 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="ATS Analysis"
            title="Understand your ATS compatibility"
            description="A detailed breakdown of how your resume performs against Applicant Tracking Systems — keyword coverage, section checks, formatting checks, and suggestions."
          />

          <div className="mt-12 grid lg:grid-cols-3 gap-5">
            {/* ATS Score + Keyword Coverage */}
            <Card className="p-6 lg:col-span-1">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-5">ATS Score</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-amber-600">76</span>
                <span className="text-2xl font-medium text-slate-400">/100</span>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-amber-500" style={{ width: '76%' }} />
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Keyword Coverage</h4>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold text-brand-600">68</span>
                  <span className="text-lg font-medium text-slate-400">%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-brand-500" style={{ width: '68%' }} />
                </div>
                <p className="mt-2 text-xs text-slate-400">Preview data — not from a real analysis</p>
              </div>
            </Card>

            {/* Section Checks */}
            <Card className="p-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-5">Section Checks</h3>
              <div className="space-y-3">
                {[
                  { section: 'Contact Info', present: true },
                  { section: 'Professional Summary', present: true },
                  { section: 'Work Experience', present: true },
                  { section: 'Education', present: true },
                  { section: 'Skills', present: true },
                  { section: 'Certifications', present: false },
                ].map((check) => (
                  <div key={check.section} className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">{check.section}</span>
                    {check.present ? (
                      <Badge variant="green"><Check className="h-3 w-3" /> Present</Badge>
                    ) : (
                      <Badge variant="red"><X className="h-3 w-3" /> Missing</Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Formatting Checks + Suggestions */}
            <Card className="p-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-5">Formatting Checks</h3>
              <div className="space-y-3">
                {[
                  { check: 'Standard fonts', passed: true },
                  { check: 'No tables or columns', passed: true },
                  { check: 'Proper headings', passed: true },
                  { check: 'No graphics/photos', passed: false },
                ].map((check) => (
                  <div key={check.check} className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">{check.check}</span>
                    {check.passed ? (
                      <Badge variant="green"><Check className="h-3 w-3" /> Pass</Badge>
                    ) : (
                      <Badge variant="amber"><X className="h-3 w-3" /> Review</Badge>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-slate-100">
                <div className="flex items-start gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-100">
                    <Lightbulb className="h-4 w-4 text-brand-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-700 uppercase tracking-wide mb-1">Suggestion</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Remove graphics and photos for better ATS compatibility.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== RESUME BUILDER PREVIEW ===== */}
      <section id="builder-preview" className="py-16 lg:py-24 bg-white border-y border-slate-100 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Resume Builder"
            title="Build an ATS-friendly resume with live preview"
            description="Fill in your details on the left and see your resume update in real time on the right. Export-ready when you're done."
          />

          <div className="mt-12 grid lg:grid-cols-2 gap-6">
            {/* Form preview */}
            <Card className="p-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Form Input</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500">Full Name</label>
                  <div className="mt-1 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-700">
                    Jane Doe
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500">Professional Summary</label>
                  <div className="mt-1 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-600 leading-relaxed">
                    Full-stack developer with 5+ years of experience building scalable web applications...
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500">Skills</label>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {['React', 'TypeScript', 'Node.js', 'Python', 'AWS'].map((skill) => (
                      <Badge key={skill} variant="brand">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Resume preview */}
            <Card className="p-8">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-xl font-bold text-slate-900">Jane Doe</h3>
                <p className="text-sm text-slate-500 mt-1">jane.doe@email.com · San Francisco, CA · linkedin.com/in/janedoe</p>
              </div>
              <div className="mt-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Summary</h4>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  Full-stack developer with 5+ years of experience building scalable web applications.
                </p>
              </div>
              <div className="mt-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Experience</h4>
                <div className="mt-1.5">
                  <p className="text-sm font-semibold text-slate-800">Senior Developer — TechCorp</p>
                  <p className="text-sm text-slate-600 leading-relaxed mt-0.5">
                    Led development of cloud-native applications serving 1M+ users.
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Skills</h4>
                <p className="mt-1 text-sm text-slate-600">React, TypeScript, Node.js, Python, AWS</p>
              </div>
              <div className="mt-6 flex gap-3">
                <Button size="sm" disabled>Download PDF</Button>
                <Button size="sm" variant="secondary" disabled>Download DOCX</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="p-10 lg:p-16 text-center bg-gradient-to-br from-white to-brand-50/30">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Ready to understand your resume?
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
              Upload your resume and a job description to see how you match —
              scores, missing skills, ATS compatibility, and suggestions.
            </p>
            <div className="mt-8">
              <Button to="/analyze" size="lg">
                Analyze My Resume
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
