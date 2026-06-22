import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import type { Proyecto } from "../../types"

interface ProyectosPorClienteChartProps {
  proyectos: Proyecto[];
}

export function ProyectosPorClienteChart({ proyectos }: ProyectosPorClienteChartProps) {
  // Aggregate project count by client name
  const clientCounts: Record<string, number> = {};
  proyectos.forEach(p => {
    const clientName = p.clienteNombre || 'Sin Cliente';
    clientCounts[clientName] = (clientCounts[clientName] || 0) + 1;
  });

  const chartData = Object.entries(clientCounts)
    .map(([nombre, cantidad]) => ({
      nombre,
      cantidad
    }))
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 5); // Top 5 clients

  return (
    <Card className="flex flex-col h-full min-h-[350px]">
      <CardHeader>
        <CardTitle>Proyectos por Cliente</CardTitle>
        <CardDescription>Distribución top 5 clientes</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="w-full h-[300px]" style={{ minWidth: 0 }}>
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
              <PolarGrid />
              <PolarAngleAxis 
                dataKey="nombre" 
                fontSize={11} 
                tickFormatter={(value) => value.length > 15 ? value.substring(0, 15) + '...' : value}
              />
              <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
              <Radar 
                name="Proyectos" 
                dataKey="cantidad" 
                stroke="#3B82F6" 
                fill="#60A5FA" 
                fillOpacity={0.6} 
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontFamily: 'inherit' }}
                formatter={(value: number) => [`${value} proyectos`, "Cantidad"]}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
