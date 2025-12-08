
import React from 'react';
import { Card, Badge } from '../components/UI';
import { ADMIN_STATS, MOCK_ACTIVITY_FEED } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Briefcase, UserPlus, CheckCircle, FileText } from 'lucide-react';

const data = [
  { name: 'Jan', talent: 400, placed: 240 },
  { name: 'Feb', talent: 300, placed: 139 },
  { name: 'Mar', talent: 200, placed: 980 },
  { name: 'Apr', talent: 278, placed: 390 },
  { name: 'May', talent: 189, placed: 480 },
  { name: 'Jun', talent: 239, placed: 380 },
  { name: 'Jul', talent: 349, placed: 430 },
];

const activityIcons = {
  PROJECT_CREATED: <Briefcase size={16} className="text-blue-400" />,
  TALENT_ONBOARDED: <UserPlus size={16} className="text-green-400" />,
  OUTCOME_SUBMITTED: <FileText size={16} className="text-yellow-400" />,
  MATCH_CONFIRMED: <CheckCircle size={16} className="text-nexus-400" />,
};

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Platform Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ADMIN_STATS.map((stat, idx) => (
          <Card key={idx} className="p-5">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-400' : 'text-slate-400'}`}>
                {stat.percentage}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Charts */}
          <Card className="p-6 h-80">
            <h3 className="text-lg font-bold text-white mb-4">Talent Enrollment vs Placements</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff' }}
                />
                <Bar dataKey="talent" fill="#10b981" />
                <Bar dataKey="placed" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
        
        {/* Live Transaction Feed */}
        <Card className="p-0 flex flex-col h-[22rem] md:h-auto">
          <h3 className="text-lg font-bold text-white p-6 border-b border-slate-800 flex-shrink-0">Live Transaction Feed</h3>
          <div className="flex-grow overflow-y-auto">
            <ul className="divide-y divide-slate-800">
              {MOCK_ACTIVITY_FEED.map(item => (
                <li key={item.id} className="p-4 flex items-start gap-3 hover:bg-slate-800/50">
                  <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                    {activityIcons[item.type]}
                  </div>
                  <div>
                    <p className="text-sm text-slate-300">
                      <span className="font-bold text-white">{item.actor}</span> {item.description}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{item.timestamp}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      {/* Recent Applications */}
      <Card className="p-6 overflow-hidden">
        <h3 className="text-lg font-bold text-white mb-4">Recent Talent Applications</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="text-xs uppercase bg-slate-900 text-slate-300">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Name</th>
                <th className="px-4 py-3">Track</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-r-lg">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {[1, 2, 3, 4].map((i) => (
                <tr key={i} className="hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-medium text-white">Candidate Name {i}</td>
                  <td className="px-4 py-3">Fintech Engineering</td>
                  <td className="px-4 py-3"><Badge color="yellow">Pending</Badge></td>
                  <td className="px-4 py-3">Oct 24, 2024</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
