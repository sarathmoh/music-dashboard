import { Card } from "@/components/ui/card";

function StatCard({ icon, finalCount, subtitle,isPrice }) {
  return (
    <Card className="p-5 max-w-[270px]">
      <div className="flex items-center">
        <div className="mr-4">{icon}</div>
        <div>
          <h3 className="text-[22px] font-semibold">{isPrice ? "$" :""}{finalCount}</h3>
          <p className="text-[12px] text-gray-500">{subtitle}</p>
        </div>
      </div>
      <div className="flex justify-end text-[#B33086] text-[9px]">
        <span>View</span>
      </div>
    </Card>
  );
}

export default StatCard;
