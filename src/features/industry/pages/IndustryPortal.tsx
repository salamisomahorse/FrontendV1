import React, { useState } from 'react';
import { Card, Button, Badge, Input, Modal } from '@/shared/components';
import { MOCK_TALENT } from '@/core/constants';
import { Search, Star, MessageSquare, Briefcase, MapPin, Clock, PlusCircle } from 'lucide-react';
import { Job } from '@/core/models';

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior AI Engineer',
    company: 'AgriCorp Kenya',
    type: 'Full-time',
    location: 'Nairobi',
    postedDate: '2 days ago',
  },
  {
    id: '2',
    title: 'React Frontend Dev',
    company: 'FinFlow',
    type: 'Contract',
    location: 'Remote',
    postedDate: '5 hours ago',
  },
];

interface IndustryPortalProps {
  onNotify: (type: 'success' | 'error' | 'info', msg: string) => void;
  onNavigate?: (page: string) => void;
}

export const IndustryPortal: React.FC<IndustryPortalProps> = ({ onNotify, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'talent' | 'jobs'>('talent');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTalent = MOCK_TALENT.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nexus-500 to-blue-500"></div>
        <h1 className="text-3xl font-bold text-white mb-4">Find Vetted Technical Talent</h1>
        <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
          Access Africa's top 1% of engineering talent specialized in AI, Fintech, and AgriTech.
        </p>
        <div className="max-w-xl mx-auto relative z-10">
          <Search className="absolute left-3 top-3 text-slate-500" size={20} />
          <Input
            placeholder="Search by skill (e.g., Python, React, Computer Vision)..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800">
        <div className="flex">
          <button
            onClick={() => setActiveTab('talent')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'talent'
                ? 'border-nexus-500 text-nexus-500'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Browse Talent
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'jobs'
                ? 'border-nexus-500 text-nexus-500'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Job Board
          </button>
        </div>
        {activeTab === 'jobs' && onNavigate && (
          <Button size="sm" onClick={() => onNavigate('create_project')}>
            <PlusCircle size={16} className="mr-2" /> Post New Project
          </Button>
        )}
      </div>

      {activeTab === 'talent' ? (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredTalent.map((talent) => (
            <Card
              key={talent.id}
              className="p-6 flex flex-col hover:border-nexus-500 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-white">{talent.name}</h3>
                  <p className="text-sm text-nexus-400">{talent.title}</p>
                </div>
                <Badge color={talent.availability === 'Available' ? 'green' : 'yellow'}>
                  {talent.availability}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {talent.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-slate-900 rounded text-xs text-slate-300 border border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-4 border-t border-slate-700 flex justify-between items-center">
                <div className="flex items-center text-yellow-500 text-sm">
                  <Star size={16} className="fill-current mr-1" />
                  {talent.rating}
                </div>
                <Button size="sm" variant="outline">
                  View Profile
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {MOCK_JOBS.map((job) => (
            <Card
              key={job.id}
              className="p-6 flex items-center justify-between hover:bg-slate-800/80 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-slate-700 rounded-lg flex items-center justify-center">
                  <Briefcase className="text-slate-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{job.title}</h3>
                  <p className="text-nexus-400 text-sm">{job.company}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {job.postedDate}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => onNotify('info', 'Application feature coming soon!')}
              >
                Apply Now
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};


