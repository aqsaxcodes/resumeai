import { useState } from 'react';
import { Plus, Trash2, Download, FileText, User, Briefcase, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import type {
  ResumeData,
  EducationEntry,
  ExperienceEntry,
  ProjectEntry,
  CertificationEntry,
} from '@/types';

const genId = () => Math.random().toString(36).slice(2, 11);

const emptyResume: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
  },
  summary: '',
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
};

export default function BuilderPage() {
  const [data, setData] = useState<ResumeData>(emptyResume);
  const [skillInput, setSkillInput] = useState('');

  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    setData((d) => ({ ...d, personalInfo: { ...d.personalInfo, [field]: value } }));
  };

  const addEducation = () => {
    const entry: EducationEntry = {
      id: genId(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setData((d) => ({ ...d, education: [...d.education, entry] }));
  };

  const updateEducation = (id: string, field: keyof EducationEntry, value: string) => {
    setData((d) => ({
      ...d,
      education: d.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  const removeEducation = (id: string) => {
    setData((d) => ({ ...d, education: d.education.filter((e) => e.id !== id) }));
  };

  const addExperience = () => {
    const entry: ExperienceEntry = {
      id: genId(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setData((d) => ({ ...d, experience: [...d.experience, entry] }));
  };

  const updateExperience = (id: string, field: keyof ExperienceEntry, value: string) => {
    setData((d) => ({
      ...d,
      experience: d.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  const removeExperience = (id: string) => {
    setData((d) => ({ ...d, experience: d.experience.filter((e) => e.id !== id) }));
  };

  const addProject = () => {
    const entry: ProjectEntry = {
      id: genId(),
      name: '',
      description: '',
      link: '',
    };
    setData((d) => ({ ...d, projects: [...d.projects, entry] }));
  };

  const updateProject = (id: string, field: keyof ProjectEntry, value: string) => {
    setData((d) => ({
      ...d,
      projects: d.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  };

  const removeProject = (id: string) => {
    setData((d) => ({ ...d, projects: d.projects.filter((p) => p.id !== id) }));
  };

  const addCertification = () => {
    const entry: CertificationEntry = {
      id: genId(),
      name: '',
      issuer: '',
      date: '',
    };
    setData((d) => ({ ...d, certifications: [...d.certifications, entry] }));
  };

  const updateCertification = (id: string, field: keyof CertificationEntry, value: string) => {
    setData((d) => ({
      ...d,
      certifications: d.certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    }));
  };

  const removeCertification = (id: string) => {
    setData((d) => ({ ...d, certifications: d.certifications.filter((c) => c.id !== id) }));
  };

  const addSkill = () => {
    const skill = skillInput.trim();
    if (skill && !data.skills.includes(skill)) {
      setData((d) => ({ ...d, skills: [...d.skills, skill] }));
    }
    setSkillInput('');
  };

  const removeSkill = (skill: string) => {
    setData((d) => ({ ...d, skills: d.skills.filter((s) => s !== skill) }));
  };

  const inputClass =
    'w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent';
  const labelClass = 'text-xs font-semibold text-slate-500 mb-1 block';
  const sectionTitleClass = 'flex items-center gap-2 text-sm font-bold text-slate-900 mb-4';

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Page header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
          Resume Builder
        </span>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Build Your Resume</h1>
        <p className="mt-2 text-base text-slate-500">
          Fill in your details and see a live ATS-friendly preview. Export when ready.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* ===== LEFT: FORM ===== */}
        <div className="space-y-6">
          {/* Personal Information */}
          <Card className="p-6">
            <div className={sectionTitleClass}>
              <User className="h-4 w-4 text-brand-600" />
              Personal Information
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className={labelClass}>Full Name</label>
                <input
                  type="text"
                  value={data.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  placeholder="Jane Doe"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  placeholder="jane@email.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input
                  type="text"
                  value={data.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  value={data.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  placeholder="San Francisco, CA"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>LinkedIn</label>
                <input
                  type="text"
                  value={data.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/janedoe"
                  className={inputClass}
                />
              </div>
              <div className="col-span-2">
                <label className={labelClass}>Website</label>
                <input
                  type="text"
                  value={data.personalInfo.website}
                  onChange={(e) => updatePersonalInfo('website', e.target.value)}
                  placeholder="janedoe.com"
                  className={inputClass}
                />
              </div>
            </div>
          </Card>

          {/* Summary */}
          <Card className="p-6">
            <div className={sectionTitleClass}>
              <FileText className="h-4 w-4 text-brand-600" />
              Summary
            </div>
            <textarea
              value={data.summary}
              onChange={(e) => setData((d) => ({ ...d, summary: e.target.value }))}
              placeholder="Write a brief professional summary..."
              rows={4}
              className={inputClass}
            />
          </Card>

          {/* Education */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={sectionTitleClass + ' mb-0'}>
                <FileText className="h-4 w-4 text-brand-600" />
                Education
              </div>
              <button
                onClick={addEducation}
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-4">
              {data.education.length === 0 && (
                <p className="text-sm text-slate-400">No education entries yet.</p>
              )}
              {data.education.map((edu) => (
                <div key={edu.id} className="rounded-lg border border-slate-200 p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        placeholder="B.S. Computer Science"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        placeholder="University Name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Start Date</label>
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                        placeholder="2018"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>End Date</label>
                      <input
                        type="text"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                        placeholder="2022"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Experience */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={sectionTitleClass + ' mb-0'}>
                <Briefcase className="h-4 w-4 text-brand-600" />
                Experience
              </div>
              <button
                onClick={addExperience}
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-4">
              {data.experience.length === 0 && (
                <p className="text-sm text-slate-400">No experience entries yet.</p>
              )}
              {data.experience.map((exp) => (
                <div key={exp.id} className="rounded-lg border border-slate-200 p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Title</label>
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                        placeholder="Software Engineer"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        placeholder="TechCorp"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Start Date</label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        placeholder="Jan 2022"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>End Date</label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        placeholder="Present"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      placeholder="Describe your responsibilities and achievements..."
                      rows={3}
                      className={inputClass}
                    />
                  </div>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Skills */}
          <Card className="p-6">
            <div className={sectionTitleClass}>
              <FileText className="h-4 w-4 text-brand-600" />
              Skills
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Add a skill and press Enter"
                className={inputClass}
              />
              <Button onClick={addSkill} variant="secondary" size="md" className="shrink-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {data.skills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-brand-50 border border-brand-200 text-brand-700"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-brand-400 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </Card>

          {/* Projects */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={sectionTitleClass + ' mb-0'}>
                <FileText className="h-4 w-4 text-brand-600" />
                Projects
              </div>
              <button
                onClick={addProject}
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-4">
              {data.projects.length === 0 && (
                <p className="text-sm text-slate-400">No project entries yet.</p>
              )}
              {data.projects.map((proj) => (
                <div key={proj.id} className="rounded-lg border border-slate-200 p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Project Name</label>
                      <input
                        type="text"
                        value={proj.name}
                        onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                        placeholder="Project Name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Link</label>
                      <input
                        type="text"
                        value={proj.link}
                        onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                        placeholder="github.com/janedoe/project"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Description</label>
                    <textarea
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                      placeholder="Describe the project..."
                      rows={2}
                      className={inputClass}
                    />
                  </div>
                  <button
                    onClick={() => removeProject(proj.id)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Certifications */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={sectionTitleClass + ' mb-0'}>
                <FileText className="h-4 w-4 text-brand-600" />
                Certifications
              </div>
              <button
                onClick={addCertification}
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-4">
              {data.certifications.length === 0 && (
                <p className="text-sm text-slate-400">No certification entries yet.</p>
              )}
              {data.certifications.map((cert) => (
                <div key={cert.id} className="rounded-lg border border-slate-200 p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Name</label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                        placeholder="AWS Certified Developer"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Issuer</label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                        placeholder="Amazon Web Services"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Date</label>
                    <input
                      type="text"
                      value={cert.date}
                      onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                      placeholder="2023"
                      className={inputClass}
                    />
                  </div>
                  <button
                    onClick={() => removeCertification(cert.id)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ===== RIGHT: LIVE PREVIEW ===== */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Live Preview
            </span>
            <div className="flex gap-2">
              <Button size="sm" disabled>
                <Download className="h-3.5 w-3.5" />
                PDF
              </Button>
              <Button size="sm" variant="secondary" disabled>
                <Download className="h-3.5 w-3.5" />
                DOCX
              </Button>
            </div>
          </div>

          <Card className="p-8 lg:p-10 bg-white min-h-[600px]">
            {/* Name and contact */}
            <div className="border-b border-slate-300 pb-4">
              <h2 className="text-2xl font-bold text-slate-900">
                {data.personalInfo.fullName || 'Your Name'}
              </h2>
              <p className="mt-1.5 text-sm text-slate-500 flex flex-wrap gap-x-3 gap-y-0.5">
                {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
                {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
              </p>
            </div>

            {/* Summary */}
            {data.summary && (
              <div className="mt-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
                  Summary
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">{data.summary}</p>
              </div>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
              <div className="mt-5">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
                  Experience
                </h3>
                <div className="space-y-3">
                  {data.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex items-baseline justify-between">
                        <p className="text-sm font-semibold text-slate-900">
                          {exp.title || 'Title'}
                          {exp.company && <span className="font-normal text-slate-600"> — {exp.company}</span>}
                        </p>
                        <p className="text-xs text-slate-400 shrink-0 ml-2">
                          {exp.startDate} – {exp.endDate}
                        </p>
                      </div>
                      {exp.description && (
                        <p className="mt-1 text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <div className="mt-5">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
                  Education
                </h3>
                <div className="space-y-2">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex items-baseline justify-between">
                        <p className="text-sm font-semibold text-slate-900">
                          {edu.degree || 'Degree'}
                          {edu.institution && <span className="font-normal text-slate-600"> — {edu.institution}</span>}
                        </p>
                        <p className="text-xs text-slate-400 shrink-0 ml-2">
                          {edu.startDate} – {edu.endDate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
              <div className="mt-5">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
                  Skills
                </h3>
                <p className="text-sm text-slate-700">{data.skills.join(', ')}</p>
              </div>
            )}

            {/* Projects */}
            {data.projects.length > 0 && (
              <div className="mt-5">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
                  Projects
                </h3>
                <div className="space-y-2">
                  {data.projects.map((proj) => (
                    <div key={proj.id}>
                      <p className="text-sm font-semibold text-slate-900">
                        {proj.name || 'Project Name'}
                        {proj.link && <span className="font-normal text-slate-500"> — {proj.link}</span>}
                      </p>
                      {proj.description && (
                        <p className="mt-0.5 text-sm text-slate-600 leading-relaxed">{proj.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
              <div className="mt-5">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
                  Certifications
                </h3>
                <div className="space-y-1.5">
                  {data.certifications.map((cert) => (
                    <div key={cert.id} className="flex items-baseline justify-between">
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold">{cert.name || 'Certification'}</span>
                        {cert.issuer && <span className="text-slate-500"> — {cert.issuer}</span>}
                      </p>
                      {cert.date && <span className="text-xs text-slate-400">{cert.date}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state hint */}
            {Object.values(data.personalInfo).every((v) => !v) &&
              !data.summary &&
              data.experience.length === 0 &&
              data.education.length === 0 &&
              data.skills.length === 0 && (
                <div className="mt-8 text-center">
                  <p className="text-sm text-slate-300">
                    Start filling in the form to see your resume preview.
                  </p>
                </div>
              )}
          </Card>

          <p className="mt-3 text-xs text-slate-400 text-center">
            PDF and DOCX export will be available once document generation is implemented.
          </p>
        </div>
      </div>
    </div>
  );
}
