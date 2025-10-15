import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Package, Clock, CheckCircle, Truck, AlertTriangle } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data para el pipeline de órdenes
const pipelineData = [
  { stage: "Programadas", count: 104, color: "hsl(var(--info))" },
  { stage: "En Proceso", count: 104, color: "hsl(var(--warning))" },
  { stage: "Surtidas", count: 100, color: "hsl(var(--success))" },
  { stage: "Auditadas", count: 98, color: "hsl(var(--primary))" },
  { stage: "Embarcadas", count: 96, color: "hsl(var(--success))" },
  { stage: "En Ruta", count: 94, color: "hsl(var(--info))" },
  { stage: "Entregadas", count: 91, color: "hsl(var(--success))" },
];

// Mock data para análisis por día
const dailyData = [
  { date: "01-sep", count: 150 },
  { date: "02-sep", count: 145 },
  { date: "03-sep", count: 148 },
  { date: "04-sep", count: 152 },
  { date: "05-sep", count: 155 },
  { date: "06-sep", count: 148 },
];

export default function OrderGrouping() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Agrupación de Pedidos</h2>
        <p className="text-muted-foreground mt-1">
          Análisis del flujo y estado de pedidos en el pipeline
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Programadas"
          value="104"
          icon={<Clock className="h-4 w-4" />}
          variant="info"
        />
        <MetricCard
          title="En Proceso"
          value="104"
          icon={<Package className="h-4 w-4" />}
          variant="warning"
        />
        <MetricCard
          title="Surtidas"
          value="100"
          icon={<CheckCircle className="h-4 w-4" />}
          variant="success"
        />
        <MetricCard
          title="En Ruta"
          value="94"
          icon={<Truck className="h-4 w-4" />}
          variant="info"
        />
      </div>

      {/* Pipeline Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pipeline de Órdenes</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pipelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="stage" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {pipelineData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Daily Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tendencia Diaria</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Alert Card */}
      <Card className="border-warning/30 bg-warning/5">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-warning">
            <AlertTriangle className="h-5 w-5" />
            Atención Requerida
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            10 pedidos llevan más de 48 horas en estado "En Proceso". Revise el pipeline para identificar cuellos de botella.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
