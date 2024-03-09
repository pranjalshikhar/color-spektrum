import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between items-center text-center px-40 py-8 border border-b-2">
      <div className="font-semibold text-xl">
        <Link
          href={"/"}
          className="text-white hover:bg-gradient-to-r hover:from-pink-300 hover:via-purple-300 hover:to-indigo-400 hover:bg-clip-text hover:text-transparent"
        >
          Gradients
        </Link>
        <Link
          href={"/generator"}
          className="ml-6 text-white hover:bg-gradient-to-r hover:from-pink-400 hover:to-pink-600 hover:bg-clip-text hover:text-transparent"
        >
          Generator
        </Link>
        <Link href={"/"} className="ml-6">
          Mesh
        </Link>
      </div>
      <GitHubLogoIcon className="h-5 w-5" />
    </div>
  );
}
