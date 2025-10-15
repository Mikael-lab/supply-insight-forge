import { useState } from "react";
import { Calendar, Package, CheckCircle2, AlertCircle, XCircle, Download, X } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge, OrderStatus } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { exportToCSV } from "@/utils/exportUtils";

// Mock data - Pedidos listos
const mockReadyOrders = [
  {
    id: "70023456",
    delivery: "81800123",
    promiseDate: "2025-09-24",
    planDate: "2025-09-23",
    status: "surtido" as OrderStatus,
    docSalida: "4902380001",
    exitDate: "2025-09-24",
    center: "1901",
    cliente: "CONSTRUMART SA",
    monto: "$15,450.00",
  },
  {
    id: "70023457",
    delivery: "81800124",
    promiseDate: "2025-09-24",
    planDate: "2025-09-23",
    status: "auditado" as OrderStatus,
    docSalida: "4902380002",
    exitDate: "2025-09-24",
    center: "1901",
    cliente: "MATERIALES DEL NORTE",
    monto: "$8,230.00",
  },
  {
    id: "70023458",
    delivery: "81800125",
    promiseDate: "2025-09-24",
    planDate: "2025-09-23",
    status: "embarcado" as OrderStatus,
    docSalida: "4902380003",
    exitDate: "2025-09-24",
    center: "1901",
    cliente: "FERRETERIA GUADALUPE",
    monto: "$12,890.00",
  },
  {
    id: "70023459",
    delivery: "81800126",
    promiseDate: "2025-09-24",
    planDate: "2025-09-23",
    status: "surtido" as OrderStatus,
    docSalida: "4902380004",
    exitDate: "2025-09-24",
    center: "1901",
    cliente: "GRUPO CONSTRUCTOR ABC",
    monto: "$25,670.00",
  },
  {
    id: "70023460",
    delivery: "81800127",
    promiseDate: "2025-09-24",
    planDate: "2025-09-23",
    status: "auditado" as OrderStatus,
    docSalida: "4902380005",
    exitDate: "2025-09-24",
    center: "1901",
    cliente: "MATERIALES INDUSTRIALES",
    monto: "$9,450.00",
  },
];

// Mock data - Pedidos pendientes
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
  const [showReadyOrders, setShowReadyOrders] = useState(false);

  const handleExportReadyOrders = () => {
    const exportData = mockReadyOrders.map(order => ({
      Pedido: order.id,
      Entrega: order.delivery,
      Cliente: order.cliente,
      'Fecha Promesa': order.promiseDate,
      'Fecha Plan': order.planDate,
      Estado: order.status,
      'Doc. Salida': order.docSalida,
      'Fecha Salida': order.exitDate,
      Centro: order.center,
      Monto: order.monto,
    }));

    exportToCSV(exportData, `pedidos-listos-${new Date().toISOString().split('T')[0]}`);
    
    toast({
      title: "Exportación exitosa",
      description: `Se han exportado ${exportData.length} pedidos listos.`,
    });
  };

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
        <div 
          onClick={() => setShowReadyOrders(true)}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <MetricCard
            title="Pedidos Listos"
            value="1,560"
            icon={<CheckCircle2 className="h-4 w-4" />}
            variant="success"
            trend={{ value: 12, isPositive: true }}
          />
        </div>
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

      {/* Ready Orders Dialog */}
      <Dialog open={showReadyOrders} onOpenChange={setShowReadyOrders}>
        <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <CheckCircle2 className="h-6 w-6 text-success" />
              Pedidos Listos para Entrega
            </DialogTitle>
            <DialogDescription>
              Lista completa de pedidos surtidos y preparados para distribución
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
              <div className="text-sm text-muted-foreground">
                Mostrando <span className="font-semibold text-foreground">{mockReadyOrders.length}</span> pedidos listos
              </div>
              <Button 
                onClick={handleExportReadyOrders}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Exportar a Excel
              </Button>
            </div>

            {/* Ready Orders Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pedido</TableHead>
                    <TableHead>Entrega</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>F. Promesa</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Doc. Salida</TableHead>
                    <TableHead>Centro</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockReadyOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.delivery}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{order.cliente}</TableCell>
                      <TableCell>{order.promiseDate}</TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell>{order.docSalida}</TableCell>
                      <TableCell>{order.center}</TableCell>
                      <TableCell className="text-right font-semibold">{order.monto}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Summary */}
            <div className="flex justify-between items-center p-4 bg-success/10 rounded-lg border border-success/20">
              <span className="text-sm font-medium">Total de pedidos listos:</span>
              <span className="text-lg font-bold text-success">{mockReadyOrders.length}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
