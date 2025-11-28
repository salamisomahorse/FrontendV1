import React, { useState } from 'react';
import { Button, Card, Select } from '../components/UI';
import { Play, Save, ChevronLeft, Download, RefreshCw, BookOpen } from 'lucide-react';

export const CodeSandbox: React.FC<{ onBack: () => void; onNotify: (t: 'success'|'error', m: string) => void }> = ({ onBack, onNotify }) => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(`# Python 3.10 Environment
def calculate_loan_risk(income, credit_score, loan_amount):
    """
    Calculate risk score (0-100) for unbanked users.
    """
    base_risk = 50
    
    # TODO: Implement logic here
    
    return base_risk

# Test Case
print(calculate_loan_risk(5000, 600, 1000))
`);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setLanguage(lang);
    if (lang === 'python') {
      setCode(`# Python 3.10 Environment\nprint("Hello from Python")`);
    } else {
      setCode(`// Node.js Environment\nconsole.log("Hello from Javascript");`);
    }
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput("Compiling...");
    
    // Simulate network latency/processing
    setTimeout(() => {
      setIsRunning(false);
      if (Math.random() > 0.8) {
         setOutput(`Error: SyntaxError: unexpected token 'return'\n    at line 8`);
         onNotify('error', 'Execution failed with errors');
      } else {
         setOutput(`Running tests...\n> Test 1 Passed\n> Test 2 Failed: Expected 45, got 50\n\nExecution finished in 0.2s`);
         onNotify('success', 'Code executed successfully');
      }
    }, 1200);
  };

  const handleSave = () => {
    onNotify('success', 'Project saved to cloud!');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
             <ChevronLeft size={16} /> Back
          </Button>
          <div className="flex flex-col">
             <h2 className="text-xl font-bold text-white leading-none">Loan Risk Algorithm</h2>
             <span className="text-xs text-slate-500">Last edited 2 mins ago</span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-40">
            <Select 
               options={[
                 { value: 'python', label: 'Python 3.10' },
                 { value: 'javascript', label: 'Node.js 18' }
               ]}
               value={language}
               onChange={handleLanguageChange}
            />
          </div>
          <Button variant="secondary" size="sm" onClick={handleSave}><Save size={16} className="mr-2"/> Save</Button>
          <Button variant="primary" size="sm" onClick={runCode} isLoading={isRunning}><Play size={16} className="mr-2"/> Run</Button>
        </div>
      </div>

      <div className="flex-grow grid md:grid-cols-2 gap-4 h-full">
        {/* Editor */}
        <Card className="flex flex-col border-slate-700 bg-slate-950">
          <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 text-xs text-slate-400 font-mono flex justify-between">
            <span>main.{language === 'python' ? 'py' : 'js'}</span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-white"><Download size={12}/> Download</span>
          </div>
          <textarea 
            className="flex-grow bg-slate-950 text-slate-300 font-mono p-4 resize-none focus:outline-none text-sm leading-6"
            value={code}
            spellCheck={false}
            onChange={(e) => setCode(e.target.value)}
          />
        </Card>

        {/* Output & Instructions */}
        <div className="flex flex-col gap-4">
          <Card className="flex-1 p-6 overflow-y-auto">
            <h3 className="font-bold text-white mb-2 flex items-center gap-2"><BookOpen size={16}/> Instructions</h3>
            <p className="text-sm text-slate-400 mb-4">
              Your task is to implement a basic risk scoring function for a micro-finance application.
              <br/><br/>
              1. If credit_score &gt; 700, decrease risk by 20.
              <br/>
              2. If loan_amount is &gt; 50% of annual income, increase risk by 30.
            </p>
            <div className="bg-slate-900 p-3 rounded border border-slate-800 text-xs text-slate-400 font-mono">
               Input: 5000, 600, 1000<br/>
               Expected Output: 50
            </div>
          </Card>
          <Card className="flex-1 flex flex-col bg-slate-900 border-slate-700">
             <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 text-xs text-slate-400 font-mono flex justify-between">
                <span>Terminal Output</span>
                <span className="cursor-pointer hover:text-white" onClick={() => setOutput('')}><RefreshCw size={12}/> Clear</span>
             </div>
             <pre className="p-4 text-green-400 font-mono text-xs flex-grow font-medium">
               {isRunning ? <span className="animate-pulse">_</span> : output}
             </pre>
          </Card>
        </div>
      </div>
    </div>
  );
};