interface IStatisticsCardProps {
  icon: React.ReactNode;
  value: string | number;
  name: string;
}

const StatisticsCard = ({ icon, value, name }: IStatisticsCardProps) => {
  return (
    <div className="flex w-full items-center gap-3 rounded-md bg-primary-900">
      <div className="flex min-h-[36px] min-w-[36px] items-center justify-center rounded-md bg-primary/10">
        {icon}
      </div>
      <div className="flex flex-col whitespace-nowrap">
        <p className="font-bold">{value || "-- --"}</p>
        <p className="text-[10px] text-white/50">{name}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;
