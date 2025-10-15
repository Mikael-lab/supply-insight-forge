import { useState } from "react";
import { Calendar, Package, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge, OrderStatus } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data
const mockOrders = [
  {
    id: "73046058",
    delivery: "82042202",
    promiseDate: "2025-09-24",
    planDate: "2025-09-23",
    status: "en-ruta" as OrderStatus,
    docSalida: "4902379798",
    exitDate: "2025-09-24",
    center: "1901",
    state: "C",
  },
  {
    id: "70022841",
    delivery: "81799024",
    promiseDate: "2025-09-24",
    planDate: "2025-09-22",
    status: "embarcado" as OrderStatus,
    docSalida: "4902379762",
    exitDate: "2025-09-24",
    center: "1901",
    state: "C",
  },
  {
    id: "70026044",
    delivery: "81799563",
    promiseDate: "2025-09-24",
    planDate: "2025-09-23",
    status: "pendiente" as OrderStatus,
    docSalida: "",
    exitDate: "",
    center: "1901",
    state: "A",
  },
];

export default function DailyOrders() {
  const [startDate, setStartDate] = useState("2025-09-24");
  const [endDate, setEndDate] = useState("2025-09-24");

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Pedidos Diarios</h2>
        <p className="text-muted-foreground mt-1">
          Monitoreo en tiempo real de entregas programadas
        </p>
      </div>

      {/* Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Pedidos"
          value="4,350"
          icon={<Package className="h-4 w-4" />}
          variant="default"
        />
        <MetricCard
          title="Pedidos Listos"
          value="1,560"
          icon={<CheckCircle2 className="h-4 w-4" />}
          variant="success"
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Parcialmente Listos"
          value="2,002"
          icon={<AlertCircle className="h-4 w-4" />}
          variant="warning"
        />
        <MetricCard
          title="No Listos"
          value="788"
          icon={<XCircle className="h-4 w-4" />}
          variant="destructive"
        />
      </div>

      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Filtros de Fecha
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Fecha Inicio</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Fecha Fin</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button className="w-full sm:w-auto">Filtrar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Entregas Pendientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Entrega</TableHead>
                  <TableHead>F. Promesa</TableHead>
                  <TableHead>F. Planificación</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Doc. Salida</TableHead>
                  <TableHead>F. Salida</TableHead>
                  <TableHead>Centro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.delivery}</TableCell>
                    <TableCell>{order.promiseDate}</TableCell>
                    <TableCell>{order.planDate}</TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell>{order.docSalida || "-"}</TableCell>
                    <TableCell>{order.exitDate || "-"}</TableCell>
                    <TableCell>{order.center}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
