
import React, { useState } from 'react';
import { Button, Card, Input, Select } from '../components/UI';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';
import { ProjectRequirement } from '../types';
import { createProject } from '../services/api';

interface CreateProjectPageProps {
  onNavigate: (page: string) => void;
  onNotify: (t: 'success' | 'error', m: string) => void;
}

type ValidationErrors = {
  title?: string;
  description?: string;
  requirements?: string;
}

export const CreateProjectPage: React.FC<CreateProjectPageProps> = ({ onNavigate, onNotify }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    startDate: '',
    clientName: 'Tech Corp' 
  });

  const [requirements, setRequirements] = useState<ProjectRequirement[]>([
    { skill: '', minExperience: 1, level: 'Junior' }
  ]);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    const trimmedTitle = projectData.title.trim();
    
    if (!trimmedTitle) {
      newErrors.title = 'Project title is required.';
    } else if (trimmedTitle.length < 3 || trimmedTitle.length > 200) {
      newErrors.title = 'Title must be between 3 and 200 characters.';
    }

    if (!projectData.description.trim()) {
      newErrors.description = 'Project description is required.';
    }
    const validRequirements = requirements.filter(r => r.skill.trim() !== '');
    if (validRequirements.length === 0) {
      newErrors.requirements = 'At least one skill requirement must be added.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddRequirement = () => {
    setRequirements([...requirements, { skill: '', minExperience: 1, level: 'Junior' }]);
  };

  const handleRemoveRequirement = (index: number) => {
    if (requirements.length > 1) {
      const newReqs = [...requirements];
      newReqs.splice(index, 1);
      setRequirements(newReqs);
    }
  };

  const handleRequirementChange = (index: number, field: keyof ProjectRequirement, value: any) => {
    const newReqs = [...requirements];
    if (field === 'minExperience') {
        const numValue = parseInt(value, 10);
        newReqs[index] = { ...newReqs[index], [field]: isNaN(numValue) || numValue < 0 ? 0 : numValue };
    } else {
        newReqs[index] = { ...newReqs[index], [field]: value };
    }
    setRequirements(newReqs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      onNotify('error', 'Please fix the errors before submitting.');
      return;
    }

    const validRequirements = requirements.filter(r => r.skill.trim() !== '');
    
    setIsSubmitting(true);
    try {
      const finalProjectData = {
        ...projectData,
        title: projectData.title.trim(),
        description: projectData.description.trim(),
      };
      await createProject(finalProjectData, validRequirements);
      onNotify('success', 'Project created successfully!');
      onNavigate('industry');
    } catch (err) {
      onNotify('error', 'Failed to create project.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 animate-fade-in space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => onNavigate('industry')}>
          <ArrowLeft size={20} className="mr-2" /> Back
        </Button>
        <h1 className="text-3xl font-bold text-white">Create New Project</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">1. Project Essentials</h2>
          <div className="space-y-4">
            <Input 
              label="Project Title" 
              placeholder="e.g. AI-Powered Credit Scoring Model" 
              value={projectData.title}
              onChange={(e) => setProjectData({...projectData, title: e.target.value})}
              error={errors.title}
              maxLength={200}
            />
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Technical Brief / Description</label>
              <textarea 
                className={`w-full bg-slate-900 border rounded-lg p-3 text-white text-sm focus:ring-2 focus:ring-nexus-500 outline-none min-h-[120px] ${errors.description ? 'border-red-500' : 'border-slate-700'}`}
                placeholder="Describe the problem statement, goals, and scope..."
                value={projectData.description}
                onChange={(e) => setProjectData({...projectData, description: e.target.value})}
              />
              {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input 
                label="Start Date" 
                type="date"
                value={projectData.startDate}
                onChange={(e) => setProjectData({...projectData, startDate: e.target.value})}
              />
              <Input 
                label="Client (Organization)" 
                value={projectData.clientName} 
                disabled 
                className="opacity-60"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
             <h2 className="text-xl font-bold text-white">2. Technical Requirements</h2>
             <Button type="button" size="sm" variant="secondary" onClick={handleAddRequirement}>
                <Plus size={16} className="mr-2"/> Add Skill
             </Button>
          </div>
          
          {errors.requirements && <p className="mb-2 text-xs text-red-400">{errors.requirements}</p>}

          <div className="space-y-3">
             {requirements.map((req, index) => (
               <div key={index} className="flex flex-col md:flex-row gap-3 items-end bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                  <div className="flex-grow w-full">
                    <Input 
                      label={index === 0 ? "Skill Name" : ""} 
                      placeholder="e.g. Python"
                      value={req.skill}
                      onChange={(e) => handleRequirementChange(index, 'skill', e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-32">
                    <Input 
                      label={index === 0 ? "Min Years" : ""} 
                      type="number" 
                      min="0"
                      value={req.minExperience}
                      onChange={(e) => handleRequirementChange(index, 'minExperience', e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-40">
                    <Select 
                       label={index === 0 ? "Level" : ""}
                       options={[
                         { value: 'Junior', label: 'Junior' },
                         { value: 'Mid', label: 'Mid-Level' },
                         { value: 'Senior', label: 'Senior' },
                         { value: 'Expert', label: 'Expert' },
                       ]}
                       value={req.level}
                       onChange={(e) => handleRequirementChange(index, 'level', e.target.value)}
                    />
                  </div>
                  <div className="pb-1">
                    <Button 
                      type="button" 
                      variant="danger" 
                      className="px-3" 
                      onClick={() => handleRemoveRequirement(index)}
                      disabled={requirements.length === 1}
                      title="Remove Requirement"
                    >
                      <Trash2 size={16}/>
                    </Button>
                  </div>
               </div>
             ))}
          </div>
        </Card>

        <div className="flex justify-end pt-4">
          <Button size="lg" type="submit" isLoading={isSubmitting}>
             <Save size={20} className="mr-2"/> Create Project
          </Button>
        </div>
      </form>
    </div>
  );
};
