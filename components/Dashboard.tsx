
import React from 'react';
import { FinancialResult } from '../types';
import Card from './ui/Card';

interface DashboardProps {
  results: FinancialResult;
}

const StatCard: React.FC<{ icon: string; label: string; value: string; color: string; tooltip: string }> = ({ icon, label, value, color, tooltip }) => (
    <div className="relative group bg-light-gray p-4 rounded-lg flex items-center space-x-4">
        <div className={`text-2xl ${color}`}>
            <i className={`fas ${icon}`}></i>
        </div>
        <div>
            <p className="text-sm text-gray-600">{label}</p>
            <p className="text-xl font-bold text-dark-gray">{value}</p>
        </div>
        <div className="absolute bottom-full mb-2 w-max px-2 py-1 bg-dark-gray text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {tooltip}
        </div>
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ results }) => {
  const { netProfitMonth, totalRiderPayMonth, platformGrossProfitMonth } = results;
  const restaurantSavings = results.totalRevenueMonth * (0.25 - 0.12); // Assuming 25% competitor commission
  
  const healthStatus = netProfitMonth > 0 ? 'bg-green-500' : (netProfitMonth > -5000 ? 'bg-yellow-500' : 'bg-red-500');
  const healthText = netProfitMonth > 0 ? 'Rentable' : (netProfitMonth > -5000 ? 'Cerca del Equilibrio' : 'Generando Pérdidas');

  return (
    <Card className="col-span-1 lg:col-span-2">
       <div className="flex justify-between items-start mb-4">
        <div>
           <h2 className="text-xl font-bold text-bcp-blue flex items-center">
            <i className="fas fa-chart-line mr-3 text-bcp-teal"></i>
            Resumen del Ecosistema (Mensual)
           </h2>
            <p className="text-sm text-gray-500">Impacto financiero en tiempo real basado en los ajustes del simulador.</p>
        </div>
        <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 text-sm font-semibold text-white rounded-full ${healthStatus}`}>{healthText}</span>
            <div className="relative group">
                <i className="fas fa-info-circle text-gray-400 cursor-pointer"></i>
                 <div className="absolute bottom-full right-0 mb-2 w-max px-2 py-1 bg-dark-gray text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Viabilidad financiera del escenario actual.
                </div>
            </div>
        </div>
       </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <StatCard 
            icon="fa-wallet" 
            label="Beneficio Neto Plataforma" 
            value={`£${netProfitMonth.toLocaleString('es-ES', { maximumFractionDigits: 0 })}`} 
            color={netProfitMonth >= 0 ? 'text-green-500' : 'text-red-500'}
            tooltip="Beneficio bruto de la plataforma menos todos los costos operativos."
        />
        <StatCard 
            icon="fa-motorcycle" 
            label="Ganancias Totales Repartidores" 
            value={`£${totalRiderPayMonth.toLocaleString('es-ES', { maximumFractionDigits: 0 })}`} 
            color="text-blue-500"
            tooltip="Cantidad total pagada a todos los repartidores por las entregas."
        />
        <StatCard 
            icon="fa-store" 
            label="Ahorro para Restaurantes" 
            value={`£${restaurantSavings.toLocaleString('es-ES', { maximumFractionDigits: 0 })}`} 
            color="text-purple-500"
            tooltip="Ahorro estimado para restaurantes en comparación con una plataforma de comisión del 25%."
        />
        <StatCard 
            icon="fa-hand-holding-dollar" 
            label="Beneficio Bruto Plataforma" 
            value={`£${platformGrossProfitMonth.toLocaleString('es-ES', { maximumFractionDigits: 0 })}`} 
            color="text-orange-500"
            tooltip="Ingresos de la plataforma (10% del valor del pedido) antes de costos."
        />
      </div>
    </Card>
  );
};

export default Dashboard;
