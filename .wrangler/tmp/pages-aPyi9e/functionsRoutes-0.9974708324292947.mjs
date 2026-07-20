import { onRequestDelete as __api_apps__id__ts_onRequestDelete } from "C:\\Users\\nicop\\OneDrive\\Escritorio\\ak-main\\functions\\api\\apps\\[id].ts"
import { onRequestGet as __api_apps__id__ts_onRequestGet } from "C:\\Users\\nicop\\OneDrive\\Escritorio\\ak-main\\functions\\api\\apps\\[id].ts"
import { onRequestPut as __api_apps__id__ts_onRequestPut } from "C:\\Users\\nicop\\OneDrive\\Escritorio\\ak-main\\functions\\api\\apps\\[id].ts"
import { onRequestGet as __api_apps_ts_onRequestGet } from "C:\\Users\\nicop\\OneDrive\\Escritorio\\ak-main\\functions\\api\\apps.ts"
import { onRequestPost as __api_apps_ts_onRequestPost } from "C:\\Users\\nicop\\OneDrive\\Escritorio\\ak-main\\functions\\api\\apps.ts"
import { onRequestPost as __api_auth_ts_onRequestPost } from "C:\\Users\\nicop\\OneDrive\\Escritorio\\ak-main\\functions\\api\\auth.ts"
import { onRequestPost as __api_upload_ts_onRequestPost } from "C:\\Users\\nicop\\OneDrive\\Escritorio\\ak-main\\functions\\api\\upload.ts"
import { onRequest as __app__id__ts_onRequest } from "C:\\Users\\nicop\\OneDrive\\Escritorio\\ak-main\\functions\\app\\[id].ts"
import { onRequest as __sitemap_xml_ts_onRequest } from "C:\\Users\\nicop\\OneDrive\\Escritorio\\ak-main\\functions\\sitemap.xml.ts"
import { onRequest as ___middleware_ts_onRequest } from "C:\\Users\\nicop\\OneDrive\\Escritorio\\ak-main\\functions\\_middleware.ts"

export const routes = [
    {
      routePath: "/api/apps/:id",
      mountPath: "/api/apps",
      method: "DELETE",
      middlewares: [],
      modules: [__api_apps__id__ts_onRequestDelete],
    },
  {
      routePath: "/api/apps/:id",
      mountPath: "/api/apps",
      method: "GET",
      middlewares: [],
      modules: [__api_apps__id__ts_onRequestGet],
    },
  {
      routePath: "/api/apps/:id",
      mountPath: "/api/apps",
      method: "PUT",
      middlewares: [],
      modules: [__api_apps__id__ts_onRequestPut],
    },
  {
      routePath: "/api/apps",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_apps_ts_onRequestGet],
    },
  {
      routePath: "/api/apps",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_apps_ts_onRequestPost],
    },
  {
      routePath: "/api/auth",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_ts_onRequestPost],
    },
  {
      routePath: "/api/upload",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_upload_ts_onRequestPost],
    },
  {
      routePath: "/app/:id",
      mountPath: "/app",
      method: "",
      middlewares: [],
      modules: [__app__id__ts_onRequest],
    },
  {
      routePath: "/sitemap.xml",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__sitemap_xml_ts_onRequest],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_ts_onRequest],
      modules: [],
    },
  ]