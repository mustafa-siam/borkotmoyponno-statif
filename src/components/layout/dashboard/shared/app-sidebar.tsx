"use client";

import * as React from "react";
import {
  BadgeCheck,
  Image,
  ListFilterPlus,
  LucideLayoutDashboard,
  Plus,
  ScrollText,
  ShoppingBasket,
  TestTubeIcon,
  UserCog,
  UserRoundPen,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { useLoggedInUserQuery } from "@/redux/features/users/userApi";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: users } = useLoggedInUserQuery();
  const findUser = users?.payload;

  const data = {
    user: {
      name: findUser?.role || "Joy das",
      email: findUser?.email || "joy600508@gmail.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Borkotmoy Ponno",
        logo: BadgeCheck,
        plan: "Dhaka, Bangladesh. ",
        url: "/",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LucideLayoutDashboard,
        isActive: false,
      },

      ...(findUser?.role === "admin"
        ? [
            {
              title: "Users",
              url: "#",
              icon: Users,
              isActive: false,
              items: [
                {
                  title: "Manage Users",
                  url: "/dashboard/users",
                  icon: UserCog,
                },
              ],
            },
          ]
        : []),

      {
        title: "Categories",
        url: "#",
        icon: UserRoundPen,
        isActive: false,
        items: [
          {
            title: "Add Category",
            url: "/dashboard/add-category",
            icon: Plus,
          },
          {
            title: "Manage Categories",
            url: "/dashboard/manage-categories",
            icon: ListFilterPlus,
          },
        ],
      },
      {
        title: "Products",
        url: "#",
        icon: UserRoundPen,
        isActive: false,
        items: [
          {
            title: "Add Product",
            url: "/dashboard/add-product",
            icon: Plus,
          },
          {
            title: "Manage Products",
            url: "/dashboard/manage-products",
            icon: ListFilterPlus,
          },
        ],
      },
      {
        title: "Order",
        url: "#",
        icon: ShoppingBasket,
        isActive: false,
        items: [
          {
            title: "Manage Order",
            url: "/dashboard/manage-order",
            icon: ListFilterPlus,
          },
        ],
      },

      {
        title: "Reviews",
        url: "#",
        icon: TestTubeIcon,
        isActive: false,
        items: [
          {
            title: "Add Review",
            url: "/dashboard/add-reviews",
            icon: Plus,
          },
          {
            title: "Manage Reviews",
            url: "/dashboard/manage-reviews",
            icon: ListFilterPlus,
          },
        ],
      },
      {
        title: "Banner",
        url: "#",
        icon: Image,
        isActive: false,
        items: [
          {
            title: "Add Banner",
            url: "/dashboard/add-banner",
            icon: Plus,
          },
          {
            title: "Manage Banner",
            url: "/dashboard/manage-banner",
            icon: ListFilterPlus,
          },
        ],
      },
      {
        title: "Level",
        url: "#",
        icon: ScrollText,
        isActive: false,
        items: [
          {
            title: "Add Level",
            url: "/dashboard/add-level",
            icon: Plus,
          },
          {
            title: "Manage level",
            url: "/dashboard/manage-level",
            icon: ListFilterPlus,
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
