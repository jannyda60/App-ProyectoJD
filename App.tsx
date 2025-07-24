
import React, { useState, useMemo } from 'react';
import { SimulationInput, FinancialResult } from './types';
import financialModel from './services/financialModel';
import Simulator from './components/Simulator';
import Dashboard from './components/Dashboard';
import FinancialCharts from './components/FinancialCharts';
import OrderLifecycle from './components/OrderLifecycle';
import AiAdvisor from './components/AiAdvisor';

const App: React.FC = () => {
  const [input, setInput] = useState<SimulationInput>({
    ordersPerDay: 150,
    avgOrderValue: 25,
    avgDistance: 2.7,
    leaderIncentives: 500,
  });

  const results: FinancialResult = useMemo(() => financialModel.calculate(input), [input]);

  return (
    <div className="min-h-screen bg-light-gray text-dark-gray p-4 lg:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-bcp-blue">
          BCP Local Delivery <span className="text-bcp-teal">Panel Interactivo</span>
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Una simulación dinámica de nuestro modelo de reparto centrado en la comunidad.
        </p>
      </header>

      <main className="space-y-8">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Simulator input={input} setInput={setInput} />
            </div>
            <div className="lg:col-span-2">
                <Dashboard results={results} />
            </div>
        </section>

        <section>
          <FinancialCharts results={results} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <OrderLifecycle results={results} input={input} />
            <AiAdvisor results={results} input={input} />
        </section>

      </main>

       <footer className="text-center mt-12 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} BCP Local Delivery Ltd. & DUKTV. Una nueva visión para un reparto sostenible, justo y cívico.</p>
        </footer>
    </div>
  );
};

export default App;
