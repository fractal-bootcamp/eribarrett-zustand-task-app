import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/_index.tsx"),
    route("tasks", "routes/tasks.tsx"),
    route("manage", "routes/manage.tsx")
] satisfies RouteConfig;
