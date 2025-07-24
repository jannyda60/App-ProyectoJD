
import React from 'react';
import { FinancialResult } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Card from './ui/Card';

interface FinancialChartsProps {
  results: FinancialResult;
}

const FinancialCharts: React.FC<FinancialChartsProps> = ({ results }) => {
  const { 
    platformGrossProfitMonth, 
    totalOperatingCostMonth, 
    netProfitMonth, 
    stripeCostMonth, 
    techCostMonth, 
    googleApiCostMonth,
    leaderIncentivesMonth,
    duktvDividendMonth,
    bcpCouncilDividendMonth,
  } = results;

  const revenueData = [
    { name: 'Rentabilidad', 'Beneficio Bruto': platformGrossProfitMonth, 'Costos Operativos': totalOperatingCostMonth, 'Beneficio Neto': netProfitMonth },
  ];
  
  const costData = [
    { name: 'Stripe', value: stripeCostMonth },
    { name: 'Tecnología Plataforma', value: techCostMonth },
    { name: 'API de Google', value: googleApiCostMonth.netCost },
    { name: 'Incentivos Líderes', value: leaderIncentivesMonth },
  ].filter(d => d.value > 0);

  const dividendData = [
    { name: 'DUKTV (60%)', value: duktvDividendMonth },
    { name: 'BCP Council (40%)', value: bcpCouncilDividendMonth },
  ].filter(d => d.value > 0);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const DIVIDEND_COLORS = ['#003366', '#00A79D'];
  
  const breakEvenData = [];
  if (results.breakEvenMonth) {
    let cumulativeProfit = - (totalOperatingCostMonth * results.breakEvenMonth); // Start from the total loss at break-even
    for(let i=1; i <= Math.min(36, results.breakEvenMonth + 6); i++) {
        cumulativeProfit += netProfitMonth;
        breakEvenData.push({ month: `Mes ${i}`, profit: cumulativeProfit });
    }
  }


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <h3 className="text-lg font-bold text-bcp-blue mb-4">Rentabilidad Mensual</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `£${(value/1000).toFixed(0)}k`} />
            <Tooltip formatter={(value: number) => `£${value.toLocaleString('es-ES', {maximumFractionDigits: 0})}`} />
            <Legend />
            <Bar dataKey="Beneficio Bruto" fill="#82ca9d" />
            <Bar dataKey="Costos Operativos" fill="#ff8042" />
            <Bar dataKey="Beneficio Neto" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      
      <Card>
        <h3 className="text-lg font-bold text-bcp-blue mb-4">Desglose de Costos Operativos</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={costData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {costData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip formatter={(value: number) => `£${value.toLocaleString('es-ES', {maximumFractionDigits: 0})}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>

    {netProfitMonth > 0 && (
      <>
        <Card>
          <h3 className="text-lg font-bold text-bcp-blue mb-4">Punto de Equilibrio Proyectado</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={breakEvenData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `£${(value/1000).toFixed(0)}k`} />
              <Tooltip formatter={(value: number) => `£${value.toLocaleString('es-ES', {maximumFractionDigits: 0})}`} />
              <Legend />
              <Line type="monotone" dataKey="profit" name="Beneficio Acumulado" stroke="#8884d8" strokeWidth={2} />
               <Line type="monotone" dataKey={() => 0} name="Punto de Equilibrio" stroke="#ff0000" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-lg font-bold text-bcp-blue mb-4">Distribución Mensual de Dividendos</h3>
           <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={dividendData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                    {dividendData.map((entry, index) => <Cell key={`cell-${index}`} fill={DIVIDEND_COLORS[index % DIVIDEND_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(value: number) => `£${value.toLocaleString('es-ES', {maximumFractionDigits: 0})}`} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
        </Card>
        </>
    )}

    </div>
  );
};

export default FinancialCharts;
