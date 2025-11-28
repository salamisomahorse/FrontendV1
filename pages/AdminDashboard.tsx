import React from 'react';
import { Card, Badge } from '../components/UI';
import { ADMIN_STATS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Jan', engineers: 400, placed: 240 },
  { name: 'Feb', engineers: 300, placed: 139 },
  { name: 'Mar', engineers: 200, placed: 980 },
  { name: 'Apr', engineers: 278, placed: 390 },
  { name: 'May', engineers: 189, placed: 480 },
  { name: 'Jun', engineers: 239, placed: 380 },
  { name: 'Jul', engineers: 349, placed: 430 },
];

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

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 h-80">
          <h3 className="text-lg font-bold text-white mb-4">Engineer Enrollment vs Placements</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff' }}
              />
              <Bar dataKey="engineers" fill="#10b981" />
              <Bar dataKey="placed" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 h-80">
          <h3 className="text-lg font-bold text-white mb-4">Platform Growth</h3>
           <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                 contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff' }}
              />
              <Line type="monotone" dataKey="engineers" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Applications */}
      <Card className="p-6 overflow-hidden">
        <h3 className="text-lg font-bold text-white mb-4">Recent Scholar Applications</h3>
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