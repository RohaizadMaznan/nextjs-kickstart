interface ArrayItemProps {
  name: string;
}

const ARRAY_ITEMS: ArrayItemProps[] = [
  {
    name: "Home",
  },
  {
    name: "Logout",
  },
];

interface FullSidebarProps {
  title: string;
  items: ArrayItemProps[];
}

export const FULL_SIDEBAR: FullSidebarProps[] = [
  {
    title: "Workspace",
    items: ARRAY_ITEMS,
  },
];
