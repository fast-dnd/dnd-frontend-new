import MyAccount from "./components/my-account";
import MyCollection from "./components/my-collection";
import { Tab } from "./components/my-collection/types/tab";

const Profile = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const activeTab = (searchParams?.activeTab ?? "ADVENTURES") as Tab;

  return (
    <div className="flex min-h-0 flex-1 gap-12 pb-12">
      <MyCollection activeTab={activeTab} />
      <MyAccount />
    </div>
  );
};

export default Profile;
