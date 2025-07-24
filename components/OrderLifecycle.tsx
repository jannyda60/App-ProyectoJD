
import React from 'react';
import Card from './ui/Card';
import { FinancialResult, SimulationInput } from '../types';

interface OrderLifecycleProps {
  results: FinancialResult;
  input: SimulationInput;
}

const ActorCard: React.FC<{ icon: string; name: string; amount: string; description: string; color: string }> = ({ icon, name, amount, description, color }) => (
    <div className={`border-l-4 ${color} bg-white p-4 rounded-r-lg shadow-sm`}>
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <i className={`fas ${icon} text-xl w-8 text-center mr-3 ${color.replace('border', 'text')}`}></i>
                <span className="font-bold text-lg text-gray-800">{name}</span>
            </div>
            <span className="font-extrabold text-xl text-gray-900">{amount}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2 pl-11">{description}</p>
    </div>
);

const OrderLifecycle: React.FC<OrderLifecycleProps> = ({ results, input }) => {
  const { 
    customerTotalPerOrder, 
    restaurantReceivesPerOrder, 
    targetPayPerOrder, 
    platformReceivesPerOrder,
    restaurantContributionPerOrder,
    serviceFeePerOrder,
    deliveryFeePerOrder
  } = results;

  return (
    <Card>
      <h2 className="text-xl font-bold text-bcp-blue mb-2 flex items-center">
        <i className="fas fa-receipt mr-3 text-bcp-teal"></i>
        El Ciclo de Vida de un Pedido
      </h2>
      <p className="text-sm text-gray-500 mb-6">Un desglose paso a paso de un único pedido promedio.</p>

      <div className="space-y-4">
        {/* Step 1: The Customer */}
        <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 bg-bcp-blue text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">1</div>
            <div className="w-full">
                <ActorCard 
                    icon="fa-user"
                    name="Cliente Paga"
                    amount={`£${customerTotalPerOrder.toFixed(2)}`}
                    description={`Pedido (£${input.avgOrderValue.toFixed(2)}) + Tarifa Servicio (£${serviceFeePerOrder.toFixed(2)}) + Envío (£${deliveryFeePerOrder.toFixed(2)})`}
                    color="border-blue-500"
                />
            </div>
        </div>

        {/* Arrow Connector */}
        <div className="pl-5">
            <i className="fas fa-arrow-down text-gray-300 text-2xl ml-px"></i>
        </div>

        {/* Step 2: The Money Distribution */}
        <div className="flex items-start space-x-4">
             <div className="flex-shrink-0 bg-bcp-blue text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">2</div>
             <div className="w-full space-y-4">
                <h3 className="font-bold text-gray-700">El dinero se distribuye instantáneamente:</h3>
                <ActorCard 
                    icon="fa-store"
                    name="Restaurante Recibe"
                    amount={`£${restaurantReceivesPerOrder.toFixed(2)}`}
                    description={`Valor del pedido (£${input.avgOrderValue.toFixed(2)}) menos la comisión total del 12%.`}
                    color="border-purple-500"
                />
                 <ActorCard 
                    icon="fa-motorcycle"
                    name="Repartidor Gana"
                    amount={`£${targetPayPerOrder.toFixed(2)}`}
                    description={`Parte restaurante (£${restaurantContributionPerOrder.toFixed(2)}) + Tarifa Servicio (£${serviceFeePerOrder.toFixed(2)}) + Tarifa Envío (£${deliveryFeePerOrder.toFixed(2)})`}
                    color="border-green-500"
                />
                 <ActorCard 
                    icon="fa-building-columns"
                    name="Plataforma Recibe"
                    amount={`£${platformReceivesPerOrder.toFixed(2)}`}
                    description={`10% del valor original del pedido. Este es el ingreso bruto de la plataforma.`}
                    color="border-orange-500"
                />
             </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderLifecycle;
