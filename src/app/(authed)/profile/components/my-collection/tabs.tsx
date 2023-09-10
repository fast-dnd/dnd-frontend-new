import { cn } from "@/utils/style-utils";
import { Button } from "@/components/ui/button";

import { tabsStore } from "./stores/tab-store";

const Tabs = () => {
  const activeTab = tabsStore.use();

  return (
    <div className="mb-8 flex justify-between gap-6">
      <div className="flex gap-6">
        {tabsWithIcons.map((tab) => (
          <div
            onClick={() => tabsStore.set(tab.name)}
            key={tab.name}
            className={cn(
              "flex cursor-pointer items-center gap-2 fill-white/50 text-xl text-white/50 transition-all duration-200 hover:fill-white hover:text-white",
              activeTab === tab.name &&
                "fill-primary font-bold text-primary hover:fill-primary hover:text-primary",
            )}
          >
            {tab.icon}
            {tab.name}
          </div>
        ))}
      </div>
      {(activeTab === "ADVENTURES" || activeTab === "CAMPAIGNS") && (
        <Button className="w-fit uppercase">CREATE NEW {activeTab.slice(0, -1)}</Button>
      )}
    </div>
  );
};

export default Tabs;

const tabsWithIcons = [
  {
    name: "ADVENTURES",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        className="fill-inherit"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.5 16V22L20.5 20L19 17C19 17 20.8605 12.778 19.481 9.0445C18.4451 6.24206 15.6353 4.88692 13.7003 3.95372C12.9512 3.59239 12.3331 3.29433 12 3V14.5L13.4535 11.9565C13.7915 11.365 14.4205 11 15.1015 11C16.15 11 17 11.8495 17 12.898V12.8985C17 13.5795 16.635 14.2085 16.0435 14.5465L13.5 16ZM14.1464 8.64645C14.2402 8.55268 14.3674 8.5 14.5 8.5C14.6326 8.5 14.7598 8.55268 14.8536 8.64645C14.9473 8.74021 15 8.86739 15 9C15 9.13261 14.9473 9.25979 14.8536 9.35355C14.7598 9.44732 14.6326 9.5 14.5 9.5C14.3674 9.5 14.2402 9.44732 14.1464 9.35355C14.0527 9.25979 14 9.13261 14 9C14 8.86739 14.0527 8.74021 14.1464 8.64645ZM16.1464 8.64645C16.2402 8.55268 16.3674 8.5 16.5 8.5C16.6326 8.5 16.7598 8.55268 16.8536 8.64645C16.9473 8.74021 17 8.86739 17 9C17 9.13261 16.9473 9.25979 16.8536 9.35355C16.7598 9.44732 16.6326 9.5 16.5 9.5C16.3674 9.5 16.2402 9.44732 16.1464 9.35355C16.0527 9.25979 16 9.13261 16 9C16 8.86739 16.0527 8.74021 16.1464 8.64645ZM18.1464 8.64645C18.2402 8.55268 18.3674 8.5 18.5 8.5C18.6326 8.5 18.7598 8.55268 18.8536 8.64645C18.9473 8.74021 19 8.86739 19 9C19 9.13261 18.9473 9.25979 18.8536 9.35355C18.7598 9.44732 18.6326 9.5 18.5 9.5C18.3674 9.5 18.2402 9.44732 18.1464 9.35355C18.0527 9.25979 18 9.13261 18 9C18 8.86739 18.0527 8.74021 18.1464 8.64645Z"
          fill="inherit"
          fill-opacity="0.7"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.5 16V22L3.5 20L5 17C5 17 3.1395 12.778 4.519 9.0445C5.55491 6.24206 8.36473 4.88692 10.2997 3.95372C11.0489 3.59239 11.6669 3.29433 12 3V14.5L10.5465 11.9565C10.2085 11.365 9.5795 11 8.8985 11C7.85 11 7 11.8495 7 12.898V12.8985C7 13.5795 7.365 14.2085 7.9565 14.5465L10.5 16ZM5.14645 8.64645C5.24021 8.55268 5.36739 8.5 5.5 8.5C5.63261 8.5 5.75978 8.55268 5.85355 8.64645C5.94732 8.74021 6 8.86739 6 9C6 9.13261 5.94732 9.25979 5.85355 9.35355C5.75978 9.44732 5.63261 9.5 5.5 9.5C5.36739 9.5 5.24021 9.44732 5.14645 9.35355C5.05268 9.25979 5 9.13261 5 9C5 8.86739 5.05268 8.74021 5.14645 8.64645ZM7.14645 8.64645C7.24021 8.55268 7.36739 8.5 7.5 8.5C7.63261 8.5 7.75978 8.55268 7.85355 8.64645C7.94732 8.74021 8 8.86739 8 9C8 9.13261 7.94732 9.25979 7.85355 9.35355C7.75978 9.44732 7.63261 9.5 7.5 9.5C7.36739 9.5 7.24021 9.44732 7.14645 9.35355C7.05268 9.25979 7 9.13261 7 9C7 8.86739 7.05268 8.74021 7.14645 8.64645ZM9.14645 8.64645C9.24021 8.55268 9.36739 8.5 9.5 8.5C9.63261 8.5 9.75979 8.55268 9.85355 8.64645C9.94732 8.74021 10 8.86739 10 9C10 9.13261 9.94732 9.25979 9.85355 9.35355C9.75979 9.44732 9.63261 9.5 9.5 9.5C9.36739 9.5 9.24021 9.44732 9.14645 9.35355C9.05268 9.25979 9 9.13261 9 9C9 8.86739 9.05268 8.74021 9.14645 8.64645Z"
          fill="inherit"
          fill-opacity="0.7"
        />
        <path d="M13.4535 11.9565L12 14.5V2C12 2 13.7915 11.365 13.4535 11.9565Z" fill="inherit" />
        <path
          d="M10.5464 11.9565L11.9999 14.5V2C11.9999 2 10.2084 11.365 10.5464 11.9565Z"
          fill="inherit"
          fill-opacity="0.5"
        />
      </svg>
    ),
  },
  {
    name: "CAMPAIGNS",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="17"
        viewBox="0 0 20 17"
        fill="inherit"
      >
        <path
          d="M5.24594 9.52199L8.64045 12.7009L7.28379 13.9718L8.64218 15.2442L7.28411 16.5156L4.90793 14.2903L2.19153 16.8334L0.833496 15.562L3.5499 13.0189L1.17301 10.7943L2.53103 9.52289L3.88873 10.7933L5.24594 9.52199ZM1.35775 0.166748L4.76285 0.16976L16.1107 10.7937L17.4693 9.52289L18.8274 10.7943L16.4508 13.0193L19.1668 15.562L17.8088 16.8334L15.0928 14.2906L12.7162 16.5156L11.3582 15.2442L12.7156 13.9722L1.36039 3.34133L1.35775 0.166748ZM15.2406 0.166838L18.6426 0.16976L18.6444 3.33711L14.7526 6.97958L11.357 3.80156L15.2406 0.166838Z"
          fill="inherit"
        />
      </svg>
    ),
  },
  {
    name: "GAME HISTORY",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="inherit"
        className="-mt-1"
      >
        <path
          d="M20 0.5C5.82126 0.5 6.78744 9.27108 6.78744 9.27108C6.36171 9.89458 5.95109 10.512 5.60386 11.1265C5.57971 11.1687 5.55556 11.2048 5.5314 11.247H3.09179C3.06763 11.247 3.04348 11.247 3.01932 11.247C2.66002 11.253 2.35507 11.506 2.27959 11.8584C2.20411 12.2078 2.37923 12.5633 2.70531 12.7169L2.31884 12.7892C1.03865 12.7892 0 13.8253 0 15.1024V18.1867C0 19.4639 1.03865 20.5 2.31884 20.5H10.0483C11.3285 20.5 12.3671 19.4639 12.3671 18.1867V15.1024C12.3671 13.8253 11.3285 12.7892 10.0483 12.7892L9.63768 12.6928C9.94263 12.5241 10.0996 12.1687 10.0121 11.8313C9.92754 11.491 9.6256 11.253 9.27536 11.247H6.78744C7.24638 10.4669 7.7657 9.68675 8.35749 8.90964C8.38768 8.87651 8.44505 8.78313 8.47826 8.74096C8.74396 8.39759 9.0308 8.06325 9.32367 7.72892C9.43539 7.59337 9.55616 7.46687 9.68599 7.31928C10.8726 6.03614 12.2947 4.84639 13.9614 3.8494C12.5302 5.15964 10.1661 7.8253 9.00966 9.8494C10.8998 10.0151 13.5628 8.94578 15.4106 7.39157C14.994 7.34337 13.0435 6.99398 12.4638 6.5C13.5749 6.59036 15.4227 6.5994 16.1594 6.54819C17.657 5.43976 19.372 2.8253 20 0.5Z"
          fill="inherit"
        />
      </svg>
    ),
  },
  {
    name: "REWARDS",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="inherit"
      >
        <path
          d="M12 15.5C15.7279 15.5 18.75 12.5899 18.75 9C18.75 5.41015 15.7279 2.5 12 2.5C8.27208 2.5 5.25 5.41015 5.25 9C5.25 12.5899 8.27208 15.5 12 15.5Z"
          fill="inherit"
        />
        <path
          d="M15.79 16.1101C16.12 15.9401 16.5 16.1901 16.5 16.5601V21.4101C16.5 22.3101 15.87 22.7501 15.09 22.3801L12.41 21.1101C12.18 21.0101 11.82 21.0101 11.59 21.1101L8.91 22.3801C8.13 22.7401 7.5 22.3001 7.5 21.4001L7.52 16.5601C7.52 16.1901 7.91 15.9501 8.23 16.1101C9.36 16.6801 10.64 17.0001 12 17.0001C13.36 17.0001 14.65 16.6801 15.79 16.1101Z"
          fill="inherit"
        />
      </svg>
    ),
  },
] as const;
