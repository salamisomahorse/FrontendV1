
import React, { useState, useEffect } from 'react';
import { Card, Badge, Skeleton } from '../components/UI';
import { FraudAlert } from '../types';
import { getFraudAlerts } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, ShieldCheck, Clock } from 'lucide-react';

const alertData = [
  { name: 'Mon', alerts: 4 },
  { name: 'Tue', alerts: 3 },
  { name: 'Wed', alerts: 5 },
  { name: 'Thu', alerts: 2 },
  { name: 'Fri', alerts: 7 },
  { name: 'Sat', alerts: 1 },
  { name: 'Sun', alerts: 3 },
];

const severityColors = {
  High: 'red',
  Medium: 'yellow',
  Low: 'blue',
};

export const FraudDashboard: React.FC<{ onNotify: (t: 'success'|'error', m: string) => void }> = ({ onNotify }) => {
  const [alerts, setAlerts] = useState<FraudAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await getFraudAlerts();
        setAlerts(data);
      } catch (e) {
        onNotify('error', 'Failed to load fraud alerts.');
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, [onNotify]);

  const highSeverityAlerts = alerts.filter(a => a.severity === 'High').length;
  const totalAlerts = alerts.length;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Fraud Detection Center</h1>
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
               <ShieldCheck className="text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Alerts (24h)</p>
              <p className="text-2xl font-bold text-white">{loading ? '...' : totalAlerts}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-red-500/10 flex items-center justify-center">
               <AlertTriangle className="text-red-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-400">High Severity Alerts</p>
              <p className="text-2xl font-bold text-white">{loading ? '...' : highSeverityAlerts}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
               <Clock className="text-yellow-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-400">Avg. Response Time</p>
              <p className="text-2xl font-bold text-white">15 mins</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Alerts Table */}
        <Card className="p-0 flex flex-col h-[26rem]">
          <h3 className="text-lg font-bold text-white p-6 border-b border-slate-800 flex-shrink-0">Recent Alerts</h3>
          <div className="flex-grow overflow-y-auto">
            {loading ? (
              <div className="p-6 space-y-4">
                 {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                 <tbody className="divide-y divide-slate-800">
                   {alerts.map(alert => (
                     <tr key={alert.id} className="hover:bg-slate-800/50">
                       <td className="p-4">
                          <Badge color={severityColors[alert.severity] as 'red'|'yellow'|'blue'}>{alert.severity}</Badge>
                       </td>
                       <td className="p-4 text-slate-300">{alert.description}</td>
                       <td className="p-4 text-slate-500 text-xs text-right whitespace-nowrap">{alert.timestamp}</td>
                     </tr>
                   ))}
                 </tbody>
              </table>
            )}
          </div>
        </Card>
        
        {/* Alert Trend Chart */}
        <Card className="p-6 h-[26rem]">
          <h3 className="text-lg font-bold text-white mb-4">Alerts This Week</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={alertData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff' }}
                cursor={{fill: 'rgba(100, 116, 139, 0.1)'}}
              />
              <Bar dataKey="alerts" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};
