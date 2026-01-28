import { useState } from 'react'
import CalculatorSection from './components/CalculatorSection'

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const materials = [
    { title: "謎の金属", raw1: "バルーリッチ鉱石", raw2: "バルー高純度鉱石" },
    { title: "輝光石", raw1: "アズートリッチ鉱石", raw2: "アズート高純度鉱石" },
    { title: "精錬石", raw1: "ルナーリッチ鉱石", raw2: "ルナー高純度鉱石" }
  ];

  return (
    <div className="fixed inset-0 bg-base-100 text-base-content flex flex-col overflow-hidden">
      <header className="p-4 border-b border-base-300 bg-base-200/50 backdrop-blur-md z-10">
        <h1 className="text-xl font-black text-center text-primary tracking-tight">
          BPSR Forging Calculator
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto flex flex-col items-center p-4">
        <div className="w-full max-w-xl">
          <div role="tablist" className="tabs tabs-boxed mb-4 bg-base-300">
            {materials.map((m, idx) => (
              <button
                key={idx}
                role="tab"
                className={`tab font-bold transition-all ${activeTab === idx ? 'tab-active !bg-primary !text-primary-content' : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                {m.title}
              </button>
            ))}
          </div>

          <div className="calculator-card rounded-2xl">
            <CalculatorSection
              key={activeTab}
              title={materials[activeTab].title}
              raw1Name={materials[activeTab].raw1}
              raw2Name={materials[activeTab].raw2}
            />
          </div>
        </div>
      </main>

      <footer className="p-2 text-center text-[10px] text-base-content/30 border-t border-base-300 bg-base-200/30">
        <p>&copy; 2026 BPSR Forging Calculator</p>
      </footer>
    </div>
  )
}

export default App
