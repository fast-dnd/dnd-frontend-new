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
    <div className="flex gap-12">
      <MyAccount />
      <MyCollection activeTab={activeTab} />
    </div>
  );
};

export default Profile;
