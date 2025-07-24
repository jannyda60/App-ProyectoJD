import { GoogleGenerativeAI, GenerateContentResponse } from "@google/generative-ai";
import { FinancialResult, SimulationInput } from '../types';

// IMPORTANT: This check is for the web environment where process.env is not available.
// In a real production build, the API key would be handled by the build environment.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI Advisor will not function.");
}

const ai = new GoogleGenerativeAI(API_KEY);

export const getStrategicAdvice = async (
  simulationInput: SimulationInput,
  financialResult: FinancialResult
): Promise<AsyncGenerator<GenerateContentResponse> | null> => {
  if (!API_KEY) {
    return Promise.resolve(null);
  }

  const { ordersPerDay, avgOrderValue, avgDistance } = simulationInput;
  const {
    netProfitMonth,
    totalOperatingCostMonth,
    breakEvenMonth,
    deliveryFeePerOrder,
    platformGrossProfitMonth,
  } = financialResult;

  const prompt = `
    Eres un analista de negocios experto y asesor estratégico para un revolucionario servicio de reparto comunitario llamado "BCP Local Delivery Ltd.".
    Esta empresa es una Joint Venture entre una compañía tecnológica (DUKTV, 60% propietaria) y el ayuntamiento local (BCP Council, 40% propietario).
    El modelo está diseñado para ser justo y sostenible, manteniendo el dinero en la economía local.

    REGLAS CLAVE DEL MODELO DE NEGOCIO:
    - Una comisión transparente del 12% a los restaurantes. Un 2% va directamente al repartidor, y el 10% son ingresos para la plataforma.
    - El marketing está completamente cubierto por el BCP Council (coste es £0 para la JV).
    - La gestión es manejada por contratistas independientes incentivados ('Repartidores Líderes'), no por empleados asalariados.
    - El objetivo es alcanzar la rentabilidad y luego repartir dividendos: 60% para DUKTV, 40% para BCP Council.

    ANALIZA EL SIGUIENTE ESCENARIO DE SIMULACIÓN:
    - Pedidos por Día: ${ordersPerDay.toFixed(0)}
    - Valor Promedio del Pedido: £${avgOrderValue.toFixed(2)}
    - Distancia Promedio de Entrega: ${avgDistance.toFixed(1)} millas

    RESULTADOS FINANCIEROS DE ESTE ESCENARIO:
    - Beneficio/Pérdida Neta Mensual: £${netProfitMonth.toFixed(2)}
    - Ingreso Bruto Mensual de la Plataforma: £${platformGrossProfitMonth.toFixed(2)}
    - Costos Operativos Mensuales: £${totalOperatingCostMonth.toFixed(2)}
    - Tarifa de Envío Promedio pagada por el Cliente: £${deliveryFeePerOrder.toFixed(2)}
    - Tiempo Proyectado para el Punto de Equilibrio: ${breakEvenMonth ? `${breakEvenMonth} meses` : 'No es rentable con estos valores'}

    TU TAREA:
    Proporciona recomendaciones estratégicas claras, accionables y concisas basadas ÚNICAMENTE en los datos proporcionados. Estructura tu respuesta en Markdown. Dirígete a los principales interesados (DUKTV y BCP Council).

    1.  **Evaluación General de Viabilidad:** Comienza con un resumen de una frase sobre la salud financiera en este escenario (ej., "Altamente rentable," "Cercano al punto de equilibrio," "Pérdida insostenible").
    2.  **Fortalezas / Oportunidades Clave:** Identifica los factores positivos más fuertes en este escenario.
    3.  **Debilidades / Amenazas Clave:** Identifica los mayores riesgos o factores negativos.
    4.  **Recomendaciones Accionables:** Proporciona 2-3 recomendaciones específicas y numeradas. Para cada una, indica el problema que resuelve y sugiere una acción concreta. Ejemplos:
        - Si la rentabilidad es baja: "Para impulsar la rentabilidad, enfóquense en aumentar el Valor Promedio del Pedido. El BCP Council puede lanzar una campaña 'Apoya el Festín Local' para fomentar la compra de más productos."
        - Si las tarifas de envío son altas: "Para reducir la fricción del cliente por tarifas de envío elevadas, DUKTV debería priorizar la implementación de la lógica de 'agrupación de pedidos' en zonas de alta densidad."
        - Si es rentable: "Con un beneficio neto de £${netProfitMonth.toFixed(2)}/mes, el BCP Council ahora puede comunicar el impacto cívico tangible, equiparando el dividendo anual del ayuntamiento de £${(financialResult.bcpCouncilDividendMonth * 12).toFixed(2)} a la financiación de proyectos locales específicos."
  `;

  try {
    const response = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    return response;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return null;
  }
};
