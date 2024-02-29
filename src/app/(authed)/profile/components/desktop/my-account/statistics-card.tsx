interface IStatisticsCardProps {
  icon: React.ReactNode;
  value: string | number;
  name: string;
}

const StatisticsCard = ({ icon, value, name }: IStatisticsCardProps) => {
  return (
    <div className="flex w-full items-center gap-5 rounded-md bg-primary-900 px-3 py-2">
      <div className="flex size-8 items-center justify-center rounded-md bg-primary/10">{icon}</div>
      <div className="flex flex-col">
        <p className="text-xl font-bold">{value || "-- --"}</p>
        <p className="text-sm text-white/50">{name}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;
