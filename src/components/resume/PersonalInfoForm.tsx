import { ResumeData } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { User, Mail, Phone, MapPin, Linkedin, Globe, Github, Twitter, ImagePlus, X } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';

interface PersonalInfoFormProps {
  data: ResumeData['personalInfo'];
  onChange: (data: ResumeData['personalInfo']) => void;
}

export const PersonalInfoForm = ({ data, onChange }: PersonalInfoFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof typeof data, value: string | boolean) => {
    onChange({ ...data, [field]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ 
          ...data, 
          profileImage: reader.result as string,
          showProfileImage: true 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    onChange({ ...data, profileImage: '', showProfileImage: false });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Image Upload */}
      <div className="space-y-3 p-4 bg-secondary/30 rounded-lg border border-border">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2 text-muted-foreground">
            <ImagePlus className="w-4 h-4" />
            Profile Photo
          </Label>
          {data.profileImage && (
            <div className="flex items-center gap-2">
              <Label htmlFor="show-image" className="text-xs text-muted-foreground">Show on resume</Label>
              <Switch
                id="show-image"
                checked={data.showProfileImage}
                onCheckedChange={(checked) => handleChange('showProfileImage', checked)}
              />
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {data.profileImage ? (
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20">
                <img 
                  src={data.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-1 -right-1 w-6 h-6 rounded-full"
                onClick={removeImage}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-20 h-20 rounded-full border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-1 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
            >
              <ImagePlus className="w-6 h-6 text-muted-foreground/50" />
              <span className="text-[10px] text-muted-foreground/50">Upload</span>
            </button>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <div className="text-xs text-muted-foreground">
            <p>Upload a professional photo</p>
            <p className="text-muted-foreground/60">Will appear in circle on top-right of resume</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="flex items-center gap-2 text-muted-foreground">
            <User className="w-4 h-4" />
            Full Name
          </Label>
          <Input
            id="fullName"
            placeholder="First Last"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2 text-muted-foreground">
            <Mail className="w-4 h-4" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="xyz@email.com"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4" />
            Phone
          </Label>
          <Input
            id="phone"
            placeholder="1234567890"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            Location
          </Label>
          <Input
            id="location"
            placeholder="123 XYZ Street, Bangalore, IN"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center gap-2 text-muted-foreground">
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </Label>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/username"
            value={data.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="github" className="flex items-center gap-2 text-muted-foreground">
            <Github className="w-4 h-4" />
            GitHub
          </Label>
          <Input
            id="github"
            placeholder="github.com/username"
            value={data.github}
            onChange={(e) => handleChange('github', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="twitter" className="flex items-center gap-2 text-muted-foreground">
            <Twitter className="w-4 h-4" />
            Twitter
          </Label>
          <Input
            id="twitter"
            placeholder="twitter.com/username"
            value={data.twitter}
            onChange={(e) => handleChange('twitter', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website" className="flex items-center gap-2 text-muted-foreground">
            <Globe className="w-4 h-4" />
            Portfolio
          </Label>
          <Input
            id="website"
            placeholder="yourportfolio.com"
            value={data.website}
            onChange={(e) => handleChange('website', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
