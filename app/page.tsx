import Image from "next/image";
import CountdownTimer from "./CountDownTimer";

export default function Home() {
  return (
    <div className="flex w-full min-w-screen min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <CountdownTimer/>
    </div>
  );
}
