import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import type { ProyectoResumen } from "../../types"

interface AvanceLineChartProps {
  proyectos: ProyectoResumen[];
}

export function AvanceLineChart({ proyectos }: AvanceLineChartProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(proyectos[0]?.id || "");

  const selectedProject = proyectos.find(p => p.id === selectedProjectId) || proyectos[0];

  if (!selectedProject || !selectedProject.historial) {
    return (
      <Card className="flex flex-col h-full min-h-[300px]">
        <CardHeader>
          <CardTitle>Avance de Proyectos</CardTitle>
          <CardDescription>Progreso histórico</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center text-muted-foreground">
          No hay datos disponibles
        </CardContent>
      </Card>
    );
  }

  // Sort history by date
  const sortedHistory = [...selectedProject.historial].sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
  );

  const chartData = sortedHistory.map(h => ({
    fecha: h.fecha,
    avance: h.avance
  }));

  const color = "#3B82F6"; // Blue

  return (
    <Card className="flex flex-col h-full min-h-[350px]">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <CardTitle>Avance Histórico</CardTitle>
          <CardDescription>Evolución interactiva del progreso</CardDescription>
        </div>
        <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
          <SelectTrigger className="w-[200px] bg-background">
            <SelectValue placeholder="Selecciona un proyecto" />
          </SelectTrigger>
          <SelectContent>
            {proyectos.map(p => (
              <SelectItem key={p.id} value={p.id}>
                {p.nombre.length > 20 ? p.nombre.substring(0, 20) + '...' : p.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="w-full h-[300px]" style={{ minWidth: 0 }}>
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAvance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="fecha"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                fontSize={12}
                tickFormatter={(val) => {
                  const d = new Date(val);
                  return `${d.getDate()}/${d.getMonth() + 1}`;
                }}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
                fontSize={12}
                width={50}
                domain={[0, 100]}
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontFamily: 'inherit' }}
                labelFormatter={(label) => {
                   const d = new Date(label as string);
                   return d.toLocaleDateString();
                }}
                formatter={(value: number) => [`${value}%`, "Avance"]}
              />
              <Area 
                type="monotone" 
                dataKey="avance" 
                stroke={color} 
                fill="url(#colorAvance)"
                strokeWidth={3} 
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
