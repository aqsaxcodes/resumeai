import { useState, useRef, useCallback } from 'react';
import {
  UploadCloud,
  FileText,
  X,
  ClipboardList,
  ScanSearch,
  Info,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { resumeParser } from '@/services/resumeParser';

const ACCEPTED_TYPES = ['.pdf', '.docx'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function AnalyzePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [extracting, setExtracting] = useState(false);

  const charCount = jobDescription.length;

  const validateFile = (f: File): string | null => {
    const ext = '.' + f.name.split('.').pop()?.toLowerCase();
    if (!ACCEPTED_TYPES.includes(ext)) {
      return 'Please upload a PDF or DOCX file.';
    }
    if (f.size > MAX_FILE_SIZE) {
      return 'File size must be under 10MB.';
    }
    return null;
  };

  const handleFile = useCallback((f: File) => {
    const err = validateFile(f);
    if (err) {
      setError(err);
      setFile(null);
      return;
    }
    setError('');
    setFile(f);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select a PDF resume to analyze.');
      return;
    }

    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    if (ext !== '.pdf') {
      setError('Only PDF files are supported for text extraction right now. DOCX support is coming soon.');
      return;
    }

    setExtracting(true);
    setError('');

    try {
      const resumeText = await resumeParser.extractText(file);

      if (!resumeText || resumeText.trim().length === 0) {
        setError(
          'No text could be extracted from this PDF. The file may be scanned or image-based. Try a text-based PDF.'
        );
        return;
      }

      navigate('/results', {
        state: {
          resumeText,
          jobDescription: jobDescription.trim(),
          fileName: file.name,
        },
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to extract text from the PDF. Please try a different file.';
      setError(message);
    } finally {
      setExtracting(false);
    }
  };

  const canAnalyze = file !== null && jobDescription.trim().length > 0 && !extracting;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Page header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
          Resume Analysis
        </span>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Analyze Your Resume</h1>
        <p className="mt-2 text-base text-slate-500">
          Upload your resume and paste the job description to get a detailed match analysis.
        </p>
      </div>

      {/* Upload section */}
      <Card className="p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <UploadCloud className="h-5 w-5 text-brand-600" />
          <h2 className="text-base font-semibold text-slate-900">Resume Upload</h2>
          <Badge variant="gray" className="ml-1">PDF / DOCX</Badge>
        </div>

        {!file ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 px-6 py-12 text-center ${
              isDragging
                ? 'border-brand-500 bg-brand-50'
                : 'border-slate-300 hover:border-brand-400 hover:bg-slate-50'
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 border border-brand-100">
                <UploadCloud className="h-6 w-6 text-brand-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Drag and drop your resume here
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  or{' '}
                  <span className="text-brand-600 font-semibold underline">
                    Browse Files
                  </span>
                </p>
              </div>
              <p className="text-xs text-slate-400">PDF or DOCX, up to 10MB</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100">
                <FileText className="h-5 w-5 text-brand-600" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{file.name}</p>
                <p className="text-xs text-slate-400">
                  {(file.size / 1024).toFixed(1)} KB · {file.name.split('.').pop()?.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <button
                onClick={removeFile}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-3 flex items-start gap-1.5 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </Card>

      {/* Job description section */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-brand-600" />
            <h2 className="text-base font-semibold text-slate-900">Job Description</h2>
          </div>
          {jobDescription.length > 0 && (
            <button
              onClick={() => setJobDescription('')}
              className="text-xs font-medium text-slate-400 hover:text-red-500 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job description here..."
          rows={10}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-y"
        />

        <div className="mt-2 flex justify-end">
          <span className="text-xs text-slate-400">{charCount} characters</span>
        </div>
      </Card>

      {/* Analyze button */}
      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={handleAnalyze}
          disabled={!canAnalyze}
          size="lg"
          className="w-full sm:w-auto"
        >
          {extracting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Extracting PDF Text...
            </>
          ) : (
            <>
              <ScanSearch className="h-5 w-5" />
              Analyze Resume
            </>
          )}
        </Button>

        {!canAnalyze && !extracting && !error && (
          <p className="text-xs text-slate-400 text-center">
            Upload a resume and add a job description to enable analysis.
          </p>
        )}
      </div>

      {/* Info message — shown while extracting */}
      {extracting && (
        <Card className="mt-6 p-6 bg-brand-50/40 border-brand-100">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-100">
              <Info className="h-5 w-5 text-brand-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Extracting text from your resume...
              </h3>
              <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
                Your PDF is being parsed to extract its text content. Once complete,
                you'll be taken to the results page where the analysis engine will
                process your resume and job description.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
