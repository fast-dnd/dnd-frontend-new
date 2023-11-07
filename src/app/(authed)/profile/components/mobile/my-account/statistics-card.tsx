interface IStatisticsCardProps {
  icon: React.ReactNode;
  value: string | number;
  name: string;
}

const StatisticsCard = ({ icon, value, name }: IStatisticsCardProps) => {
  return (
    <div className="flex w-full items-center gap-5 rounded-md bg-primary-900">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
        {icon}
      </div>
      <div className="flex flex-col whitespace-nowrap">
        <p className="font-bold">{value || "-- --"}</p>
        <p className="text-xs text-white/50">{name}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;
