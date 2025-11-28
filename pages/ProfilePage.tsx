
import React, { useState, useRef } from 'react';
import { Card, Button, Input, Badge } from '../components/UI';
import { User } from '../types';
import { Camera, Github, Linkedin, Mail, Upload, X, FileText, Plus } from 'lucide-react';

interface ProfilePageProps {
  user: User | null;
  onUpdateUser: (data: Partial<User>) => void;
  onNotify: (t: 'success' | 'error', m: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdateUser, onNotify }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [resume, setResume] = useState<string | undefined>(user?.resume);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  if (!user) return <div>Please login</div>;

  const handleSave = () => {
    setIsEditing(false);
    onUpdateUser({ skills, resume });
    onNotify('success', 'Profile updated successfully!');
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Simulate upload
      setResume(file.name);
      onNotify('success', `Uploaded ${file.name}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
       <div className="relative mb-12">
          <div className="h-48 rounded-xl bg-gradient-to-r from-nexus-900 to-slate-800 w-full"></div>
          <div className="absolute -bottom-10 left-8 flex items-end gap-6">
             <div className="h-32 w-32 rounded-full border-4 border-slate-900 bg-slate-700 flex items-center justify-center relative group cursor-pointer">
                <span className="text-4xl font-bold text-white">{user.name.charAt(0)}</span>
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <Camera className="text-white"/>
                </div>
             </div>
             <div className="mb-2">
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <p className="text-slate-400">{user.role === 'SCHOLAR' ? 'AI Engineer' : user.role}</p>
             </div>
          </div>
          <div className="absolute bottom-4 right-8">
             {isEditing ? (
               <div className="flex gap-2">
                 <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                 <Button onClick={handleSave}>Save Changes</Button>
               </div>
             ) : (
               <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Profile</Button>
             )}
          </div>
       </div>

       <div className="grid md:grid-cols-3 gap-6 pt-4">
          <div className="md:col-span-1 space-y-6">
             <Card className="p-6">
                <h3 className="font-bold text-white mb-4">About</h3>
                {isEditing ? (
                  <textarea className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-sm focus:ring-2 focus:ring-nexus-500 outline-none" rows={4} defaultValue="Passionate AI Engineer focused on AgriTech solutions." />
                ) : (
                  <p className="text-sm text-slate-400">
                    Passionate AI Engineer focused on AgriTech solutions. Experienced in Python, TensorFlow, and React.
                  </p>
                )}
                
                <div className="mt-6 space-y-3">
                   <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Mail size={16} className="text-slate-500" /> {user.email}
                   </div>
                   <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Github size={16} className="text-slate-500" /> github.com/{user.name.split(' ')[0].toLowerCase()}
                   </div>
                   <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Linkedin size={16} className="text-slate-500" /> linkedin.com/in/{user.name.split(' ')[0].toLowerCase()}
                   </div>
                </div>
             </Card>

             {/* Resume Upload Section */}
             <Card className="p-6">
                <h3 className="font-bold text-white mb-4">Resume</h3>
                {resume ? (
                  <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700">
                    <div className="flex items-center gap-3">
                      <FileText className="text-nexus-400" size={20} />
                      <span className="text-sm text-white truncate max-w-[120px]">{resume}</span>
                    </div>
                    {isEditing && (
                      <button onClick={() => setResume(undefined)} className="text-slate-500 hover:text-red-400">
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-slate-500 italic">No resume uploaded.</div>
                )}
                
                {isEditing && (
                  <div className="mt-4">
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleFileChange}
                    />
                    <Button 
                      variant="outline" 
                      className="w-full border-dashed" 
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload size={16} className="mr-2" /> Upload Resume
                    </Button>
                  </div>
                )}
             </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
             <Card className="p-6">
                <h3 className="font-bold text-white mb-4">Personal Details</h3>
                <div className="grid grid-cols-2 gap-4">
                   <Input label="Full Name" defaultValue={user.name} disabled={!isEditing} />
                   <Input label="Email Address" defaultValue={user.email} disabled={true} />
                   <Input label="Role" defaultValue={user.role === 'SCHOLAR' ? 'AI Engineer' : user.role} disabled={true} />
                   <Input label="Location" defaultValue="Nairobi, Kenya" disabled={!isEditing} />
                </div>
             </Card>

             {/* Dynamic Skills Section */}
             <Card className="p-6">
                <h3 className="font-bold text-white mb-4">Technical Skills</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Add skills to be matched with Industry Partners (e.g., Python, Computer Vision, Fintech).
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                   {skills.map(skill => (
                      <span key={skill} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-nexus-900/40 text-nexus-300 border border-nexus-700/50">
                        {skill}
                        {isEditing && (
                          <button onClick={() => handleRemoveSkill(skill)} className="ml-1.5 hover:text-white focus:outline-none">
                            <X size={12} />
                          </button>
                        )}
                      </span>
                   ))}
                   {skills.length === 0 && !isEditing && (
                     <span className="text-slate-500 text-sm">No skills added yet.</span>
                   )}
                </div>

                {isEditing && (
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Type a skill (e.g., React)..." 
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <Button variant="secondary" onClick={handleAddSkill} disabled={!newSkill.trim()}>
                      <Plus size={16} />
                    </Button>
                  </div>
                )}
             </Card>
          </div>
       </div>
    </div>
  );
};
