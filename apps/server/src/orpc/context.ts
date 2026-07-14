import { os } from "@orpc/server";
import type {
  RequestHeadersPluginContext,
  ResponseHeadersPluginContext,
} from "@orpc/server/plugins";

export interface AuthUser {
  uid: string;
  email: string;
  role: string;
  userPermissions?: { permission: string }[];
}

export interface ORPCContext
  extends RequestHeadersPluginContext,
    ResponseHeadersPluginContext {
  user?: AuthUser | null;
}

export const base = os.$context<ORPCContext>();
