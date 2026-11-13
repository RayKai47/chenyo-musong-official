import type { CollectionConfig } from "payload";
import { isAdmin, isAdminField, loggedIn } from "../access";

/** 後台帳號。第一個建立的帳號自動是管理員。 */
export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "帳號", plural: "帳號" },
  auth: true,
  admin: { useAsTitle: "email", defaultColumns: ["email", "name", "role"] },
  access: {
    read: loggedIn,
    create: isAdmin,
    delete: isAdmin,
    // 自己可以改自己的資料，管理員可以改所有人
    update: ({ req, id }) => req.user?.role === "admin" || req.user?.id === id,
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation === "create") {
          const { totalDocs } = await req.payload.count({ collection: "users", req });
          if (totalDocs === 0) data.role = "admin";
        }
        return data;
      },
    ],
  },
  fields: [
    { name: "name", label: "名稱", type: "text" },
    {
      name: "role",
      label: "角色",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "管理員", value: "admin" },
        { label: "編輯", value: "editor" },
      ],
      access: { update: isAdminField },
    },
  ],
};
