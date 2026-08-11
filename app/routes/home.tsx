import HomePage from "~/pages/HomePage";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Yolbert Torrealba" },
    { name: "description", content: "Welcome to my portfolio" },
  ];
}

export default function Home() {
  return <HomePage />;
}
