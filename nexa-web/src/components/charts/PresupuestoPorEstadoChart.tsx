import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import type { Proyecto } from "../../types"

interface PresupuestoPorEstadoChartProps {
  proyectos: Proyecto[];
}

export function PresupuestoPorEstadoChart({ proyectos }: PresupuestoPorEstadoChartProps) {
  const budgetByState: Record<string, number> = {
    'PLANEADO': 0,
    'EN_EJECUCION': 0,
    'PAUSADO': 0,
    'FINALIZADO': 0
  };

  proyectos.forEach(p => {
    if (budgetByState[p.estado] !== undefined) {
      budgetByState[p.estado] += p.presupuesto || 0;
    }
  });

  const chartData = [
    { name: 'Planeado', valor: budgetByState['PLANEADO'], color: '#94A3B8' },
    { name: 'En Ejecución', valor: budgetByState['EN_EJECUCION'], color: '#10B981' },
    { name: 'Pausado', valor: budgetByState['PAUSADO'], color: '#F59E0B' },
    { name: 'Finalizado', valor: budgetByState['FINALIZADO'], color: '#3B82F6' }
  ].filter(d => d.valor > 0).sort((a, b) => b.valor - a.valor);

  return (
    <Card className="flex flex-col h-full min-h-[350px]">
      <CardHeader>
        <CardTitle>Distribución de Presupuesto</CardTitle>
        <CardDescription>Inversión por estado del proyecto</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="w-full h-[300px]" style={{ minWidth: 0 }}>
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} tickMargin={10} />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                fontSize={12} 
                tickFormatter={(value) => `S/${value >= 1000 ? value/1000 + 'k' : value}`}
              />
              <Tooltip 
                cursor={{ fill: "transparent" }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontFamily: 'inherit' }}
                formatter={(value: number) => [`S/ ${(value).toLocaleString()}`, "Inversión"]}
              />
              <Bar dataKey="valor" radius={[4, 4, 0, 0]} barSize={40}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
