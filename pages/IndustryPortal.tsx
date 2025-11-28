import React, { useState } from 'react';
import { Card, Button, Badge, Input, Modal, Select } from '../components/UI';
import { MOCK_TALENT } from '../constants';
import { Search, Star, MessageSquare, Briefcase, MapPin, Clock } from 'lucide-react';
import { Job } from '../types';

const MOCK_JOBS: Job[] = [
  { id: '1', title: 'Senior AI Engineer', company: 'AgriCorp Kenya', type: 'Full-time', location: 'Nairobi', postedDate: '2 days ago' },
  { id: '2', title: 'React Frontend Dev', company: 'FinFlow', type: 'Contract', location: 'Remote', postedDate: '5 hours ago' },
  { id: '3', title: 'Data Scientist', company: 'MediHealth', type: 'Full-time', location: 'Lagos', postedDate: '1 week ago' },
];

export const IndustryPortal: React.FC<{ onNotify: (type: 'success'|'error', msg: string) => void }> = ({ onNotify }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'talent' | 'jobs'>('talent');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestDetails, setRequestDetails] = useState('');
  
  const filteredTalent = MOCK_TALENT.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleRequestSubmit = () => {
    if (!requestDetails) {
      onNotify('error', 'Please describe your problem.');
      return;
    }
    // Simulate API call
    setTimeout(() => {
      setIsModalOpen(false);
      setRequestDetails('');
      onNotify('success', 'Your request has been submitted to the Nexus team!');
    }, 1000);
  };

  return (
    <div className="space-y-8">
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
      <div className="flex border-b border-slate-800">
        <button 
          onClick={() => setActiveTab('talent')}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'talent' ? 'border-nexus-500 text-nexus-500' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Browse Talent
        </button>
        <button 
          onClick={() => setActiveTab('jobs')}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'jobs' ? 'border-nexus-500 text-nexus-500' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Job Board
        </button>
      </div>

      {activeTab === 'talent' ? (
        <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
          {filteredTalent.length > 0 ? (
            filteredTalent.map(talent => (
              <Card key={talent.id} className="p-6 flex flex-col hover:border-nexus-500 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-xl font-bold text-white">
                      {talent.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{talent.name}</h3>
                      <p className="text-sm text-nexus-400">{talent.title}</p>
                    </div>
                  </div>
                  {talent.availability === 'Available' ? (
                    <Badge color="green">Available</Badge>
                  ) : (
                    <Badge color="yellow">Contracted</Badge>
                  )}
                </div>
                
                <div className="mb-4">
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {talent.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-slate-900 rounded text-xs text-slate-300 border border-slate-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-700 flex justify-between items-center">
                  <div className="flex items-center text-yellow-500 text-sm">
                    <Star size={16} className="fill-current mr-1" />
                    {talent.rating}
                  </div>
                  <Button size="sm" variant="outline">View Profile</Button>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-20">
               <p className="text-slate-500">No engineers found matching that skill.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
           {MOCK_JOBS.map(job => (
             <Card key={job.id} className="p-6 flex items-center justify-between hover:bg-slate-800/80 transition-colors">
                <div className="flex items-start gap-4">
                   <div className="h-12 w-12 bg-slate-700 rounded-lg flex items-center justify-center">
                      <Briefcase className="text-slate-400" />
                   </div>
                   <div>
                     <h3 className="text-lg font-bold text-white">{job.title}</h3>
                     <p className="text-nexus-400 text-sm">{job.company}</p>
                     <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><MapPin size={12}/> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock size={12}/> {job.postedDate}</span>
                        <span className="bg-slate-900 px-2 py-0.5 rounded text-slate-300">{job.type}</span>
                     </div>
                   </div>
                </div>
                <Button variant="outline" onClick={() => onNotify('info', 'Application feature coming soon!')}>Apply Now</Button>
             </Card>
           ))}
        </div>
      )}

      {/* Request Solution CTA */}
      <Card className="p-8 bg-gradient-to-r from-slate-800 to-slate-900 border-nexus-900 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Have a Complex Problem?</h2>
            <p className="text-slate-400">Submit a problem statement and let our AI Solutions Lab architect and build a custom tool for you.</p>
          </div>
          <Button size="lg" className="whitespace-nowrap" onClick={() => setIsModalOpen(true)}>
            <MessageSquare className="mr-2 w-5 h-5" /> Request Solution
          </Button>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Request AI Solution">
        <div className="space-y-4">
          <p className="text-sm text-slate-400">
             Describe the industry challenge you are facing. Our team of engineers will review it and propose an AI-driven solution.
          </p>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Problem Statement</label>
            <textarea 
               className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-nexus-500 outline-none"
               rows={5}
               value={requestDetails}
               onChange={(e) => setRequestDetails(e.target.value)}
               placeholder="e.g., We need to automate credit scoring for unbanked farmers..."
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleRequestSubmit}>Submit Request</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
