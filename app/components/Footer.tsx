import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = {
  solutions: [
    { href: "/contracts", label: "Contract Management" },
    { href: "/work-orders", label: "Work Orders" },
    { href: "/mapping", label: "Mapping & GPS" },
    { href: "/ai-cemetery", label: "AI Features" },
  ],
  resources: [
    { href: "/demo", label: "Product Preview" },
    { href: "/#waitlist", label: "Join Waitlist" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Image
              src="/images/eternaguard-logo-wide.png"
              alt="EternaGuard"
              width={180}
              height={50}
              className="h-12 w-auto mb-4 rounded bg-white p-1"
            />
            <p className="text-slate-400 max-w-md mb-4">
              Cemetery contract management software built for the way cemeteries actually work.
              Pre-need, at-need, payment plans, and property management — finally in one place.
            </p>
            <p className="text-slate-500 text-sm">
              Serving cemeteries, memorial parks, and funeral homes in the US, Australia, UK, and beyond.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-slate-200">Solutions</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.solutions.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-slate-200">Resources</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="text-slate-500 text-sm">Contact</p>
              <a
                href="mailto:contact@eternaguard.com"
                className="text-slate-400 hover:text-emerald-400 transition-colors"
              >
                contact@eternaguard.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} EternaGuard. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-slate-500 hover:text-emerald-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-slate-500 hover:text-emerald-400 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
