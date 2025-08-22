import { IUser, PERMISSIONS, UserAgentInfo } from "@/types";
import { isBefore, startOfDay } from "date-fns";
import { AVATAR_COLORS } from "../constants";

export const formatVND = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0, // No decimals
  }).format(amount || 0);
};

export const formatUSD = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount || 0);
};

export const maxDate = (age: number) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - age);
  return date;
};

export const generateUsernameFromEmail = (email: string) => {
  if (!email || typeof email !== "string") return "";
  const namePart = email.split("@")[0];

  return "@" + namePart;
};

export const downloadFile = (file: Blob | MediaSource, name: string) => {
  const url = window.URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", name);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const removeEmptyStrings = <T>(value: T): T => {
  if (Array.isArray(value)) {
    return value
      .map(removeEmptyStrings)
      .filter((v) => v !== "" && v !== undefined) as T;
  }
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .map(([k, v]) => [k, removeEmptyStrings(v)])
        .filter(([_, v]) => v !== "" && v !== undefined)
    ) as T;
  }
  return value;
};

export function parseUserAgent(uaString: string): UserAgentInfo {
  let browserName = "Unknown";
  let browserVersion = "Unknown";
  let os = "Unknown";
  let device: "Desktop" | "Mobile" = "Desktop";

  // Xác định hệ điều hành
  if (/Macintosh/.test(uaString)) {
    os = "macOS";
  } else if (/Windows/.test(uaString)) {
    os = "Windows";
  } else if (/Android/.test(uaString)) {
    os = "Android";
    device = "Mobile";
  } else if (/iPhone|iPad|iPod/.test(uaString)) {
    os = "iOS";
    device = "Mobile";
  }

  // Xác định trình duyệt
  const browserRegexes: { name: string; regex: RegExp }[] = [
    { name: "Chrome", regex: /Chrome\/([\d.]+)/ },
    { name: "Firefox", regex: /Firefox\/([\d.]+)/ },
    { name: "Safari", regex: /Version\/([\d.]+).*Safari/ },
    { name: "Edge", regex: /Edg\/([\d.]+)/ },
  ];

  for (const b of browserRegexes) {
    const match = uaString.match(b.regex);
    if (match) {
      browserName = b.name;
      browserVersion = match[1];
      break;
    }
  }

  return { browserName, browserVersion, os, device };
}

export const checkIsPastDay = (date: string | Date) => {
  const todayStart = startOfDay(new Date());
  return isBefore(date, todayStart);
};

export const checkIsDisableSelectByPermission = (
  userInfo: IUser,
  permission: PERMISSIONS
) => {
  if (userInfo?.role === "SUPER_ADMIN") {
    return false;
  }
  if (
    userInfo?.permissions?.length &&
    userInfo?.permissions.includes(permission)
  ) {
    return false;
  }
  return true;
};

export const getInitial = (profile: IUser) => {
  if (profile?.username) {
    return profile.username.charAt(1).toUpperCase();
  }
  if (profile?.email) {
    return profile.email.charAt(0).toUpperCase();
  }
  return "U";
};

export const getAvatarBgColor = (chat: string) => {
  const index = parseInt(chat.slice(-1), 16) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

export const isLink = (str: string): boolean => {
  if (!str) return false;

  try {
    new URL(str);
    return true;
  } catch (err) {
    console.log(err);
    const pattern = /^(www\.)?([\w-]+\.)+[\w-]{2,}(\/[^\s]*)?$/i;
    return pattern.test(str);
  }
};

type ExtractResult = {
  link: string;
  text: string;
};

export function extractLinkAndText(input: string): ExtractResult {
  const urlRegex = /(https?:\/\/[^\s]+)/;
  const match = input.match(urlRegex);

  const link = match ? match[0] : "";
  const text = input.replace(urlRegex, "").trim();

  return { link, text };
}
