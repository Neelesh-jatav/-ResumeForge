import { Project } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, FolderGit2, Link, Code } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export const ProjectsForm = ({ data, onChange }: ProjectsFormProps) => {
  const addProject = () => {
    const newProject: Project = {
      id: uuidv4(),
      name: '',
      link: '',
      technologies: '',
      description: '',
    };
    onChange([...data, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange(
      data.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    );
  };

  const removeProject = (id: string) => {
    onChange(data.filter((proj) => proj.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {data.map((project, index) => (
        <div
          key={project.id}
          className="p-4 rounded-xl bg-secondary/50 border border-border space-y-4 animate-scale-in"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Project {index + 1}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeProject(project.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <FolderGit2 className="w-4 h-4" />
                Project Name
              </Label>
              <Input
                placeholder="Project 1"
                value={project.name}
                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <Link className="w-4 h-4" />
                Link
              </Label>
              <Input
                placeholder="github.com/username/project"
                value={project.link}
                onChange={(e) => updateProject(project.id, 'link', e.target.value)}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <Code className="w-4 h-4" />
                Technologies
              </Label>
              <Input
                placeholder="JavaScript, HTML, CSS"
                value={project.technologies}
                onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-muted-foreground">Description</Label>
            <Textarea
              placeholder="Write a one- or two-paragraph explanation of what the project aims to accomplish..."
              className="min-h-[80px]"
              value={project.description}
              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
            />
          </div>
        </div>
      ))}
      
      <Button
        variant="outline"
        onClick={addProject}
        className="w-full border-dashed border-2 hover:border-primary hover:bg-primary/5"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
};
