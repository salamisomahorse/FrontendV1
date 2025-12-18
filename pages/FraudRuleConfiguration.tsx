
import React, { useState, useEffect } from 'react';
import { Card, ToggleSwitch, Skeleton } from '../components/UI';
import { FraudRule } from '../types';
import { getFraudRules, updateFraudRule } from '../services/api';

export const FraudRuleConfiguration: React.FC<{ onNotify: (t: 'success'|'error', m: string) => void }> = ({ onNotify }) => {
  const [rules, setRules] = useState<FraudRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingRuleId, setUpdatingRuleId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const data = await getFraudRules();
        setRules(data);
      } catch (e) {
        onNotify('error', 'Failed to load fraud rules.');
      } finally {
        setLoading(false);
      }
    };
    fetchRules();
  }, [onNotify]);

  const handleToggleRule = async (ruleId: string, isEnabled: boolean) => {
    setUpdatingRuleId(ruleId);
    try {
      await updateFraudRule(ruleId, { isEnabled });
      setRules(prevRules => prevRules.map(r => r.id === ruleId ? { ...r, isEnabled } : r));
      onNotify('success', `Rule ${isEnabled ? 'enabled' : 'disabled'} successfully.`);
    } catch (e) {
      onNotify('error', 'Failed to update rule.');
    } finally {
      setUpdatingRuleId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white">Rule Configuration</h1>
        <p className="text-slate-400 mt-2">Enable or disable automated fraud detection rules for the platform.</p>
      </div>

      <Card className="p-0">
        <div className="overflow-hidden">
          {loading ? (
             <div className="p-6 space-y-4">
               {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
             </div>
          ) : (
            <ul className="divide-y divide-slate-700">
              {rules.map(rule => (
                <li key={rule.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-800/50">
                  <div>
                    <h3 className={`font-bold text-lg ${rule.isEnabled ? 'text-white' : 'text-slate-500'}`}>{rule.name}</h3>
                    <p className="text-sm text-slate-400 mt-1">{rule.description}</p>
                  </div>
                  <ToggleSwitch
                    enabled={rule.isEnabled}
                    onChange={(enabled) => handleToggleRule(rule.id, enabled)}
                    isLoading={updatingRuleId === rule.id}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>
    </div>
  );
};
