
import React from 'react';
import { Button, Card, Badge } from '../components/UI';
import { ArrowRight, Cpu, Leaf, GraduationCap, HeartPulse, ShieldCheck, CheckCircle } from 'lucide-react';

export const LandingPage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-10 pb-16">
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

      {/* Comprehensive Industry Advertisement Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 border border-slate-700 relative overflow-hidden">
         {/* Decorative background element */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-nexus-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

         <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white leading-tight mb-4">
                  Strategic AI Partnerships for <br/>
                  <span className="text-nexus-400">Africa's Key Sectors</span>
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed">
                  To leaders in <strong>Fintech, AgriTech, HealthTech, and EdTech</strong>: 
                  The gap between complex industrial problems and technical execution ends here. 
                  Somahorse Nexus is your pipeline to top-tier AI Engineers capable of deploying 
                  robust, scalable solutions tailored to the African context.
                </p>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start text-slate-400">
                  <CheckCircle className="w-6 h-6 text-nexus-500 mr-3 flex-shrink-0" />
                  <span>Access rigorously vetted engineering talent specialized in your domain.</span>
                </li>
                 <li className="flex items-start text-slate-400">
                  <CheckCircle className="w-6 h-6 text-nexus-500 mr-3 flex-shrink-0" />
                  <span>Deploy custom models for credit risk, crop yield, and diagnostics.</span>
                </li>
                 <li className="flex items-start text-slate-400">
                  <CheckCircle className="w-6 h-6 text-nexus-500 mr-3 flex-shrink-0" />
                  <span>Accelerate innovation with outcome-driven project tracking.</span>
                </li>
              </ul>
              
              <div className="pt-2">
                <Button size="lg" variant="primary" onClick={() => onNavigate('industry')}>
                  Explore Engineering Talent
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
            
            {/* Visual Representation of Sectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Card className="p-5 border-slate-700 bg-slate-900/60 hover:bg-slate-800 transition-colors">
                  <Cpu className="text-blue-400 mb-3" size={32} />
                  <h3 className="font-bold text-white text-lg">Fintech</h3>
                  <p className="text-sm text-slate-400 mt-2">Integrate fraud detection & algorithmic credit scoring.</p>
               </Card>
               <Card className="p-5 border-slate-700 bg-slate-900/60 hover:bg-slate-800 transition-colors">
                  <Leaf className="text-green-400 mb-3" size={32} />
                  <h3 className="font-bold text-white text-lg">AgriTech</h3>
                  <p className="text-sm text-slate-400 mt-2">Deploy computer vision for crop health & yield analysis.</p>
               </Card>
               <Card className="p-5 border-slate-700 bg-slate-900/60 hover:bg-slate-800 transition-colors">
                  <HeartPulse className="text-red-400 mb-3" size={32} />
                  <h3 className="font-bold text-white text-lg">HealthTech</h3>
                  <p className="text-sm text-slate-400 mt-2">Secure patient data analytics & remote diagnostics.</p>
               </Card>
               <Card className="p-5 border-slate-700 bg-slate-900/60 hover:bg-slate-800 transition-colors">
                  <GraduationCap className="text-yellow-400 mb-3" size={32} />
                  <h3 className="font-bold text-white text-lg">EdTech</h3>
                  <p className="text-sm text-slate-400 mt-2">Build adaptive learning engines & personalized tutoring.</p>
               </Card>
            </div>
         </div>
      </section>

      {/* Sectors / Features List (Simplified) */}
      <section className="grid md:grid-cols-4 gap-6">
        {[
          { title: 'Vetted Talent', icon: ShieldCheck, desc: 'Top 1% of engineers passed rigorous technical assessments.' },
          { title: 'Rapid Deployment', icon: Cpu, desc: 'From problem statement to MVP in record time.' },
          { title: 'Data Integrity', icon: ShieldCheck, desc: 'Enterprise-grade security and audit trails.' },
          { title: 'Scalable Teams', icon: GraduationCap, desc: 'Expand your engineering capacity on demand.' },
        ].map((s) => (
          <Card key={s.title} className="p-6 hover:border-nexus-500 transition-colors group cursor-pointer text-center">
            <div className="flex justify-center">
               <s.icon className="w-10 h-10 text-nexus-500 mb-4 group-hover:scale-110 transition-transform" />
            </div>
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
