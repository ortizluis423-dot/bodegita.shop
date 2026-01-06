
'use client';

import { useMemo } from 'react';
import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Cell } from 'recharts';
import { useProducts } from '@/hooks/use-products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

export function AdminDashboard() {
  const { products } = useProducts();

  const productsByCategory = useMemo(() => {
    return products.reduce((acc, product) => {
      const category = product.category || 'Sin Categoría';
      const existingCategory = acc.find((item) => item.name === category);
      if (existingCategory) {
        existingCategory.count += 1;
      } else {
        acc.push({ name: category, count: 1 });
      }
      return acc;
    }, [] as { name: string; count: number }[]);
  }, [products]);

  const productsByPriceRange = useMemo(() => {
    const ranges = [
      { name: '$0 - $0.50', min: 0, max: 0.5, count: 0 },
      { name: '$0.51 - $1.00', min: 0.51, max: 1.00, count: 0 },
      { name: '$1.01 - $2.00', min: 1.01, max: 2.00, count: 0 },
      { name: 'Más de $2.00', min: 2.01, max: Infinity, count: 0 },
    ];

    products.forEach(product => {
      const range = ranges.find(r => product.priceUSD >= r.min && product.priceUSD <= r.max);
      if (range) {
        range.count++;
      }
    });

    return ranges.filter(r => r.count > 0);
  }, [products]);

  const chartConfig = {
    count: { label: "Productos" },
  };

  const priceChartConfig = Object.fromEntries(
    productsByPriceRange.map((range, index) => [
      range.name,
      { label: range.name, color: COLORS[index % COLORS.length] },
    ])
  );


  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Productos por Categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productsByCategory} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="count" fill="var(--color-accent)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Distribución de Precios</CardTitle>
        </CardHeader>
        <CardContent>
           <ChartContainer config={priceChartConfig} className="h-[250px] w-full">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productsByPriceRange}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {productsByPriceRange.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                 <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
