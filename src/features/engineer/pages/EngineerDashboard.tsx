import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Modal, Input, Skeleton, Select } from '@/shared/components';
import { CheckCircle, Clock, FileText, Send, AlertCircle } from 'lucide-react';
import { Project, ProjectOutcome } from '@/core/models';
import { submitProjectOutcome, getEngineerProjects } from '@/core/services/api';

type OutcomeErrors = {
  metricLabel?: string;
  metricValue?: string;
  summary?: string;
};

export const EngineerDashboard: React.FC<{
  onNotify: (t: 'success' | 'error', m: string) => void;
}> = ({ onNotify }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isOutcomeModalOpen, setIsOutcomeModalOpen] = useState(false);

  const [outcomeData, setOutcomeData] = useState<Partial<ProjectOutcome>>({
    metricCategory: 'Performance',
    metricLabel: '',
    metricValue: '',
    summary: '',
  });
  const [outcomeErrors, setOutcomeErrors] = useState<OutcomeErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setOutcomeData({
      metricCategory: 'Performance',
      metricLabel: '',
      metricValue: '',
      summary: '',
    });
    setOutcomeErrors({});
  };

  const validateOutcome = (): boolean => {
    const newErrors: OutcomeErrors = {};
    if (!outcomeData.metricLabel?.trim()) {
      newErrors.metricLabel = 'Metric label is required.';
    }
    if (!outcomeData.metricValue?.trim()) {
      newErrors.metricValue = 'Value is required.';
    } else {
      // Validation for formats like: 45, -15.5, +20%, 1000
      const metricRegex = /^[+-]?(\d*\.?\d+)\s*%?$/;
      if (!metricRegex.test(outcomeData.metricValue)) {
        newErrors.metricValue = 'Invalid format. Use numbers or percentages (e.g., -15.5%)';
      }
    }
    if (!outcomeData.summary?.trim()) {
      newErrors.summary = 'Summary is required.';
    }
    setOutcomeErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOutcome = async () => {
    if (!selectedProject || !validateOutcome()) {
      onNotify('error', 'Please fix the errors in the form.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitProjectOutcome({
        projectId: selectedProject.id,
        metricCategory: outcomeData.metricCategory as any,
        metricLabel: outcomeData.metricLabel!,
        metricValue: outcomeData.metricValue!,
        summary: outcomeData.summary!,
        submittedAt: new Date().toISOString(),
      });
      onNotify('success', 'Project outcome submitted successfully.');
      setIsOutcomeModalOpen(false);
    } catch (e) {
      onNotify('error', 'Failed to submit outcome.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">Engineer Workspace</h1>
          <p className="text-slate-400 mt-2">
            Manage your active contracts and report success metrics.
          </p>
        </div>
        <Badge color="green">Status: Active</Badge>
      </div>

      <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">
        Assigned Projects
      </h2>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700">
          <AlertCircle className="mx-auto h-12 w-12 text-slate-600 mb-4" />
          <h3 className="text-white font-bold">No Active Projects</h3>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="p-6 flex flex-col justify-between hover:border-nexus-500 transition-colors"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-white">{project.title}</h3>
                  <Badge color={project.status === 'Active' ? 'green' : 'yellow'}>
                    {project.status}
                  </Badge>
                </div>
                <p className="text-sm text-nexus-400 font-medium mb-2">
                  Client: {project.clientName}
                </p>
                <p className="text-slate-400 text-sm mb-6">{project.description}</p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock size={12} /> Started: {project.startDate}
                </span>
                {project.status === 'Active' && (
                  <Button size="sm" onClick={() => handleOpenOutcome(project)}>
                    <FileText size={16} className="mr-2" /> Report Outcome
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
          <p className="text-sm text-slate-400">
            Submit your project deliverables and structured success metrics.
          </p>

          <Select
            label="Metric Category"
            options={[
              { value: 'Performance', label: 'Performance (Latency, Speed)' },
              { value: 'Cost', label: 'Cost Reduction' },
              { value: 'Revenue', label: 'Revenue Generation' },
              { value: 'Security', label: 'Security / Compliance' },
              { value: 'User Experience', label: 'UX / Engagement' },
            ]}
            value={outcomeData.metricCategory}
            onChange={(e) =>
              setOutcomeData({
                ...outcomeData,
                metricCategory: e.target.value as any,
              })
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Metric Label"
              placeholder="e.g. API Latency"
              value={outcomeData.metricLabel}
              onChange={(e) =>
                setOutcomeData({
                  ...outcomeData,
                  metricLabel: e.target.value,
                })
              }
              error={outcomeErrors.metricLabel}
            />
            <Input
              label="Value Achieved"
              placeholder="e.g. -45ms or +20%"
              value={outcomeData.metricValue}
              onChange={(e) =>
                setOutcomeData({
                  ...outcomeData,
                  metricValue: e.target.value,
                })
              }
              error={outcomeErrors.metricValue}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Execution Summary
            </label>
            <textarea
              className={`w-full bg-slate-950 border rounded-lg p-3 text-white text-sm focus:ring-2 focus:ring-nexus-500 outline-none ${
                outcomeErrors.summary ? 'border-red-500' : 'border-slate-700'
              }`}
              rows={4}
              placeholder="Briefly describe the implementation details..."
              value={outcomeData.summary}
              onChange={(e) =>
                setOutcomeData({
                  ...outcomeData,
                  summary: e.target.value,
                })
              }
            />
            {outcomeErrors.summary && (
              <p className="mt-1 text-xs text-red-400">{outcomeErrors.summary}</p>
            )}
          </div>
          <div className="flex justify-end pt-2">
            <Button onClick={handleSubmitOutcome} isLoading={isSubmitting}>
              <Send size={16} className="mr-2" /> Submit Report
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};


