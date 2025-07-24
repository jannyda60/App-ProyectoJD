
import React from 'react';
import Card from './ui/Card';
import Slider from './ui/Slider';
import { SimulationInput } from '../types';

interface SimulatorProps {
  input: SimulationInput;
  setInput: React.Dispatch<React.SetStateAction<SimulationInput>>;
}

const Simulator: React.FC<SimulatorProps> = ({ input, setInput }) => {
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof SimulationInput) => {
    setInput(prev => ({ ...prev, [key]: parseFloat(e.target.value) }));
  };

  return (
    <Card className="h-full">
      <h2 className="text-xl font-bold text-bcp-blue mb-4 flex items-center">
        <i className="fas fa-sliders-h mr-3 text-bcp-teal"></i>
        Simulador Financiero
      </h2>
      <div className="space-y-6">
        <Slider
          label="Número de Pedidos por Día"
          value={input.ordersPerDay}
          min={10}
          max={5000}
          step={10}
          onChange={(e) => handleSliderChange(e, 'ordersPerDay')}
        />
        <Slider
          label="Valor Promedio del Pedido"
          value={input.avgOrderValue}
          min={10}
          max={100}
          step={1}
          unit="£"
          onChange={(e) => handleSliderChange(e, 'avgOrderValue')}
        />
        <Slider
          label="Distancia Promedio de Entrega"
          value={input.avgDistance}
          min={0.1}
          max={5.0}
          step={0.1}
          unit=" millas"
          onChange={(e) => handleSliderChange(e, 'avgDistance')}
        />
         <Slider
          label="Incentivos para Repartidores Líderes (Mensual)"
          value={input.leaderIncentives}
          min={0}
          max={5000}
          step={100}
          unit="£"
          onChange={(e) => handleSliderChange(e, 'leaderIncentives')}
        />
      </div>
    </Card>
  );
};

export default Simulator;
