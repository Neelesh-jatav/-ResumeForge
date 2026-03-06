import { Honor } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Award } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface HonorsFormProps {
  data: Honor[];
  onChange: (data: Honor[]) => void;
}

export const HonorsForm = ({ data, onChange }: HonorsFormProps) => {
  const addHonor = () => {
    const newHonor: Honor = {
      id: uuidv4(),
      title: '',
      description: '',
    };
    onChange([...data, newHonor]);
  };

  const updateHonor = (id: string, field: keyof Honor, value: string) => {
    onChange(
      data.map((honor) =>
        honor.id === id ? { ...honor, [field]: value } : honor
      )
    );
  };

  const removeHonor = (id: string) => {
    onChange(data.filter((honor) => honor.id !== id));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {data.map((honor, index) => (
        <div
          key={honor.id}
          className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50 border border-border animate-scale-in"
        >
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="flex items-center gap-2 text-xs text-muted-foreground">
                <Award className="w-3 h-3" />
                Title (Optional)
              </Label>
              <Input
                placeholder="Dean's List"
                value={honor.title}
                onChange={(e) => updateHonor(honor.id, 'title', e.target.value)}
                className="h-9"
              />
            </div>
            
            <div className="space-y-1 md:col-span-2">
              <Label className="text-xs text-muted-foreground">Description</Label>
              <Input
                placeholder="Distinction, honor, or honorable mention..."
                value={honor.description}
                onChange={(e) => updateHonor(honor.id, 'description', e.target.value)}
                className="h-9"
              />
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeHonor(honor.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0 mt-5"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
      
      <Button
        variant="outline"
        onClick={addHonor}
        className="w-full border-dashed border-2 hover:border-primary hover:bg-primary/5"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Honor / Award
      </Button>
      
      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Award className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Add distinctions, honors, or awards you've received</p>
        </div>
      )}
    </div>
  );
};
