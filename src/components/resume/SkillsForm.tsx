import { SkillCategory } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface SkillsFormProps {
  data: SkillCategory[];
  onChange: (data: SkillCategory[]) => void;
}

export const SkillsForm = ({ data, onChange }: SkillsFormProps) => {
  const addSkillCategory = () => {
    const newCategory: SkillCategory = {
      id: uuidv4(),
      category: '',
      skills: '',
    };
    onChange([...data, newCategory]);
  };

  const updateSkillCategory = (id: string, field: keyof SkillCategory, value: string) => {
    onChange(
      data.map((cat) =>
        cat.id === id ? { ...cat, [field]: value } : cat
      )
    );
  };

  const removeSkillCategory = (id: string) => {
    onChange(data.filter((cat) => cat.id !== id));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {data.map((category, index) => (
        <div
          key={category.id}
          className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50 border border-border animate-scale-in"
        >
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Category</Label>
              <Input
                placeholder="Programming Languages"
                value={category.category}
                onChange={(e) => updateSkillCategory(category.id, 'category', e.target.value)}
                className="h-9"
              />
            </div>
            
            <div className="space-y-1 md:col-span-2">
              <Label className="text-xs text-muted-foreground">Skills (comma-separated)</Label>
              <Input
                placeholder="C/C++, Java, HTML/CSS, JavaScript, Python, SQL"
                value={category.skills}
                onChange={(e) => updateSkillCategory(category.id, 'skills', e.target.value)}
                className="h-9"
              />
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeSkillCategory(category.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0 mt-5"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
      
      <Button
        variant="outline"
        onClick={addSkillCategory}
        className="w-full border-dashed border-2 hover:border-primary hover:bg-primary/5"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Skill Category
      </Button>
      
      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Add categories like Programming Languages, Frameworks, Tools, etc.</p>
        </div>
      )}
    </div>
  );
};
