import { APP_NAME } from "@/data";


export default function Footer() {
  return (
    <footer className="border-t border-border py-4 text-center mt-8">
      <div className="text-text-secondary text-sm">
        © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
