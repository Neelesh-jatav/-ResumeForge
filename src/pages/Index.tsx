import { useState, useRef } from 'react';
import { ResumeData, defaultResumeData, ImagePosition } from '@/types/resume';
import { PersonalInfoForm } from '@/components/resume/PersonalInfoForm';
import { ExperienceForm } from '@/components/resume/ExperienceForm';
import { EducationForm } from '@/components/resume/EducationForm';
import { SkillsForm } from '@/components/resume/SkillsForm';
import { ProjectsForm } from '@/components/resume/ProjectsForm';
import { HonorsForm } from '@/components/resume/HonorsForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { ExportButtons } from '@/components/resume/ExportButtons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, Briefcase, GraduationCap, Sparkles, FileText, Eye, EyeOff, FolderGit2, Award, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';

const demoResumeData: ResumeData = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    twitter: '',
    website: 'johndoe.dev',
    summary: '',
    profileImage: '',
    showProfileImage: false,
    imagePosition: { x: 10, y: 10, size: 70 },
  },
  education: [
    {
      id: 'edu-1',
      institution: 'Stanford University',
      degree: 'Master of Science',
      field: 'Computer Science',
      location: 'Stanford, CA',
      startDate: '2018-09',
      endDate: '2020-06',
      gpa: '3.9',
    },
    {
      id: 'edu-2',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2014-09',
      endDate: '2018-05',
      gpa: '3.8',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Google',
      position: 'Senior Software Engineer',
      location: 'Mountain View, CA',
      startDate: '2021-03',
      endDate: '',
      current: true,
      bullets: [
        'Led development of a new search feature serving 100M+ daily users',
        'Mentored 5 junior engineers and conducted 50+ technical interviews',
        'Optimized API response times by 40% through caching strategies',
      ],
    },
    {
      id: 'exp-2',
      company: 'Meta',
      position: 'Software Engineer',
      location: 'Menlo Park, CA',
      startDate: '2020-07',
      endDate: '2021-02',
      current: false,
      bullets: [
        'Built real-time notification system handling 1M+ events per second',
        'Collaborated with product team to ship 3 major features',
        'Reduced infrastructure costs by 25% through optimization',
      ],
    },
  ],
  skillCategories: [
    { id: 'skill-1', category: 'Languages', skills: 'Python, JavaScript, TypeScript, Go, Java, C++' },
    { id: 'skill-2', category: 'Frameworks', skills: 'React, Node.js, Django, FastAPI, TensorFlow' },
    { id: 'skill-3', category: 'Tools', skills: 'Git, Docker, Kubernetes, AWS, GCP, PostgreSQL' },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'OpenAI Assistant',
      description: 'An AI-powered coding assistant that helps developers write better code faster.',
      link: 'github.com/johndoe/ai-assistant',
      technologies: 'Python, OpenAI API, FastAPI',
    },
    {
      id: 'proj-2',
      name: 'TaskFlow',
      description: 'Open-source project management tool with real-time collaboration features.',
      link: 'github.com/johndoe/taskflow',
      technologies: 'React, TypeScript, Supabase',
    },
  ],
  honors: [
    { id: 'honor-1', title: "Dean's List", description: 'All semesters at UC Berkeley (2014-2018)' },
    { id: 'honor-2', title: 'Google Code Jam', description: 'Top 500 worldwide finalist (2019)' },
    { id: 'honor-3', title: 'ACM ICPC', description: 'Regional finalist, Pacific Northwest (2017)' },
  ],
};

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [showPreview, setShowPreview] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const updatePersonalInfo = (data: ResumeData['personalInfo']) => {
    setResumeData((prev) => ({ ...prev, personalInfo: data }));
  };

  const updateExperience = (data: ResumeData['experience']) => {
    setResumeData((prev) => ({ ...prev, experience: data }));
  };

  const updateEducation = (data: ResumeData['education']) => {
    setResumeData((prev) => ({ ...prev, education: data }));
  };

  const updateSkillCategories = (data: ResumeData['skillCategories']) => {
    setResumeData((prev) => ({ ...prev, skillCategories: data }));
  };

  const updateProjects = (data: ResumeData['projects']) => {
    setResumeData((prev) => ({ ...prev, projects: data }));
  };

  const updateHonors = (data: ResumeData['honors']) => {
    setResumeData((prev) => ({ ...prev, honors: data }));
  };

  const updateImagePosition = (position: ImagePosition) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, imagePosition: position },
    }));
  };

  const toggleDemoMode = () => {
    if (isDemoMode) {
      setResumeData(defaultResumeData);
      setIsDemoMode(false);
    } else {
      setResumeData(demoResumeData);
      setIsDemoMode(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-foreground">ResumeForge</h1>
                <p className="text-xs text-muted-foreground">Professional Resume Builder</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant={isDemoMode ? "default" : "outline"}
                size="sm"
                onClick={toggleDemoMode}
              >
                <FlaskConical className="w-4 h-4 mr-2" />
                {isDemoMode ? 'Clear Demo' : 'Show Demo'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="lg:hidden"
              >
                {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </Button>
              <ExportButtons previewRef={previewRef} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <div className="order-2 lg:order-1">
            <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
              <Tabs defaultValue="personal" className="h-full">
                <div className="border-b border-border px-4 pt-4">
                  <TabsList className="grid grid-cols-6 gap-1 bg-secondary/50 p-1 rounded-lg">
                    <TabsTrigger
                      value="personal"
                      className="flex items-center gap-1 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all text-xs"
                    >
                      <User className="w-4 h-4" />
                      <span className="hidden sm:inline">Info</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="education"
                      className="flex items-center gap-1 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all text-xs"
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span className="hidden sm:inline">Edu</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="experience"
                      className="flex items-center gap-1 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all text-xs"
                    >
                      <Briefcase className="w-4 h-4" />
                      <span className="hidden sm:inline">Exp</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="skills"
                      className="flex items-center gap-1 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all text-xs"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="hidden sm:inline">Skills</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="projects"
                      className="flex items-center gap-1 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all text-xs"
                    >
                      <FolderGit2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Projects</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="honors"
                      className="flex items-center gap-1 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all text-xs"
                    >
                      <Award className="w-4 h-4" />
                      <span className="hidden sm:inline">Awards</span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <ScrollArea className="h-[calc(100vh-250px)]">
                  <div className="p-6">
                    <TabsContent value="personal" className="m-0">
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-lg font-display font-semibold text-foreground">Personal Information</h2>
                          <p className="text-sm text-muted-foreground">Add your contact details and social links</p>
                        </div>
                        <PersonalInfoForm data={resumeData.personalInfo} onChange={updatePersonalInfo} />
                      </div>
                    </TabsContent>

                    <TabsContent value="education" className="m-0">
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-lg font-display font-semibold text-foreground">Education</h2>
                          <p className="text-sm text-muted-foreground">Add your educational background</p>
                        </div>
                        <EducationForm data={resumeData.education} onChange={updateEducation} />
                      </div>
                    </TabsContent>

                    <TabsContent value="experience" className="m-0">
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-lg font-display font-semibold text-foreground">Work Experience</h2>
                          <p className="text-sm text-muted-foreground">Add your professional experience</p>
                        </div>
                        <ExperienceForm data={resumeData.experience} onChange={updateExperience} />
                      </div>
                    </TabsContent>

                    <TabsContent value="skills" className="m-0">
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-lg font-display font-semibold text-foreground">Skills</h2>
                          <p className="text-sm text-muted-foreground">Organize your skills by category</p>
                        </div>
                        <SkillsForm data={resumeData.skillCategories} onChange={updateSkillCategories} />
                      </div>
                    </TabsContent>

                    <TabsContent value="projects" className="m-0">
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-lg font-display font-semibold text-foreground">Projects / Open-Source</h2>
                          <p className="text-sm text-muted-foreground">Showcase your personal or open-source projects</p>
                        </div>
                        <ProjectsForm data={resumeData.projects} onChange={updateProjects} />
                      </div>
                    </TabsContent>

                    <TabsContent value="honors" className="m-0">
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-lg font-display font-semibold text-foreground">Honors & Awards</h2>
                          <p className="text-sm text-muted-foreground">Add distinctions and recognitions</p>
                        </div>
                        <HonorsForm data={resumeData.honors} onChange={updateHonors} />
                      </div>
                    </TabsContent>
                  </div>
                </ScrollArea>
              </Tabs>
            </div>
          </div>

          {/* Preview Panel */}
          <div className={`order-1 lg:order-2 ${!showPreview && 'hidden lg:block'}`}>
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Live Preview
                </h2>
              </div>
              <div ref={previewRef} className="animate-fade-in">
                <ResumePreview data={resumeData} onImagePositionChange={updateImagePosition} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
