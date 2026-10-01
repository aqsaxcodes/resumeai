import { useLocation } from 'react-router-dom';
import { Check, X, Upload, ScanSearch } from 'lucide-react';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ScoreRing from '@/components/ui/ScoreRing';

import { analyzeResume } from '@/services/analysisEngine';

export default function ResultsPage() {
  const location = useLocation();

  const state = location.state as {
    resumeText?: string;
    jobDescription?: string;
    fileName?: string;
  } | null;

  if (!state?.resumeText) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <Card className="p-10 text-center">
          <ScanSearch className="mx-auto h-12 w-12 text-slate-400" />

          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            No Analysis Available
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Upload a resume to begin your analysis.
          </p>

          <div className="mt-6">
            <Button to="/analyze">
              <Upload className="h-4 w-4" />
              Go to Analyze
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const resumeText = state.resumeText;
  const jobDescription = state.jobDescription || '';
  const fileName = state.fileName || 'resume.pdf';

  const analysis = analyzeResume(resumeText, jobDescription);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">

      <h1 className="mb-2 text-3xl font-bold text-slate-900">
        Your Resume Analysis
      </h1>

      <p className="mb-8 text-sm text-slate-500">
        {fileName} was processed successfully.
      </p>

      {/* SCORES */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 mb-8">

        <Card className="p-6 text-center">
          <ScoreRing
            score={analysis.matchScore}
            max={100}
            label="Match Score"
            size="md"
            color="brand"
          />
          <p className="mt-3 text-sm text-slate-500">
            Resume and job match
          </p>
        </Card>

        <Card className="p-6 text-center">
          <ScoreRing
            score={analysis.atsScore}
            max={100}
            label="ATS Score"
            size="md"
            color="amber"
          />
          <p className="mt-3 text-sm text-slate-500">
            ATS compatibility
          </p>
        </Card>

        <Card className="p-6 text-center">
          <ScoreRing
            score={analysis.overallScore}
            max={100}
            label="Overall"
            size="md"
            color="green"
          />
          <p className="mt-3 text-sm text-slate-500">
            Overall resume score
          </p>
        </Card>

      </div>

      {/* SKILLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            Resume Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {analysis.resumeSkills.map((skill) => (
              <Badge key={skill} variant="gray">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            Job Requirements
          </h2>

          <div className="flex flex-wrap gap-2">
            {analysis.jobRequirements.map((skill) => (
              <Badge key={skill} variant="gray">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>

      </div>

      {/* MATCHED */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Matched Skills
        </h2>

        <div className="flex flex-wrap gap-2">
          {analysis.matchedSkills.map((skill) => (
            <Badge key={skill} variant="green">
              <Check className="h-3 w-3" />
              {skill}
            </Badge>
          ))}
        </div>

        {analysis.matchedSkills.length === 0 && (
          <p className="text-sm text-slate-500">
            No matching skills detected.
          </p>
        )}
      </Card>

      {/* MISSING */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Missing Skills
        </h2>

        <div className="flex flex-wrap gap-2">
          {analysis.missingSkills.map((skill) => (
            <Badge key={skill} variant="gray">
              <X className="h-3 w-3" />
              {skill}
            </Badge>
          ))}
        </div>

        {analysis.missingSkills.length === 0 && (
          <p className="text-sm text-green-600">
            No major missing skills detected.
          </p>
        )}
      </Card>

      {/* ATS */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">
          ATS Section Check
        </h2>

        <div className="space-y-3">
          {analysis.sectionChecks.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between border-b border-slate-100 pb-3"
            >
              <span className="text-sm">
                {item.name}
              </span>

              {item.present ? (
                <span className="flex items-center gap-1 text-green-600 text-sm">
                  <Check className="h-4 w-4" />
                  Found
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-500 text-sm">
                  <X className="h-4 w-4" />
                  Missing
                </span>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* SUGGESTIONS */}
      <Card className="p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">
          Improvement Suggestions
        </h2>

        <div className="space-y-3">
          {analysis.suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="rounded-lg bg-slate-50 p-4 text-sm"
            >
              <strong>{index + 1}.</strong> {suggestion}
            </div>
          ))}
        </div>
      </Card>

      {/* BUTTON */}
      <div className="flex justify-center">
        <Button to="/analyze">
          <Upload className="h-4 w-4" />
          Analyze Another Resume
        </Button>
      </div>

    </div>
  );
}