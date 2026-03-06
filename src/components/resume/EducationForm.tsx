import { Education } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GraduationCap, BookOpen, Calendar, MapPin } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationForm = ({ data, onChange }: EducationFormProps) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: uuidv4(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    onChange([...data, newEducation]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(
      data.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {data.map((education, index) => (
        <div
          key={education.id}
          className="p-4 rounded-xl bg-secondary/50 border border-border space-y-4 animate-scale-in"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Education {index + 1}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeEducation(education.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <GraduationCap className="w-4 h-4" />
                Institution
              </Label>
              <Input
                placeholder="XYZ University"
                value={education.institution}
                onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Location
              </Label>
              <Input
                placeholder="New Delhi, India"
                value={education.location}
                onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                Degree
              </Label>
              <Input
                placeholder="B.Tech Computer Science"
                value={education.degree}
                onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-muted-foreground">Field of Study</Label>
              <Input
                placeholder="Computer Science"
                value={education.field}
                onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-muted-foreground">GPA (Optional)</Label>
              <Input
                placeholder="9.1"
                value={education.gpa}
                onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Start Date
              </Label>
              <Input
                type="month"
                value={education.startDate}
                onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                End Date
              </Label>
              <Input
                type="month"
                value={education.endDate}
                onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
      
      <Button
        variant="outline"
        onClick={addEducation}
        className="w-full border-dashed border-2 hover:border-primary hover:bg-primary/5"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
};
