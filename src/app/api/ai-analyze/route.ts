import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic'; // Prevent static generation attempts

export async function POST(req: Request) {
  try {
    const { restaurantId } = await req.json();

    if (!restaurantId) {
      return NextResponse.json({ error: 'Restaurant ID required' }, { status: 400 });
    }

    // MOCK DATA for analytics. In a real scenario, this would group clicks from "analytics" table.
    const mockAnalyticsData = `
    - Hamburguesa Trufada ($18.50, Active): 450 views, 120 clicks this week.
    - Tacos Al Pastor ($12.00, Active): 600 views, 300 clicks this week.
    - Ceviche Clásico ($15.00, Active): 200 views, 15 clicks this week.
    - Risotto de Hongos ($22.00, Inactive/Agotado): 300 views, 250 clicks this week.
    - Volcán de Chocolate ($9.50, Active): 50 views, 5 clicks this week.
    `;

    const prompt = `
      Eres un consultor experto en rentabilidad de restaurantes. 
      Analiza los siguientes datos de interacción (views vs clicks) de un menú digital esta semana:
      
      ${mockAnalyticsData}
      
      Genera un breve párrafo con al menos 3 sugerencias estratégicas sobre:
      1. Qué platos destacar o subir de precio.
      2. Qué hacer con los platos de alto interés pero agotados.
      3. Recomendaciones visuales o de combos.
      
      Sé directo, analítico, y usa tono profesional y persuasivo enfocado en aumentar las ventas.
      No saludes, redacta directamente el reporte. Limítate a 1 un párrafo o un set de 2-3 bullets cortos.
    `;

    // Wait for the open-ai key, if not configured return a mock response
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === '') {
       console.log("No OpenAI key found. Returning mock analysis.");
       return NextResponse.json({ 
         suggestion: "⚠️ API Key de OpenAI no configurada. \n\n**Sugerencias Simuladas:** \n1. **Risotto de Hongos** tiene un altísimo interés (250 clicks) pero está agotado. Urge priorizar inventario, estás perdiendo ~$5,500 en ventas potenciales. \n2. **Hamburguesa Trufada** tiene buena conversión; considera aumentar su precio a $19.50. \n3. El **Volcán de Chocolate** casi no tiene tracción; recomendar poner mejores fotos en el menú o incluirlo en un Combo con la Hamburguesa."
       });
    }

    // Initialize OpenAI client inside handler to avoid build-time errors
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 300,
    });

    const suggestion = completion.choices[0].message.content;

    // Here you would optimally save this suggestion in the 'ai_reports' table

    return NextResponse.json({ suggestion });

  } catch (error: any) {
    console.error('AI Analysis Error:', error);
    return NextResponse.json({ error: 'Error procesando análisis de IA.' }, { status: 500 });
  }
}
