
import React from 'react';
import { Button, Card, Badge } from '../components/UI';
import { ArrowRight, Cpu, Leaf, GraduationCap, HeartPulse, ShieldCheck, Database, Server } from 'lucide-react';

export const LandingPage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-10 pb-16">
        <Badge color="blue">MVP Phase: The Bridge</Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          The Innovative Platform for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-400 to-blue-500">
            Industrial AI Solutions
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-400">
          Somahorse Nexus connects African industries (Fintech, AgriTech, HealthTech) with vetted AI Engineering talent.
          We provide the infrastructure for secure talent onboarding and project outcome tracking.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" onClick={() => onNavigate('signup')}>Join as Engineer</Button>
          <Button size="lg" variant="outline" onClick={() => onNavigate('industry')}>
            <ShieldCheck className="w-4 h-4 mr-2" />
            Find Talent
          </Button>
        </div>
      </section>

      {/* Value Prop / Tech Stack Info */}
      <section className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
         <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Powered by Robust Infrastructure</h2>
              <p className="text-slate-400 mb-6">
                 Our platform ensures data integrity and scalable matching using a modern stack designed for the future of African tech.
              </p>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2 text-slate-300 bg-slate-900 px-4 py-2 rounded-lg border border-slate-700">
                    <Database size={18} className="text-nexus-400"/> PostgreSQL
                 </div>
                 <div className="flex items-center gap-2 text-slate-300 bg-slate-900 px-4 py-2 rounded-lg border border-slate-700">
                    <Server size={18} className="text-nexus-400"/> FastAPI (Python)
                 </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <Card className="p-4 bg-slate-900">
                  <h3 className="text-nexus-400 font-bold mb-1">Mission 1</h3>
                  <p className="text-white font-medium">Secure Talent Sign-Up</p>
                  <p className="text-xs text-slate-500 mt-2">Vetted onboarding protocol.</p>
               </Card>
               <Card className="p-4 bg-slate-900">
                  <h3 className="text-nexus-400 font-bold mb-1">Mission 2</h3>
                  <p className="text-white font-medium">Outcome Tracking</p>
                  <p className="text-xs text-slate-500 mt-2">Metric-driven project success.</p>
               </Card>
            </div>
         </div>
      </section>

      {/* Sectors */}
      <section className="grid md:grid-cols-4 gap-6">
        {[
          { title: 'Fintech', icon: Cpu, desc: 'Secure digital banking & credit risk AI.' },
          { title: 'AgriTech', icon: Leaf, desc: 'Crop yield prediction & disease scanning.' },
          { title: 'HealthTech', icon: HeartPulse, desc: 'Remote diagnostics & patient analytics.' },
          { title: 'EdTech', icon: GraduationCap, desc: 'Personalized AI tutoring systems.' },
        ].map((s) => (
          <Card key={s.title} className="p-6 hover:border-nexus-500 transition-colors group cursor-pointer">
            <s.icon className="w-10 h-10 text-nexus-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
            <p className="text-slate-400 text-sm">{s.desc}</p>
          </Card>
        ))}
      </section>

      <section className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to Architect the Future?</h2>
        <Button size="lg" onClick={() => onNavigate('signup')}>Create Engineer Account</Button>
      </section>
    </div>
  );
};
