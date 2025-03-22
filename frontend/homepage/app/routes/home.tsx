import type { Route } from "./home";
import { Welcome } from "../welcome/welcome";
import { VoiceJournal}  from "./landing"


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <VoiceJournal />;
}
