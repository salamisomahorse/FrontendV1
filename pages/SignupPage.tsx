
import React, { useState } from 'react';
import { Button, Card, Input } from '../components/UI';
import { registerTalent } from '../services/api';
import { User } from '../types';
import { ArrowLeft, Upload, Plus, X } from 'lucide-react';

interface SignupPageProps {
  onSignupSuccess: (user: User) => void;
  onNavigate: (page: string) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SignupPage: React.FC<SignupPageProps> = ({ onSignupSuccess, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    resume: ''
  });
  const [errors, setErrors] = useState({ email: '', name: '' });
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = { email: '', name: '' };
    if (!formData.name.trim()) {
        newErrors.name = 'Full name is required.';
    }
    if (!formData.email.trim()) {
        newErrors.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(formData.email.trim().toLowerCase())) {
        newErrors.email = 'Please enter a valid email address.';
    }
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
        return;
    }
    setIsLoading(true);
    
    try {
      const finalData = {
          ...formData,
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          skills: skills.map(s => s.trim())
      };
      const newUser = await registerTalent(finalData);
      onSignupSuccess(newUser);
    } catch (error) {
      console.error("Signup failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addSkill = () => {
    const trimmedSkill = currentSkill.trim();
    if (trimmedSkill && !skills.find(s => s.toLowerCase() === trimmedSkill.toLowerCase())) {
      setSkills([...skills, trimmedSkill]);
      setCurrentSkill('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 animate-fade-in">
      <Button variant="ghost" className="mb-6" onClick={() => onNavigate('landing')}>
        <ArrowLeft size={16} className="mr-2"/> Back to Home
      </Button>

      <Card className="p-8">
        <div className="mb-8 border-b border-slate-700 pb-4">
          <h1 className="text-2xl font-bold text-white">Join as an AI Talent</h1>
          <p className="text-slate-400 mt-1">
            Complete your profile to be matched with top African Fintech and AgriTech projects.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Input 
              label="Full Name" 
              placeholder="e.g. Amara Diop" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              error={errors.name}
            />
            <Input 
              label="Email Address" 
              type="email" 
              placeholder="talent@example.com" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              error={errors.email}
            />
          </div>

          <Input 
            label="Password" 
            type="password" 
            placeholder="Min 8 characters" 
            required
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Professional Bio</label>
            <textarea 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-nexus-500 outline-none h-24"
              placeholder="Describe your experience with Python, AI, or specific industries..."
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
            ></textarea>
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-400 mb-1">Core Technical Skills</label>
             <div className="flex gap-2 mb-2">
                <Input 
                  placeholder="Add a skill (e.g. FastAPI, PyTorch)" 
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <Button type="button" variant="secondary" onClick={addSkill}><Plus size={20}/></Button>
             </div>
             <div className="flex flex-wrap gap-2">
                {skills.map(s => (
                  <span key={s} className="bg-slate-800 text-nexus-400 px-2 py-1 rounded text-sm flex items-center gap-1 border border-slate-700">
                    {s} <X size={12} className="cursor-pointer hover:text-white" onClick={() => setSkills(skills.filter(i => i !== s))}/>
                  </span>
                ))}
             </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-400 mb-1">Upload Resume (PDF)</label>
             <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:border-nexus-500 transition-colors cursor-pointer bg-slate-900">
                <Upload className="mx-auto h-8 w-8 text-slate-500 mb-2" />
                <p className="text-sm text-slate-400">Click to upload or drag and drop</p>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".pdf"
                  onChange={(e) => setFormData({...formData, resume: e.target.files?.[0]?.name || ''})} 
                />
                {formData.resume && <p className="text-nexus-400 text-sm mt-2">{formData.resume}</p>}
             </div>
          </div>

          <div className="pt-4">
             <Button className="w-full" size="lg" isLoading={isLoading} type="submit">
               Create Account
             </Button>
             <p className="text-xs text-center text-slate-500 mt-4">
               By joining, you agree to our Vetting Protocol and Privacy Policy.
             </p>
          </div>
        </form>
      </Card>
    </div>
  );
};
