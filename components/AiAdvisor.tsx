
import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import { getStrategicAdvice } from '../services/geminiService';
import { FinancialResult, SimulationInput } from '../types';

interface AiAdvisorProps {
  results: FinancialResult;
  input: SimulationInput;
}

const Markdown: React.FC<{ text: string }> = ({ text }) => {
    // A more robust, while still simple, markdown parser to correctly render AI advice.
    const toHtml = (md: string) => md
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');

    const blocks = text.trim().split(/\n\s*\n/); // Split by one or more empty lines
    const html = blocks.map(block => {
        if (block.startsWith('# ')) return `<h1 class="text-2xl font-bold mb-2 mt-4">${toHtml(block.substring(2))}</h1>`;
        if (block.startsWith('## ')) return `<h2 class="text-xl font-bold mb-2 mt-4">${toHtml(block.substring(3))}</h2>`;
        if (block.startsWith('### ')) return `<h3 class="text-lg font-semibold mb-2 mt-4">${toHtml(block.substring(4))}</h3>`;
        
        // Check if the block is a list
        if (block.match(/^\s*\d+\./)) {
            const listItems = block.split('\n').map(item =>
                `<li class="mb-1">${toHtml(item.replace(/^\s*\d+\.\s*/, ''))}</li>`
            ).join('');
            return `<ol class="list-decimal list-inside space-y-2 mt-2 pl-4">${listItems}</ol>`;
        }

        // Otherwise, it's a paragraph
        return `<p class="leading-relaxed mb-4">${toHtml(block)}</p>`;
    }).join('');

    return <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: html }} />;
};


const AiAdvisor: React.FC<AiAdvisorProps> = ({ results, input }) => {
  const [advice, setAdvice] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const fetchAdvice = async () => {
    setIsLoading(true);
    setError('');
    setAdvice('');
    
    if (!process.env.API_KEY) {
        setError("El Asesor de IA está deshabilitado. La API_KEY no está configurada.");
        setIsLoading(false);
        return;
    }

    try {
      // FIX: Removed incorrect type annotation. `responseStream` is an AsyncGenerator, not a GenerateContentResponse.
      const responseStream = await getStrategicAdvice(input, results);
      
      if(responseStream === null) {
        setError("No se pudo conectar con el servicio de IA. Por favor, verifica tu clave de API.");
        setIsLoading(false);
        return;
      }

      let fullText = '';
      // This loop now works correctly as it iterates over the async stream.
      for await (const chunk of responseStream) {
        fullText += chunk.text;
        setAdvice(fullText);
      }

    } catch (err) {
      setError('Ocurrió un error al obtener la recomendación.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Debounce the fetchAdvice call
  useEffect(() => {
    const handler = setTimeout(() => {
        fetchAdvice();
    }, 1500); // 1.5 second delay after user stops changing inputs

    return () => {
        clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <Card className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-bcp-blue flex items-center">
            <i className="fas fa-brain mr-3 text-bcp-teal"></i>
            Asesor Estratégico de IA
        </h2>
        <button onClick={fetchAdvice} disabled={isLoading} className="px-4 py-2 text-sm font-semibold text-white bg-bcp-blue rounded-lg hover:bg-bcp-blue/90 disabled:bg-gray-400 disabled:cursor-not-allowed">
            {isLoading ? 'Analizando...' : 'Re-analizar'}
        </button>
      </div>
      
      <div className="bg-light-gray p-4 rounded-lg min-h-[300px]">
        {isLoading && !advice && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <i className="fas fa-circle-notch fa-spin text-4xl mb-4"></i>
            <p>Analizando el escenario actual...</p>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        {advice && <Markdown text={advice} />}
        {!isLoading && !advice && !error && <p className="text-gray-500">Ajusta los controles del simulador para obtener recomendaciones estratégicas impulsadas por IA.</p>}
      </div>
    </Card>
  );
};

export default AiAdvisor;
