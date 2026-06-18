import FeedstockStream from "@/components/feed-stock-table/FeedstockStream";
import PriceChart from "@/components/price-chart/PriceChart";


export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen font-sans">
      <FeedstockStream/>
    </div>
  );
}
