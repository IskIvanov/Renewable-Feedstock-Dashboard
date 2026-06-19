# Renewable Feedstock Dashboard

A real-time dashboard for monitoring renewable commodity prices. Built with Next.js 16, React 19, and ApexCharts.

## Features

- **Live price table** — streams feedstock prices via SSE from a mock price feed API, auto-reconnects on drop
- **Historical price chart** — dual-axis chart (price line + volume bars) with product selector, rendered with ApexCharts.
- **Status indicator** — shows live connection state (connecting / live / error)

## Project Structure

```
app/
  api/
    feedstock-stream/
      route.ts          # SSE endpoint — polls mock feed, pushes to client
      bulk/route.ts     # Bulk fetch endpoint for historical chart data
  page.tsx              # Root page
  layout.tsx
  globals.css
  constants.ts

components/
  feed-stock-table/
    FeedstockStream.tsx # SSE consumer, composes table + chart
    FeedstockTable.tsx  # Table data grid
    StatusBadge.tsx     # Connection state badge
    formatters.ts       # Cell value formatters
  price-chart/
    PriceChart.tsx      # ApexCharts line chart with product selector
    hooks/
      usePriceChartData.ts  # Fetches bulk data, manages selected product
      useLineData.ts        # Builds ApexCharts series from raw data
      useChartOptions.ts    # ApexCharts options (axes, tooltip, theme)
      useChartSeries.ts     # Series + stroke width helpers

lib/
  utils.ts              # cn() class merge utility
```

## Getting Started

Install dependencies:

```bash
yarn install
```

Set up environment variables by creating a `.env.local` file in the project root:

```bash
FEEDSTOCK_API_BASE_URL=https://renewable-price-feed-mock.onrender.com
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4, shadcn/ui |
| Table | Shadcn Table component |
| Chart | ApexCharts + react-apexcharts |
| SSE | use-next-sse |
| Icons | Lucide React |

## API Routes

| Route | Method | Description |
|---|---|---|
| `/api/feedstock-stream` | GET | SSE stream — polls mock feed every 10s, emits `feedstock` events |
| `/api/feedstock-stream/bulk` | GET | One-shot fetch of full price history for charting |

The mock price feed base URL is configured via `FEEDSTOCK_API_BASE_URL` in `.env.local`.

## AI Tooling

Assisted development tooling - [Claude Code](https://claude.ai/code). MCP servers: [Next.js](https://github.com/vercel/next-mcp) and [shadcn/ui](https://github.com/shadcn-ui/mcp). Skills: refactoring and commit message generation, available for review in `.agents` and `.claude` folders.
