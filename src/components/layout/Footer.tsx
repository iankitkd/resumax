import { APP_NAME } from "@/data";


export default function Footer() {
  return (
    <footer className="border-t border-gray-300 py-3 text-center mt-8">
      <div className="text-gray-500 text-sm">
        © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
