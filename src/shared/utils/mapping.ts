/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOptionSelect } from "../../types";
import { USER_ROLE } from "@/configs";

export const mappingOptionSelect = <T extends Record<string, any>>(
  data: Array<T>,
  labelKey: string = "name",
  valueKey: string = "_id"
): Array<IOptionSelect> | [] =>
  data?.map((item) => ({
    label: String(item?.[labelKey] ?? ""),
    value: String(item?.[valueKey] ?? ""),
  }));

export const mappingOptionEmployeeBenefit = <T extends Record<string, any>>(
  data: Array<T>,
  labelKey: string = "name",
  valueKey: string = "_id",
  roleKey: string = "role",
  teamIdKey: string = "teamId",
  isOfficial: string = "isOfficial"
): Array<IOptionSelect> | [] =>
  data?.map((item) => ({
    label: `${item?.[labelKey] || ""}-${USER_ROLE[item?.[roleKey] as keyof typeof USER_ROLE] || ""}${item?.[teamIdKey]?.name ? "-" + item?.[teamIdKey]?.name : ""}-${item?.[isOfficial] ? "Chính thức" : "Thử việc"}`,
    value: String(item?.[valueKey] ?? ""),
  }));
