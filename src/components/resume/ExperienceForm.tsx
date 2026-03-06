import { Experience } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Building, Briefcase, Calendar, MapPin } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export const ExperienceForm = ({ data, onChange }: ExperienceFormProps) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: uuidv4(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: [''],
    };
    onChange([...data, newExperience]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean | string[]) => {
    onChange(
      data.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const updateBullet = (expId: string, bulletIndex: number, value: string) => {
    const exp = data.find(e => e.id === expId);
    if (!exp) return;
    const newBullets = [...exp.bullets];
    newBullets[bulletIndex] = value;
    updateExperience(expId, 'bullets', newBullets);
  };

  const addBullet = (expId: string) => {
    const exp = data.find(e => e.id === expId);
    if (!exp) return;
    updateExperience(expId, 'bullets', [...exp.bullets, '']);
  };

  const removeBullet = (expId: string, bulletIndex: number) => {
    const exp = data.find(e => e.id === expId);
    if (!exp) return;
    const newBullets = exp.bullets.filter((_, i) => i !== bulletIndex);
    updateExperience(expId, 'bullets', newBullets.length ? newBullets : ['']);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {data.map((experience, index) => (
        <div
          key={experience.id}
          className="p-4 rounded-xl bg-secondary/50 border border-border space-y-4 animate-scale-in"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Experience {index + 1}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeExperience(experience.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <Building className="w-4 h-4" />
                Company
              </Label>
              <Input
                placeholder="HackerRank"
                value={experience.company}
                onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="w-4 h-4" />
                Position
              </Label>
              <Input
                placeholder="Software Engineer 2"
                value={experience.position}
                onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Location
              </Label>
              <Input
                placeholder="Bengaluru, India"
                value={experience.location}
                onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Start Date
              </Label>
              <Input
                type="month"
                value={experience.startDate}
                onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                End Date
              </Label>
              <Input
                type="month"
                value={experience.endDate}
                onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                disabled={experience.current}
              />
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id={`current-${experience.id}`}
                  checked={experience.current}
                  onCheckedChange={(checked) =>
                    updateExperience(experience.id, 'current', checked as boolean)
                  }
                />
                <label
                  htmlFor={`current-${experience.id}`}
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Currently working here
                </label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-muted-foreground">Bullet Points</Label>
            {experience.bullets.map((bullet, bulletIndex) => (
              <div key={bulletIndex} className="flex items-center gap-2">
                <span className="text-muted-foreground">•</span>
                <Textarea
                  placeholder="Write a one- or two-paragraph explanation of what the project aims to accomplish..."
                  className="min-h-[60px] flex-1"
                  value={bullet}
                  onChange={(e) => updateBullet(experience.id, bulletIndex, e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeBullet(experience.id, bulletIndex)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => addBullet(experience.id)}
              className="text-muted-foreground"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add bullet point
            </Button>
          </div>
        </div>
      ))}
      
      <Button
        variant="outline"
        onClick={addExperience}
        className="w-full border-dashed border-2 hover:border-primary hover:bg-primary/5"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
};
