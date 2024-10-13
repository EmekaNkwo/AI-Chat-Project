import IconRecent from "@/assets/IconRecent";
import IconBook from "@/assets/IconBook";
import IconUpload from "@/assets/IconUpload";
import IconShared from "@/assets/IconShared";
import IconDelete from "@/assets/IconDelete";
export const topSidebarItems = [
  {
    key: "#",
    icon: <IconRecent />,
    title: "Recents",
  },
  {
    key: "",
    icon: <IconBook />,
    title: "Library",
    children: [
      {
        key: "#",
        title: "Lists",
      },
      {
        key: "#",
        title: "Personas",
      },
      {
        key: "#",
        title: "Agents",
      },
      {
        key: "#",
        title: "Projects",
      },
      {
        key: "#",
        title: "Prompts",
      },
    ],
  },
  {
    key: "#",
    icon: <IconUpload />,
    title: "App Files",
  },
];

export const bottomSidebarItems = [
  {
    key: "#",
    icon: <IconShared />,
    title: "Shared",
  },

  {
    key: "#",
    icon: <IconDelete />,
    title: "Recently Deleted",
  },
];
