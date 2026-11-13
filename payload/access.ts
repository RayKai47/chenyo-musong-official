import type { Access, FieldAccess } from "payload";

/** 有登入後台的人 */
export const loggedIn: Access = ({ req }) => Boolean(req.user);

/** 角色是「管理員」的人 */
export const isAdmin: Access = ({ req }) => req.user?.role === "admin";
export const isAdminField: FieldAccess = ({ req }) => req.user?.role === "admin";

/** 任何人都能讀（網站前台要顯示的資料） */
export const anyone: Access = () => true;

/** 前台只看得到「已發布」，登入的人看得到草稿 */
export const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true;
  return { _status: { equals: "published" } };
};
