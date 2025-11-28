
import React, { useState } from 'react';
import { Card, Button, Badge, Modal, Input } from '../components/UI';
import { CheckCircle, Clock, FileText, Send } from 'lucide-react';
import { Project, ProjectOutcome } from '../types';
import { submitProjectOutcome } from '../services/api';

const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Fintech Credit Risk API',
    clientName: 'EquityBank',
    status: 'Active',
    description: 'Developing a Python FastAPI service for real-time credit scoring using alternative data points.',
    startDate: '2024-10-01'
  },
  {
    id: 'p2',
    title: 'Crop Disease Classification Model',
    clientName: 'AgriScan',
    status: 'Pending',
    description: 'Training a ResNet50 model to identify cassava diseases from mobile uploads.',
    startDate: '2024-11-15'
  }
];

export const EngineerDashboard: React.FC<{ onNotify: (t: 'success'|'error', m: string) => void }> = ({ onNotify }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isOutcomeModalOpen, setIsOutcomeModalOpen] = useState(false);
  const [outcomeData, setOutcomeData] = useState({ metricLabel: '', metricValue: '', summary: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenOutcome = (project: Project) => {
    setSelectedProject(project);
    setIsOutcomeModalOpen(true);
  };

  const handleSubmitOutcome = async () => {
    if (!selectedProject) return;
    setIsSubmitting(true);
    
    try {
      // Simulate POST /v1/project_outcomes
      await submitProjectOutcome({
        projectId: selectedProject.id,
        metricLabel: outcomeData.metricLabel,
        metricValue: outcomeData.metricValue,
        summary: outcomeData.summary,
        submittedAt: new Date().toISOString()
      });
      onNotify('success', 'Project outcome submitted successfully.');
      setIsOutcomeModalOpen(false);
      setOutcomeData({ metricLabel: '', metricValue: '', summary: '' });
    } catch (e) {
      onNotify('error', 'Failed to submit outcome.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-white">Engineer Workspace</h1>
           <p className="text-slate-400 mt-2">Manage your active contracts and report success metrics.</p>
        </div>
        <Badge color="green">Status: Active</Badge>
      </div>

      <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">Assigned Projects</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {MOCK_PROJECTS.map(project => (
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

      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 flex items-center gap-4">
         <div className="bg-nexus-900 p-3 rounded-full text-nexus-400">
            <CheckCircle size={24} />
         </div>
         <div>
            <h3 className="font-bold text-white">Why Report Outcomes?</h3>
            <p className="text-sm text-slate-400">
              The Nexus platform uses your reported metrics (e.g., efficiency gains, deployment speed) to match you with higher-value contracts.
            </p>
         </div>
      </div>

      {/* Outcome Modal (Mission 2 Feature) */}
      <Modal 
        isOpen={isOutcomeModalOpen} 
        onClose={() => setIsOutcomeModalOpen(false)} 
        title={`Report Outcome: ${selectedProject?.title}`}
      >
         <div className="space-y-4">
            <p className="text-sm text-slate-400">
              Submit your project deliverables and key success metrics. This data will be stored in our PostgreSQL audit trail.
            </p>
            <div className="grid grid-cols-2 gap-4">
               <Input 
                 label="Metric Label" 
                 placeholder="e.g. API Latency"
                 value={outcomeData.metricLabel}
                 onChange={(e) => setOutcomeData({...outcomeData, metricLabel: e.target.value})}
               />
               <Input 
                 label="Value Achieved" 
                 placeholder="e.g. -45ms"
                 value={outcomeData.metricValue}
                 onChange={(e) => setOutcomeData({...outcomeData, metricValue: e.target.value})}
               />
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-400 mb-1">Execution Summary</label>
               <textarea 
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm focus:ring-2 focus:ring-nexus-500 outline-none"
                  rows={4}
                  placeholder="Briefly describe the implementation details..."
                  value={outcomeData.summary}
                  onChange={(e) => setOutcomeData({...outcomeData, summary: e.target.value})}
               />
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
