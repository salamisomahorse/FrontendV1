
import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Modal, Input, Skeleton, Select } from '../components/UI';
import { Clock, FileText, Send, AlertCircle } from 'lucide-react';
import { Project, ProjectOutcome } from '../types';
import { submitProjectOutcome, getEngineerProjects } from '../services/api';

type OutcomeErrors = { [key: string]: string };

const initialOutcomeState: Partial<ProjectOutcome> = {
  summary: '',
  delivery_speed_days: undefined,
  prediction_accuracy: undefined,
  client_satisfaction_rating: undefined,
  code_quality_score: undefined,
  forecast_accuracy_percentage: undefined,
  user_engagement_rate: undefined,
  retention_rate: undefined,
  requirements_completion_rate: undefined,
};

export const TalentDashboard: React.FC<{ onNotify: (t: 'success'|'error', m: string) => void }> = ({ onNotify }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isOutcomeModalOpen, setIsOutcomeModalOpen] = useState(false);
  
  const [outcomeData, setOutcomeData] = useState<Partial<ProjectOutcome>>(initialOutcomeState);
  const [outcomeErrors, setOutcomeErrors] = useState<OutcomeErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [metricCategory, setMetricCategory] = useState('Performance');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEngineerProjects();
        setProjects(data);
      } catch (e) {
        onNotify('error', 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [onNotify]);

  const handleOpenOutcome = (project: Project) => {
    setSelectedProject(project);
    setIsOutcomeModalOpen(true);
    setOutcomeData(initialOutcomeState);
    setOutcomeErrors({});
    setMetricCategory('Performance');
  };
  
  const handleOutcomeChange = (field: keyof ProjectOutcome, value: string) => {
    setOutcomeData(prev => ({ ...prev, [field]: value === '' ? undefined : Number(value) }));
  };

  const validateOutcome = (): boolean => {
    const newErrors: OutcomeErrors = {};
    if (!outcomeData.summary?.trim()) newErrors.summary = 'Summary is required.';

    // Validate only visible fields
    const visibleFields = getFieldsForCategory(metricCategory);
    visibleFields.forEach(field => {
        const value = outcomeData[field.id as keyof ProjectOutcome] as number | undefined;
        if (value === undefined || value === null || isNaN(value)) {
            newErrors[field.id] = `${field.label} is required.`;
            return;
        }
        if (field.min !== undefined && value < field.min) newErrors[field.id] = `Must be at least ${field.min}.`;
        if (field.max !== undefined && value > field.max) newErrors[field.id] = `Must be no more than ${field.max}.`;
        if (field.integer && !Number.isInteger(value)) newErrors[field.id] = `Must be a whole number.`;
    });
    
    setOutcomeErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmitOutcome = async () => {
    if (!selectedProject || !validateOutcome()) {
      onNotify('error', 'Please fix the errors in the form.');
      return;
    }

    setIsSubmitting(true);
    try {
      const submissionData: ProjectOutcome = {
        projectId: selectedProject.id,
        summary: outcomeData.summary!.trim(),
        submittedAt: new Date().toISOString(),
        ...outcomeData
      };
      
      await submitProjectOutcome(submissionData);
      onNotify('success', 'Project outcome submitted successfully.');
      setIsOutcomeModalOpen(false);
    } catch (e) {
      onNotify('error', 'Failed to submit outcome.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldsForCategory = (category: string) => {
    switch(category) {
        case 'Performance':
            return [
                { id: 'delivery_speed_days', label: 'Delivery Speed (Days)', type: 'number', min: 1, integer: true, placeholder: 'e.g. 30' },
                { id: 'prediction_accuracy', label: 'Prediction Accuracy (%)', type: 'number', min: 0, max: 100, placeholder: 'e.g. 92.5' }
            ];
        case 'Quality':
            return [
                { id: 'client_satisfaction_rating', label: 'Client Satisfaction (1-5)', type: 'number', min: 1, max: 5, integer: true, placeholder: 'e.g. 5' },
                { id: 'code_quality_score', label: 'Code Quality (1-5)', type: 'number', min: 1, max: 5, integer: true, placeholder: 'e.g. 4' }
            ];
        case 'Business':
            return [
                { id: 'forecast_accuracy_percentage', label: 'Forecast Accuracy (%)', type: 'number', min: 0, max: 100, placeholder: 'e.g. 85.2' },
                { id: 'user_engagement_rate', label: 'User Engagement Rate (0-1)', type: 'number', min: 0, max: 1, placeholder: 'e.g. 0.75' },
            ];
        default: return [];
    }
  };

  const metricFields = getFieldsForCategory(metricCategory);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-white">Talent Workspace</h1>
           <p className="text-slate-400 mt-2">Manage your active contracts and report success metrics.</p>
        </div>
        <Badge color="green">Status: Active</Badge>
      </div>

      <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">Assigned Projects</h2>
      
      {loading ? (
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700">
           <AlertCircle className="mx-auto h-12 w-12 text-slate-600 mb-4"/>
           <h3 className="text-white font-bold">No Active Projects</h3>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map(project => (
            <Card key={project.id} className="p-6 flex flex-col justify-between hover:border-nexus-500 transition-colors">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-white">{project.title}</h3>
                  <Badge color={project.status === 'Active' ? 'green' : 'yellow'}>{project.status}</Badge>
                </div>
                <p className="text-sm text-nexus-400 font-medium mb-2">Client: {project.clientName}</p>
                <p className="text-slate-400 text-sm mb-6">{project.description}</p>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock size={12}/> Started: {project.startDate}
                </span>
                {project.status === 'Active' && (
                  <Button size="sm" onClick={() => handleOpenOutcome(project)}>
                    <FileText size={16} className="mr-2"/> Report Outcome
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal 
        isOpen={isOutcomeModalOpen} 
        onClose={() => setIsOutcomeModalOpen(false)} 
        title={`Report Outcome: ${selectedProject?.title}`}
      >
         <div className="space-y-4">
            <Select 
              label="Metric Category"
              options={[
                { value: 'Performance', label: 'Performance Metrics' },
                { value: 'Quality', label: 'Quality & Satisfaction' },
                { value: 'Business', label: 'Business Impact' },
              ]}
              value={metricCategory}
              onChange={(e) => setMetricCategory(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4 pt-2">
                {metricFields.map(field => (
                    <Input
                        key={field.id}
                        label={field.label}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={outcomeData[field.id as keyof ProjectOutcome] || ''}
                        onChange={(e) => handleOutcomeChange(field.id as keyof ProjectOutcome, e.target.value)}
                        error={outcomeErrors[field.id]}
                        min={field.min}
                        max={field.max}
                        step={field.integer ? 1 : 'any'}
                    />
                ))}
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-400 mb-1">Execution Summary</label>
               <textarea 
                  className={`w-full bg-slate-950 border rounded-lg p-3 text-white text-sm focus:ring-2 focus:ring-nexus-500 outline-none ${outcomeErrors.summary ? 'border-red-500' : 'border-slate-700'}`}
                  rows={4}
                  placeholder="Briefly describe the implementation details..."
                  value={outcomeData.summary}
                  onChange={(e) => setOutcomeData({...outcomeData, summary: e.target.value})}
               />
               {outcomeErrors.summary && <p className="mt-1 text-xs text-red-400">{outcomeErrors.summary}</p>}
            </div>
            <div className="flex justify-end pt-2">
               <Button onClick={handleSubmitOutcome} isLoading={isSubmitting}>
                  <Send size={16} className="mr-2"/> Submit Report
               </Button>
            </div>
         </div>
      </Modal>
    </div>
  );
};
