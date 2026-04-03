import { PortfolioPage } from "@/components/portfolio-page";
import { getPortfolioData } from "@/lib/portfolio";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getPortfolioData();

  return <PortfolioPage data={data} />;
}
