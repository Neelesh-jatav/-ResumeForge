import { useRef } from 'react';
import { ResumeData, ImagePosition } from '@/types/resume';
import { DraggableImage } from './DraggableImage';

interface ResumePreviewProps {
  data: ResumeData;
  onImagePositionChange?: (position: ImagePosition) => void;
}

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-2 mt-4">
    <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground whitespace-nowrap">
      {title}
    </h2>
    <div className="flex-1 h-px bg-foreground/30" />
  </div>
);

export const ResumePreview = ({ data, onImagePositionChange }: ResumePreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { personalInfo, experience, education, skillCategories, projects, honors } = data;
  const hasPersonalInfo = personalInfo.fullName || personalInfo.email;
  const hasExperience = experience.length > 0;
  const hasEducation = education.length > 0;
  const hasSkills = skillCategories.length > 0;
  const hasProjects = projects.length > 0;
  const hasHonors = honors.length > 0;

  const socialLinks = [
    personalInfo.linkedin && 'LinkedIn',
    personalInfo.github && 'GitHub',
    personalInfo.twitter && 'Twitter',
    personalInfo.website && 'Portfolio',
  ].filter(Boolean);

  return (
    <div
      ref={containerRef}
      id="resume-preview"
      className="resume-preview bg-white p-8 md:p-10 rounded-xl shadow-medium border border-border min-h-[800px] text-black relative"
      style={{ fontFamily: 'Times New Roman, serif', fontSize: '11px', lineHeight: '1.4' }}
    >
      {/* Header */}
      {hasPersonalInfo && (
        <header className="relative mb-1">
          {/* Profile Image - Draggable */}
          {personalInfo.showProfileImage && personalInfo.profileImage && onImagePositionChange && (
            <DraggableImage
              src={personalInfo.profileImage}
              alt={personalInfo.fullName || 'Profile'}
              position={personalInfo.imagePosition}
              onPositionChange={onImagePositionChange}
              containerRef={containerRef}
            />
          )}
          
          {/* Static image for export (hidden during editing, shown in PDF) */}
          {personalInfo.showProfileImage && personalInfo.profileImage && !onImagePositionChange && (
            <div 
              className="absolute rounded-full overflow-hidden border-2 border-black/20 shadow-sm"
              style={{
                top: personalInfo.imagePosition?.y ?? 10,
                right: personalInfo.imagePosition?.x ?? 10,
                width: personalInfo.imagePosition?.size ?? 70,
                height: personalInfo.imagePosition?.size ?? 70,
              }}
            >
              <img 
                src={personalInfo.profileImage} 
                alt={personalInfo.fullName || 'Profile'} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="text-center pr-20">
            <h1 className="text-2xl font-normal tracking-wide mb-1" style={{ fontVariant: 'small-caps', letterSpacing: '0.15em' }}>
              {personalInfo.fullName || 'First Last'}
            </h1>
            
            <div className="text-xs text-black/80">
              {[personalInfo.email, personalInfo.phone, personalInfo.location]
                .filter(Boolean)
                .join(' | ')}
            </div>
            
            {socialLinks.length > 0 && (
              <div className="text-xs font-semibold mt-0.5">
                {socialLinks.join(' | ')}
              </div>
            )}
          </div>
        </header>
      )}

      {/* Education */}
      {hasEducation && (
        <section>
          <SectionHeader title="Education" />
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold">{edu.institution}</span>
                  </div>
                  <span className="text-right">{edu.location}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span>
                    {edu.degree} {edu.field && edu.field}
                    {edu.gpa && <span className="italic"> GPA: {edu.gpa}</span>}
                  </span>
                  <span className="text-right">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {hasExperience && (
        <section>
          <SectionHeader title="Experience" />
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold">{exp.company}</span>
                    <span className="mx-1">|</span>
                    <span>{exp.position}</span>
                  </div>
                  <span className="text-right whitespace-nowrap">
                    {exp.location}
                    <span className="mx-1">|</span>
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.bullets.length > 0 && (
                  <ul className="list-disc ml-4 mt-1 space-y-0.5">
                    {exp.bullets.filter(b => b.trim()).map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {hasSkills && (
        <section>
          <SectionHeader title="Skills" />
          <div className="space-y-0.5">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="flex">
                <span className="w-40 flex-shrink-0">{cat.category}:</span>
                <span>{cat.skills}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {hasProjects && (
        <section>
          <SectionHeader title="Projects / Open-Source" />
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold">{proj.name}</span>
                    {proj.link && (
                      <>
                        <span className="mx-1">|</span>
                        <span className="text-blue-600 underline">{proj.link}</span>
                      </>
                    )}
                  </div>
                  {proj.technologies && (
                    <span className="italic text-right">{proj.technologies}</span>
                  )}
                </div>
                {proj.description && (
                  <p className="mt-0.5">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Honors & Awards */}
      {hasHonors && (
        <section>
          <SectionHeader title="Honors & Awards" />
          <div className="space-y-1">
            {honors.map((honor) => (
              <div key={honor.id}>
                {honor.title && <span className="font-bold">{honor.title}: </span>}
                <span>{honor.description}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {!hasPersonalInfo && !hasExperience && !hasEducation && !hasSkills && !hasProjects && !hasHonors && (
        <div className="flex items-center justify-center h-full min-h-[400px] text-center">
          <div className="text-muted-foreground">
            <p className="text-lg font-display mb-2">Your resume preview will appear here</p>
            <p className="text-sm">Start filling out the form to see live updates</p>
          </div>
        </div>
      )}
    </div>
  );
};
